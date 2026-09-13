import { Router } from 'express';
import { getProblems, getProblemBySlug, runProblemCode, submitProblemCode } from '../controllers/problem.controller';
import { authenticateOptional } from '../middleware/auth';

const router = Router();

router.get('/', authenticateOptional, getProblems);
router.get('/:slug', authenticateOptional, getProblemBySlug);
router.post('/:slug/run', authenticateOptional, runProblemCode);
router.post('/:slug/submit', authenticateOptional, submitProblemCode);

export default router;


