import React from 'react';
import { Search, Bell, Clock, PlusCircle } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNewTaskModal?: () => void;
  timerSecondsRemaining: number;
  isTimerRunning: boolean;
  onTimerClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  searchQuery,
  onSearchChange,
  onOpenNewTaskModal,
  timerSecondsRemaining,
  isTimerRunning,
  onTimerClick,
}) => {
  const titles: Record<ViewMode, { title: string; subtitle: string }> = {
    courses: {
      title: 'Courses & Curriculum',
      subtitle: 'Browse lecture modules, formulas, implementations, and notes',
    },
    flashcards: {
      title: 'Active Recall Flashcards',
      subtitle: 'Master complex concepts with spaced repetition review',
    },
    quizzes: {
      title: 'Knowledge Check Quizzes',
      subtitle: 'Self-assessment tests with instant step-by-step explanations',
    },
    planner: {
      title: 'Academic Assignment Planner',
      subtitle: 'Track submissions, project deadlines, and lab reports',
    },
    notes: {
      title: 'Peer Learning & Notes Hub',
      subtitle: 'Shared summaries, exam cheat sheets, and optimization guides',
    },
    focus: {
      title: 'Focus Pomodoro & Soundscape',
      subtitle: 'Deep study intervals with synthesized ambient soundscapes',
    },
    resources: {
      title: 'Curated Roadmaps & Archives',
      subtitle: 'Syllabus guidelines, previous year question papers, and documentation',
    },
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-18 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          {titles[currentView]?.title || 'Learning Hub'}
        </h2>
        <p className="text-xs text-slate-400">
          {titles[currentView]?.subtitle || 'Student Workspace'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search input */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, codes, notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Pomodoro Pill */}
        <button
          onClick={onTimerClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isTimerRunning
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 animate-pulse'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          }`}
          title="Open Focus Timer"
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{formatTime(timerSecondsRemaining)}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            {isTimerRunning ? 'Studying' : 'Timer'}
          </span>
        </button>

        {/* New Action Button */}
        {onOpenNewTaskModal && (
          <button
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        )}

        {/* Notifications Icon */}
        <div className="p-2 rounded-xl border border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5 ring-2 ring-slate-900"></span>
        </div>
      </div>
    </header>
  );
};
