import React, { useEffect, useState } from 'react';
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
    return <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex items-center justify-center text-zinc-400 text-xs">Loading problem workspace...</div>;
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex items-center justify-center p-4">
        <div className="text-rose-400 bg-rose-500/10 p-6 rounded-2xl border border-rose-500/30 max-w-md w-full text-center space-y-2">
          <h2 className="text-lg font-bold text-white">Unable to Load Challenge</h2>
          <p className="text-xs text-zinc-400">{error || 'Problem not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-[#07080c] overflow-hidden">
      {/* Left Pane: Description */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-6 border-r border-white/[0.06] overflow-y-auto custom-scrollbar bg-zinc-950/40">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{problem.title}</h1>
        <div className="flex items-center space-x-3 mb-6 text-xs">
          <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold border ${
            problem.difficulty === 'Easy'
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              : problem.difficulty === 'Medium'
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
          }`}>
            {problem.difficulty}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {problem.topics.map((t, i) => (
              <span key={i} className="text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.05] text-[10px] font-mono">{t}</span>
            ))}
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap">
          {problem.description}
        </div>

        {problem.examples && problem.examples.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-white mb-3 tracking-wide uppercase font-mono">Examples</h2>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="mb-4 bg-zinc-900/60 p-3.5 rounded-xl border border-white/[0.06] font-mono text-xs space-y-1.5">
                <div><span className="text-zinc-500 font-bold">Input:</span> <span className="text-zinc-200">{ex.input}</span></div>
                <div><span className="text-zinc-500 font-bold">Output:</span> <span className="text-zinc-200">{ex.output}</span></div>
                {ex.explanation && <div><span className="text-zinc-500 font-bold">Explanation:</span> <span className="text-zinc-400">{ex.explanation}</span></div>}
              </div>
            ))}
          </div>
        )}

        {problem.constraints && problem.constraints.length > 0 && (
          <div className="mt-6 mb-8">
            <h2 className="text-sm font-bold text-white mb-3 tracking-wide uppercase font-mono">Constraints</h2>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 font-mono text-xs bg-zinc-900/60 p-3.5 rounded-xl border border-white/[0.06]">
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
        <div className="h-12 bg-zinc-900/90 border-b border-white/[0.06] flex items-center justify-between px-4">
          <select 
            value={language}
            onChange={handleLanguageChange}
            className="bg-zinc-950 border border-white/[0.08] text-zinc-300 text-xs rounded-lg focus:outline-none focus:border-cyan-400/50 p-1.5 font-semibold"
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
              className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
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
          <div className="h-12 bg-zinc-800 border-t border-zinc-700 flex items-center px-4 text-zinc-300 text-sm font-medium animate-pulse">
            {actionMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
