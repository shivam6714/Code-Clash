import { Request, Response } from 'express';
import { Problem, Difficulty } from '../models/Problem';

export const getProblems = async (req: Request, res: Response) => {
  try {
    const { difficulty, topic } = req.query;

    const query: any = { isPublished: true };

    if (difficulty) {
      if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
        return res.status(400).json({ message: 'Invalid difficulty filter' });
      }
      query.difficulty = difficulty;
    }

    if (topic) {
      // Use case-insensitive regex for topic filtering
      query.topics = { $regex: new RegExp(`^${topic}$`, 'i') };
    }

    const problems = await Problem.find(query)
      .select('title slug difficulty topics isPublished createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.status(200).json({ problems });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ message: 'Server error fetching problems' });
  }
};

export const getProblemBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug, isPublished: true })
      .select('-__v')
      .lean(); // Use lean to get a plain JS object so we can modify it easily

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Security check: Stripping out hidden test cases
    if (problem.testCases && Array.isArray(problem.testCases)) {
      problem.testCases = problem.testCases.filter((tc: any) => !tc.isHidden);
      // Ensure we explicitly map to remove any accidental inclusion
      problem.testCases = problem.testCases.map((tc: any) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden
      })) as any;
    } else {
      problem.testCases = [];
    }

    res.status(200).json({ problem });
  } catch (error) {
    console.error('Error fetching problem details:', error);
    res.status(500).json({ message: 'Server error fetching problem details' });
  }
};
