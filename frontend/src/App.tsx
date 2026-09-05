import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProblemsList from './pages/ProblemsList';
import Workspace from './pages/Workspace';
import FindMatch from './pages/FindMatch';
import BattleRoom from './pages/BattleRoom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { socket } from './socket';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    function onConnect() {
      const statusEl = document.getElementById('socket-status');
      if (statusEl) {
        statusEl.textContent = 'Connected';
        statusEl.className = 'text-green-500';
      }
    }

    function onDisconnect() {
      const statusEl = document.getElementById('socket-status');
      if (statusEl) {
        statusEl.textContent = 'Disconnected';
        statusEl.className = 'text-red-500';
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    if (isAuthenticated) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<ProblemsList />} />
          <Route path="/problems/:slug" element={<Workspace />} />
          <Route path="/find-match" element={
            <ProtectedRoute>
              <FindMatch />
            </ProtectedRoute>
          } />
          <Route path="/battle/:battleId" element={
            <ProtectedRoute>
              <BattleRoom />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App;

