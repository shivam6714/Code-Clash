import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { socket } from '../socket';

const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
];

const BattleRoom: React.FC = () => {
  useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<'WAITING' | 'COUNTDOWN' | 'ACTIVE' | 'FINISHED' | 'CANCELLED'>('WAITING');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [problem, setProblem] = useState<any>(null);
  const [players, setPlayers] = useState<{ me: string, opponent: string }>({ me: '', opponent: '' });
  const [opponentStatus, setOpponentStatus] = useState('Connected');
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [endReason, setEndReason] = useState<string | null>(null);

  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].id);
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    // If socket isn't connected, we shouldn't be here
    if (!socket.connected) {
       navigate('/find-match');
    }

    const handleBattleStarted = (data: any) => {
      setProblem(data.problem);
      setPlayers({ me: data.player1.username, opponent: data.player2.username }); // This might be slightly inaccurate mapping for me vs opponent, but we rely on username for display
      setEndTime(data.endsAt);
      setStatus('ACTIVE');
      
      // Initialize code
      const initialCodes: Record<string, string> = {};
      for (const lang of SUPPORTED_LANGUAGES) {
        initialCodes[lang.id] = data.problem.starterCode[lang.id] || `// No starter code for ${lang.name}`;
      }
      setCodes(initialCodes);
    };

    socket.on('battle:countdown', (data) => {
      setStatus('COUNTDOWN');
      setCountdown(data.count);
    });

    socket.on('battle:started', handleBattleStarted);

    socket.on('battle:ended', (data) => {
      setStatus('FINISHED');
      setEndReason(data.reason);
    });

    socket.on('battle:opponent-left', (data) => {
      setStatus('CANCELLED');
      setEndReason(data.message);
      setOpponentStatus('Disconnected');
    });

    socket.on('battle:opponent-status', (data) => {
      setOpponentStatus(data.status);
    });

    socket.on('battle:submit_ack', (data) => {
      setActionMessage(data.message);
    });

    return () => {
      socket.off('battle:countdown');
      socket.off('battle:started');
      socket.off('battle:ended');
      socket.off('battle:opponent-left');
      socket.off('battle:opponent-status');
      socket.off('battle:submit_ack');
    };
  }, [navigate]);

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
    setActionMessage("Code execution is coming in the next phase.");
  };

  const handleSubmit = () => {
    socket.emit('battle:submit');
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
             <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center max-w-md">
                <h2 className="text-3xl font-bold text-white mb-2">{status === 'FINISHED' ? 'Time is Up!' : 'Battle Cancelled'}</h2>
                <p className="text-gray-300 mb-6">{endReason}</p>
                <button onClick={() => navigate('/find-match')} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg">
                  Return to Matchmaking
                </button>
             </div>
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
                disabled={status !== 'ACTIVE'}
                className="bg-dark-700 hover:bg-dark-600 disabled:opacity-50 text-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Run
              </button>
              <button 
                onClick={handleSubmit}
                disabled={status !== 'ACTIVE'}
                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Submit
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
          </div>
          
          {actionMessage && (
            <div className="h-12 bg-blue-900/20 border-t border-blue-800/50 flex items-center px-4 text-blue-300 text-sm font-medium animate-pulse">
              {actionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleRoom;
