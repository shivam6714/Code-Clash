import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';
import { fetchLeaderboard, LeaderboardUser } from '../api/auth';

export const Landing: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Real Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  // Matchmaking State on Landing Page
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to battle?');
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch real signed in user rankings
  useEffect(() => {
    fetchLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error('Failed to fetch real leaderboard', err))
      .finally(() => setIsLoadingLeaderboard(false));
  }, []);

  // Matchmaking socket listeners
  useEffect(() => {
    const handleQueued = (data: { message?: string }) => {
      setIsSearching(true);
      setStatusMessage(data.message || 'Queued in matchmaking...');
      setError(null);
    };

    const handleSearching = () => {
      setIsSearching(true);
      setStatusMessage('Searching for an opponent...');
    };

    const handleFound = () => {
      setStatusMessage('Opponent found! Initializing arena...');
    };

    const handleCreated = (data: { battleId: string }) => {
      setIsSearching(false);
      navigate(`/battle/${data.battleId}`);
    };

    const handleIdle = () => {
      setIsSearching(false);
      setStatusMessage('Ready to battle?');
    };

    const handleError = (err: { message?: string }) => {
      setError(err.message || 'Matchmaking error occurred.');
      setIsSearching(false);
      setStatusMessage('Ready to battle?');
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

  // Searching Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);
    } else {
      setSearchTime(0);
    }
    return () => clearInterval(timer);
  }, [isSearching]);

  // Handle Direct Matchmaking Trigger
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
    <div className="min-h-screen bg-dark-950 text-gray-100 flex flex-col">
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Real Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900 border border-zinc-800 text-xs font-mono text-cyan-400 mb-8">
          <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
          <span>
            {isAuthenticated && user 
              ? `Logged in as ${user.username} (ELO ${user.rating || 300}) • Ready for Battle` 
              : '1v1 Real-Time Competitive Coding Arena'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mb-6 text-white uppercase">
          DOMINATE 1V1 REAL-TIME{' '}
          <span className="text-cyan-400">DSA DUELS</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Pair up with programmers in real-time 1v1 data structure & algorithm battles. Write code in C++, Python, Java, or JS. First to pass all test cases wins ELO.
        </p>

        {/* Hero CTA & Interactive Matchmaking Console */}
        <div className="w-full max-w-lg">
          {error && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-sm font-semibold flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-rose-400 hover:text-white font-bold ml-2">✕</button>
            </div>
          )}

          {isSearching ? (
            <div className="bg-dark-900 p-8 rounded-2xl border border-cyan-500/40 text-center relative">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">{statusMessage}</h3>
              <p className="text-xs text-cyan-400 font-mono mb-6">
                QUEUE TIME: {formatSearchTime(searchTime)}
              </p>
              <button
                onClick={handleCancelMatchmaking}
                className="w-full py-3 px-6 rounded-xl bg-dark-800 hover:bg-dark-700 border border-zinc-700 text-gray-300 font-bold text-sm transition-colors"
              >
                Cancel Search
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleStartMatchmaking}
                className="w-full sm:w-auto min-w-[220px] py-4 px-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-base transition-colors flex items-center justify-center gap-2"
              >
                <span>⚔️</span>
                <span>FIND MATCH NOW</span>
              </button>

              <Link
                to="/problems"
                className="w-full sm:w-auto min-w-[180px] py-4 px-8 rounded-xl bg-dark-900 hover:bg-dark-850 border border-zinc-800 text-gray-200 font-bold text-base transition-colors text-center"
              >
                Browse Problems
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Real Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">ARENA CAPABILITIES</h2>
          <p className="text-2xl sm:text-3xl font-black text-white">How CodeClash Works</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: '⚔️',
              title: '1v1 Matchmaking',
              desc: 'Pairs you with an opponent via real-time WebSockets for head-to-head coding duels.',
            },
            {
              icon: '⚡',
              title: 'Isolated Execution',
              desc: 'Submissions are compiled and judged against test cases for C++, Python, Java, and JS.',
            },
            {
              icon: '🏆',
              title: 'Ranked ELO System',
              desc: 'Victory earns ELO rating points. Climb up from Challenger to Grandmaster.',
            },
            {
              icon: '📡',
              title: 'Socket Live Status',
              desc: 'Instant updates on opponent connection, submission results, and match countdown.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-dark-900 p-6 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3 text-cyan-400">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Leaderboard Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-dark-900 p-6 sm:p-8 rounded-2xl border border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-1">REAL USER LADDER</h2>
              <h3 className="text-2xl font-black text-white">Ranked Registered Duelists</h3>
            </div>
            <Link
              to="/problems"
              className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-zinc-700 text-xs font-bold text-cyan-400 transition-colors"
            >
              Practice Problems →
            </Link>
          </div>

          {isLoadingLeaderboard ? (
            <div className="py-12 text-center text-cyan-400 font-mono text-sm flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading standings...</span>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-mono text-sm">
              No registered duelists yet. Be the first to join matchmaking!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-xs font-mono text-gray-400 uppercase">
                    <th className="pb-3 px-4">Rank</th>
                    <th className="pb-3 px-4">Duelist</th>
                    <th className="pb-3 px-4">Title</th>
                    <th className="pb-3 px-4">ELO Rating</th>
                    <th className="pb-3 px-4">Peak ELO</th>
                    <th className="pb-3 px-4">Record (W / L / D)</th>
                    <th className="pb-3 px-4">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm font-medium">
                  {leaderboard.map((player) => (
                    <tr key={player.id || player.rank} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">#{player.rank}</td>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-400 font-mono uppercase">
                          {player.name.charAt(0)}
                        </div>
                        {player.name}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-300">{player.title}</td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-cyan-400">⚡ {player.rating}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-300">👑 {player.highestRating}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-300">
                        <span className="text-emerald-400">{player.wins}W</span> / <span className="text-rose-400">{player.losses}L</span> / <span className="text-gray-400">{player.draws}D</span>
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
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 max-w-md w-full text-center space-y-6">
            <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
              ⚔️
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Account Required</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Sign in or register a CodeClash account to join ranked 1v1 matchmaking.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-dark-800 border border-zinc-700 text-gray-200 font-bold text-sm hover:bg-dark-700 transition-colors"
              >
                Create Account
              </Link>
            </div>

            <button
              onClick={() => setShowAuthModal(false)}
              className="text-xs text-gray-500 hover:text-gray-300 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-zinc-800 bg-dark-950 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>CODECLASH © 2026 • 1v1 DSA Battle Platform</div>
          <div>
            <span id="socket-status" className="text-emerald-400">● Socket Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


