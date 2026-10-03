import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '../types';
import {
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuizViewProps {
  quizzes: Quiz[];
}

export const QuizView: React.FC<QuizViewProps> = ({ quizzes }) => {
  const [activeQuizId, setActiveQuizId] = useState<string>(quizzes[0]?.id || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];
  const questions: QuizQuestion[] = activeQuiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleCheckAnswer = () => {
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setIsFinished(false);
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);
  const percentage = Math.round((correctCount / (questions.length || 1)) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Quiz Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Interactive Assessment Quizzes</h3>
            <p className="text-xs text-slate-400">
              Test your theoretical foundations and algorithmic problem-solving
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {quizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => {
                setActiveQuizId(quiz.id);
                handleRestartQuiz();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                quiz.id === activeQuiz?.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {quiz.courseCode} ({quiz.questions.length} Qs)
            </button>
          ))}
        </div>
      </div>

      {!isFinished ? (
        currentQuestion ? (
          <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            {/* Question Progress Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/80 px-2.5 py-0.5 rounded-lg">
                  Question {currentQuestionIndex + 1} / {questions.length}
                </span>
                <span className="text-xs text-slate-400">
                  {activeQuiz.difficulty} Level
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeQuiz.timeLimitMinutes} min practice</span>
              </div>
            </div>

            {/* Question Title */}
            <div>
              <h4 className="text-lg font-bold text-white leading-relaxed">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = optIdx === currentQuestion.correctIndex;
                const showCorrectState = isSubmitted && isCorrect;
                const showWrongState = isSubmitted && isSelected && !isCorrect;

                let buttonClass = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700';

                if (isSelected && !isSubmitted) {
                  buttonClass = 'bg-indigo-600/20 border-indigo-500/80 text-white font-medium';
                } else if (showCorrectState) {
                  buttonClass = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-medium';
                } else if (showWrongState) {
                  buttonClass = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${buttonClass}`}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-800 font-mono text-xs font-bold shrink-0 text-slate-300">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-snug">{option}</span>

                    {showCorrectState && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {showWrongState && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Explanation & Concept Insight
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                {selectedAnswers[currentQuestionIndex] !== undefined
                  ? 'Option selected'
                  : 'Select an option to verify'}
              </span>

              <div className="flex items-center gap-3">
                {!isSubmitted ? (
                  <button
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    onClick={handleCheckAnswer}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <span>
                      {currentQuestionIndex < questions.length - 1
                        ? 'Next Question'
                        : 'Finish Quiz'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/20">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-white">Quiz Completed!</h4>
            <p className="text-sm text-slate-400">{activeQuiz.title}</p>
          </div>

          <div className="flex justify-center items-center gap-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{percentage}%</div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Final Score</div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-emerald-400">
                {correctCount} / {questions.length}
              </div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Correct</div>
            </div>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {percentage >= 80
              ? 'Outstanding performance! You have a solid command of these core concepts.'
              : percentage >= 50
              ? 'Good work! Review the flashcards and lesson topics to master the remaining items.'
              : 'Keep practicing! Check out the study notes and syllabus modules for deep review.'}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
