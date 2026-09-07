import { Router } from 'express';
import { register, login, logout, me, getLeaderboard } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, me);
router.get('/leaderboard', getLeaderboard);

export default router;

