import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Brain,
  HelpCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Award,
  X,
  ArrowRight,
  Flame,
  Binary
} from 'lucide-react';
import { OFFICIAL_SUBJECTS } from '../data/curriculumData';
import { DEFAULT_NOTES } from '../data/defaultNotes';
import { QUESTION_BANK } from '../data/questionBank';
import { FORMULA_BANK } from '../data/formulaBank';
import { MainNavTab } from './Sidebar';
import { TopicConcept } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: MainNavTab) => void;
  onSelectTopic: (topic: TopicConcept) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectTopic
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Find matching topics
  const matchingTopics: { topic: TopicConcept; subjectCode: string; unitTitle: string }[] = [];
  OFFICIAL_SUBJECTS.forEach((subject) => {
    subject.units.forEach((unit) => {
      unit.topics.forEach((topic) => {
        if (
          !cleanQuery ||
          topic.name.toLowerCase().includes(cleanQuery) ||
          topic.quickExplanation.toLowerCase().includes(cleanQuery) ||
          subject.name.toLowerCase().includes(cleanQuery) ||
          subject.code.toLowerCase().includes(cleanQuery)
        ) {
          matchingTopics.push({
            topic,
            subjectCode: subject.code,
            unitTitle: `Unit ${unit.unitNumber}: ${unit.title}`
          });
        }
      });
    });
  });

  // Find matching questions
  const matchingQuestions = QUESTION_BANK.filter(
    (q) =>
      cleanQuery &&
      (q.question.toLowerCase().includes(cleanQuery) ||
        q.topicName.toLowerCase().includes(cleanQuery) ||
        q.modelAnswer.toLowerCase().includes(cleanQuery))
  ).slice(0, 4);

  // Find matching notes
  const matchingNotes = DEFAULT_NOTES.filter(
    (n) =>
      cleanQuery &&
      (n.title.toLowerCase().includes(cleanQuery) ||
        n.content.toLowerCase().includes(cleanQuery) ||
        n.tags.some((t) => t.toLowerCase().includes(cleanQuery)))
  ).slice(0, 3);

  // Find matching formulas
  const matchingFormulas = FORMULA_BANK.filter(
    (f) =>
      cleanQuery &&
      (f.title.toLowerCase().includes(cleanQuery) ||
        f.formula.toLowerCase().includes(cleanQuery) ||
        f.topicName.toLowerCase().includes(cleanQuery))
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a topic, formula, question, or command (e.g. 'Booth', 'Queue', 'IT Act')..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4">
          {/* Quick Actions (when query is short or empty) */}
          {!cleanQuery && (
            <div>
              <p className="px-2 pb-1.5 text-[10px] font-mono uppercase text-zinc-500 font-semibold">
                Quick Academic Commands
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    onNavigateTab('REVISION');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-left text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="font-medium">Review Flashcards</div>
                    <div className="text-[10px] text-zinc-500">Spaced repetition queue</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('AI_TUTOR');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-left text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="font-medium">Ask AI Study Tutor</div>
                    <div className="text-[10px] text-zinc-500">Curriculum grounded answers</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('EXAMS');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-left text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-medium">AKTU Exam Mode</div>
                    <div className="text-[10px] text-zinc-500">2, 5 & 10 mark answers</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('PRACTICE');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-left text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-medium">Start Practice Quiz</div>
                    <div className="text-[10px] text-zinc-500">Adaptive multiple-choice</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Topics Results */}
          {matchingTopics.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 text-[10px] font-mono uppercase text-zinc-500 font-semibold flex items-center justify-between">
                <span>Syllabus Topics ({matchingTopics.length})</span>
                <span className="text-[9px] text-zinc-600">Press topic to open Learn Mode</span>
              </p>
              <div className="space-y-1">
                {matchingTopics.slice(0, 6).map(({ topic, subjectCode, unitTitle }) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onSelectTopic(topic);
                      onNavigateTab('LEARN');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 text-left transition-colors group cursor-pointer border border-transparent hover:border-zinc-700"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-100 group-hover:text-red-400 transition-colors">
                          {topic.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {subjectCode}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1 rounded ${
                            topic.difficulty === 'HARD'
                              ? 'bg-red-950 text-red-300'
                              : topic.difficulty === 'MEDIUM'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {topic.quickExplanation}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white shrink-0 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Bank Results */}
          {matchingQuestions.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 text-[10px] font-mono uppercase text-zinc-500 font-semibold">
                AKTU Questions ({matchingQuestions.length})
              </p>
              <div className="space-y-1">
                {matchingQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigateTab('QUESTION_BANK');
                      onClose();
                    }}
                    className="w-full flex items-start justify-between p-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 text-left transition-colors group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800/60 font-semibold">
                          {q.marks} Marks
                        </span>
                        <span className="text-xs text-zinc-200 line-clamp-1">{q.question}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{q.topicName}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulas Results */}
          {matchingFormulas.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 text-[10px] font-mono uppercase text-zinc-500 font-semibold">
                Formulas ({matchingFormulas.length})
              </p>
              <div className="space-y-1">
                {matchingFormulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigateTab('FORMULAS');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold text-zinc-200">{f.title}</div>
                      <div className="font-mono text-xs text-red-400">{f.formula}</div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{f.subjectCode}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {cleanQuery &&
            matchingTopics.length === 0 &&
            matchingQuestions.length === 0 &&
            matchingFormulas.length === 0 && (
              <div className="text-center py-8 text-zinc-500 text-xs">
                No matching topics or questions found for "{query}". Try checking your spelling or searching by subject code (e.g. KCS301).
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[9px]">ESC</kbd> to close
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[9px]">ENTER</kbd> to select
            </span>
          </div>
          <span className="font-mono text-[10px] text-red-400">IEC CSE Section C</span>
        </div>
      </div>
    </div>
  );
};
