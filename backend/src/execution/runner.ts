import { DockerSandbox } from './sandbox';
import { runJudge, runJudgeVisible } from './judge';
import { getLanguageAdapter } from './languages';
import { SupportedLanguage, JudgeResult, RunResult, SubmissionStatus, TestCase } from './types';

export const executeSubmission = async (
  sourceCode: string,
  language: SupportedLanguage,
  testCases: TestCase[],
  timeLimit: number = 2000,
  memoryLimit: number = 256
): Promise<JudgeResult> => {
  let sandbox: DockerSandbox | null = null;

  try {
    const adapter = getLanguageAdapter(language);
    
    sandbox = new DockerSandbox(
      adapter.image,
      sourceCode,
      adapter.sourceFile,
      timeLimit,
      memoryLimit
    );

    await sandbox.prepare();

    const result = await runJudge(sandbox, adapter, testCases);
    return result;

  } catch (error: any) {
    console.error('Execution System Error:', error);
    return {
      status: SubmissionStatus.SYSTEM_ERROR,
      passedTests: 0,
      totalTests: testCases.length,
      errorMessage: 'System error during execution'
    };
  } finally {
    if (sandbox) {
      await sandbox.cleanup();
    }
  }
};

export const executeRun = async (
  sourceCode: string,
  language: SupportedLanguage,
  visibleTestCases: TestCase[],
  timeLimit: number = 2000,
  memoryLimit: number = 256
): Promise<RunResult> => {
  let sandbox: DockerSandbox | null = null;

  try {
    const adapter = getLanguageAdapter(language);
    
    sandbox = new DockerSandbox(
      adapter.image,
      sourceCode,
      adapter.sourceFile,
      timeLimit,
      memoryLimit
    );

    await sandbox.prepare();

    const result = await runJudgeVisible(sandbox, adapter, visibleTestCases);
    return result;

  } catch (error: any) {
    console.error('Execution System Error (Run):', error);
    return {
      status: SubmissionStatus.SYSTEM_ERROR,
      passedTests: 0,
      totalTests: visibleTestCases.length,
      testResults: [],
      errorMessage: 'System error during execution'
    };
  } finally {
    if (sandbox) {
      await sandbox.cleanup();
    }
  }
};
