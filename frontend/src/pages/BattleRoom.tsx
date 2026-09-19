import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';
import { RankBadge } from '../utils/ranks';

const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
];

const BattleRoom: React.FC = () => {
  const { battleId } = useParams<{ battleId: string }>();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const [status, setStatus] = useState<'WAITING' | 'COUNTDOWN' | 'ACTIVE' | 'FINISHED' | 'CANCELLED'>('WAITING');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [problem, setProblem] = useState<any>(null);
  const [players, setPlayers] = useState<{ me: string, opponent: string }>({ me: '', opponent: '' });
  const [opponentStatus, setOpponentStatus] = useState('Connected');
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [endReason, setEndReason] = useState<string | null>(null);
  const [eloResult, setEloResult] = useState<any | null>(null);

  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].id);
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isJudging, setIsJudging] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<any | null>(null);
  const [showRunPanel, setShowRunPanel] = useState(false);
  const [clipboardWarning, setClipboardWarning] = useState<string | null>(null);

  const triggerClipboardWarning = (msg: string) => {
    setClipboardWarning(msg);
    setTimeout(() => {
      setClipboardWarning((current) => (current === msg ? null : current));
    }, 2500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        triggerClipboardWarning('Copying code or problem statement is disabled.');
      } else if (isCtrlOrCmd && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault();
        triggerClipboardWarning('Pasting code is disabled during battle.');
      } else if (isCtrlOrCmd && (e.key === 'x' || e.key === 'X')) {
        e.preventDefault();
        triggerClipboardWarning('Cutting text is disabled.');
      } else if (isCtrlOrCmd && (e.key === 'Insert' || e.key === 'insert')) {
        e.preventDefault();
        triggerClipboardWarning('Clipboard actions are disabled.');
      } else if (e.shiftKey && (e.key === 'Insert' || e.key === 'insert')) {
        e.preventDefault();
        triggerClipboardWarning('Pasting is disabled.');
      }
    };

    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      triggerClipboardWarning('Clipboard copy/paste is disabled.');
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('copy', handleClipboard, true);
    window.addEventListener('paste', handleClipboard, true);
    window.addEventListener('cut', handleClipboard, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('copy', handleClipboard, true);
      window.removeEventListener('paste', handleClipboard, true);
      window.removeEventListener('cut', handleClipboard, true);
    };
  }, []);

  useEffect(() => {
    const handleBattleStarted = (data: any) => {
      setProblem(data.problem);
      setPlayers({ me: data.player1.username, opponent: data.player2.username });
      setEndTime(data.endsAt);
      setStatus('ACTIVE');
      
      // Preserve current user edits if rejoining
      setCodes(prev => {
        if (Object.keys(prev).length > 0) return prev;
        const initialCodes: Record<string, string> = {};
        for (const lang of SUPPORTED_LANGUAGES) {
          initialCodes[lang.id] = data.problem.starterCode[lang.id] || `// No starter code for ${lang.name}`;
        }
        return initialCodes;
      });
    };

    const handleRejoinFailed = () => {
      navigate('/find-match');
    };

    socket.on('battle:rejoin-failed', handleRejoinFailed);
    socket.on('battle:countdown', (data) => {
      setStatus('COUNTDOWN');
      setCountdown(data.count);
    });

    socket.on('battle:started', handleBattleStarted);

    socket.on('battle:ended', (data) => {
      setStatus('FINISHED');
      setEndReason(data.reason);
      if (data.eloData) {
        setEloResult(data.eloData);
        updateUser((prev) => {
          if (!prev) return {};
          const currentUserId = prev.id || (prev as any)._id;
          const winnerId = data.eloData.winnerId || data.eloData.winnerUserId;
          const loserId = data.eloData.loserId || data.eloData.loserUserId;

          if (currentUserId === winnerId) {
            return {
              rating: data.eloData.winnerEloAfter,
              wins: (prev.wins || 0) + 1,
            };
          } else if (currentUserId === loserId) {
            return {
              rating: data.eloData.loserEloAfter,
              losses: (prev.losses || 0) + 1,
            };
          }
          return {};
        });
      }
    });

    socket.on('battle:opponent-left', (data) => {
      setStatus('CANCELLED');
      setEndReason(data.message);
      setOpponentStatus('Disconnected');
    });

    socket.on('battle:opponent-status', (data) => {
      setOpponentStatus(data.status);
    });

    socket.on('battle:submission-result', (data) => {
      setIsJudging(false);
      
      let message = `${data.status.replace(/_/g, ' ')}`;
      if (data.passedTests !== undefined && data.totalTests !== undefined) {
         message += ` - ${data.passedTests} / ${data.totalTests} tests passed`;
      }
      if (data.errorMessage) {
         message += ` | ${data.errorMessage}`;
      }
      
      setActionMessage(message);
    });

    socket.on('battle:run-result', (data) => {
      setIsRunning(false);
      if (data.status === 'RATE_LIMITED' || data.status === 'SYSTEM_ERROR') {
        setActionMessage(data.errorMessage || data.status);
      } else {
        setRunResult(data);
        setShowRunPanel(true);
        setActionMessage(null);
      }
    });

    const attemptRejoin = () => {
      if (battleId) {
        socket.emit('battle:rejoin', { battleId });
      }
    };

    if (socket.connected) {
      attemptRejoin();
    } else {
      socket.once('connect', attemptRejoin);
    }

    return () => {
      socket.off('connect', attemptRejoin);
      socket.off('battle:rejoin-failed', handleRejoinFailed);
      socket.off('battle:countdown');
      socket.off('battle:started');
      socket.off('battle:ended');
      socket.off('battle:opponent-left');
      socket.off('battle:opponent-status');
      socket.off('battle:submission-result');
      socket.off('battle:run-result');
    };
  }, [navigate, battleId]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'ACTIVE' && endTime) {
      interval = setInterval(() => {
        const remaining = Math.max(0, endTime - Date.now());
        setTimeLeft(remaining);
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, endTime]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setActionMessage(null);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && problem) {
      setCodes(prev => ({ ...prev, [language]: value }));
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Intercept and block Monaco clipboard keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      triggerClipboardWarning('Pasting code is disabled.');
    });
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => {
      triggerClipboardWarning('Pasting code is disabled.');
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {
      triggerClipboardWarning('Copying code is disabled.');
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Insert, () => {
      triggerClipboardWarning('Copying code is disabled.');
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => {
      triggerClipboardWarning('Cutting code is disabled.');
    });
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Delete, () => {
      triggerClipboardWarning('Cutting code is disabled.');
    });

    const domNode = editor.getDomNode();
    if (domNode) {
      domNode.addEventListener('paste', (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        triggerClipboardWarning('Pasting code is disabled.');
      }, true);
      domNode.addEventListener('copy', (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        triggerClipboardWarning('Copying code is disabled.');
      }, true);
      domNode.addEventListener('cut', (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        triggerClipboardWarning('Cutting code is disabled.');
      }, true);
      domNode.addEventListener('contextmenu', (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, true);
    }
  };

  const handleRun = () => {
    if (isRunning || isJudging || status !== 'ACTIVE') return;
    setIsRunning(true);
    setActionMessage('Running...');
    setShowRunPanel(false);
    setRunResult(null);
    socket.emit('battle:run', {
      sourceCode: codes[language],
      language: language
    });
  };

  const handleSubmit = () => {
    if (isJudging || isRunning || status !== 'ACTIVE') return;
    setIsJudging(true);
    setActionMessage('Judging...');
    socket.emit('battle:submit', {
      sourceCode: codes[language],
      language: language
    });
  };

  const handleLeave = () => {
    if (window.confirm("Are you sure you want to leave the battle?")) {
      socket.emit('battle:leave');
      navigate('/find-match');
    }
  };

  const formatTime = (ms: number | null) => {
    if (ms === null) return '--:--';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (status === 'WAITING' || status === 'COUNTDOWN') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex flex-col items-center justify-center text-white relative ambient-grid select-none no-copy-select">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
        
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-10 text-center shadow-2xl space-y-6 max-w-sm w-full mx-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto text-xl">
            ⚔️
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">Duel Initiated</h1>
            <p className="text-xs text-zinc-400">Locking in problem set and starter templates...</p>
          </div>

          {status === 'COUNTDOWN' && countdown !== null && (
            <div className="py-4">
              <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-400/50 flex items-center justify-center mx-auto text-5xl font-extrabold font-mono text-cyan-400 animate-pulse shadow-lg shadow-cyan-500/20">
                {countdown}
              </div>
              <p className="text-[11px] text-zinc-500 font-mono mt-3">Battle starts when countdown reaches 0</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if ((status === 'FINISHED' || status === 'CANCELLED') && !problem) {
     return (
       <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex flex-col items-center justify-center text-white p-6 ambient-grid">
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/80 backdrop-blur-xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
             <div className="text-3xl">⚔️</div>
             <h1 className="text-2xl font-bold">{status === 'FINISHED' ? 'Battle Completed' : 'Battle Cancelled'}</h1>
             <p className="text-zinc-400 text-sm">{endReason || 'This battle has concluded.'}</p>
             <button
               onClick={() => navigate('/find-match')}
               className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/[0.08] transition-all"
             >
               Return to Matchmaking
             </button>
          </div>
       </div>
     );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-dark-900 overflow-hidden relative">
      {/* Clipboard Warning Toast */}
      {clipboardWarning && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl shadow-rose-500/30 border border-rose-400 animate-bounce pointer-events-none">
          <span className="text-base">🔒</span>
          <span>{clipboardWarning}</span>
        </div>
      )}

      {/* Top Status Bar */}
      <div className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-bold text-white text-sm">YOU ({players.me})</span>
          </div>
          <span className="text-gray-500 font-bold">VS</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${opponentStatus === 'Connected' ? 'bg-cyan-500' : 'bg-red-500'}`}></div>
            <span className="font-bold text-gray-300 text-sm">{players.opponent}</span>
            {opponentStatus !== 'Connected' && (
              <span className="text-xs text-red-400">({opponentStatus})</span>
            )}
          </div>
        </div>

        {/* Action message ticker */}
        {actionMessage && (
          <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-cyan-400 animate-pulse">
            {actionMessage}
          </div>
        )}

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-dark-900 px-4 py-1.5 rounded-lg border border-dark-600">
            <span className="text-gray-400 text-xs font-mono uppercase">Time:</span>
            <span className={`font-mono font-bold text-base ${(timeLeft || 0) < 60000 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <button 
            onClick={handleLeave}
            className="text-gray-400 hover:text-red-400 text-xs font-semibold px-3 py-1.5 rounded border border-transparent hover:border-red-900/50 hover:bg-red-950/20 transition-all"
          >
            Leave Battle
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative">
        
        {/* Battle End Overlay */}
        {(status === 'FINISHED' || status === 'CANCELLED') && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center p-4">
             {eloResult ? (
                (() => {
                  const isWinner = eloResult.winnerUsername === players.me;
                  const isLoser = eloResult.loserUsername === players.me;
                  const isDraw = eloResult.isDraw;

                  if (isDraw) {
                    return (
                      <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-xl p-8 text-center max-w-sm w-full shadow-2xl space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-3xl mx-auto">
                          🤝
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold text-amber-400 tracking-tight">Draw</h2>
                          <p className="text-xs text-zinc-400 leading-relaxed">{endReason}</p>
                        </div>
                        <button
                          onClick={() => navigate('/find-match')}
                          className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all border border-white/[0.08]"
                        >
                          Return to Matchmaking
                        </button>
                      </div>
                    );
                  }

                  if (isWinner) {
                    return (
                      <div className="rounded-2xl border border-emerald-500/40 bg-zinc-900/90 backdrop-blur-xl p-8 text-center max-w-sm w-full shadow-2xl shadow-emerald-500/20 space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
                          🏆
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold text-emerald-400 tracking-tight">Victory!</h2>
                          <p className="text-xs text-zinc-400 leading-relaxed">{endReason}</p>
                        </div>

                        <div className="p-4 bg-zinc-950/80 rounded-xl border border-white/[0.06] space-y-2">
                          <div className="text-2xl font-black font-mono text-emerald-400">
                            +{eloResult.winnerEloChange} ELO
                          </div>
                          <div className="text-zinc-500 text-xs font-mono">
                            {eloResult.winnerEloBefore} → {eloResult.winnerEloAfter} ELO
                          </div>
                          <div className="pt-2 border-t border-white/[0.05] flex justify-center">
                            <RankBadge rating={eloResult.winnerEloAfter} size="sm" showRating />
                          </div>
                        </div>

                        <button
                          onClick={() => navigate('/find-match')}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                        >
                          Find Next Match
                        </button>
                      </div>
                    );
                  }

                  if (isLoser) {
                    const title = eloResult.isAbandonment ? 'Battle Abandoned' : 'Defeat';
                    return (
                      <div className="rounded-2xl border border-rose-500/40 bg-zinc-900/90 backdrop-blur-xl p-8 text-center max-w-sm w-full shadow-2xl shadow-rose-500/20 space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-3xl mx-auto">
                          💀
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold text-rose-400 tracking-tight">{title}</h2>
                          <p className="text-xs text-zinc-400 leading-relaxed">{endReason}</p>
                        </div>

                        <div className="p-4 bg-zinc-950/80 rounded-xl border border-white/[0.06] space-y-2">
                          <div className="text-2xl font-black font-mono text-rose-400">
                            -{eloResult.loserEloChange} ELO
                          </div>
                          <div className="text-zinc-500 text-xs font-mono">
                            {eloResult.loserEloBefore} → {eloResult.loserEloAfter} ELO
                          </div>
                          <div className="pt-2 border-t border-white/[0.05] flex justify-center">
                            <RankBadge rating={eloResult.loserEloAfter} size="sm" showRating />
                          </div>
                        </div>

                        <button
                          onClick={() => navigate('/find-match')}
                          className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all border border-white/[0.08]"
                        >
                          Return to Matchmaking
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-xl p-8 text-center max-w-sm w-full shadow-2xl space-y-5">
                       <h2 className="text-xl font-bold text-white">{status === 'FINISHED' ? 'Battle Ended' : 'Battle Cancelled'}</h2>
                       <p className="text-xs text-zinc-400">{endReason}</p>
                       <button
                         onClick={() => navigate('/find-match')}
                         className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/[0.08]"
                       >
                         Return to Matchmaking
                       </button>
                    </div>
                  );
                })()
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-xl p-8 text-center max-w-sm w-full shadow-2xl space-y-5">
                   <h2 className="text-xl font-bold text-white">{status === 'FINISHED' ? 'Battle Ended' : 'Battle Cancelled'}</h2>
                   <p className="text-xs text-zinc-400">{endReason}</p>
                   <button
                     onClick={() => navigate('/find-match')}
                     className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/[0.08]"
                   >
                     Return to Matchmaking
                   </button>
                </div>
              )}
          </div>
        )}

        {/* Left Pane: Description (Protected from copying/selection) */}
        <div 
          className="w-full md:w-1/2 lg:w-2/5 p-6 border-r border-dark-700 overflow-y-auto custom-scrollbar select-none no-copy-select"
          onCopy={(e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerClipboardWarning('Copying problem statement is disabled.');
          }}
          onCut={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {problem && (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">{problem.title}</h1>
              <div className="flex space-x-4 mb-6 text-sm">
                <span className={`font-semibold ${problem.difficulty === 'Easy' ? 'text-green-400' : problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {problem.difficulty}
                </span>
                <div className="flex space-x-2">
                  {problem.topics.map((t: string, i: number) => (
                    <span key={i} className="text-gray-400 bg-dark-800 px-2 py-0.5 rounded border border-dark-600">{t}</span>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                {problem.description}
              </div>

              {problem.examples && problem.examples.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-4">Examples</h2>
                  {problem.examples.map((ex: any, idx: number) => (
                    <div key={idx} className="mb-6 bg-dark-800 p-4 rounded-lg border border-dark-700 font-mono text-sm">
                      <div className="mb-2"><span className="text-gray-400 font-bold">Input:</span> <span className="text-gray-300">{ex.input}</span></div>
                      <div className="mb-2"><span className="text-gray-400 font-bold">Output:</span> <span className="text-gray-300">{ex.output}</span></div>
                      {ex.explanation && <div><span className="text-gray-400 font-bold">Explanation:</span> <span className="text-gray-300">{ex.explanation}</span></div>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Pane: Editor */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col h-full bg-[#1e1e1e]">
          <div className="h-12 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-4">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-dark-900 border border-dark-600 text-gray-300 text-sm rounded-md focus:ring-zinc-400 focus:border-zinc-400 block p-1.5"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            
            <div className="space-x-3">
              <button 
                onClick={handleRun}
                disabled={status !== 'ACTIVE' || isRunning || isJudging}
                className="bg-dark-700 hover:bg-dark-600 disabled:opacity-50 text-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={status !== 'ACTIVE' || isJudging || isRunning}
                className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 disabled:opacity-50 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                {isJudging ? 'Judging...' : 'Submit'}
              </button>
            </div>
          </div>

          <div 
            className="flex-grow relative"
            onPaste={(e) => {
              e.preventDefault();
              e.stopPropagation();
              triggerClipboardWarning('Pasting code is disabled.');
            }}
            onCopy={(e) => {
              e.preventDefault();
              e.stopPropagation();
              triggerClipboardWarning('Copying code is disabled.');
            }}
            onCut={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={codes[language] || ''}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                padding: { top: 16 },
                readOnly: status !== 'ACTIVE',
                contextmenu: false,
                copyWithSyntaxHighlighting: false,
              }}
            />
            
            {/* Run Results Panel */}
            {showRunPanel && runResult && (
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-dark-900 border-t border-dark-600 flex flex-col z-10 shadow-2xl transition-all">
                <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700 shrink-0">
                  <div className="font-bold text-gray-200">
                    Execution Result:{' '}
                    <span className={runResult.status === 'ACCEPTED' ? 'text-green-400' : 'text-red-400'}>
                      {runResult.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowRunPanel(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
                  {runResult.errorMessage && runResult.status !== 'WRONG_ANSWER' && runResult.status !== 'ACCEPTED' && (
                    <div className="mb-4 bg-red-900/20 text-red-400 p-4 rounded border border-red-900/50 font-mono text-sm whitespace-pre-wrap">
                      {runResult.errorMessage}
                    </div>
                  )}

                  {runResult.testResults && runResult.testResults.map((tr: any, idx: number) => (
                    <div key={idx} className="mb-6 bg-dark-800 rounded border border-dark-700 overflow-hidden">
                      <div className={`px-4 py-2 font-bold text-sm flex items-center justify-between border-b ${tr.passed ? 'bg-green-900/20 border-green-900/30 text-green-400' : 'bg-red-900/20 border-red-900/30 text-red-400'}`}>
                        <span>Test Case {idx + 1}</span>
                        <span>{tr.passed ? '✓ Passed' : '✗ Failed'}</span>
                      </div>
                      <div className="p-4 space-y-4 font-mono text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">Input:</div>
                          <div className="bg-dark-900 p-2 rounded text-gray-300 whitespace-pre-wrap break-all">{tr.input}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Expected Output:</div>
                          <div className="bg-dark-900 p-2 rounded text-gray-300 whitespace-pre-wrap break-all">{tr.expectedOutput}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Actual Output:</div>
                          <div className="bg-dark-900 p-2 rounded text-gray-300 whitespace-pre-wrap break-all">{tr.actualOutput || 'No output'}</div>
                        </div>
                        {tr.errorMessage && (
                          <div>
                            <div className="text-red-500 mb-1">Error:</div>
                            <div className="bg-red-900/20 text-red-400 p-2 rounded whitespace-pre-wrap break-all">{tr.errorMessage}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {actionMessage && !showRunPanel && (
            <div className="h-12 bg-zinc-800 border-t border-zinc-700 flex items-center px-4 text-zinc-300 text-sm font-medium animate-pulse shrink-0">
              {actionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleRoom;
