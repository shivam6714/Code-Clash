import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';

const FindMatch: React.FC = () => {
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to queue for Ranked 1v1');
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
      setStatusMessage('Scanning arena for opponents...');
    });

    socket.on('matchmaking:found', () => {
      setStatusMessage('Opponent locked! Preparing battle arena...');
    });

    socket.on('battle:created', (data) => {
      setIsSearching(false);
      navigate(`/battle/${data.battleId}`);
    });

    socket.on('matchmaking:idle', () => {
      setIsSearching(false);
      setStatusMessage('Ready to queue for Ranked 1v1');
    });

    socket.on('error', (err) => {
      setError(err.message || 'An error occurred during matchmaking');
      setIsSearching(false);
      setStatusMessage('Ready to queue for Ranked 1v1');
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
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-dark-950">
      <div className="w-full max-w-lg bg-dark-900 rounded-2xl p-8 border border-zinc-800 text-center">
        
        {/* User Card Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-dark-850 border border-zinc-800 mb-6">
          <div className="w-6 h-6 rounded-full bg-cyan-500 font-bold text-black text-xs flex items-center justify-center">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-bold text-white">{user?.username}</span>
          <span className="text-xs font-mono font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            ⚡ {user?.rating || 300} ELO
          </span>
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight mb-2 uppercase">1v1 RANKED MATCHMAKING</h1>
        <p className="text-xs text-gray-400 mb-8">{statusMessage}</p>

        {error && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-sm font-semibold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold text-rose-400 hover:text-white ml-2">✕</button>
          </div>
        )}

        {isSearching ? (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-cyan-400 font-mono">
              SEARCHING TIME: {formatTimer(searchTime)}
            </p>

            <button
              onClick={handleCancel}
              className="w-full py-3.5 px-6 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-200 font-bold text-sm border border-zinc-700 transition-colors"
            >
              Cancel Matchmaking
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleJoin}
              className="w-full py-4 px-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>⚔️</span>
              <span>FIND MATCH NOW</span>
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs text-left">
              <div className="bg-dark-850 p-3.5 rounded-xl border border-zinc-800">
                <span className="text-gray-400 block mb-1">Queue Mode</span>
                <span className="text-white font-bold">1v1 Competitive</span>
              </div>
              <div className="bg-dark-850 p-3.5 rounded-xl border border-zinc-800">
                <span className="text-gray-400 block mb-1">Allowed Languages</span>
                <span className="text-cyan-400 font-bold">C++, Py, Java, JS</span>
              </div>
            </div>

            <Link
              to="/problems"
              className="inline-block text-xs text-gray-400 hover:text-cyan-400 font-semibold underline underline-offset-4 transition-colors"
            >
              Or practice solo on the Problems List →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMatch;


