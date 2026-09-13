import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const CodeClashIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cc-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="cc-right-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="cc-slash-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Left Code Bracket '<' */}
      <path
        d="M11 5L3 16L11 27"
        stroke="url(#cc-left-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Code Bracket '>' */}
      <path
        d="M21 5L29 16L21 27"
        stroke="url(#cc-right-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic Duel Slash Blade */}
      <path
        d="M19.5 3.5L12.5 28.5"
        stroke="url(#cc-slash-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Central Clash Star Core */}
      <polygon points="16,11 18.5,16 21,16 18.5,17.5 16,21 13.5,17.5 11,16 13.5,16" fill="#FFFFFF" />
    </svg>
  );
};

export const CodeClashLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeConfig = {
    sm: {
      box: 'w-7 h-7 rounded-lg',
      icon: 'w-4 h-4',
      title: 'text-sm',
      sub: 'text-[8px]',
    },
    md: {
      box: 'w-8 h-8 rounded-lg',
      icon: 'w-4.5 h-4.5',
      title: 'text-base',
      sub: 'text-[9px]',
    },
    lg: {
      box: 'w-10 h-10 rounded-xl',
      icon: 'w-5 h-5',
      title: 'text-xl',
      sub: 'text-[10px]',
    },
    xl: {
      box: 'w-12 h-12 rounded-2xl',
      icon: 'w-6 h-6',
      title: 'text-2xl',
      sub: 'text-[11px]',
    },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Icon Badge Container */}
      <div
        className={`${sizeConfig.box} relative bg-gradient-to-b from-zinc-800/90 to-zinc-950/90 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400/60 group-hover:shadow-cyan-500/25 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="absolute inset-0 rounded-inherit bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />
        <CodeClashIcon className={sizeConfig.icon} />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${sizeConfig.title} font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center leading-none`}
          >
            CODE<span className="text-cyan-400">CLASH</span>
          </span>
          <span
            className={`${sizeConfig.sub} tracking-widest text-zinc-500 font-mono mt-1 font-semibold uppercase leading-none`}
          >
            1v1 DSA Arena
          </span>
        </div>
      )}
    </div>
  );
};

export default CodeClashLogo;
