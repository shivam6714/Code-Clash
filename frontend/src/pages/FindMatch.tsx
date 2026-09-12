import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';

const FindMatch: React.FC = () => {
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to enter ranked matchmaking');
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('matchmaking:queued', (data) => {
      setIsSearching(true);
      setStatusMessage(data.message || 'Queued in ranked pool...');
      setError(null);
    });

    socket.on('matchmaking:searching', () => {
      setIsSearching(true);
      setStatusMessage('Searching for an evenly matched opponent...');
    });

    socket.on('matchmaking:found', () => {
      setStatusMessage('Opponent matched! Initializing battle arena...');
    });

    socket.on('battle:created', (data) => {
      setIsSearching(false);
      navigate(`/battle/${data.battleId}`);
    });

    socket.on('matchmaking:idle', () => {
      setIsSearching(false);
      setStatusMessage('Ready to enter ranked matchmaking');
    });

    socket.on('error', (err) => {
      setError(err.message || 'An error occurred during matchmaking');
      setIsSearching(false);
      setStatusMessage('Ready to enter ranked matchmaking');
    });

    return () => {
      socket.off('matchmaking:queued');
      socket.off('matchmaking:searching');
      socket.off('matchmaking:found');
      socket.off('battle:created');
      socket.off('matchmaking:idle');
      socket.off('error');
    };
  }, [navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      interval = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);
    } else {
      setSearchTime(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  const handleJoin = () => {
    setError(null);
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit('matchmaking:join');
  };

  const handleCancel = () => {
    socket.emit('matchmaking:leave');
    setIsSearching(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-[#07080c] relative ambient-grid">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/50 text-center relative z-10 space-y-6">
        
        {/* User Card Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/[0.08] shadow-inner">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-zinc-950 text-xs flex items-center justify-center">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="text-xs font-semibold text-white">{user?.username}</span>
          <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            ⚡ {user?.rating || 300} ELO
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">1v1 Ranked Matchmaking</h1>
          <p className="text-xs text-zinc-400 font-medium">{statusMessage}</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold text-rose-400 hover:text-white ml-2">✕</button>
          </div>
        )}

        {isSearching ? (
          <div className="space-y-6 py-4">
            {/* Radar Pulsing Animation */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-75" />
              <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-400 border-t-transparent animate-spin flex items-center justify-center" />
              <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            </div>

            <div className="space-y-1">
              <div className="text-lg font-bold font-mono text-cyan-400 tracking-wider">
                {formatTimer(searchTime)}
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">Queueing in competitive rating pool</p>
            </div>

            <button
              onClick={handleCancel}
              className="w-full py-3 px-6 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white font-semibold text-xs border border-white/[0.08] transition-all"
            >
              Cancel Matchmaking
            </button>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            <button
              onClick={handleJoin}
              className="w-full py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-zinc-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Find Opponent Now</span>
            </button>

            {/* Duel Meta details */}
            <div className="grid grid-cols-2 gap-3 text-xs text-left">
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/[0.05]">
                <span className="text-zinc-500 block text-[11px] mb-0.5">Arena Format</span>
                <span className="text-zinc-200 font-semibold">1v1 Live DSA Duel</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/[0.05]">
                <span className="text-zinc-500 block text-[11px] mb-0.5">Supported Runtimes</span>
                <span className="text-cyan-400 font-mono text-[11px] font-semibold">C++, Py, Java, JS</span>
              </div>
            </div>

            <Link
              to="/problems"
              className="inline-block text-xs text-zinc-500 hover:text-cyan-400 transition-colors pt-2"
            >
              Prefer solo practice? Browse problems list →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMatch;
