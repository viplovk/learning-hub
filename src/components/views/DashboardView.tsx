import React from 'react';
import {
  BookOpen,
  Brain,
  HelpCircle,
  Binary,
  FlaskConical,
  Sparkles,
  Award,
  ArrowRight,
  ChevronRight,
  Layers,
  FileText
} from 'lucide-react';
import { Subject, TopicConcept } from '../../types';
import { MainNavTab } from '../Sidebar';

interface DashboardViewProps {
  subjects: Subject[];
  onNavigateTab: (tab: MainNavTab) => void;
  onSelectSubject: (subject: Subject) => void;
  onSelectTopic: (topic: TopicConcept) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  subjects,
  onNavigateTab,
  onSelectSubject,
  onSelectTopic
}) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Welcome & Study Focus Header */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Official AKTU Curriculum • All 5 Units Per Subject
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            IEC CSE Section C — Study & Concept Hub
          </h1>

          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Direct access to official AKTU syllabi, in-depth concept explanations, ASCII architecture diagrams, worked numerical derivations, previous year question banks, and AI academic assistance.
          </p>
        </div>
      </div>

      {/* Quick Action Study Portals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('SUBJECTS')}
          className="p-4 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/70 border border-zinc-800 text-left transition-all cursor-pointer group space-y-1.5"
        >
          <BookOpen className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">5-Unit Syllabi</div>
          <div className="text-[11px] text-zinc-400">All 6 theory subjects</div>
        </button>

        <button
          onClick={() => onNavigateTab('FORMULAS')}
          className="p-4 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/70 border border-zinc-800 text-left transition-all cursor-pointer group space-y-1.5"
        >
          <Binary className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Formula Bank</div>
          <div className="text-[11px] text-zinc-400">Formulas & Definitions</div>
        </button>

        <button
          onClick={() => onNavigateTab('QUESTION_BANK')}
          className="p-4 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/70 border border-zinc-800 text-left transition-all cursor-pointer group space-y-1.5"
        >
          <HelpCircle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Question Bank</div>
          <div className="text-[11px] text-zinc-400">2, 5 & 10-mark PYQs</div>
        </button>

        <button
          onClick={() => onNavigateTab('AI_TUTOR')}
          className="p-4 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/70 border border-zinc-800 text-left transition-all cursor-pointer group space-y-1.5"
        >
          <Sparkles className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">AI Study Tutor</div>
          <div className="text-[11px] text-zinc-400">8 learning modes</div>
        </button>
      </div>

      {/* Official 3rd Semester Course Catalog - All 5 Units Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Official 3rd Semester Courses (5 Units Each)
          </h2>
          <p className="text-xs text-zinc-400">
            Select any subject to explore its complete 5-unit curriculum breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub);
                onNavigateTab('SUBJECTS');
              }}
              className="p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/70 border border-red-800/50">
                    {sub.code}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {sub.credits} Credits {sub.hasLab && '+ Lab'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {sub.description}
                </p>
              </div>

              {/* 5 Units Badge Listing */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
                  Complete 5-Unit Structure:
                </span>
                <div className="space-y-1">
                  {sub.units.map((u) => (
                    <div
                      key={u.id}
                      className="text-[11px] text-zinc-300 flex items-center gap-2 truncate"
                    >
                      <span className="text-red-500 font-mono font-bold text-[10px] shrink-0">
                        U{u.unitNumber}:
                      </span>
                      <span className="truncate">{u.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-red-400 group-hover:text-red-300">
                <span>Open Subject Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
