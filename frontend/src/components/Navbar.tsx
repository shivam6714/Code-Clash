import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeBattleId, setActiveBattleId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveBattleId(null);
      return;
    }

    const checkActiveBattle = () => {
      socket.emit('battle:get-active');
    };

    const handleActiveStatus = (data: { hasActiveBattle: boolean; battleId?: string }) => {
      if (data.hasActiveBattle && data.battleId) {
        setActiveBattleId(data.battleId);
      } else {
        setActiveBattleId(null);
      }
    };

    const handleBattleEnded = () => {
      setActiveBattleId(null);
    };

    const handleBattleCreated = (data: { battleId: string }) => {
      setActiveBattleId(data.battleId);
    };

    socket.on('battle:active-status', handleActiveStatus);
    socket.on('battle:ended', handleBattleEnded);
    socket.on('battle:opponent-left', handleBattleEnded);
    socket.on('battle:rejoin-failed', handleBattleEnded);
    socket.on('battle:created', handleBattleCreated);

    if (socket.connected) {
      checkActiveBattle();
    } else {
      socket.once('connect', checkActiveBattle);
    }

    return () => {
      socket.off('connect', checkActiveBattle);
      socket.off('battle:active-status', handleActiveStatus);
      socket.off('battle:ended', handleBattleEnded);
      socket.off('battle:opponent-left', handleBattleEnded);
      socket.off('battle:rejoin-failed', handleBattleEnded);
      socket.off('battle:created', handleBattleCreated);
    };
  }, [isAuthenticated, location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const showRejoinButton = activeBattleId && !location.pathname.startsWith('/battle/');

  return (
    <nav className="bg-dark-800 border-b border-dark-700 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
            CodeClash
          </Link>
          {showRejoinButton && (
            <Link
              to={`/battle/${activeBattleId}`}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-2 animate-pulse transition-all text-sm shadow-md shadow-amber-500/20"
            >
              <span>⚔️</span> Rejoin Battle
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/problems" className="text-gray-300 hover:text-white font-medium transition-colors">Problems</Link>
          {isLoading ? (
            <div className="text-gray-400">...</div>
          ) : isAuthenticated ? (
            <>
              <Link to="/find-match" className="text-gray-300 hover:text-white transition-colors">Find Match</Link>
              <span className="text-gray-300">Welcome, <span className="font-semibold text-white">{user?.username}</span></span>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-primary-600 hover:bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg shadow shadow-primary-500/20 transition-all">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
