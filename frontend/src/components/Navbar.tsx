import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeBattleId, setActiveBattleId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="bg-dark-900 border-b border-zinc-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white">
                  CODE<span className="text-cyan-400">CLASH</span>
                </span>
                <span className="text-[10px] tracking-widest text-cyan-400 font-mono -mt-1 font-semibold uppercase">
                  1v1 DSA Arena
                </span>
              </div>
            </Link>

            {/* Active Rejoin Banner */}
            {showRejoinButton && (
              <Link
                to={`/battle/${activeBattleId}`}
                className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider py-1.5 px-4 rounded-lg transition-colors"
              >
                <span>⚔️</span> Rejoin Duel
              </Link>
            )}
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/problems" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/problems' 
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Problems List
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/find-match" 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                  location.pathname === '/find-match' 
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                Find Match
              </Link>
            )}
          </div>

          {/* User / Auth CTA Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500 text-black font-extrabold flex items-center justify-center text-xs">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white">
                      {user?.username}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono font-semibold">
                      ⚡ {user?.rating || 300} ELO
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-colors"
                >
                  Start Dueling
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center gap-2">
            {showRejoinButton && (
              <Link
                to={`/battle/${activeBattleId}`}
                className="bg-amber-500 text-black font-bold text-[11px] px-2.5 py-1 rounded-lg"
              >
                ⚔️ Rejoin
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-900 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/problems"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-200 hover:bg-zinc-800"
          >
            Problems List
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/find-match"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold text-cyan-400 bg-cyan-500/10"
              >
                Find Match ⚡
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-200 hover:bg-zinc-800"
              >
                Profile ({user?.username} - ELO {user?.rating})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-rose-400 hover:bg-rose-500/10"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-dark-800 text-white font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-cyan-500 text-black font-bold"
              >
                Register & Battle
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};


