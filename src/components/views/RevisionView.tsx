import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Eye,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Flashcard, Subject } from '../../types';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';

interface RevisionViewProps {
  flashcards: Flashcard[];
  onUpdateFlashcard: (updated: Flashcard) => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  flashcards,
  onUpdateFlashcard
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const filteredCards = flashcards.filter((c) => {
    if (selectedSubjectId !== 'all' && c.subjectId !== selectedSubjectId) return false;
    if (selectedType !== 'all' && c.type !== selectedType) return false;
    return true;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleRateConfidence = (confidence: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
    if (!currentCard) return;

    let newBox = currentCard.box || 1;
    let consecutive = currentCard.consecutiveCorrect || 0;

    if (confidence === 'AGAIN') {
      newBox = 1;
      consecutive = 0;
    } else if (confidence === 'HARD') {
      newBox = Math.max(1, newBox);
    } else if (confidence === 'GOOD') {
      newBox = Math.min(5, newBox + 1);
      consecutive += 1;
    } else if (confidence === 'EASY') {
      newBox = Math.min(5, newBox + 2);
      consecutive += 2;
    }

    const updatedCard: Flashcard = {
      ...currentCard,
      box: newBox,
      reviewCount: (currentCard.reviewCount || 0) + 1,
      consecutiveCorrect: consecutive,
      lastConfidence: confidence
    };

    onUpdateFlashcard(updatedCard);
    setIsFlipped(false);
    setShowHint(false);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RotateCcw className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Spaced Repetition & Flashcards
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            Leitner 5-box memory system: review difficult concepts sooner, master high-yield topics before exams.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600"
          >
            <option value="all">All Subjects ({flashcards.length} cards)</option>
            {OFFICIAL_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.shortName}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600"
          >
            <option value="all">All Types</option>
            <option value="DEFINITION">Definition</option>
            <option value="DIFFERENCE">Difference</option>
            <option value="ALGORITHM">Algorithm</option>
            <option value="FORMULA">Formula</option>
            <option value="CONCEPT">Concept</option>
            <option value="EXAM_QUESTION">Exam Question</option>
          </select>
        </div>
      </div>

      {/* Progress & Card Index */}
      {filteredCards.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Card</span>
            <span className="font-mono font-bold text-white">{currentIndex + 1}</span>
            <span>of</span>
            <span className="font-mono text-white">{filteredCards.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Box {currentCard?.box || 1} of 5
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-800/50">
              {currentCard?.type}
            </span>
          </div>
        </div>
      )}

      {/* Interactive 3D Flip Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[280px] sm:min-h-[320px] p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between shadow-2xl relative select-none group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-500" />
                {isFlipped ? 'Model Answer (Back)' : 'Recall Prompt (Front)'}
              </span>
              <span className="text-xs text-zinc-400 group-hover:text-red-400 transition-colors flex items-center gap-1">
                <span>Click card to flip</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Front content */}
            {!isFlipped ? (
              <div className="py-6 text-center space-y-4">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-relaxed max-w-2xl mx-auto">
                  {currentCard.front}
                </h3>
                {showHint && currentCard.hint && (
                  <p className="text-xs text-amber-400 bg-amber-950/40 border border-amber-800/50 py-1.5 px-3 rounded-lg inline-block animate-in fade-in">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>
            ) : (
              /* Back content */
              <div className="py-6 space-y-3">
                <div className="text-xs font-mono text-emerald-400 font-semibold">
                  ✓ VERIFIED EXAM ANSWER:
                </div>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-mono whitespace-pre-line">
                  {currentCard.back}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs text-zinc-500">
              <span>Reviewed: {currentCard.reviewCount || 0} times</span>
              {!isFlipped && currentCard.hint && !showHint && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(true);
                  }}
                  className="text-zinc-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Show Hint</span>
                </button>
              )}
              {isFlipped && (
                <span className="text-emerald-400 font-medium">Card flipped</span>
              )}
            </div>
          </div>

          {/* Confidence Rating Buttons (visible when flipped) */}
          {isFlipped ? (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 animate-in fade-in duration-150">
              <p className="text-xs text-center text-zinc-400 font-medium">
                How well did you recall this answer?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleRateConfidence('AGAIN')}
                  className="p-2.5 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Again (Reset to Box 1)
                </button>
                <button
                  onClick={() => handleRateConfidence('HARD')}
                  className="p-2.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-800 text-amber-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Hard (Box {currentCard.box || 1})
                </button>
                <button
                  onClick={() => handleRateConfidence('GOOD')}
                  className="p-2.5 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-800 text-blue-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Good (+1 Box)
                </button>
                <button
                  onClick={() => handleRateConfidence('EASY')}
                  className="p-2.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Easy (+2 Boxes)
                </button>
              </div>
            </div>
          ) : (
            /* Navigation when not flipped */
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
              >
                <span>Skip to Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs">
          No flashcards found for this filter. Try selecting "All Subjects" or "All Types".
        </div>
      )}
    </div>
  );
};
