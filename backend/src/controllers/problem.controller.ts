import { Request, Response } from 'express';
import { Problem, Difficulty } from '../models/Problem';
import { User } from '../models/User';
import { executeSubmission, executeRun } from '../execution/runner';
import { SupportedLanguage } from '../execution/types';

export const getProblems = async (req: Request, res: Response) => {
  try {
    const { difficulty, topic, search, status } = req.query;

    const query: any = { isPublished: true };

    if (difficulty) {
      if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
        return res.status(400).json({ message: 'Invalid difficulty filter' });
      }
      query.difficulty = difficulty;
    }

    const searchTerm = (search || topic || '').toString().trim();
    if (searchTerm) {
      const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      query.$or = [
        { title: { $regex: regex } },
        { topics: { $elemMatch: { $regex: regex } } },
        { topics: { $regex: regex } }
      ];
    }

    if (req.user) {
      const solvedList: string[] = req.user.solvedProblems || [];
      if (status === 'solved') {
        query.slug = { $in: solvedList };
      } else if (status === 'todo') {
        query.slug = { $nin: solvedList };
      }
    }

    const problems = await Problem.find(query)
      .select('title slug difficulty topics isPublished createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();

    const formattedProblems = problems.map((p) => {
      const isSolved = req.user ? (req.user.solvedProblems || []).includes(p.slug) : false;
      return {
        ...p,
        isSolved,
      };
    });

    res.status(200).json({ problems: formattedProblems });
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

export const runProblemCode = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { sourceCode, language } = req.body;

    const supportedLangs = ['cpp', 'python', 'java', 'javascript'];
    if (!supportedLangs.includes(language)) {
      return res.status(400).json({ message: 'Invalid language specified' });
    }
    if (!sourceCode || typeof sourceCode !== 'string') {
      return res.status(400).json({ message: 'sourceCode is required' });
    }

    const problem = await Problem.findOne({ slug, isPublished: true });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const visibleTestCases = problem.testCases.filter((tc: any) => !tc.isHidden);
    const result = await executeRun(
      sourceCode,
      language as SupportedLanguage,
      visibleTestCases,
      problem.timeLimit || 2000,
      problem.memoryLimit || 256
    );

    res.status(200).json({ result });
  } catch (error) {
    console.error('Run problem code error:', error);
    res.status(500).json({ message: 'Internal server error executing code' });
  }
};

export const submitProblemCode = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { sourceCode, language } = req.body;

    const supportedLangs = ['cpp', 'python', 'java', 'javascript'];
    if (!supportedLangs.includes(language)) {
      return res.status(400).json({ message: 'Invalid language specified' });
    }
    if (!sourceCode || typeof sourceCode !== 'string') {
      return res.status(400).json({ message: 'sourceCode is required' });
    }

    const problem = await Problem.findOne({ slug, isPublished: true });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const result = await executeSubmission(
      sourceCode,
      language as SupportedLanguage,
      problem.testCases,
      problem.timeLimit || 2000,
      problem.memoryLimit || 256
    );

    if (req.user && result.status === 'ACCEPTED') {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { solvedProblems: slug },
      });
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error('Submit problem code error:', error);
    res.status(500).json({ message: 'Internal server error judging submission' });
  }
};


