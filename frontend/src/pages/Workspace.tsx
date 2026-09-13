import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { fetchProblem, Problem, runProblemCode, submitProblemCode, RunResult, SubmissionResult } from '../api/problems';

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
  
  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  
  // Console Tab & UI State
  const [consoleTab, setConsoleTab] = useState<'testcase' | 'run' | 'submission'>('testcase');
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

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
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && problem) {
      setCodes(prev => ({ ...prev, [language]: value }));
      localStorage.setItem(`code_${problem.slug}_${language}`, value);
    }
  };

  const handleResetCode = () => {
    if (!problem) return;
    const defaultCode = problem.starterCode[language] || `// No starter code for ${language}`;
    setCodes(prev => ({ ...prev, [language]: defaultCode }));
    localStorage.setItem(`code_${problem.slug}_${language}`, defaultCode);
  };

  const handleRun = async () => {
    if (!problem || !slug || isRunning || isSubmitting) return;
    const currentCode = codes[language] || '';
    
    setIsRunning(true);
    setRunResult(null);
    setConsoleTab('run');
    setIsConsoleOpen(true);
    setActiveTestCaseIndex(0);

    try {
      const result = await runProblemCode(slug, currentCode, language);
      setRunResult(result);
    } catch (err: any) {
      setRunResult({
        status: 'SYSTEM_ERROR',
        passedTests: 0,
        totalTests: 0,
        testResults: [],
        errorMessage: err.message || 'Failed to execute code.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem || !slug || isRunning || isSubmitting) return;
    const currentCode = codes[language] || '';

    setIsSubmitting(true);
    setSubmissionResult(null);
    setConsoleTab('submission');
    setIsConsoleOpen(true);

    try {
      const result = await submitProblemCode(slug, currentCode, language);
      setSubmissionResult(result);
    } catch (err: any) {
      setSubmissionResult({
        status: 'SYSTEM_ERROR',
        passedTests: 0,
        totalTests: 0,
        errorMessage: err.message || 'Failed to evaluate submission.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex flex-col items-center justify-center text-zinc-400 text-xs space-y-3">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span>Loading problem workspace...</span>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#07080c] flex items-center justify-center p-4">
        <div className="text-rose-400 bg-rose-500/10 p-8 rounded-2xl border border-rose-500/30 max-w-md w-full text-center space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-white">Problem Not Found</h2>
          <p className="text-xs text-zinc-400">{error || 'Unable to load challenge details.'}</p>
          <Link
            to="/problems"
            className="inline-block py-2 px-5 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs border border-white/[0.08]"
          >
            ← Back to Problems List
          </Link>
        </div>
      </div>
    );
  }

  const sampleTestCases = problem.testCases?.filter(tc => !tc.isHidden) || [];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-[#07080c] overflow-hidden">
      
      {/* Left Pane: Problem Description */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-6 border-r border-white/[0.06] overflow-y-auto custom-scrollbar bg-zinc-950/40 space-y-6">
        
        {/* Header Title & Difficulty */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link
              to="/problems"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium flex items-center gap-1"
            >
              <span>← Problems</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">{problem.title}</h1>
          
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span
              className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-xs border ${
                problem.difficulty === 'Easy'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : problem.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
              }`}
            >
              {problem.difficulty}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {problem.topics.map((t, i) => (
                <span key={i} className="text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.05] text-[10px] font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap">
          {problem.description}
        </div>

        {/* Examples Section */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Sample Examples</h2>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="bg-zinc-900/60 p-4 rounded-xl border border-white/[0.06] font-mono text-xs space-y-2">
                <div className="text-zinc-400 font-bold text-[11px]">Example {idx + 1}:</div>
                <div className="space-y-1">
                  <div><span className="text-zinc-500 font-bold">Input:</span> <span className="text-zinc-200">{ex.input}</span></div>
                  <div><span className="text-zinc-500 font-bold">Output:</span> <span className="text-zinc-200">{ex.output}</span></div>
                  {ex.explanation && (
                    <div className="text-zinc-400 text-[11px] pt-1 border-t border-white/[0.04]">
                      <span className="text-zinc-500 font-bold">Explanation:</span> {ex.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Constraints</h2>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 font-mono text-xs bg-zinc-900/60 p-4 rounded-xl border border-white/[0.06]">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Right Pane: Code Editor & Execution Console */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col h-full bg-[#12131a] relative">
        
        {/* Editor Toolbar */}
        <div className="h-12 bg-zinc-950 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-zinc-900 border border-white/[0.08] text-zinc-300 text-xs rounded-lg focus:outline-none focus:border-cyan-400/50 px-2.5 py-1.5 font-semibold cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>

            <button
              onClick={handleResetCode}
              title="Reset code to starter template"
              className="text-zinc-500 hover:text-zinc-300 text-xs font-medium px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="flex items-center gap-2.5">
            {/* Run Button */}
            <button 
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-200 hover:text-white px-4 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.08] transition-all shadow-sm"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Run</span>
                </>
              )}
            </button>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || isRunning}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 text-zinc-950 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-grow relative overflow-hidden">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={codes[language] || ''}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              wordWrap: 'on',
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Bottom Testcase & Execution Console Panel */}
        {isConsoleOpen && (
          <div className="h-64 sm:h-72 bg-zinc-950 border-t border-white/[0.08] flex flex-col shrink-0 z-10 shadow-2xl">
            
            {/* Console Tabs Header */}
            <div className="h-10 bg-zinc-900/90 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConsoleTab('testcase')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    consoleTab === 'testcase'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Sample Testcases
                </button>

                <button
                  onClick={() => setConsoleTab('run')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    consoleTab === 'run'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>Run Result</span>
                  {runResult && (
                    <span className={`w-2 h-2 rounded-full ${runResult.status === 'ACCEPTED' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  )}
                </button>

                <button
                  onClick={() => setConsoleTab('submission')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    consoleTab === 'submission'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>Submission</span>
                  {submissionResult && (
                    <span className={`w-2 h-2 rounded-full ${submissionResult.status === 'ACCEPTED' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 text-xs"
                  title="Collapse console"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Console Body Content */}
            <div className="p-4 overflow-y-auto custom-scrollbar flex-grow font-mono text-xs">
              
              {/* TAB 1: Sample Testcases */}
              {consoleTab === 'testcase' && (
                <div className="space-y-4">
                  {sampleTestCases.length === 0 ? (
                    <div className="text-zinc-500 text-xs py-4 text-center">
                      No sample test cases specified for this problem.
                    </div>
                  ) : (
                    <>
                      {/* Case selector pills */}
                      <div className="flex items-center gap-2">
                        {sampleTestCases.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTestCaseIndex(idx)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              activeTestCaseIndex === idx
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-zinc-900 text-zinc-400 border border-white/[0.05] hover:text-zinc-200'
                            }`}
                          >
                            Case {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Active Case Details */}
                      {sampleTestCases[activeTestCaseIndex] && (
                        <div className="space-y-3">
                          <div>
                            <div className="text-zinc-500 text-[11px] mb-1">Input:</div>
                            <div className="bg-zinc-900/90 p-2.5 rounded-lg text-zinc-200 border border-white/[0.05] whitespace-pre-wrap break-all">
                              {sampleTestCases[activeTestCaseIndex].input}
                            </div>
                          </div>
                          <div>
                            <div className="text-zinc-500 text-[11px] mb-1">Expected Output:</div>
                            <div className="bg-zinc-900/90 p-2.5 rounded-lg text-zinc-200 border border-white/[0.05] whitespace-pre-wrap break-all">
                              {sampleTestCases[activeTestCaseIndex].expectedOutput}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* TAB 2: Run Result */}
              {consoleTab === 'run' && (
                <div>
                  {isRunning ? (
                    <div className="py-10 flex flex-col items-center justify-center space-y-2 text-zinc-400 text-xs">
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>Executing solution against visible test cases...</span>
                    </div>
                  ) : !runResult ? (
                    <div className="py-10 text-center text-zinc-500 text-xs">
                      Click "Run" to test your solution against visible sample cases.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Status Banner */}
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-base font-bold ${
                              runResult.status === 'ACCEPTED' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {runResult.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400">
                          Passed: <strong className="text-white">{runResult.passedTests}</strong> / {runResult.totalTests} cases
                        </div>
                      </div>

                      {/* Error Message if Compilation / Runtime Error */}
                      {runResult.errorMessage && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs whitespace-pre-wrap break-all">
                          {runResult.errorMessage}
                        </div>
                      )}

                      {/* Test cases result tabs */}
                      {runResult.testResults && runResult.testResults.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {runResult.testResults.map((tr, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveTestCaseIndex(idx)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                  activeTestCaseIndex === idx
                                    ? tr.passed
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-zinc-900 text-zinc-400 border border-white/[0.05]'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${tr.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                <span>Case {idx + 1}</span>
                              </button>
                            ))}
                          </div>

                          {/* Selected Case Result Details */}
                          {runResult.testResults[activeTestCaseIndex] && (
                            <div className="space-y-3 bg-zinc-900/40 p-3 rounded-xl border border-white/[0.05]">
                              <div>
                                <div className="text-zinc-500 text-[11px] mb-0.5">Input:</div>
                                <div className="bg-zinc-950 p-2 rounded text-zinc-200 border border-white/[0.04] whitespace-pre-wrap break-all">
                                  {runResult.testResults[activeTestCaseIndex].input}
                                </div>
                              </div>
                              <div>
                                <div className="text-zinc-500 text-[11px] mb-0.5">Expected Output:</div>
                                <div className="bg-zinc-950 p-2 rounded text-zinc-200 border border-white/[0.04] whitespace-pre-wrap break-all">
                                  {runResult.testResults[activeTestCaseIndex].expectedOutput}
                                </div>
                              </div>
                              <div>
                                <div className="text-zinc-500 text-[11px] mb-0.5">Your Output:</div>
                                <div className={`p-2 rounded border whitespace-pre-wrap break-all ${
                                  runResult.testResults[activeTestCaseIndex].passed
                                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                                    : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                                }`}>
                                  {runResult.testResults[activeTestCaseIndex].actualOutput || 'No output produced'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Submission Result */}
              {consoleTab === 'submission' && (
                <div>
                  {isSubmitting ? (
                    <div className="py-10 flex flex-col items-center justify-center space-y-2 text-zinc-400 text-xs">
                      <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span>Judging submission across all hidden test cases...</span>
                    </div>
                  ) : !submissionResult ? (
                    <div className="py-10 text-center text-zinc-500 text-xs">
                      Click "Submit" to evaluate your solution against the full hidden test suite.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Large Result Banner */}
                      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        submissionResult.status === 'ACCEPTED'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {submissionResult.status === 'ACCEPTED' ? '🎉' : '❌'}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold tracking-tight">
                              {submissionResult.status.replace(/_/g, ' ')}
                            </h3>
                            <p className="text-xs text-zinc-400 font-sans">
                              {submissionResult.status === 'ACCEPTED'
                                ? 'Congratulations! All test cases passed successfully.'
                                : 'Solution failed to pass the required test suite.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Testcases</span>
                            <span className="font-bold text-white">
                              {submissionResult.passedTests} / {submissionResult.totalTests} Passed
                            </span>
                          </div>
                          {submissionResult.executionTime !== undefined && (
                            <div>
                              <span className="text-zinc-500 block text-[10px]">Runtime</span>
                              <span className="font-bold text-white">{submissionResult.executionTime}ms</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Error details if any */}
                      {submissionResult.errorMessage && (
                        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs whitespace-pre-wrap break-all">
                          {submissionResult.errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Toggle Console Pill if collapsed */}
        {!isConsoleOpen && (
          <div className="h-8 bg-zinc-950 border-t border-white/[0.06] flex items-center justify-between px-4 shrink-0">
            <button
              onClick={() => setIsConsoleOpen(true)}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
            >
              <span>Console ▲</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Workspace;
