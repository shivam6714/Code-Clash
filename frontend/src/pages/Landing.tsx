import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';
import { fetchLeaderboard, LeaderboardUser } from '../api/auth';

const Icons = {
  Swords: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Trophy: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Code: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

export const Landing: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to enter ranked matchmaking');
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    fetchLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error('Failed to fetch real leaderboard', err))
      .finally(() => setIsLoadingLeaderboard(false));
  }, []);

  useEffect(() => {
    const handleQueued = (data: { message?: string }) => {
      setIsSearching(true);
      setStatusMessage(data.message || 'Queued in ranked pool...');
      setError(null);
    };

    const handleSearching = () => {
      setIsSearching(true);
      setStatusMessage('Searching for an opponent...');
    };

    const handleFound = () => {
      setStatusMessage('Opponent matched! Initializing arena...');
    };

    const handleCreated = (data: { battleId: string }) => {
      setIsSearching(false);
      navigate(`/battle/${data.battleId}`);
    };

    const handleIdle = () => {
      setIsSearching(false);
      setStatusMessage('Ready to enter ranked matchmaking');
    };

    const handleError = (err: { message?: string }) => {
      setError(err.message || 'Matchmaking error occurred.');
      setIsSearching(false);
      setStatusMessage('Ready to enter ranked matchmaking');
    };

    socket.on('matchmaking:queued', handleQueued);
    socket.on('matchmaking:searching', handleSearching);
    socket.on('matchmaking:found', handleFound);
    socket.on('battle:created', handleCreated);
    socket.on('matchmaking:idle', handleIdle);
    socket.on('error', handleError);

    return () => {
      socket.off('matchmaking:queued', handleQueued);
      socket.off('matchmaking:searching', handleSearching);
      socket.off('matchmaking:found', handleFound);
      socket.off('battle:created', handleCreated);
      socket.off('matchmaking:idle', handleIdle);
      socket.off('error', handleError);
    };
  }, [navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);
    } else {
      setSearchTime(0);
    }
    return () => clearInterval(timer);
  }, [isSearching]);

  const handleStartMatchmaking = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setError(null);
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit('matchmaking:join');
  };

  const handleCancelMatchmaking = () => {
    socket.emit('matchmaking:leave');
    setIsSearching(false);
  };

  const formatSearchTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 flex flex-col relative ambient-grid">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent pointer-events-none blur-3xl -z-0" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center flex flex-col items-center relative z-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs text-zinc-300 mb-8 backdrop-blur-md shadow-inner">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {isAuthenticated && user 
              ? `Logged in as ${user.username} (⚡ ${user.rating || 300} ELO)` 
              : 'Competitive 1v1 Data Structures & Algorithms Battles'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mb-6 text-white">
          Real-time 1v1 coding duels for competitive programmers.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          Match against fellow engineers in head-to-head algorithm battles. Write optimal solutions in C++, Python, Java, or JavaScript, submit against test cases, and climb the global leaderboard.
        </p>

        {/* Hero CTA & Interactive Matchmaking Console */}
        <div className="w-full max-w-md">
          {error && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs font-semibold flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-rose-400 hover:text-white font-bold ml-2">✕</button>
            </div>
          )}

          {isSearching ? (
            <div className="rounded-2xl border border-cyan-500/40 bg-zinc-900/80 backdrop-blur-xl p-8 text-center relative shadow-2xl shadow-cyan-500/10">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-4" />
              <h3 className="text-base font-bold text-white mb-1">{statusMessage}</h3>
              <p className="text-xs text-cyan-400 font-mono mb-6">
                Queue Time: {formatSearchTime(searchTime)}
              </p>
              <button
                onClick={handleCancelMatchmaking}
                className="w-full py-2.5 px-6 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/[0.08] text-zinc-300 font-semibold text-xs transition-colors"
              >
                Cancel Search
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <button
                onClick={handleStartMatchmaking}
                className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-zinc-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icons.Swords />
                <span>Find Match</span>
              </button>

              <Link
                to="/problems"
                className="w-full sm:w-auto min-w-[170px] py-3.5 px-6 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 border border-white/[0.08] text-zinc-300 hover:text-white font-semibold text-sm transition-all text-center"
              >
                Browse Problems
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">Platform Features</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Built for Fast-Paced DSA Dueling</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Icons.Swords />,
              title: 'Live 1v1 Matchmaking',
              desc: 'Seamless WebSocket matchmaking matches you with opponents of comparable ELO rating.',
            },
            {
              icon: <Icons.Code />,
              title: 'Multi-Language Runner',
              desc: 'Execute and test your code securely against hidden test cases in C++, Python, Java, or JavaScript.',
            },
            {
              icon: <Icons.Trophy />,
              title: 'Competitive ELO Tier',
              desc: 'Earn rating points with every victory. Progress from Initiate to Immortal & Overlord.',
            },
            {
              icon: <Icons.Zap />,
              title: 'Real-Time State Sync',
              desc: 'Instant opponent status indicators, sub-second test execution, and live countdown timers.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md p-6 hover:bg-zinc-900/60 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">Competitive Standings</span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Arena Leaderboard</h3>
            </div>
            <Link
              to="/problems"
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/[0.06] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              Practice Problems →
            </Link>
          </div>

          {isLoadingLeaderboard ? (
            <div className="py-12 text-center text-zinc-400 text-xs flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>Loading standings...</span>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No registered duelists yet. Be the first to join matchmaking!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-950/40">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Duelist</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Peak ELO</th>
                    <th className="py-3 px-4">Record (W / L)</th>
                    <th className="py-3 px-4">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs font-medium">
                  {leaderboard.map((player) => (
                    <tr key={player.id || player.rank} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">#{player.rank}</td>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-zinc-950 font-bold flex items-center justify-center text-[10px] uppercase">
                          {player.name.charAt(0)}
                        </div>
                        <span>{player.name}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-zinc-300">{player.title}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">⚡ {player.rating}</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400">{player.highestRating}</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">
                        <span className="text-emerald-400">{player.wins}W</span> / <span className="text-rose-400">{player.losses}L</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400">{player.winRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/[0.08] p-6 sm:p-8 rounded-2xl max-w-sm w-full text-center space-y-5 shadow-2xl shadow-black/80">
            <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Icons.Swords />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Account Required</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sign in or create a CodeClash account to join ranked 1v1 matchmaking.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/[0.08] text-zinc-200 font-semibold text-xs transition-colors"
              >
                Create Account
              </Link>
            </div>

            <button
              onClick={() => setShowAuthModal(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-white/[0.06] bg-zinc-950/60 text-xs text-zinc-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>CodeClash • 1v1 Real-Time DSA Battles</div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Server Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
