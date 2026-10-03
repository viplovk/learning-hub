import React, { useState } from 'react';
import { FlashcardDeck, Flashcard } from '../types';
import {
  Layers,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  Plus,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface FlashcardsViewProps {
  decks: FlashcardDeck[];
  onAddCard: (deckId: string, card: Omit<Flashcard, 'id'>) => void;
  onUpdateCardMastery: (deckId: string, cardId: string, mastery: Flashcard['mastery']) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  decks,
  onAddCard,
  onUpdateCardMastery,
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0]?.id || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showNewCardModal, setShowNewCardModal] = useState(false);

  // New card form state
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newHint, setNewHint] = useState('');
  const [newCode, setNewCode] = useState('');

  const currentDeck = decks.find((d) => d.id === selectedDeckId) || decks[0];
  const cards = currentDeck?.cards || [];
  const currentCard = cards[currentIndex] as Flashcard | undefined;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(cards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex(Math.floor(Math.random() * cards.length));
  };

  const handleSetMastery = (mastery: Flashcard['mastery']) => {
    if (!currentCard) return;
    onUpdateCardMastery(currentDeck.id, currentCard.id, mastery);
    handleNext();
  };

  const handleCreateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    onAddCard(currentDeck.id, {
      question: newQuestion,
      answer: newAnswer,
      hint: newHint.trim() || undefined,
      codeExample: newCode.trim() || undefined,
      mastery: 'new',
    });

    setNewQuestion('');
    setNewAnswer('');
    setNewHint('');
    setNewCode('');
    setShowNewCardModal(false);
    setCurrentIndex(cards.length); // point to new card
  };

  // Stats
  const masteredCount = cards.filter((c) => c.mastery === 'mastered').length;
  const learningCount = cards.filter((c) => c.mastery === 'learning').length;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Deck Selector & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Active Recall Decks</h3>
            <p className="text-xs text-slate-400">
              Flip to recall, evaluate confidence, and cement concepts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {decks.map((deck) => (
            <button
              key={deck.id}
              onClick={() => {
                setSelectedDeckId(deck.id);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                deck.id === currentDeck?.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {deck.courseCode} ({deck.cards.length})
            </button>
          ))}
          <button
            onClick={() => setShowNewCardModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium hover:border-slate-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <span>New Card</span>
          </button>
        </div>
      </div>

      {/* Progress & Deck Status Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-200">{currentDeck?.title}</span>
          <span className="text-slate-400 font-mono">
            Card {cards.length > 0 ? currentIndex + 1 : 0} of {cards.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-medium">
            ● {masteredCount} Mastered
          </span>
          <span className="text-amber-400 font-medium">
            ● {learningCount} Learning
          </span>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors ml-2"
            title="Random Card"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* The Interactive Flip Card */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer select-none relative min-h-[360px] rounded-3xl p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Card Meta */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                {isFlipped ? 'Answer Key' : 'Prompt / Question'}
              </span>

              <div className="flex items-center gap-2">
                {currentCard.hint && !isFlipped && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHint(!showHint);
                    }}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                  Flip
                </span>
              </div>
            </div>

            {/* Hint Box */}
            {showHint && !isFlipped && currentCard.hint && (
              <div className="my-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                💡 <strong>Hint:</strong> {currentCard.hint}
              </div>
            )}

            {/* Center Content */}
            <div className="py-6 flex flex-col justify-center items-center text-center">
              {!isFlipped ? (
                <div className="space-y-4 max-w-2xl">
                  <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {currentCard.question}
                  </p>
                  <p className="text-xs text-slate-400">
                    Test your memory before clicking to flip
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-2xl text-left w-full">
                  <p className="text-base text-slate-100 whitespace-pre-line leading-relaxed font-medium">
                    {currentCard.answer}
                  </p>

                  {currentCard.codeExample && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mt-3">
                      <div className="bg-slate-900 px-3 py-1 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-indigo-400" />
                        <span>Code Reference</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed">
                        <code>{currentCard.codeExample}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Mastery Badge */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800/80">
              <span className="capitalize">
                Current status: <strong className="text-indigo-300">{currentCard.mastery}</strong>
              </span>
              <span className="text-[11px] text-slate-400">Click anywhere to flip</span>
            </div>
          </div>

          {/* Navigation & Self Assessment Grading Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Spaced repetition buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Rate recall:</span>
              <button
                onClick={() => handleSetMastery('new')}
                className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-semibold hover:bg-rose-900/80 transition-all"
              >
                Needs Review (Again)
              </button>
              <button
                onClick={() => handleSetMastery('learning')}
                className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-semibold hover:bg-amber-900/80 transition-all"
              >
                Medium (Learning)
              </button>
              <button
                onClick={() => handleSetMastery('mastered')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/80 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Easy (Mastered)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <p>No flashcards in this deck yet.</p>
        </div>
      )}

      {/* Add New Flashcard Modal */}
      {showNewCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Add Flashcard to {currentDeck.title}
              </h4>
              <button
                onClick={() => setShowNewCardModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question or Concept Prompt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. What is the time complexity of QuickSort in the worst case?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Answer Key & Explanation *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="e.g. O(n^2) when partition is unbalanced..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Optional Memory Hint
                </label>
                <input
                  type="text"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  placeholder="e.g. Think about sorted array partition"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Optional Code Snippet
                </label>
                <textarea
                  rows={2}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. function quicksort(arr) { ... }"
                  className="w-full bg-slate-950 font-mono border border-slate-700 rounded-xl p-3 text-xs text-indigo-300 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewCardModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                >
                  Save Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
