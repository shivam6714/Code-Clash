import { Router } from 'express';
import { getProblems, getProblemBySlug } from '../controllers/problem.controller';

const router = Router();

router.get('/', getProblems);
router.get('/:slug', getProblemBySlug);

export default router;
