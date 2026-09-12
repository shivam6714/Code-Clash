import { apiFetch } from './auth';

export interface MatchHistoryItem {
  id: string;
  battleId: string;
  problem: {
    title: string;
    difficulty: string;
    slug?: string;
  };
  opponent: {
    id: string;
    username: string;
    rating: number;
  };
  result: 'WIN' | 'LOSS' | 'DRAW';
  ratingBefore: number;
  ratingAfter: number;
  ratingChange: number;
  reason: string;
  durationSeconds: number | null;
  playedAt: string;
}

export const fetchMatchHistory = async (limit: number = 7): Promise<MatchHistoryItem[]> => {
  const data = await apiFetch(`/api/matches/history?limit=${limit}`);
  return data.matches || [];
};
