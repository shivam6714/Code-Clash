import { DockerSandbox } from './sandbox';
import { SubmissionStatus, JudgeResult, RunResult, TestCaseResult, TestCase, LanguageAdapter } from './types';

const normalizeOutput = (str: string): string => {
  return str.replace(/\\r\\n/g, '\n').trim();
};

export const runJudge = async (
  sandbox: DockerSandbox,
  adapter: LanguageAdapter,
  testCases: TestCase[]
): Promise<JudgeResult> => {
  
  // 1. Compile if necessary
  if (adapter.compileCmd) {
    const compileResult = await sandbox.compile(adapter.compileCmd);
    if (compileResult.error) {
      return {
        status: compileResult.error === 'TIME_LIMIT_EXCEEDED' ? SubmissionStatus.TIME_LIMIT_EXCEEDED : 
                (compileResult.error === 'MEMORY_LIMIT_EXCEEDED' ? SubmissionStatus.MEMORY_LIMIT_EXCEEDED : SubmissionStatus.COMPILE_ERROR),
        passedTests: 0,
        totalTests: testCases.length,
        errorMessage: 'Compilation Failed'
      };
    }
    // If exit code wasn't an error but standard error has output, we might log it, 
    // but typically compilation errors throw a non-zero exit code handled in `sandbox.executeDockerCommand` via `error`.
  }

  // 2. Iterate through test cases
  let passedTests = 0;
  let maxExecutionTime = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    
    const runResult = await sandbox.run(adapter.runCmd, tc.input);

    if (runResult.error) {
      return {
        status: runResult.error as unknown as SubmissionStatus,
        passedTests,
        totalTests: testCases.length,
        executionTime: runResult.timeTakenMs,
        errorMessage: runResult.errorMessage || 'Runtime Error'
      };
    }

    const actual = normalizeOutput(runResult.stdout);
    const expected = normalizeOutput(tc.expectedOutput);

    if (actual !== expected) {
      return {
        status: SubmissionStatus.WRONG_ANSWER,
        passedTests,
        totalTests: testCases.length,
        executionTime: runResult.timeTakenMs,
      };
    }

    passedTests++;
    if (runResult.timeTakenMs > maxExecutionTime) {
      maxExecutionTime = runResult.timeTakenMs;
    }
  }

  return {
    status: SubmissionStatus.ACCEPTED,
    passedTests,
    totalTests: testCases.length,
    executionTime: maxExecutionTime
  };
};

export const runJudgeVisible = async (
  sandbox: DockerSandbox,
  adapter: LanguageAdapter,
  visibleTestCases: TestCase[]
): Promise<RunResult> => {
  // 1. Compile if necessary
  if (adapter.compileCmd) {
    const compileResult = await sandbox.compile(adapter.compileCmd);
    if (compileResult.error) {
      return {
        status: compileResult.error === 'TIME_LIMIT_EXCEEDED' ? SubmissionStatus.TIME_LIMIT_EXCEEDED : 
                (compileResult.error === 'MEMORY_LIMIT_EXCEEDED' ? SubmissionStatus.MEMORY_LIMIT_EXCEEDED : SubmissionStatus.COMPILE_ERROR),
        passedTests: 0,
        totalTests: visibleTestCases.length,
        testResults: [],
        errorMessage: 'Compilation Failed'
      };
    }
  }

  // 2. Iterate through visible test cases
  let passedTests = 0;
  const testResults: TestCaseResult[] = [];
  let overallStatus: SubmissionStatus = SubmissionStatus.ACCEPTED;

  for (let i = 0; i < visibleTestCases.length; i++) {
    const tc = visibleTestCases[i];
    
    const runResult = await sandbox.run(adapter.runCmd, tc.input);
    const actual = normalizeOutput(runResult.stdout);
    const expected = normalizeOutput(tc.expectedOutput);

    if (runResult.error) {
      testResults.push({
        input: tc.input,
        expectedOutput: expected,
        actualOutput: actual,
        passed: false,
        status: runResult.error as unknown as SubmissionStatus,
        executionTime: runResult.timeTakenMs,
        errorMessage: runResult.errorMessage || 'Runtime Error'
      });
      overallStatus = runResult.error as unknown as SubmissionStatus;
      break; // stop on RE, TLE, MLE, SYSTEM_ERROR
    }

    const passed = actual === expected;
    if (passed) passedTests++;
    else if (overallStatus === SubmissionStatus.ACCEPTED) {
       overallStatus = SubmissionStatus.WRONG_ANSWER;
    }

    testResults.push({
      input: tc.input,
      expectedOutput: expected,
      actualOutput: actual,
      passed,
      status: passed ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER,
      executionTime: runResult.timeTakenMs
    });
  }

  return {
    status: overallStatus,
    passedTests,
    totalTests: visibleTestCases.length,
    testResults
  };
};
