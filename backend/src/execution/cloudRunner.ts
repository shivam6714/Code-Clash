import {
  SupportedLanguage,
  TestCase,
  JudgeResult,
  RunResult,
  TestCaseResult,
  SubmissionStatus
} from './types';

// Free Public Judge0 Endpoints
const JUDGE0_ENDPOINTS = [
  'https://ce.judge0.com',
  'https://judge0-ce.p.rapidapi.com',
];

// Judge0 Language IDs
const JUDGE0_LANGUAGE_MAP: Record<SupportedLanguage, number> = {
  cpp: 54,        // C++ (GCC 9.2.0)
  python: 71,     // Python (3.8.1)
  java: 62,       // Java (OpenJDK 13.0.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
};

const normalizeOutput = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface CloudExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  compileError?: string;
  isTimeout?: boolean;
  statusId: number;
  durationMs: number;
}

/**
 * Execute a single test case using Judge0 Public CE API
 */
const executeJudge0 = async (
  sourceCode: string,
  language: SupportedLanguage,
  stdin: string,
  timeLimit: number = 2000
): Promise<CloudExecResult> => {
  const langId = JUDGE0_LANGUAGE_MAP[language];
  if (!langId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const payload = {
    source_code: sourceCode,
    language_id: langId,
    stdin: stdin || '',
    cpu_time_limit: Math.min(Math.max(timeLimit / 1000, 1), 5),
  };

  const startTime = Date.now();
  let lastError: Error | null = null;

  for (const baseUrl of JUDGE0_ENDPOINTS) {
    try {
      const response = await fetch(`${baseUrl}/submissions/?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Judge0 returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const durationMs = Date.now() - startTime;
      const statusId = data.status?.id ?? 0;

      // Status 6: Compilation Error
      if (statusId === 6) {
        return {
          stdout: '',
          stderr: data.compile_output || data.message || 'Compilation Error',
          exitCode: 1,
          compileError: data.compile_output || data.message || 'Compilation Error',
          statusId,
          durationMs,
        };
      }

      // Status 5: Time Limit Exceeded
      const isTimeout = statusId === 5;

      return {
        stdout: data.stdout || '',
        stderr: data.stderr || data.message || '',
        exitCode: statusId === 3 ? 0 : 1,
        isTimeout,
        statusId,
        durationMs,
      };
    } catch (err: any) {
      lastError = err;
      await sleep(200);
    }
  }

  throw lastError || new Error('All cloud execution endpoints failed');
};

/**
 * Full submission evaluation across all test cases
 */
export const runCloudSubmission = async (
  sourceCode: string,
  language: SupportedLanguage,
  testCases: TestCase[],
  timeLimit: number = 2000
): Promise<JudgeResult> => {
  let passedTests = 0;
  let maxDuration = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];

    try {
      const exec = await executeJudge0(sourceCode, language, tc.input, timeLimit);

      if (exec.compileError) {
        return {
          status: SubmissionStatus.COMPILE_ERROR,
          passedTests: 0,
          totalTests: testCases.length,
          errorMessage: exec.compileError,
        };
      }

      if (exec.isTimeout) {
        return {
          status: SubmissionStatus.TIME_LIMIT_EXCEEDED,
          passedTests,
          totalTests: testCases.length,
          executionTime: exec.durationMs,
        };
      }

      // Runtime Error (IDs 7 to 12)
      if (exec.statusId >= 7 && exec.statusId <= 12) {
        return {
          status: SubmissionStatus.RUNTIME_ERROR,
          passedTests,
          totalTests: testCases.length,
          executionTime: exec.durationMs,
          errorMessage: exec.stderr || 'Runtime Error',
        };
      }

      const actual = normalizeOutput(exec.stdout);
      const expected = normalizeOutput(tc.expectedOutput);

      if (actual !== expected) {
        return {
          status: SubmissionStatus.WRONG_ANSWER,
          passedTests,
          totalTests: testCases.length,
          executionTime: exec.durationMs,
        };
      }

      passedTests++;
      if (exec.durationMs > maxDuration) {
        maxDuration = exec.durationMs;
      }
    } catch (error: any) {
      console.error(`Submission error on test ${i + 1}:`, error);
      return {
        status: SubmissionStatus.SYSTEM_ERROR,
        passedTests,
        totalTests: testCases.length,
        errorMessage: error.message || 'Execution error',
      };
    }
  }

  return {
    status: SubmissionStatus.ACCEPTED,
    passedTests,
    totalTests: testCases.length,
    executionTime: maxDuration,
  };
};

/**
 * Run visible test cases for rapid feedback
 */
export const runCloudVisibleRun = async (
  sourceCode: string,
  language: SupportedLanguage,
  visibleTestCases: TestCase[],
  timeLimit: number = 2000
): Promise<RunResult> => {
  let passedTests = 0;
  const testResults: TestCaseResult[] = [];
  let overallStatus: SubmissionStatus = SubmissionStatus.ACCEPTED;

  for (let i = 0; i < visibleTestCases.length; i++) {
    const tc = visibleTestCases[i];
    const expected = normalizeOutput(tc.expectedOutput);

    try {
      const exec = await executeJudge0(sourceCode, language, tc.input, timeLimit);

      if (exec.compileError) {
        return {
          status: SubmissionStatus.COMPILE_ERROR,
          passedTests: 0,
          totalTests: visibleTestCases.length,
          testResults: [],
          errorMessage: exec.compileError,
        };
      }

      const actual = normalizeOutput(exec.stdout);

      if (exec.isTimeout) {
        testResults.push({
          input: tc.input,
          expectedOutput: expected,
          actualOutput: actual,
          passed: false,
          status: SubmissionStatus.TIME_LIMIT_EXCEEDED,
          executionTime: exec.durationMs,
          errorMessage: 'Time Limit Exceeded',
        });
        overallStatus = SubmissionStatus.TIME_LIMIT_EXCEEDED;
        break;
      }

      if (exec.statusId >= 7 && exec.statusId <= 12) {
        testResults.push({
          input: tc.input,
          expectedOutput: expected,
          actualOutput: actual,
          passed: false,
          status: SubmissionStatus.RUNTIME_ERROR,
          executionTime: exec.durationMs,
          errorMessage: exec.stderr || 'Runtime Error',
        });
        overallStatus = SubmissionStatus.RUNTIME_ERROR;
        break;
      }

      const passed = actual === expected;
      if (passed) {
        passedTests++;
      } else if (overallStatus === SubmissionStatus.ACCEPTED) {
        overallStatus = SubmissionStatus.WRONG_ANSWER;
      }

      testResults.push({
        input: tc.input,
        expectedOutput: expected,
        actualOutput: actual,
        passed,
        status: passed ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER,
        executionTime: exec.durationMs,
      });
    } catch (error: any) {
      console.error(`Visible run error on test ${i + 1}:`, error);
      testResults.push({
        input: tc.input,
        expectedOutput: expected,
        actualOutput: '',
        passed: false,
        status: SubmissionStatus.SYSTEM_ERROR,
        errorMessage: error.message || 'Execution error',
      });
      overallStatus = SubmissionStatus.SYSTEM_ERROR;
      break;
    }
  }

  return {
    status: overallStatus,
    passedTests,
    totalTests: visibleTestCases.length,
    testResults,
  };
};
