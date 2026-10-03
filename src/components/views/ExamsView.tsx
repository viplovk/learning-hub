import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send,
  Loader2
} from 'lucide-react';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';
import { QUESTION_BANK } from '../../data/questionBank';
import { askAITutor } from '../../utils/geminiClient';

export const ExamsView: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('kcs301');
  const [selectedTopic, setSelectedTopic] = useState<string>('Stack & Infix to Postfix Conversion');
  const [targetMarks, setTargetMarks] = useState<2 | 5 | 10>(10);
  const [generatedAnswer, setGeneratedAnswer] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSubject = OFFICIAL_SUBJECTS.find((s) => s.id === selectedSubjectId);

  const handleGenerateAnswer = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate a high-scoring AKTU University examination model answer for:
Subject: ${selectedSubject?.name} (${selectedSubject?.code})
Topic: ${selectedTopic}
Target Marks: ${targetMarks} Marks

Format strictly according to AKTU scoring criteria:
${
  targetMarks === 2
    ? 'Produce a crisp 2-Mark answer: 1-2 sentence precise technical definition + governing formula or time complexity constraint.'
    : targetMarks === 5
    ? 'Produce a 5-Mark answer: Definition, neat ASCII architecture diagram or flowchart, step-by-step algorithm, and 2 key advantages.'
    : 'Produce a comprehensive 10-Mark answer: Concept introduction, detailed structural mechanism with ASCII diagram, worked numerical / trace example, algorithm in C/pseudocode, advantages/disadvantages, and conclusion.'
}`;

      const res = await askAITutor({
        prompt,
        mode: 'EXAM_PREP',
        subjectName: selectedSubject?.name,
        topicName: selectedTopic
      });
      setGeneratedAnswer(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-600/20 text-red-500">
                <Award className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                AKTU Exam Preparation Mode
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Exam Countdown, Marks-specific Model Answer Generator (2/5/10 marks), and High-Yield Question Bank.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">AKTU Odd Semester</div>
              <div className="text-sm font-bold text-white">Upcoming Session</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Answer Generator Box */}
      <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>AKTU Exam Model Answer Generator</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Select a subject, topic, and mark weightage to generate an exam-calibrated model answer with rubrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Subject Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-zinc-400">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                const firstTopic = OFFICIAL_SUBJECTS.find((s) => s.id === e.target.value)?.units[0]?.topics[0]?.name;
                if (firstTopic) setSelectedTopic(firstTopic);
              }}
              className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-red-600"
            >
              {OFFICIAL_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-zinc-400">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full text-xs bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-red-600 truncate"
            >
              {selectedSubject?.units.flatMap((u) => u.topics).map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Marks Weightage */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-zinc-400">Marks Target</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[2, 5, 10].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTargetMarks(m as 2 | 5 | 10)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    targetMarks === m
                      ? 'bg-red-600 text-white shadow-md shadow-red-950'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {m} Marks
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateAnswer}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer shadow-lg shadow-red-950"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating University Model Answer...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate {targetMarks}-Mark Exam Answer</span>
            </>
          )}
        </button>

        {/* Generated Answer Display */}
        {generatedAnswer && (
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-red-400">
                Generated Model Answer ({targetMarks} Marks Format)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                AKTU Evaluator Calibrated
              </span>
            </div>
            <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono whitespace-pre-line">
              {generatedAnswer}
            </div>
          </div>
        )}
      </div>

      {/* Previous-Year Paper Archive Summary */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white tracking-tight">
          Previous-Year Papers Historical Analysis (2020-2024)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OFFICIAL_SUBJECTS.map((sub) => {
            const pyqTotal = sub.units.reduce((acc, u) => acc + u.pyqCount, 0);
            return (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-400">{sub.code}</span>
                  <span className="text-[11px] font-mono text-zinc-500">{pyqTotal} PYQs Analyzed</span>
                </div>
                <div className="text-xs font-bold text-white">{sub.shortName}: {sub.name}</div>
                <div className="text-[11px] text-zinc-400">
                  Top repeated topics: Unit 1 & Unit 3 (highest mark density)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
