import React from 'react';

export interface RankTier {
  title: string;
  emoji: string;
  minRating: number;
  maxRating?: number;
  color: string;
  badgeBg: string;
  borderColor: string;
  glow: string;
  description: string;
}

export const ALL_RANKS: RankTier[] = [
  {
    title: 'Overlord',
    emoji: '👑',
    minRating: 2000,
    color: 'text-rose-400',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/20',
    borderColor: 'border-rose-500/30',
    glow: 'from-rose-500/20 via-transparent to-transparent',
    description: 'Supreme grandmaster at the pinnacle of the arena',
  },
  {
    title: 'Immortal',
    emoji: '⚡',
    minRating: 1750,
    maxRating: 1999,
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20',
    borderColor: 'border-amber-500/30',
    glow: 'from-amber-500/20 via-transparent to-transparent',
    description: 'Unstoppable champion with near-flawless execution',
  },
  {
    title: 'Ascendant',
    emoji: '🔮',
    minRating: 1500,
    maxRating: 1749,
    color: 'text-purple-400',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    borderColor: 'border-purple-500/30',
    glow: 'from-purple-500/20 via-transparent to-transparent',
    description: 'Transcended elite duelist solving problems at high speed',
  },
  {
    title: 'Warlord',
    emoji: '🔥',
    minRating: 1300,
    maxRating: 1499,
    color: 'text-orange-400',
    badgeBg: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    borderColor: 'border-orange-500/30',
    glow: 'from-orange-500/20 via-transparent to-transparent',
    description: 'Fierce battle strategist dominating standard duels',
  },
  {
    title: 'Centurion',
    emoji: '🎖️',
    minRating: 1100,
    maxRating: 1299,
    color: 'text-blue-400',
    badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    borderColor: 'border-blue-500/30',
    glow: 'from-blue-500/20 via-transparent to-transparent',
    description: 'Tactical veteran with strong algorithmic discipline',
  },
  {
    title: 'Gladiator',
    emoji: '⚔️',
    minRating: 900,
    maxRating: 1099,
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    borderColor: 'border-cyan-500/30',
    glow: 'from-cyan-500/20 via-transparent to-transparent',
    description: 'Hardened arena fighter with solid problem-solving skills',
  },
  {
    title: 'Stalker',
    emoji: '🏹',
    minRating: 700,
    maxRating: 899,
    color: 'text-teal-400',
    badgeBg: 'bg-teal-500/15 text-teal-300 border-teal-500/40',
    borderColor: 'border-teal-500/30',
    glow: 'from-teal-500/20 via-transparent to-transparent',
    description: 'Precise coder hunting down optimal test cases',
  },
  {
    title: 'Vanguard',
    emoji: '🛡️',
    minRating: 500,
    maxRating: 699,
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    borderColor: 'border-emerald-500/30',
    glow: 'from-emerald-500/20 via-transparent to-transparent',
    description: 'Frontline contender climbing up the ranks',
  },
  {
    title: 'Initiate',
    emoji: '🔰',
    minRating: 300,
    maxRating: 499,
    color: 'text-zinc-300',
    badgeBg: 'bg-zinc-800/80 text-zinc-200 border-zinc-600/40',
    borderColor: 'border-zinc-500/30',
    glow: 'from-zinc-500/15 via-transparent to-transparent',
    description: 'The starting baseline for all aspiring duelists',
  },
  {
    title: 'Exile',
    emoji: '⛓️',
    minRating: 0,
    maxRating: 299,
    color: 'text-zinc-500',
    badgeBg: 'bg-zinc-900/90 text-zinc-400 border-zinc-700/50',
    borderColor: 'border-zinc-700/40',
    glow: 'from-zinc-800/10 via-transparent to-transparent',
    description: 'Unranked — fallen below the initiation threshold',
  },
];

export interface RankData extends RankTier {
  nextTier: string;
  progress: number;
  pointsToNext: number;
}

