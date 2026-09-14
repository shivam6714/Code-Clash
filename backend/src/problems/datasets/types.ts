import { Difficulty, IExample, ITestCase } from '../../models/Problem';

export interface CodeClashProblemDefinition {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  constraints: string[];
  timeLimit?: number; // Default 2000ms
  memoryLimit?: number; // Default 256MB
  examples: IExample[];
  testCases: ITestCase[];
  starterCode: {
    cpp: string;
    python: string;
    java: string;
    javascript: string;
  };
  referenceSolution: {
    language: 'cpp'; // Force cpp reference first as per requirements
    code: string;
  };
}
