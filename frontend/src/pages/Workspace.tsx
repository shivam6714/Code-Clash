import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { fetchProblem, Problem } from '../api/problems';

const SUPPORTED_LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
];

const Workspace: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].id);
  const [codes, setCodes] = useState<Record<string, string>>({});
  
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      try {
        const data = await fetchProblem(slug);
        setProblem(data);
        
        // Initialize codes from starter code
        const initialCodes: Record<string, string> = {};
        for (const lang of SUPPORTED_LANGUAGES) {
          initialCodes[lang.id] = data.starterCode[lang.id] || `// No starter code for ${lang.name}`;
        }
        
        // Check local storage for saved code
        for (const lang of SUPPORTED_LANGUAGES) {
          const savedCode = localStorage.getItem(`code_${data.slug}_${lang.id}`);
          if (savedCode) {
            initialCodes[lang.id] = savedCode;
          }
        }
        
        setCodes(initialCodes);
      } catch (err: any) {
        setError(err.message || 'Failed to load problem.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setActionMessage(null);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && problem) {
      setCodes(prev => ({ ...prev, [language]: value }));
      localStorage.setItem(`code_${problem.slug}_${language}`, value);
    }
  };

  const handleRun = () => {
    setActionMessage("Code execution is coming in the next phase.");
  };

  const handleSubmit = () => {
    setActionMessage("Submission system is currently being implemented.");
  };

  if (isLoading) {
    return <div className="min-h-[calc(100vh-80px)] bg-dark-900 flex items-center justify-center text-gray-400">Loading problem...</div>;
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-dark-900 flex items-center justify-center">
        <div className="text-red-500 bg-red-500/10 p-6 rounded-lg border border-red-500/50">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error || 'Problem not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-dark-900 overflow-hidden">
      {/* Left Pane: Description */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-6 border-r border-dark-700 overflow-y-auto custom-scrollbar">
        <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
        <div className="flex space-x-4 mb-6 text-sm">
          <span className={`font-semibold ${problem.difficulty === 'Easy' ? 'text-green-400' : problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
            {problem.difficulty}
          </span>
          <div className="flex space-x-2">
            {problem.topics.map((t, i) => (
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
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="mb-6 bg-dark-800 p-4 rounded-lg border border-dark-700 font-mono text-sm">
                <div className="mb-2"><span className="text-gray-400 font-bold">Input:</span> <span className="text-gray-300">{ex.input}</span></div>
                <div className="mb-2"><span className="text-gray-400 font-bold">Output:</span> <span className="text-gray-300">{ex.output}</span></div>
                {ex.explanation && <div><span className="text-gray-400 font-bold">Explanation:</span> <span className="text-gray-300">{ex.explanation}</span></div>}
              </div>
            ))}
          </div>
        )}

        {problem.constraints && problem.constraints.length > 0 && (
          <div className="mt-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Constraints</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 font-mono text-sm bg-dark-800 p-4 rounded-lg border border-dark-700">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Pane: Editor */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col h-full bg-[#1e1e1e]">
        {/* Editor Header */}
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
              className="bg-dark-700 hover:bg-dark-600 text-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Run
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Editor Body */}
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
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        
        {/* Action Message Bar */}
        {actionMessage && (
          <div className="h-12 bg-blue-900/20 border-t border-blue-800/50 flex items-center px-4 text-blue-300 text-sm font-medium animate-pulse">
            {actionMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
