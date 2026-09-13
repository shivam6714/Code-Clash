import { DockerSandbox } from './sandbox';
import { runJudge, runJudgeVisible } from './judge';
import { getLanguageAdapter } from './languages';
import { runCloudSubmission, runCloudVisibleRun } from './cloudRunner';
import { SupportedLanguage, JudgeResult, RunResult, TestCase } from './types';

const getEngine = (): 'cloud' | 'docker' => {
  const engine = (process.env.EXECUTION_ENGINE || 'cloud').toLowerCase();
  return engine === 'docker' ? 'docker' : 'cloud';
};

export const executeSubmission = async (
  sourceCode: string,
  language: SupportedLanguage,
  testCases: TestCase[],
  timeLimit: number = 2000,
  memoryLimit: number = 256
): Promise<JudgeResult> => {
  const engine = getEngine();

  if (engine === 'cloud') {
    return runCloudSubmission(sourceCode, language, testCases, timeLimit);
  }

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
    console.error('Docker Execution failed, falling back to Cloud API:', error.message || error);
    return runCloudSubmission(sourceCode, language, testCases, timeLimit);
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
  const engine = getEngine();

  if (engine === 'cloud') {
    return runCloudVisibleRun(sourceCode, language, visibleTestCases, timeLimit);
  }

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
    console.error('Docker Execution failed (Run), falling back to Cloud API:', error.message || error);
    return runCloudVisibleRun(sourceCode, language, visibleTestCases, timeLimit);
  } finally {
    if (sandbox) {
      await sandbox.cleanup();
    }
  }
};

