import { DockerSandbox } from './sandbox';
import { SubmissionStatus, JudgeResult, TestCase, LanguageAdapter } from './types';

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
