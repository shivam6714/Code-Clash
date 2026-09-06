import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-dark-900 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
          CodeClash
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light">
          The competitive gaming platform for programmers.
        </p>
        <div className="pt-8">
          <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105 active:scale-95">
            Join Matchmaking
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 text-sm text-gray-600">
        Status: <span id="socket-status" className="text-yellow-500">Connecting...</span>
      </div>
    </div>
  );
};

export default Landing;
