import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProblems, ProblemListItem } from '../api/problems';

const ProblemsList: React.FC = () => {
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  const loadProblems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProblems(difficultyFilter, topicFilter);
      setProblems(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load problems.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyFilter, topicFilter]);

  const difficultyColors: Record<string, string> = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-dark-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-dark-800 p-4 rounded-lg border border-dark-700 gap-4">
          <h1 className="text-2xl font-bold text-white">Problems</h1>
          <div className="flex space-x-4">
            <select
              className="bg-dark-900 border border-dark-600 text-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              type="text"
              placeholder="Filter by topic..."
              className="bg-dark-900 border border-dark-600 text-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="text-center text-gray-400 py-12 bg-dark-800 rounded-lg border border-dark-700">
            No problems found matching your criteria.
          </div>
        ) : (
          <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-dark-700 text-gray-400 text-sm uppercase">
                <tr>
                  <th scope="col" className="px-6 py-4">Title</th>
                  <th scope="col" className="px-6 py-4">Difficulty</th>
                  <th scope="col" className="px-6 py-4">Topics</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem._id} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/problems/${problem.slug}`} className="text-primary-400 hover:text-primary-300">
                        {problem.title}
                      </Link>
                    </td>
                    <td className={`px-6 py-4 font-semibold ${difficultyColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {problem.topics.map((topic, index) => (
                          <span key={index} className="bg-dark-900 text-gray-300 text-xs px-2.5 py-0.5 rounded border border-dark-600">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsList;
