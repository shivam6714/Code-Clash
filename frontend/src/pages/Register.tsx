import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CodeClashLogo } from '../components/Logo';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await register({ username, email, password });
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07080c] relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 ambient-grid">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <Link to="/" className="inline-flex justify-center">
          <CodeClashLogo size="lg" showText={false} />
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Create an account
        </h2>
        <p className="text-xs text-zinc-400">Join the competitive 1v1 DSA arena and climb the ladder</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl shadow-black/50 space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-3 text-xs font-semibold">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                title="3-20 characters, letters, numbers, and underscores only"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="AlgoKnight"
                className="w-full px-3.5 py-2.5 border border-white/[0.08] rounded-xl bg-zinc-950/80 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5">
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
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 border border-white/[0.08] rounded-xl bg-zinc-950/80 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2.5 border border-white/[0.08] rounded-xl bg-zinc-950/80 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:opacity-50 transition-all shadow-md shadow-cyan-500/20"
              >
                {isSubmitting ? 'Creating Account...' : 'Register Account'}
              </button>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-white/[0.06]">
            <p className="text-xs text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
