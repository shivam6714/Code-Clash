import {
  SupportedLanguage,
  TestCase,
  JudgeResult,
  RunResult,
  TestCaseResult,
  SubmissionStatus
} from './types';

// OnlineCompiler.io Synchronous Execution API Endpoint
const ONLINECOMPILER_SYNC_ENDPOINT = 'https://api.onlinecompiler.io/api/run-code-sync/';

// OnlineCompiler.io Compiler Identifiers
const ONLINECOMPILER_LANGUAGE_MAP: Record<SupportedLanguage, string> = {
  cpp: 'g++-15',
  python: 'python-3.14',
  java: 'openjdk-25',
  javascript: 'typescript-deno',
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

interface OnlineCompilerExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  compileError?: string;
  isTimeout?: boolean;
  durationMs: number;
}

/**
 * Check if the error indicates compilation/syntax failure
 */
const isCompilationError = (language: SupportedLanguage, stderr: string, exitCode: number, durationMs: number): boolean => {
  if (!stderr) return false;
  
  const lowerErr = stderr.toLowerCase();
  
  if (
    lowerErr.includes('syntaxerror') ||
    lowerErr.includes('compileerror') ||
    lowerErr.includes('compilation error') ||
    lowerErr.includes('cannot find symbol') ||
    lowerErr.includes('undefined reference') ||
    lowerErr.includes('fatal error:')
  ) {
    return true;
  }

  if (language === 'cpp' || language === 'java') {
    if (lowerErr.includes('error:') || lowerErr.includes('javac') || lowerErr.includes('g++:')) {
      return true;
    }
  }

  return false;
};

/**
 * Execute a single test case using OnlineCompiler.io Sync API
 */
const executeOnlineCompiler = async (
  sourceCode: string,
  language: SupportedLanguage,
  stdin: string,
  timeLimit: number = 2000
): Promise<OnlineCompilerExecResult> => {
  const apiKey = process.env.ONLINECOMPILER_API_KEY;

  if (!apiKey) {
    throw new Error('ONLINECOMPILER_API_KEY environment variable is not set');
  }

  const compiler = ONLINECOMPILER_LANGUAGE_MAP[language];
  if (!compiler) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const payload = {
    compiler,
    code: sourceCode,
    input: stdin || '',
  };

  const startTime = Date.now();

  const response = await fetch(ONLINECOMPILER_SYNC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey.trim(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || '';
    } catch {
      // ignore JSON parse failure on non-JSON response
    }
    throw new Error(`OnlineCompiler API returned HTTP ${response.status}${errorDetail ? `: ${errorDetail}` : ''}`);
  }

  const data = await response.json();
  const rawElapsedSec = parseFloat(data.time || data.total || '0');
  const durationMs = rawElapsedSec > 0 ? Math.round(rawElapsedSec * 1000) : (Date.now() - startTime);

  const stdout = data.output || '';
  const stderr = data.error || '';
  const exitCode = typeof data.exit_code === 'number' ? data.exit_code : (data.status === 'success' ? 0 : 1);
  const signal = data.signal;

  // Timeout: exit code 124, timeout signals, explicit timeout message, or wall/reported time exceeding limit
  const isTimeout =
    exitCode === 124 ||
    signal === 9 ||
    signal === 15 ||
    stderr.toLowerCase().includes('time limit exceeded') ||
    stderr.toLowerCase().includes('timed out') ||
    durationMs > timeLimit + 1000;

  // Compilation Error
  const compileError = !isTimeout && isCompilationError(language, stderr, exitCode, durationMs) ? stderr : undefined;

  return {
    stdout,
    stderr,
    exitCode,
    compileError,
    isTimeout,
    durationMs,
  };
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
  const apiKey = process.env.ONLINECOMPILER_API_KEY;
  if (!apiKey) {
    return {
      status: SubmissionStatus.SYSTEM_ERROR,
      passedTests: 0,
      totalTests: testCases.length,
      errorMessage: 'Execution configuration error: ONLINECOMPILER_API_KEY environment variable is not set.',
    };
  }

  let passedTests = 0;
  let maxDuration = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];

    try {
      const exec = await executeOnlineCompiler(sourceCode, language, tc.input, timeLimit);

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
      console.error(`Submission error on test ${i + 1}:`, error.message || 'Execution error');
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
  const apiKey = process.env.ONLINECOMPILER_API_KEY;
  if (!apiKey) {
    return {
      status: SubmissionStatus.SYSTEM_ERROR,
      passedTests: 0,
      totalTests: visibleTestCases.length,
      testResults: [],
      errorMessage: 'Execution configuration error: ONLINECOMPILER_API_KEY environment variable is not set.',
    };
  }

  let passedTests = 0;
  const testResults: TestCaseResult[] = [];
  let overallStatus: SubmissionStatus = SubmissionStatus.ACCEPTED;

  for (let i = 0; i < visibleTestCases.length; i++) {
    const tc = visibleTestCases[i];
    const expected = normalizeOutput(tc.expectedOutput);

    try {
      const exec = await executeOnlineCompiler(sourceCode, language, tc.input, timeLimit);

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
      console.error(`Visible run error on test ${i + 1}:`, error.message || 'Execution error');
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
