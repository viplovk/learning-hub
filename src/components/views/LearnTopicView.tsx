import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Award,
  HelpCircle,
  RotateCcw,
  Bookmark,
  ChevronRight,
  Code,
  Layers,
  ArrowRight,
  Eye,
  Send,
  Loader2,
  Check
} from 'lucide-react';
import { TopicConcept, Subject } from '../../types';
import { evaluateFeynmanExplanation, FeynmanEvaluation } from '../../utils/geminiClient';

interface LearnTopicViewProps {
  topic: TopicConcept;
  subject: Subject;
  onNavigatePractice: () => void;
  onNavigateRevision: () => void;
  onNavigateTutor: (initialPrompt?: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const LearnTopicView: React.FC<LearnTopicViewProps> = ({
  topic,
  subject,
  onNavigatePractice,
  onNavigateRevision,
  onNavigateTutor,
  isBookmarked,
  onToggleBookmark
}) => {
  const [explanationMode, setExplanationMode] = useState<'QUICK' | 'DEEP'>('DEEP');
  const [showActiveRecallAnswer, setShowActiveRecallAnswer] = useState(false);
  const [activeRecallInput, setActiveRecallInput] = useState('');

  // Feynman Technique State
  const [feynmanInput, setFeynmanInput] = useState('');
  const [feynmanLoading, setFeynmanLoading] = useState(false);
  const [feynmanResult, setFeynmanResult] = useState<FeynmanEvaluation | null>(null);

  const handleFeynmanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feynmanInput.trim() || feynmanLoading) return;

    setFeynmanLoading(true);
    try {
      const evaluation = await evaluateFeynmanExplanation(
        topic.name,
        feynmanInput,
        topic.coreConceptsList
      );
      setFeynmanResult(evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setFeynmanLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-mono text-red-400 font-bold">{subject.code}</span>
          <span>/</span>
          <span className="text-zinc-300 font-medium">{subject.shortName}</span>
          <span>/</span>
          <span className="text-white font-semibold truncate max-w-xs">{topic.name}</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-red-950/80 border-red-800 text-red-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Bookmark this topic"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Explanation Mode Toggle */}
          <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs">
            <button
              onClick={() => setExplanationMode('QUICK')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                explanationMode === 'QUICK'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Quick
            </button>
            <button
              onClick={() => setExplanationMode('DEEP')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                explanationMode === 'DEEP'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Deep Concept
            </button>
          </div>
        </div>
      </div>

      {/* Main Topic Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              topic.importance === 'CRITICAL'
                ? 'bg-red-950 text-red-300 border border-red-800/60'
                : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {topic.importance} PRIORITY
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            {topic.difficulty} DIFFICULTY
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            ~{topic.estimatedMinutes} mins study
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {topic.name}
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
          {explanationMode === 'QUICK' ? topic.quickExplanation : topic.deepExplanation}
        </p>
      </div>

      {/* Section 02 — Why Does It Matter? */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 02 — Why Does It Matter in the Real World?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {topic.whyItMatters}
        </p>
      </div>

      {/* Section 03 & 04 — Prerequisites & Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prerequisites */}
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase text-zinc-400">
            03 — Prerequisites
          </h3>
          <ul className="space-y-1 text-xs text-zinc-300">
            {topic.prerequisites.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Concepts Invariants */}
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase text-zinc-400">
            04 — Core Concept Invariants
          </h3>
          <ul className="space-y-1 text-xs text-zinc-300">
            {topic.coreConceptsList.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 05 — Visual Explanation / Architecture Diagram */}
      {topic.visualDiagram && (
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-500" /> 05 — Visual Architecture & Layout
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              {topic.visualDiagramType || 'Architecture'}
            </span>
          </div>
          <pre className="p-4 rounded-xl bg-black/80 border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed whitespace-pre selection:bg-red-900 selection:text-white">
            {topic.visualDiagram}
          </pre>
        </div>
      )}

      {/* Section 06 — Worked Step-by-Step Example */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
          <Code className="w-3.5 h-3.5" /> 06 — Worked Step-by-Step Problem
        </h3>

        <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200">
          Problem: {topic.workedExample.problem}
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-mono text-zinc-400 uppercase">Solution Trace:</h4>
          <div className="space-y-1">
            {topic.workedExample.stepByStepSolution.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-zinc-300 font-mono p-1.5 rounded hover:bg-zinc-800/50"
              >
                <span className="text-red-500 font-bold shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-xs text-zinc-300 leading-relaxed">
          <strong className="text-red-400">Insight:</strong> {topic.workedExample.explanation}
        </div>
      </div>

      {/* Section 07 — Common Misconceptions */}
      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" /> 07 — Common Mistakes & Misconceptions in Exams
        </h3>
        <ul className="space-y-2 text-xs text-zinc-300">
          {topic.commonMistakes.map((m, idx) => (
            <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
              <span className="text-amber-500 font-bold shrink-0">✕</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 08 — AKTU Exam Perspective (2 / 5 / 10 marks) */}
      <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" /> 08 — AKTU Exam Perspective & Marking Rubrics
          </h3>
          <div className="flex items-center gap-1.5">
            {topic.examPerspective.highYieldKeywords.map((kw, i) => (
              <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 2 Marks Pattern */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Section A: 2 Marks
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {topic.examPerspective.twoMarks}
            </p>
          </div>

          {/* 5 Marks Pattern */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
              Section B: 5 Marks
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {topic.examPerspective.fiveMarks}
            </p>
          </div>

          {/* 10 Marks Pattern */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/50">
              Section C: 10 Marks
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {topic.examPerspective.tenMarks}
            </p>
          </div>
        </div>
      </div>

      {/* Section 09 — Active Recall Mode */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-red-500" /> 09 — Active Recall Retrieval Test
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">Self-testing retrieval practice</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <p className="text-xs sm:text-sm font-semibold text-zinc-100">
            Question: {topic.activeRecallPrompt.question}
          </p>
        </div>

        {/* User Writes Retrieval Answer First */}
        {!showActiveRecallAnswer && (
          <div className="space-y-3">
            <textarea
              rows={3}
              value={activeRecallInput}
              onChange={(e) => setActiveRecallInput(e.target.value)}
              placeholder="Formulate your concise answer in your own words before checking the model answer..."
              className="w-full text-xs p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            <button
              onClick={() => setShowActiveRecallAnswer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Reveal Ideal Model Answer</span>
            </button>
          </div>
        )}

        {/* Revealed Ideal Answer */}
        {showActiveRecallAnswer && (
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                ✓ Ideal University Model Answer
              </span>
              <button
                onClick={() => setShowActiveRecallAnswer(false)}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                Hide
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
              {topic.activeRecallPrompt.idealAnswer}
            </p>

            <div className="pt-2 border-t border-zinc-800">
              <h5 className="text-[11px] font-mono text-zinc-400 mb-1">Key Marking Points:</h5>
              <ul className="space-y-1 text-xs text-zinc-300">
                {topic.activeRecallPrompt.keyPoints.map((kp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Section 10 — Feynman Technique Assessment */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 10 — Feynman Technique (Explain in Simple Terms)
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">Test if you truly understand</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {topic.feynmanPrompt}
        </p>

        <form onSubmit={handleFeynmanSubmit} className="space-y-3">
          <textarea
            rows={4}
            value={feynmanInput}
            onChange={(e) => setFeynmanInput(e.target.value)}
            placeholder="Type your explanation here in plain, intuitive English as if teaching a peer..."
            className="w-full text-xs p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Evaluates key concept coverage and identifies misconceptions
            </span>
            <button
              type="submit"
              disabled={feynmanLoading || !feynmanInput.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white transition-colors cursor-pointer"
            >
              {feynmanLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Check Explanation</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Feynman Diagnostic Output */}
        {feynmanResult && (
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-white">Diagnostic Feedback</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> What You Captured Well:
                </span>
                <ul className="space-y-1 text-zinc-300 pl-4 list-disc">
                  {feynmanResult.correctPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Concepts to Clarify:
                </span>
                <ul className="space-y-1 text-zinc-300 pl-4 list-disc">
                  {feynmanResult.missingConcepts.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900 text-xs text-zinc-300 leading-relaxed border border-zinc-800">
              <strong>Recommendation:</strong> {feynmanResult.nextSteps}
            </div>
          </div>
        )}
      </div>

      {/* Section 11 & 12 — Practice & Flashcard Study */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Reinforce This Concept</h4>
          <p className="text-xs text-zinc-400">
            Test yourself with practice questions or review flashcards.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onNavigatePractice}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Practice Questions</span>
          </button>
          <button
            onClick={onNavigateRevision}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Review Flashcards</span>
          </button>
        </div>
      </div>
    </div>
  );
};
