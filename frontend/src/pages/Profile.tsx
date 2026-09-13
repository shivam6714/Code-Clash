import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';
import { fetchMatchHistory, MatchHistoryItem } from '../api/matches';
import { getRankData, RankBadge, ALL_RANKS } from '../utils/ranks';

// Clean SVG Icons
const Icons = {
  Swords: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Trophy: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Crown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Target: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeBattle, setActiveBattle] = useState<{ battleId: string; problemTitle?: string } | null>(null);
  const [matches, setMatches] = useState<MatchHistoryItem[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');

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

    fetchMatchHistory(7)
      .then((data) => setMatches(data))
      .catch((err) => console.error('Failed to load match history:', err))
      .finally(() => setLoadingMatches(false));

    return () => {
      socket.off('battle:active-status', handleActiveStatus);
    };
  }, []);

  if (!user) return null;

  const totalMatches = (user.wins || 0) + (user.losses || 0) + (user.draws || 0);
  const winRate = totalMatches > 0 ? Math.round(((user.wins || 0) / totalMatches) * 100) : 0;
  const rank = getRankData(user.rating || 300);

  const getDifficultyBadge = (diff?: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'medium':
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  const formatJoinedDate = (dateString?: string | Date) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatRelativeTime = (dateString?: string | Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const filteredMatches = useMemo(() => {
    if (filter === 'ALL') return matches;
    return matches.filter((m) => m.result === filter);
  }, [matches, filter]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07080c] relative text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 ambient-grid">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-0" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Active Battle In Progress Banner */}
        {activeBattle && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-dark-900 to-amber-950/20 p-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Icons.Swords />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <h3 className="text-base font-bold text-white tracking-tight">Active Duel in Progress</h3>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {activeBattle.problemTitle ? `Challenge: ${activeBattle.problemTitle}` : 'Your 1v1 match is waiting for you in the arena!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/battle/${activeBattle.battleId}`)}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Rejoin Battle →
              </button>
            </div>
          </div>
        )}

        {/* Player Profile Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* User Avatar with sleek glowing border */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 text-zinc-950 font-bold flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/25 border-2 border-white/20">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-900 flex items-center justify-center" title="Online">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Identity & Rank */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl font-bold text-white tracking-tight">{user.username}</h1>
                  <RankBadge rating={user.rating || 300} size="md" />
                </div>

                <p className="text-xs text-zinc-400 font-mono">{user.email}</p>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-zinc-500 font-medium pt-1">
                  <Icons.Calendar />
                  <span>Member since {formatJoinedDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Quick Matchmaking Trigger */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 w-full md:w-auto">
              <Link
                to="/find-match"
                className="w-full sm:w-auto md:w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icons.Swords />
                <span>Find Match</span>
              </Link>
              <Link
                to="/problems"
                className="w-full sm:w-auto md:w-full py-2.5 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white font-medium text-xs transition-colors border border-white/[0.05] text-center"
              >
                Practice Problems
              </Link>
            </div>

          </div>

          {/* Rank Progress Bar to Next Tier */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-medium mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Competitive Rating:</span>
                <span className="text-cyan-400 font-mono font-bold">⚡ {user.rating} ELO</span>
              </div>
              <div className="text-zinc-400 text-right">
                {rank.pointsToNext > 0 ? (
                  <span>
                    <strong className="text-zinc-200 font-mono">{rank.pointsToNext} ELO</strong> to {rank.nextTier}
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">Top Tier Achieved</span>
                )}
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-800/80 overflow-hidden p-0.5 border border-white/[0.04]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${Math.max(5, rank.progress)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Statistics Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Current Rating Card */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md p-5 transition-all hover:border-cyan-500/30 hover:bg-zinc-900/60 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">Current Rating</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icons.Zap />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              {user.rating}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{rank.title} Division</span>
            </div>
          </div>

          {/* Peak Rating Card */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md p-5 transition-all hover:border-amber-500/30 hover:bg-zinc-900/60 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">Peak Rating</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icons.Crown />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              {user.highestRating || user.rating}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
              <span>All-time high record</span>
            </div>
          </div>

          {/* Victories & Defeats Card */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md p-5 transition-all hover:border-emerald-500/30 hover:bg-zinc-900/60 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">Match Record</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icons.Shield />
              </div>
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{user.wins || 0}W</span>
              <span className="text-zinc-600 font-bold">-</span>
              <span className="text-2xl sm:text-3xl font-bold text-rose-400">{user.losses || 0}L</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
              <span>{totalMatches} duels settled</span>
            </div>
          </div>

          {/* Win Rate Efficiency Card */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md p-5 transition-all hover:border-blue-500/30 hover:bg-zinc-900/60 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">Win Rate</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icons.Target />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              {winRate}%
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>

        </div>

        {/* Match History Section */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/30 space-y-6">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Match History</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Showing your last 7 competitive 1v1 duels</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-white/[0.05] self-start sm:self-auto">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === 'ALL'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({matches.length})
              </button>
              <button
                onClick={() => setFilter('WIN')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === 'WIN'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-emerald-400'
                }`}
              >
                Victories
              </button>
              <button
                onClick={() => setFilter('LOSS')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === 'LOSS'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-zinc-400 hover:text-rose-400'
                }`}
              >
                Defeats
              </button>
            </div>
          </div>

          {/* Match List Content */}
          {loadingMatches ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">Retrieving match history...</p>
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="py-14 text-center space-y-4 bg-zinc-950/40 rounded-xl border border-dashed border-white/[0.06] p-8">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800/60 border border-white/[0.05] flex items-center justify-center text-zinc-400">
                <Icons.Swords />
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-sm font-semibold text-zinc-200">No Match Records Found</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {filter !== 'ALL'
                    ? `No duels matching "${filter.toLowerCase()}" in your last 7 matches.`
                    : 'Enter matchmaking to duel against another programmer in real time!'}
                </p>
              </div>
              <Link
                to="/find-match"
                className="inline-flex items-center gap-2 py-2 px-5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold text-xs transition-colors"
              >
                <span>Enter Arena Matchmaking →</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMatches.map((m) => {
                const isWin = m.result === 'WIN';
                const isLoss = m.result === 'LOSS';

                return (
                  <div
                    key={m.id}
                    className="group relative rounded-xl border border-white/[0.06] bg-zinc-950/60 hover:bg-zinc-900/80 p-4 transition-all duration-200 hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Left: Result pill & Challenge information */}
                    <div className="flex items-center gap-4">
                      
                      {/* Result Badge */}
                      <div
                        className={`w-24 py-2 px-2.5 rounded-xl text-center font-mono font-bold text-xs border shrink-0 flex items-center justify-center gap-1.5 ${
                          isWin
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : isLoss
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                            : 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isWin ? 'bg-emerald-400' : isLoss ? 'bg-rose-400' : 'bg-zinc-400'}`} />
                        <span>{isWin ? 'VICTORY' : isLoss ? 'DEFEAT' : 'DRAW'}</span>
                      </div>

                      {/* Problem details */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {m.problem.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                              m.problem.difficulty
                            )}`}
                          >
                            {m.problem.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                          <span>vs <strong className="text-zinc-200 font-semibold">{m.opponent.username}</strong></span>
                          <span className="text-zinc-600">•</span>
                          <RankBadge rating={m.opponent.rating} size="xs" showRating />
                          {m.durationSeconds && (
                            <>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1">
                                <Icons.Clock />
                                {formatDuration(m.durationSeconds)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Right: Rating change & Timestamp */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-white/[0.04]">
                      <div className="text-left sm:text-right font-mono">
                        <div
                          className={`text-sm font-extrabold ${
                            m.ratingChange > 0
                              ? 'text-emerald-400'
                              : m.ratingChange < 0
                              ? 'text-rose-400'
                              : 'text-zinc-400'
                          }`}
                        >
                          {m.ratingChange > 0 ? `+${m.ratingChange}` : m.ratingChange} ELO
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {m.reason || 'Settled'}
                        </div>
                      </div>

                      <div className="text-zinc-500 text-xs font-medium shrink-0 flex items-center gap-1">
                        <Icons.Clock />
                        <span>{formatRelativeTime(m.playedAt)}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* 10-Tier Rank Ladder & Badge System */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">Competitive Hierarchy</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">Arena Rank Divisions & Badges</h2>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              Your Current Division: <strong className="text-cyan-400">{rank.emoji} {rank.title}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {ALL_RANKS.map((tier) => {
              const isCurrentRank = rank.title === tier.title;
              const isSurpassed = (user.rating || 300) >= (tier.maxRating ? tier.maxRating + 1 : tier.minRating);

              return (
                <div
                  key={tier.title}
                  className={`rounded-xl p-4 border transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                    isCurrentRank
                      ? 'bg-zinc-800/90 border-cyan-400/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/30'
                      : isSurpassed
                      ? 'bg-zinc-900/40 border-white/[0.06] opacity-80 hover:opacity-100'
                      : 'bg-zinc-950/40 border-white/[0.04] opacity-50 hover:opacity-80'
                  }`}
                >
                  {isCurrentRank && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/40">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      Current
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl select-none">{tier.emoji}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{tier.title}</h4>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {tier.maxRating ? `${tier.minRating} – ${tier.maxRating}` : `${tier.minRating}+`} ELO
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04]">
                    <RankBadge title={tier.title} size="xs" className="w-full justify-center" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