export const getRankData = (rating: number = 300): RankData => {
  const currentRating = Math.max(0, rating);

  if (currentRating >= 2000) {
    const tier = ALL_RANKS[0];
    return {
      ...tier,
      nextTier: 'Max Rank',
      progress: 100,
      pointsToNext: 0,
    };
  }

  if (currentRating >= 1750) {
    const tier = ALL_RANKS[1];
    return {
      ...tier,
      nextTier: 'Overlord (2000)',
      progress: Math.min(100, Math.round(((currentRating - 1750) / 250) * 100)),
      pointsToNext: 2000 - currentRating,
    };
  }

  if (currentRating >= 1500) {
    const tier = ALL_RANKS[2];
    return {
      ...tier,
      nextTier: 'Immortal (1750)',
      progress: Math.min(100, Math.round(((currentRating - 1500) / 250) * 100)),
      pointsToNext: 1750 - currentRating,
    };
  }

  if (currentRating >= 1300) {
    const tier = ALL_RANKS[3];
    return {
      ...tier,
      nextTier: 'Ascendant (1500)',
      progress: Math.min(100, Math.round(((currentRating - 1300) / 200) * 100)),
      pointsToNext: 1500 - currentRating,
    };
  }

  if (currentRating >= 1100) {
    const tier = ALL_RANKS[4];
    return {
      ...tier,
      nextTier: 'Warlord (1300)',
      progress: Math.min(100, Math.round(((currentRating - 1100) / 200) * 100)),
      pointsToNext: 1300 - currentRating,
    };
  }

  if (currentRating >= 900) {
    const tier = ALL_RANKS[5];
    return {
      ...tier,
      nextTier: 'Centurion (1100)',
      progress: Math.min(100, Math.round(((currentRating - 900) / 200) * 100)),
      pointsToNext: 1100 - currentRating,
    };
  }

  if (currentRating >= 700) {
    const tier = ALL_RANKS[6];
    return {
      ...tier,
      nextTier: 'Gladiator (900)',
      progress: Math.min(100, Math.round(((currentRating - 700) / 200) * 100)),
      pointsToNext: 900 - currentRating,
    };
  }

  if (currentRating >= 500) {
    const tier = ALL_RANKS[7];
    return {
      ...tier,
      nextTier: 'Stalker (700)',
      progress: Math.min(100, Math.round(((currentRating - 500) / 200) * 100)),
      pointsToNext: 700 - currentRating,
    };
  }

  if (currentRating >= 300) {
    const tier = ALL_RANKS[8];
    return {
      ...tier,
      nextTier: 'Vanguard (500)',
      progress: Math.min(100, Math.round(((currentRating - 300) / 200) * 100)),
      pointsToNext: 500 - currentRating,
    };
  }

  // < 300 (Exile)
  const tier = ALL_RANKS[9];
  return {
    ...tier,
    nextTier: 'Initiate (300)',
    progress: Math.min(100, Math.round((currentRating / 300) * 100)),
    pointsToNext: Math.max(0, 300 - currentRating),
  };
};

interface RankBadgeProps {
  rating?: number;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showRating?: boolean;
  className?: string;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  rating,
  title,
  size = 'sm',
  showRating = false,
  className = '',
}) => {
  let rank: RankTier | undefined;

  if (typeof rating === 'number') {
    rank = getRankData(rating);
  } else if (title) {
    rank = ALL_RANKS.find((r) => r.title.toLowerCase() === title.toLowerCase()) || ALL_RANKS[8];
  } else {
    rank = ALL_RANKS[8]; // Default Initiate
  }

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-3 py-1 text-xs gap-1.5 font-bold',
    lg: 'px-4 py-1.5 text-sm gap-2 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-lg border backdrop-blur-md transition-all ${rank.badgeBg} ${sizeClasses[size]} ${className}`}
    >
      <span className="select-none">{rank.emoji}</span>
      <span>{rank.title}</span>
      {showRating && typeof rating === 'number' && (
        <span className="opacity-70 font-mono text-[10px] ml-0.5 font-normal">
          ({rating})
        </span>
      )}
    </span>
  );
};
