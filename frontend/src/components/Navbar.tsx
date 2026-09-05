import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-700 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
          CodeClash
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/problems" className="text-gray-300 hover:text-white font-medium transition-colors">Problems</Link>
          {isLoading ? (
            <div className="text-gray-400">...</div>
          ) : isAuthenticated ? (
            <>
              <Link to="/find-match" className="text-gray-300 hover:text-white transition-colors">Find Match</Link>
              <span className="text-gray-300">Welcome, <span className="font-semibold text-white">{user?.username}</span></span>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-primary-600 hover:bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg shadow shadow-primary-500/20 transition-all">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
