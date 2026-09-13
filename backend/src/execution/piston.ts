import {
  SupportedLanguage,
  TestCase,
  JudgeResult,
  RunResult,
  TestCaseResult,
  SubmissionStatus
} from './types';

const PISTON_ENDPOINT = process.env.PISTON_URL || 'https://emkc.org/api/v2/piston/execute';

interface PistonLanguageConfig {
  language: string;
  version: string;
  filename: string;
}

const PISTON_LANGUAGE_MAP: Record<SupportedLanguage, PistonLanguageConfig> = {
  cpp: { language: 'c++', version: '*', filename: 'main.cpp' },
  python: { language: 'python', version: '*', filename: 'main.py' },
  java: { language: 'java', version: '*', filename: 'Main.java' },
  javascript: { language: 'javascript', version: '*', filename: 'main.js' },
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

interface PistonExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  signal: string | null;
  compileError?: string;
  durationMs: number;
}

/**
 * Execute single test case against Piston API
 */
const executePistonSingle = async (
  sourceCode: string,
  language: SupportedLanguage,
  stdin: string,
  timeLimit: number = 3000
): Promise<PistonExecResult> => {
  const langConfig = PISTON_LANGUAGE_MAP[language];
  if (!langConfig) {
    throw new Error(`Unsupported language for Piston: ${language}`);
  }

  const payload = {
    language: langConfig.language,
    version: langConfig.version,
    files: [
      {
        name: langConfig.filename,
        content: sourceCode,
      },
    ],
    stdin: stdin || '',
    run_timeout: Math.min(timeLimit + 1000, 10000),
    compile_timeout: 10000,
  };

  const startTime = Date.now();

  let retries = 2;
  while (retries > 0) {
    try {
      const response = await fetch(PISTON_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        // Rate limited, wait and retry once
        await sleep(600);
        retries--;
        continue;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Piston API returned HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();
      const durationMs = Date.now() - startTime;

      // Check compile stage if present
      if (data.compile && data.compile.code !== 0) {
        return {
          stdout: data.compile.stdout || '',
          stderr: data.compile.stderr || data.compile.output || '',
          exitCode: data.compile.code,
          signal: data.compile.signal,
          compileError: data.compile.stderr || data.compile.output || 'Compilation failed',
          durationMs,
        };
      }

      const run = data.run || {};
      return {
        stdout: run.stdout || '',
        stderr: run.stderr || run.output || '',
        exitCode: run.code ?? 0,
        signal: run.signal,
        durationMs,
      };
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      await sleep(400);
    }
  }

  throw new Error('Piston execution failed after retries');
};

/**
 * Execute a ranked submission through Piston API (evaluates all test cases)
 */
export const runPistonSubmission = async (
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
      const exec = await executePistonSingle(sourceCode, language, tc.input, timeLimit);

      if (exec.compileError) {
        return {
          status: SubmissionStatus.COMPILE_ERROR,
          passedTests: 0,
          totalTests: testCases.length,
          errorMessage: exec.compileError,
        };
      }

      if (exec.signal === 'SIGKILL' || exec.signal === 'SIGTERM' || exec.durationMs > timeLimit + 1500) {
        return {
          status: SubmissionStatus.TIME_LIMIT_EXCEEDED,
          passedTests,
          totalTests: testCases.length,
          executionTime: exec.durationMs,
        };
      }

      if (exec.exitCode !== 0) {
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
      console.error(`Piston submission error on test ${i + 1}:`, error);
      return {
        status: SubmissionStatus.SYSTEM_ERROR,
        passedTests,
        totalTests: testCases.length,
        errorMessage: error.message || 'Execution system error',
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
 * Execute a test run through Piston API (returns visible test results)
 */
export const runPistonVisibleRun = async (
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
      const exec = await executePistonSingle(sourceCode, language, tc.input, timeLimit);

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

      if (exec.signal === 'SIGKILL' || exec.signal === 'SIGTERM') {
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

      if (exec.exitCode !== 0) {
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
      console.error(`Piston visible run error on test ${i + 1}:`, error);
      testResults.push({
        input: tc.input,
        expectedOutput: expected,
        actualOutput: '',
        passed: false,
        status: SubmissionStatus.SYSTEM_ERROR,
        errorMessage: error.message || 'Execution system error',
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
