import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Match } from '../models/Match';

export const getMatchHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const currentUserId = req.user._id.toString();
    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 7, 1), 50);

    const userObjectId = new mongoose.Types.ObjectId(currentUserId);

    const matches = await Match.find({
      $or: [
        { 'player1.userId': userObjectId },
        { 'player2.userId': userObjectId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const formattedMatches = matches.map((match) => {
      const isPlayer1 = match.player1.userId.toString() === currentUserId;
      const myData = isPlayer1 ? match.player1 : match.player2;
      const opponentData = isPlayer1 ? match.player2 : match.player1;

      let durationSeconds: number | null = null;
      if (match.startedAt && match.endedAt) {
        durationSeconds = Math.max(0, Math.round((new Date(match.endedAt).getTime() - new Date(match.startedAt).getTime()) / 1000));
      }

      return {
        id: match._id,
        battleId: match.battleId,
        problem: {
          title: match.problem.title,
          difficulty: match.problem.difficulty,
          slug: match.problem.slug,
        },
        opponent: {
          id: opponentData.userId,
          username: opponentData.username,
          rating: opponentData.ratingAfter,
        },
        result: myData.result,
        ratingBefore: myData.ratingBefore,
        ratingAfter: myData.ratingAfter,
        ratingChange: myData.ratingChange,
        reason: match.reason,
        durationSeconds,
        playedAt: match.createdAt || match.endedAt,
      };
    });

    res.status(200).json({ matches: formattedMatches });
  } catch (error) {
    console.error('Failed to get match history:', error);
    res.status(500).json({ message: 'Failed to retrieve match history' });
  }
};
