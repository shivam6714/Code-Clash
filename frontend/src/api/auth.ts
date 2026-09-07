// API URL configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper for making API calls with credentials
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Important for sending/receiving cookies
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
};

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  rating: number;
  highestRating: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: string;
  title: string;
}

export const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => {
  const data = await apiFetch('/api/auth/leaderboard');
  return data.leaderboard || [];
};

