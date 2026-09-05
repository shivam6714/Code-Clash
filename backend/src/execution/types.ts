export enum SubmissionStatus {
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  COMPILE_ERROR = 'COMPILE_ERROR',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  RATE_LIMITED = 'RATE_LIMITED'
}

export type SupportedLanguage = 'cpp' | 'python' | 'java' | 'javascript';

export interface JudgeResult {
  status: SubmissionStatus;
  passedTests: number;
  totalTests: number;
  executionTime?: number;
  memoryUsed?: number;
  errorMessage?: string;
}

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: SubmissionStatus;
  executionTime?: number;
  errorMessage?: string;
}

export interface RunResult {
  status: SubmissionStatus;
  passedTests: number;
  totalTests: number;
  testResults: TestCaseResult[];
  errorMessage?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface LanguageAdapter {
  image: string;
  sourceFile: string;
  compileCmd?: string;
  runCmd: string;
}
