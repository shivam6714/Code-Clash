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

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  constraints: string[];
  examples: ProblemExample[];
  starterCode: StarterCode;
  timeLimit: number;
  memoryLimit: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const fetchProblems = async (difficulty?: string, topic?: string): Promise<ProblemListItem[]> => {
  const query = new URLSearchParams();
  if (difficulty) query.append('difficulty', difficulty);
  if (topic) query.append('topic', topic);
  
  const queryString = query.toString();
  const endpoint = `/api/problems${queryString ? `?${queryString}` : ''}`;
  
  const data = await apiFetch(endpoint);
  return data.problems;
};

export const fetchProblem = async (slug: string): Promise<Problem> => {
  const data = await apiFetch(`/api/problems/${slug}`);
  return data.problem;
};
