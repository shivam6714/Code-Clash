// API URL configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Token storage helpers for seamless cross-domain session persistence
export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('token') || localStorage.getItem('auth_token');
  } catch {
    return null;
  }
};

export const setStoredToken = (token: string | null) => {
  try {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
    }
  } catch {
    // Ignore localStorage quota / private browsing errors
  }
};

// Helper for making API calls with credentials
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
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

  const data = await response.json();
  // Automatically persist renewed/refreshed tokens from backend responses
  if (data && data.token) {
    setStoredToken(data.token);
  }

  return data;
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

