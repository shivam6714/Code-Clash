import { DockerSandbox } from './sandbox';
import { runJudge } from './judge';
import { getLanguageAdapter } from './languages';
import { SupportedLanguage, JudgeResult, SubmissionStatus, TestCase } from './types';

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
