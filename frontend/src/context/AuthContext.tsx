import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '../api/auth';

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

  const fetchUser = async () => {
    try {
      const data = await apiFetch('/api/auth/me');
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setUser(data.user);
  };

  const register = async (credentials: any) => {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setUser(data.user);
  };

  const logout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
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
