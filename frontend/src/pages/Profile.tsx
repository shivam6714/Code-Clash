import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeBattle, setActiveBattle] = useState<{ battleId: string; problemTitle?: string } | null>(null);

  useEffect(() => {
    const handleActiveStatus = (data: { hasActiveBattle: boolean; battleId?: string; problemTitle?: string }) => {
      if (data.hasActiveBattle && data.battleId) {
        setActiveBattle({ battleId: data.battleId, problemTitle: data.problemTitle });
      } else {
        setActiveBattle(null);
      }
    };

    socket.on('battle:active-status', handleActiveStatus);

    if (socket.connected) {
      socket.emit('battle:get-active');
    } else {
      const onConnect = () => socket.emit('battle:get-active');
      socket.once('connect', onConnect);
    }

    return () => {
      socket.off('battle:active-status', handleActiveStatus);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {activeBattle && (
          <div className="bg-dark-800 shadow rounded-lg p-6 border border-primary-500/50 bg-gradient-to-r from-dark-800 via-dark-800 to-primary-950/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚔️</span>
                  <h2 className="text-xl font-bold text-white">Active Battle</h2>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  You have an ongoing battle{activeBattle.problemTitle ? `: ${activeBattle.problemTitle}` : ''}
                </p>
              </div>
              <button
                onClick={() => navigate(`/battle/${activeBattle.battleId}`)}
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary-500/20 transition-all transform hover:-translate-y-0.5 shrink-0"
              >
                Return to Battle
              </button>
            </div>
          </div>
        )}

        <div className="bg-dark-800 shadow rounded-lg p-6 border border-dark-700 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="h-24 w-24 bg-dark-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border-2 border-primary-500">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-3xl font-bold text-white">{user.username}</h1>
              <span className="self-center sm:self-auto px-3 py-1 bg-primary-600/20 border border-primary-500/40 text-primary-400 font-extrabold text-sm rounded-full tracking-wide">
                ELO {user.rating}
              </span>
            </div>
            <p className="text-gray-400 mt-1">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-dark-800 shadow rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-dark-700 pb-2">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Rating</p>
              <p className="text-2xl font-bold text-primary-400 mt-1">{user.rating}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Highest Rating</p>
              <p className="text-2xl font-bold text-purple-400 mt-1">{user.highestRating}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Wins</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{user.wins}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Losses</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{user.losses}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center col-span-2 md:col-span-4">
              <p className="text-gray-400 text-sm">Draws</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">{user.draws}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
