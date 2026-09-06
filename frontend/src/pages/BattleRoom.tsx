import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';

const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
];

const BattleRoom: React.FC = () => {
  const { battleId } = useParams<{ battleId: string }>();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
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
    let interval: NodeJS.Timeout;
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
      <div className="min-h-[calc(100vh-80px)] bg-dark-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Battle Found!</h1>
        <p className="text-xl text-gray-400 mb-8">Preparing arena...</p>
        {status === 'COUNTDOWN' && countdown !== null && (
          <div className="text-9xl font-black text-primary-500 animate-pulse">
            {countdown}
          </div>
        )}
      </div>
    );
  }

  if ((status === 'FINISHED' || status === 'CANCELLED') && !problem) {
     return (
       <div className="min-h-[calc(100vh-80px)] bg-dark-900 flex flex-col items-center justify-center text-white">
         <h1 className="text-3xl font-bold mb-4">Battle Ended</h1>
         <p className="text-gray-400">{endReason}</p>
         <button onClick={() => navigate('/find-match')} className="mt-6 bg-primary-600 px-6 py-2 rounded">Back to Matchmaking</button>
       </div>
     )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-dark-900 overflow-hidden">
      {/* Battle Header */}
      <div className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">
            <span className="text-white">{players.me || 'You'}</span> <span className="text-gray-500 text-sm mx-2">VS</span> <span className="text-red-400">{players.opponent || 'Opponent'}</span>
          </div>
          <div className="text-xs text-gray-400 bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
            Opponent: <span className={opponentStatus === 'Connected' ? 'text-green-400' : 'text-yellow-400'}>{opponentStatus}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className={`text-2xl font-mono font-bold ${(timeLeft || 0) < 60000 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={handleLeave}
            className="text-gray-400 hover:text-red-400 text-sm transition-colors"
          >
            Leave Battle
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative">
        {(status === 'FINISHED' || status === 'CANCELLED') && (
          <div className="absolute inset-0 bg-dark-900/80 z-50 flex items-center justify-center backdrop-blur-sm">
             {eloResult ? (
               (() => {
                 const currentUserId = user?.id || (user as any)?._id;
                 const winnerId = eloResult.winnerId || eloResult.winnerUserId;
                 const loserId = eloResult.loserId || eloResult.loserUserId;

                 const isWinner = !!(currentUserId && currentUserId === winnerId);
                 const isLoser = !!(currentUserId && currentUserId === loserId);

                 if (isWinner) {
                   return (
                     <div className="bg-dark-800 p-8 rounded-xl border border-green-500/30 text-center max-w-md shadow-2xl w-full mx-4">
                       <h2 className="text-4xl font-extrabold text-green-400 mb-2 flex items-center justify-center gap-2">
                         🏆 Victory
                       </h2>
                       <div className="my-6 p-4 bg-dark-900/60 rounded-lg border border-dark-700">
                         <div className="text-3xl font-black text-green-400 mb-1">
                           +{eloResult.winnerEloChange} ELO
                         </div>
                         <div className="text-gray-400 text-lg font-mono">
                           {eloResult.winnerEloBefore} → {eloResult.winnerEloAfter}
                         </div>
                       </div>
                       <p className="text-gray-300 mb-6">{endReason}</p>
                       <button onClick={() => navigate('/find-match')} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors">
                         Return to Matchmaking
                       </button>
                     </div>
                   );
                 }

                 if (isLoser) {
                   const title = eloResult.isAbandonment ? 'BATTLE ABANDONED' : 'Defeat';
                   return (
                     <div className="bg-dark-800 p-8 rounded-xl border border-red-500/30 text-center max-w-md shadow-2xl w-full mx-4">
                       <h2 className="text-4xl font-extrabold text-red-400 mb-2 flex items-center justify-center gap-2">
                         {title}
                       </h2>
                       <div className="my-6 p-4 bg-dark-900/60 rounded-lg border border-dark-700">
                         <div className="text-3xl font-black text-red-400 mb-1">
                           -{eloResult.loserEloChange} ELO
                         </div>
                         <div className="text-gray-400 text-lg font-mono">
                           {eloResult.loserEloBefore} → {eloResult.loserEloAfter}
                         </div>
                       </div>
                       <p className="text-gray-300 mb-6">{endReason}</p>
                       <button onClick={() => navigate('/find-match')} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors">
                         Return to Matchmaking
                       </button>
                     </div>
                   );
                 }

                 return (
                   <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center max-w-md">
                      <h2 className="text-3xl font-bold text-white mb-2">{status === 'FINISHED' ? 'Battle Ended' : 'Battle Cancelled'}</h2>
                      <p className="text-gray-300 mb-6">{endReason}</p>
                      <button onClick={() => navigate('/find-match')} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg">
                        Return to Matchmaking
                      </button>
                   </div>
                 );
               })()
             ) : (
               <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center max-w-md">
                  <h2 className="text-3xl font-bold text-white mb-2">{status === 'FINISHED' ? 'Battle Ended' : 'Battle Cancelled'}</h2>
                  <p className="text-gray-300 mb-6">{endReason}</p>
                  <button onClick={() => navigate('/find-match')} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg">
                    Return to Matchmaking
                  </button>
               </div>
             )}
          </div>
        )}

        {/* Left Pane: Description */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 border-r border-dark-700 overflow-y-auto custom-scrollbar">
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
              className="bg-dark-900 border border-dark-600 text-gray-300 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block p-1.5"
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
                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                {isJudging ? 'Judging...' : 'Submit'}
              </button>
            </div>
          </div>

          <div className="flex-grow relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={codes[language] || ''}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                padding: { top: 16 },
                readOnly: status !== 'ACTIVE',
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
            <div className="h-12 bg-blue-900/20 border-t border-blue-800/50 flex items-center px-4 text-blue-300 text-sm font-medium animate-pulse shrink-0">
              {actionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleRoom;
