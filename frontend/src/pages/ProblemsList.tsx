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

  const difficultyBadges: Record<string, { bg: string; text: string; border: string }> = {
    Easy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    Medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    Hard: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-dark-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Filter Bar */}
        <div className="bg-dark-900 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">DSA PROBLEM REPOSITORY</span>
            <h1 className="text-2xl font-black text-white">Practice Arena Problems</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by title or topic..."
                className="w-full bg-dark-950 border border-zinc-800 text-white placeholder-gray-500 text-xs font-mono rounded-xl p-3 pr-8 focus:outline-none focus:border-cyan-400 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              className="w-full sm:w-auto bg-dark-950 border border-zinc-800 text-gray-200 text-xs font-semibold rounded-xl p-3 focus:outline-none focus:border-cyan-400"
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
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-center font-semibold text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="bg-dark-900 p-16 rounded-2xl border border-zinc-800 text-center text-cyan-400 font-mono text-sm flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading problem set...</span>
          </div>
        ) : problems.length === 0 ? (
          <div className="bg-dark-900 p-16 rounded-2xl border border-zinc-800 text-center text-gray-400 font-mono text-sm">
            No problems found matching your search filter.
          </div>
        ) : (
          <div className="bg-dark-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-xs font-mono uppercase text-gray-400">
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="px-6 py-4">Difficulty</th>
                    <th scope="col" className="px-6 py-4">Topic Tags</th>
                    <th scope="col" className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm font-medium">
                  {problems.map((problem) => {
                    const badge = difficultyBadges[problem.difficulty] || { bg: 'bg-zinc-800', text: 'text-gray-300', border: 'border-zinc-700' };
                    return (
                      <tr key={problem._id} className="hover:bg-zinc-800/40 transition-colors group">
                        <td className="px-6 py-5">
                          <Link 
                            to={`/problems/${problem.slug}`} 
                            className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors flex items-center gap-2"
                          >
                            <span>{problem.title}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-1.5">
                            {problem.topics.map((topic, index) => (
                              <span key={index} className="bg-dark-950 text-gray-400 text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-zinc-800">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Link
                            to={`/problems/${problem.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-850 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-gray-200 hover:text-cyan-400 transition-colors"
                          >
                            <span>Solve Solo</span>
                            <span>→</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
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


