import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const totalMatches = (user.wins || 0) + (user.losses || 0) + (user.draws || 0);
  const winRate = totalMatches > 0 ? Math.round(((user.wins || 0) / totalMatches) * 100) : 0;

  const getRankTitle = (rating: number) => {
    if (rating >= 2200) return { title: '👑 Grandmaster', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    if (rating >= 1800) return { title: '💎 Master', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' };
    if (rating >= 1500) return { title: '⚔️ Diamond', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
    if (rating >= 1300) return { title: '🛡️ Platinum', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { title: '🗡️ Challenger', color: 'text-gray-300 border-gray-600 bg-gray-800' };
  };

  const rank = getRankTitle(user.rating || 1200);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Active Battle Alert Banner */}
        {activeBattle && (
          <div className="bg-dark-900 p-6 rounded-2xl border border-amber-500/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                  ⚔️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Active Battle In Progress</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    {activeBattle.problemTitle ? `Challenge: ${activeBattle.problemTitle}` : 'Your duel is still live in the arena!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/battle/${activeBattle.battleId}`)}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase transition-colors"
              >
                Return to Arena →
              </button>
            </div>
          </div>
        )}

        {/* Player Profile Card */}
        <div className="bg-dark-900 p-8 rounded-2xl border border-zinc-800">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-2xl bg-cyan-500 text-black font-black flex items-center justify-center text-3xl font-mono">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* User Meta */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-2xl font-black text-white">{user.username}</h1>
                <span className={`self-center sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-bold border ${rank.color}`}>
                  {rank.title}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">{user.email}</p>
              <p className="text-xs text-gray-500 font-mono">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Quick Matchmaking Trigger */}
            <div className="w-full md:w-auto">
              <Link
                to="/find-match"
                className="w-full py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>⚔️</span>
                <span>Enter Matchmaking</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Statistics Grid */}
        <div className="bg-dark-900 p-8 rounded-2xl border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-lg font-bold text-white">ARENA PERFORMANCE STATS</h2>
            <span className="text-xs font-mono text-cyan-400 font-bold">TOTAL DUELS: {totalMatches}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-950 p-5 rounded-xl border border-zinc-800 text-center">
              <span className="text-xs text-gray-400 font-mono block mb-1">Current Rating</span>
              <span className="text-2xl font-mono font-black text-cyan-400">⚡ {user.rating}</span>
            </div>

            <div className="bg-dark-950 p-5 rounded-xl border border-zinc-800 text-center">
              <span className="text-xs text-gray-400 font-mono block mb-1">Peak Rating</span>
              <span className="text-2xl font-mono font-black text-gray-200">👑 {user.highestRating || user.rating}</span>
            </div>

            <div className="bg-dark-950 p-5 rounded-xl border border-zinc-800 text-center">
              <span className="text-xs text-gray-400 font-mono block mb-1">Victories</span>
              <span className="text-2xl font-mono font-black text-emerald-400">{user.wins || 0}</span>
            </div>

            <div className="bg-dark-950 p-5 rounded-xl border border-zinc-800 text-center">
              <span className="text-xs text-gray-400 font-mono block mb-1">Defeats</span>
              <span className="text-2xl font-mono font-black text-rose-400">{user.losses || 0}</span>
            </div>
          </div>

          {/* Win Rate Bar */}
          <div className="bg-dark-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">WIN RATE EFFICIENCY</span>
              <span className="text-emerald-400 font-bold">{winRate}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;


