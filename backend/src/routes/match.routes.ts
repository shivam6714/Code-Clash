import { Router } from 'express';
import { getMatchHistory } from '../controllers/match.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/history', authenticate, getMatchHistory);

export default router;
