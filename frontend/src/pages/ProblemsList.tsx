import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProblems, ProblemListItem } from '../api/problems';

const ProblemsList: React.FC = () => {
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadProblems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProblems(difficultyFilter, '', searchQuery);
      setProblems(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load problems.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      loadProblems();
    }, 200);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyFilter, searchQuery]);

  const getDifficultyBadge = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'medium':
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07080c] relative py-10 px-4 sm:px-6 lg:px-8 ambient-grid">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-0" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Top Header & Filter Bar */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-6 shadow-xl shadow-black/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">DSA Problem Repository</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Practice Arena Problems</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <svg className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search problem title or tag..."
                className="w-full bg-zinc-950/80 border border-white/[0.08] text-white placeholder-zinc-500 text-xs font-medium rounded-xl pl-9.5 pr-8 py-2.5 focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              className="w-full sm:w-auto bg-zinc-950/80 border border-white/[0.08] text-zinc-300 text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-400/50 cursor-pointer"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-center font-medium text-xs">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-16 text-center text-zinc-400 text-xs flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading problem set...</span>
          </div>
        ) : problems.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-16 text-center text-zinc-500 text-xs">
            No problems found matching your current filter.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-950/40">
                    <th scope="col" className="px-6 py-3.5">Title</th>
                    <th scope="col" className="px-6 py-3.5">Difficulty</th>
                    <th scope="col" className="px-6 py-3.5">Topic Tags</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs font-medium">
                  {problems.map((problem) => (
                    <tr key={problem._id} className="hover:bg-zinc-800/40 transition-colors group">
                      <td className="px-6 py-4">
                        <Link 
                          to={`/problems/${problem.slug}`} 
                          className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${getDifficultyBadge(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {problem.topics.map((topic, index) => (
                            <span key={index} className="bg-zinc-950 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded border border-white/[0.05]">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/problems/${problem.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/[0.06] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                        >
                          <span>Solve</span>
                          <span>→</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProblemsList;
