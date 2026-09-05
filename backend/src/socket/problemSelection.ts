import { Problem } from '../models/Problem';

/**
 * Isolates the logic for selecting a problem for a battle.
 * Currently selects a random published problem and strips hidden test cases.
 * Designed to easily support difficulty constraints, ratings, and deduplication in the future.
 */
export const selectBattleProblem = async (): Promise<any> => {
  // Randomly select one published problem
  const problems = await Problem.aggregate([
    { $match: { isPublished: true } },
    { $sample: { size: 1 } }
  ]);

  if (!problems || problems.length === 0) {
    throw new Error('No published problems found');
  }

  const problem = problems[0];

  // Strip hidden test cases securely
  if (problem.testCases && Array.isArray(problem.testCases)) {
    problem.testCases = problem.testCases
      .filter((tc: any) => !tc.isHidden)
      .map((tc: any) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden
      }));
  } else {
    problem.testCases = [];
  }

  // Remove internal fields not needed for the frontend payload
  delete problem.__v;

  return problem;
};
