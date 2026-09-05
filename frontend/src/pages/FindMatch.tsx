import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const FindMatch: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to battle?');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('matchmaking:queued', (data) => {
      setIsSearching(true);
      setStatusMessage(data.message || 'Queued...');
      setError(null);
    });

    socket.on('matchmaking:searching', () => {
      setIsSearching(true);
      setStatusMessage('Searching for opponent...');
    });

    socket.on('matchmaking:found', () => {
      setStatusMessage('Opponent found! Preparing battle...');
    });

    socket.on('battle:created', (data) => {
      setIsSearching(false);
      navigate(`/battle/${data.battleId}`);
    });

    socket.on('matchmaking:idle', () => {
      setIsSearching(false);
      setStatusMessage('Ready to battle?');
    });

    socket.on('error', (err) => {
      setError(err.message || 'An error occurred');
      setIsSearching(false);
      setStatusMessage('Ready to battle?');
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

  const handleJoin = () => {
    setError(null);
    socket.emit('matchmaking:join');
  };

  const handleCancel = () => {
    socket.emit('matchmaking:leave');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-dark-900">
      <div className="w-full max-w-md bg-dark-800 rounded-xl shadow-2xl p-8 border border-dark-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Find Match</h1>
        <p className="text-gray-400 mb-8">{statusMessage}</p>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isSearching ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <button
              onClick={handleCancel}
              className="w-full bg-dark-700 hover:bg-dark-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors border border-dark-600"
            >
              Cancel Search
            </button>
          </div>
        ) : (
          <button
            onClick={handleJoin}
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary-500/20 transition-transform transform hover:-translate-y-1"
          >
            Find Match
          </button>
        )}
      </div>
    </div>
  );
};

export default FindMatch;
