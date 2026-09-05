export interface ImportedProblemMetadata {
  externalId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
}

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ImportedProblemDetails {
  description: string;
  constraints: string[];
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in megabytes
  examples: IExample[];
  testCases: ITestCase[];
}

export interface FetchOptions {
  limit?: number;
  difficulty?: string;
  topic?: string;
  ids?: string[];
}

export interface ProblemProvider {
  /**
   * The name of the provider (e.g., 'Codeforces')
   */
  readonly name: string;

  /**
   * Fetch a list of problem metadata based on filters.
   */
  fetchProblemIndex(options: FetchOptions): Promise<ImportedProblemMetadata[]>;

  /**
   * Fetch the detailed description, constraints, and test data for a specific problem.
   * Note: Some providers might only supply visible/example test cases here.
   */
  fetchProblemDetails(externalId: string): Promise<ImportedProblemDetails>;
}
