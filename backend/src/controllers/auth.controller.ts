import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/env';

// Helper to set cookie
const setTokenCookie = (res: Response, token: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax', // 'none' is required for cross-site cookies between Vercel and Render
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
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

    // Generate token (30 days validity)
    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: '30d',
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
      solvedProblems: newUser.solvedProblems || [],
      createdAt: newUser.createdAt,
    };

    res.status(201).json({ user: userProfile, token });
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

    // Generate token (30 days validity)
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '30d',
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
      solvedProblems: user.solvedProblems || [],
      createdAt: user.createdAt,
    };

    res.status(200).json({ user: userProfile, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const me = (req: Request, res: Response) => {
  // req.user is set by auth middleware
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  const user = req.user;

  // Issue rolling refreshed token on every /me check so active users never expire
  const refreshedToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
  setTokenCookie(res, refreshedToken);

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
    solvedProblems: user.solvedProblems || [],
    createdAt: user.createdAt,
  };

  res.status(200).json({ user: userProfile, token: refreshedToken });
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await User.find({})
      .select('username rating highestRating wins losses draws createdAt')
      .sort({ rating: -1 })
      .limit(20)
      .lean();

    const formatted = leaderboard.map((user, index) => {
      const total = (user.wins || 0) + (user.losses || 0) + (user.draws || 0);
      const winRate = total > 0 ? `${Math.round(((user.wins || 0) / total) * 100)}%` : '0%';
      
      let title = 'Exile';
      if (user.rating >= 2000) title = 'Overlord';
      else if (user.rating >= 1750) title = 'Immortal';
      else if (user.rating >= 1500) title = 'Ascendant';
      else if (user.rating >= 1300) title = 'Warlord';
      else if (user.rating >= 1100) title = 'Centurion';
      else if (user.rating >= 900) title = 'Gladiator';
      else if (user.rating >= 700) title = 'Stalker';
      else if (user.rating >= 500) title = 'Vanguard';
      else if (user.rating >= 300) title = 'Initiate';

      return {
        rank: index + 1,
        id: user._id,
        name: user.username,
        rating: user.rating,
        highestRating: user.highestRating || user.rating,
        wins: user.wins || 0,
        losses: user.losses || 0,
        draws: user.draws || 0,
        winRate,
        title,
      };
    });

    res.status(200).json({ leaderboard: formatted });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};

