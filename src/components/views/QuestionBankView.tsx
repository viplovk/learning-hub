import React, { useState } from 'react';
import {
  HelpCircle,
  Filter,
  Search,
  Award,
  Flame,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles
} from 'lucide-react';
import { QUESTION_BANK } from '../../data/questionBank';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';
import { QuestionBankItem } from '../../types';

export const QuestionBankView: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedMarks, setSelectedMarks] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<QuestionBankItem | null>(null);

  const filteredQuestions = QUESTION_BANK.filter((q) => {
    if (selectedSubjectId !== 'all' && q.subjectId !== selectedSubjectId) return false;
    if (selectedMarks !== 'all' && q.marks.toString() !== selectedMarks) return false;
    if (
      searchQuery &&
      !q.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !q.topicName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              AKTU Question Bank Archive
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            Categorized previous-year exam questions (2, 5 & 10 marks), repetition frequency, and official marking schemes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600"
          >
            <option value="all">All Subjects</option>
            {OFFICIAL_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.shortName}
              </option>
            ))}
          </select>

          <select
            value={selectedMarks}
            onChange={(e) => setSelectedMarks(e.target.value)}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600"
          >
            <option value="all">All Marks</option>
            <option value="2">2 Marks (Sec A)</option>
            <option value="5">5 Marks (Sec B)</option>
            <option value="10">10 Marks (Sec C)</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter questions by keyword (e.g. 'Booth', 'Queue', 'Lagrange', 'IT Act')..."
          className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            onClick={() => setActiveQuestion(q)}
            className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-start justify-between gap-4 group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60 font-bold">
                  {q.marks} Marks
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Unit {q.unitNumber}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800">
                  AKTU {q.year || '2023'}
                </span>
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Appeared {q.frequency}x in exams
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                {q.question}
              </h3>

              <div className="text-[11px] text-zinc-400">
                Topic: <span className="text-zinc-300">{q.topicName}</span>
              </div>
            </div>

            <button className="flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-white shrink-0 mt-1 cursor-pointer">
              <span>Model Answer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs">
            No questions found matching your filter criteria.
          </div>
        )}
      </div>

      {/* Model Answer Drawer / Modal */}
      {activeQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/90">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60">
                  {activeQuestion.marks} Marks
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {activeQuestion.topicName}
                </span>
              </div>
              <button
                onClick={() => setActiveQuestion(null)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm font-bold text-white">
                {activeQuestion.question}
              </div>

              {/* Model Answer */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-red-400">
                  Official Model Answer:
                </h4>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono whitespace-pre-line">
                  {activeQuestion.modelAnswer}
                </div>
              </div>

              {/* Marking Scheme */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                <h5 className="text-xs font-mono font-bold uppercase text-amber-400">
                  AKTU Marking Scheme Breakdown:
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activeQuestion.markingScheme.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-end">
              <button
                onClick={() => setActiveQuestion(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
