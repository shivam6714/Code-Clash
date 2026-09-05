import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/env';

// Helper to set cookie
const setTokenCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Use 'lax' for local development cross-origin with credentials if on same domain, or 'strict'. If frontend is on 5173 and backend on 3000, we might need lax or none. Actually lax works if it's localhost.
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Check existing
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      passwordHash,
    });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: '7d',
    });

    setTokenCookie(res, token);

    const userProfile = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      rating: newUser.rating,
      highestRating: newUser.highestRating,
      wins: newUser.wins,
      losses: newUser.losses,
      draws: newUser.draws,
    };

    res.status(201).json({ user: userProfile });
  } catch (error) {
    console.error('Register error:', error);
    if ((error as any).code === 11000) {
      const field = Object.keys((error as any).keyPattern)[0];
      return res.status(409).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already in use` });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d',
    });

    setTokenCookie(res, token);

    const userProfile = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      rating: user.rating,
      highestRating: user.highestRating,
      wins: user.wins,
      losses: user.losses,
      draws: user.draws,
    };

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const me = (req: Request, res: Response) => {
  // req.user is set by auth middleware
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  const user = req.user;
  const userProfile = {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    rating: user.rating,
    highestRating: user.highestRating,
    wins: user.wins,
    losses: user.losses,
    draws: user.draws,
    createdAt: user.createdAt,
  };

  res.status(200).json({ user: userProfile });
};
