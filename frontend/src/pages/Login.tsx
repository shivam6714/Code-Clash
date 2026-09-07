import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await login({ email, password });
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-dark-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-center text-lg mx-auto">
          ⚔️
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">
          WELCOME BACK
        </h2>
        <p className="text-xs text-gray-400 font-mono">Sign in to your CodeClash account</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-900 py-8 px-6 rounded-2xl border border-zinc-800 sm:px-10 space-y-5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-3 text-xs font-semibold">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="duelist@codeclash.com"
                className="w-full px-4 py-2.5 border border-zinc-800 rounded-xl bg-dark-950 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 font-mono transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 border border-zinc-800 rounded-xl bg-dark-950 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 font-mono transition-colors"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl text-sm font-extrabold text-black bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 transition-colors uppercase tracking-wider"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-zinc-800">
            <p className="text-xs text-gray-400">
              New to CodeClash?{' '}
              <Link to="/register" className="text-cyan-400 hover:underline font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


