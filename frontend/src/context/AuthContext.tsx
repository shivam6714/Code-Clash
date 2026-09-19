import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch, setStoredToken, getStoredToken } from '../api/auth';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  rating: number;
  highestRating: number;
  wins: number;
  losses: number;
  draws: number;
  solvedProblems?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  register: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updater: Partial<User> | ((prev: User | null) => Partial<User>)) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (retryCount = 0) => {
    try {
      const data = await apiFetch('/api/auth/me');
      if (data?.token) {
        setStoredToken(data.token);
      }
      setUser(data.user);
    } catch (error: any) {
      // If server cold-booting / network error and we have a token, retry once after 2 seconds
      const isNetworkError = error?.message?.toLowerCase().includes('failed to fetch') ||
                             error?.message?.toLowerCase().includes('network') ||
                             error?.message?.toLowerCase().includes('timeout');
      if (isNetworkError && retryCount < 2 && getStoredToken()) {
        setTimeout(() => fetchUser(retryCount + 1), 2000);
        return;
      }

      // If explicitly unauthorized or user not found, clear auth state
      if (error?.message?.includes('Authentication') || 
          error?.message?.includes('token') || 
          error?.message?.includes('not authenticated') ||
          error?.message?.includes('User not found')) {
        setStoredToken(null);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    // Periodically refresh the token every 12 hours while active so it never expires
    const REFRESH_INTERVAL = 12 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      if (getStoredToken()) {
        apiFetch('/api/auth/me').then(data => {
          if (data?.user) setUser(data.user);
        }).catch(() => {});
      }
    }, REFRESH_INTERVAL);

    // Also refresh on window focus if tab was left backgrounded for long
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && getStoredToken()) {
        apiFetch('/api/auth/me').then(data => {
          if (data?.user) setUser(data.user);
        }).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const login = async (emailOrCredentials: any, maybePassword?: string) => {
    const body = typeof emailOrCredentials === 'string'
      ? { email: emailOrCredentials, password: maybePassword }
      : emailOrCredentials;
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (data.token) {
      setStoredToken(data.token);
    }
    setUser(data.user);
  };

  const register = async (credentials: any) => {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      setStoredToken(data.token);
    }
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      setStoredToken(null);
      setUser(null);
    }
  };

  const updateUser = (updater: Partial<User> | ((prev: User | null) => Partial<User>)) => {
    setUser(prev => {
      if (!prev) return null;
      const partial = typeof updater === 'function' ? updater(prev) : updater;
      const newRating = partial.rating !== undefined ? partial.rating : prev.rating;
      return {
        ...prev,
        ...partial,
        highestRating: Math.max(prev.highestRating || 300, newRating),
      };
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
