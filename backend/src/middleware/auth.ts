import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/env';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const extractToken = (req: Request): string | null => {
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
    return req.headers.authorization;
  }
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authenticateOptional = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore invalid/expired token for optional authentication
  }
  next();
};

