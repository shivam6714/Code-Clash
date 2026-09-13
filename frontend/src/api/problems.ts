import { apiFetch } from './auth';

export interface ProblemExample {
  _id?: string;
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemListItem {
  _id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  isPublished: boolean;
  isSolved?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StarterCode {
  cpp?: string;
  python?: string;
  java?: string;
  javascript?: string;
  [key: string]: string | undefined;
}

export interface ProblemTestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  constraints: string[];
  examples: ProblemExample[];
  testCases?: ProblemTestCase[];
  starterCode: StarterCode;
  timeLimit: number;
  memoryLimit: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: string;
  executionTime?: number;
  errorMessage?: string;
}

export interface RunResult {
  status: string;
  passedTests: number;
  totalTests: number;
  testResults: TestCaseResult[];
  errorMessage?: string;
}

export interface SubmissionResult {
  status: string;
  passedTests: number;
  totalTests: number;
  executionTime?: number;
  memoryUsed?: number;
  errorMessage?: string;
}

export const fetchProblems = async (difficulty?: string, topic?: string, search?: string, status?: string): Promise<ProblemListItem[]> => {
  const query = new URLSearchParams();
  if (difficulty) query.append('difficulty', difficulty);
  if (status) query.append('status', status);
  const q = search || topic;
  if (q) query.append('search', q);
  
  const queryString = query.toString();
  const endpoint = `/api/problems${queryString ? `?${queryString}` : ''}`;
  
  const data = await apiFetch(endpoint);
  return data.problems;
};

export const fetchProblem = async (slug: string): Promise<Problem> => {
  const data = await apiFetch(`/api/problems/${slug}`);
  return data.problem;
};

export const runProblemCode = async (slug: string, sourceCode: string, language: string): Promise<RunResult> => {
  const data = await apiFetch(`/api/problems/${slug}/run`, {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language }),
  });
  return data.result;
};

export const submitProblemCode = async (slug: string, sourceCode: string, language: string): Promise<SubmissionResult> => {
  const data = await apiFetch(`/api/problems/${slug}/submit`, {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language }),
  });
  return data.result;
};
