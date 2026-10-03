import React, { useState } from 'react';
import {
  CheckSquare,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
  Clock,
  Award
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';
import { PracticeQuestion } from '../../types';

interface PracticeViewProps {
  onRecordAttempt?: (questionId: string, isCorrect: boolean) => void;
  onNavigateLearn?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onRecordAttempt }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    if (selectedSubjectId !== 'all' && q.subjectId !== selectedSubjectId) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const currentQuestion: PracticeQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
    }
    setSessionTotal((prev) => prev + 1);
    if (onRecordAttempt) {
      onRecordAttempt(currentQuestion.id, isCorrect);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back or finish
    }
  };

  const handleResetSession = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setSessionScore(0);
    setSessionTotal(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Banner & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Adaptive Practice Engine
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            University-style MCQs, conceptual derivations, and numerical questions with immediate marking.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              handleResetSession();
            }}
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
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              handleResetSession();
            }}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600"
          >
            <option value="all">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {/* Progress & Live Score Bar */}
      {filteredQuestions.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
          <div>
            Question <span className="font-mono font-bold text-white">{currentIndex + 1}</span> of{' '}
            <span className="font-mono text-white">{filteredQuestions.length}</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              Session Accuracy:{' '}
              <span className="font-mono font-bold text-emerald-400">
                {sessionTotal > 0 ? Math.round((sessionScore / sessionTotal) * 100) : 100}%
              </span>{' '}
              ({sessionScore}/{sessionTotal})
            </div>
            <button
              onClick={handleResetSession}
              className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* Question Card */}
      {currentQuestion ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
          {/* Header Metadata */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60 font-semibold">
                {currentQuestion.marks} Marks
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                {currentQuestion.difficulty}
              </span>
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              {currentQuestion.topicName}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
            {currentQuestion.question}
          </div>

          {/* Options List */}
          {currentQuestion.options && (
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = isSubmitted && idx === currentQuestion.correctOptionIndex;
                const isWrong = isSubmitted && isChosen && !isCorrect;

                let cardClass =
                  'bg-zinc-950 hover:bg-zinc-800/60 border-zinc-800 text-zinc-300';
                if (isChosen && !isSubmitted) {
                  cardClass = 'bg-red-950/40 border-red-600 text-white font-medium';
                }
                if (isCorrect) {
                  cardClass = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-medium';
                }
                if (isWrong) {
                  cardClass = 'bg-red-950/80 border-red-600 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${cardClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-zinc-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isWrong && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation Box (Post submission) */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 animate-in fade-in duration-200">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-400" /> Model Explanation & University Invariant:
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-500">
              Question #{currentIndex + 1}
            </span>

            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white transition-colors cursor-pointer shadow-lg shadow-red-950"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer"
                >
                  <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Session'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs">
          No questions found matching your filter selection. Try selecting "All Subjects" or "All Difficulties".
        </div>
      )}
    </div>
  );
};
