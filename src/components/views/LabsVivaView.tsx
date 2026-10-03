import React, { useState } from 'react';
import {
  FlaskConical,
  Code,
  Terminal,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2
} from 'lucide-react';
import { LAB_EXPERIMENTS } from '../../data/labsData';
import { LabExperiment } from '../../types';
import { askAITutor } from '../../utils/geminiClient';

export const LabsVivaView: React.FC = () => {
  const [selectedLabId, setSelectedLabId] = useState<string>('kcs351');
  const [selectedExpId, setSelectedExpId] = useState<string>(LAB_EXPERIMENTS[0]?.id || '');
  const [vivaQuery, setVivaQuery] = useState('');
  const [vivaResponse, setVivaResponse] = useState<string | null>(null);
  const [vivaLoading, setVivaLoading] = useState(false);

  const activeExp = LAB_EXPERIMENTS.find((e) => e.id === selectedExpId) || LAB_EXPERIMENTS[0];

  const handleAskViva = async (question: string) => {
    setVivaLoading(true);
    try {
      const res = await askAITutor({
        prompt: `Act as a strict external university practical examiner conducting a Viva Voce for AKTU 3rd Semester Lab course.
Experiment: "${activeExp.title}"
Question: "${question}"
Provide a high-scoring, precise examiner model answer with key terminology the student MUST speak to get full 10/10 marks.`,
        mode: 'EXAM_PREP',
        subjectName: activeExp.labSubjectId.toUpperCase(),
        topicName: activeExp.title
      });
      setVivaResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setVivaLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Labs, Experiments & Viva Voce
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            AKTU Practical Syllabi: Data Structures Lab (KCS-351), COA Lab (KCS-352), Discrete Structures Lab (KCS-353).
          </p>
        </div>

        {/* Lab selector */}
        <div className="flex items-center gap-2">
          {[
            { id: 'kcs351', label: 'DS Lab (KCS-351)' },
            { id: 'kcs352', label: 'COA Lab (KCS-352)' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLabId(l.id);
                const found = LAB_EXPERIMENTS.find((e) => e.labSubjectId === l.id);
                if (found) setSelectedExpId(found.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedLabId === l.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experiment Container */}
      {activeExp && (
        <div className="space-y-6">
          {/* Experiment Header */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60 font-bold">
                EXPERIMENT {activeExp.experimentNumber}
              </span>
              <span className="text-xs font-mono text-zinc-500">Language: {activeExp.language}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {activeExp.title}
            </h2>
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300">
              <strong className="text-white">Objective:</strong> {activeExp.objective}
            </div>
          </div>

          {/* Theory & Algorithm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <h3 className="text-xs font-mono uppercase text-red-400 font-bold">
                Laboratory Theory
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line">
                {activeExp.theory}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <h3 className="text-xs font-mono uppercase text-zinc-400 font-bold">
                Execution Algorithm
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line">
                {activeExp.algorithm}
              </p>
            </div>
          </div>

          {/* Source Code & Output Terminal */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden space-y-2">
            <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Code className="w-4 h-4 text-red-400" />
                <span>Source Code ({activeExp.language})</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">GCC Compiler Ready</span>
            </div>
            <pre className="p-5 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed bg-black/60">
              {activeExp.code}
            </pre>

            {/* Output */}
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Verified Execution Output:</span>
              </div>
              <pre className="p-3 rounded-lg bg-black text-xs font-mono text-emerald-300 whitespace-pre">
                {activeExp.sampleOutput}
              </pre>
            </div>
          </div>

          {/* Interactive Viva Voce Questions */}
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" />
              <span>External Examiner Viva Voce Preparation</span>
            </h3>

            <div className="space-y-3">
              {activeExp.vivaQuestions.map((vq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2"
                >
                  <div className="text-xs font-bold text-white flex items-start gap-2">
                    <span className="text-red-400 font-mono">Q{idx + 1}:</span>
                    <span>{vq.question}</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed font-mono pl-6 border-l border-zinc-800">
                    <strong className="text-emerald-400">Examiner Answer:</strong> {vq.answer}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Viva Simulator */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-2">
              <label className="text-xs font-mono text-zinc-400">
                Ask AI External Examiner a custom Viva question:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={vivaQuery}
                  onChange={(e) => setVivaQuery(e.target.value)}
                  placeholder="e.g. 'What is the advantage of two's complement in hardware multiplication?'"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={() => handleAskViva(vivaQuery)}
                  disabled={vivaLoading || !vivaQuery.trim()}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
                >
                  {vivaLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Ask</span>}
                </button>
              </div>

              {vivaResponse && (
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed font-mono whitespace-pre-line animate-in fade-in">
                  {vivaResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
