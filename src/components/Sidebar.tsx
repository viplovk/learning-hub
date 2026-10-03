import React from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Brain,
  CheckSquare,
  RotateCcw,
  FileText,
  HelpCircle,
  Sparkles,
  Award,
  FlaskConical,
  Binary,
  FolderOpen
} from 'lucide-react';

export type MainNavTab =
  | 'DASHBOARD'
  | 'SEMESTER'
  | 'SUBJECTS'
  | 'LEARN'
  | 'PRACTICE'
  | 'REVISION'
  | 'NOTES'
  | 'QUESTION_BANK'
  | 'AI_TUTOR'
  | 'EXAMS'
  | 'LABS'
  | 'FORMULAS'
  | 'MATERIALS';

interface SidebarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab
}) => {
  const primaryNavItems: {
    id: MainNavTab;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'DASHBOARD',
      label: 'Home / Curriculum',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'SEMESTER',
      label: '5-Unit Roadmaps',
      icon: <Map className="w-4 h-4" />
    },
    {
      id: 'SUBJECTS',
      label: 'Subjects (All 5 Units)',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'LEARN',
      label: 'Concept Study',
      icon: <Brain className="w-4 h-4 text-red-400" />
    },
    {
      id: 'PRACTICE',
      label: 'Practice Quiz',
      icon: <CheckSquare className="w-4 h-4" />
    },
    {
      id: 'REVISION',
      label: 'Revision Flashcards',
      icon: <RotateCcw className="w-4 h-4" />
    },
    {
      id: 'NOTES',
      label: 'Academic Notes',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'QUESTION_BANK',
      label: 'Question Bank (PYQs)',
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      id: 'AI_TUTOR',
      label: 'AI Study Tutor',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      badge: 'AI'
    },
    {
      id: 'EXAMS',
      label: 'AKTU Exam Mode',
      icon: <Award className="w-4 h-4" />
    }
  ];

  const secondaryNavItems: {
    id: MainNavTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'LABS',
      label: 'Labs & Viva Voce',
      icon: <FlaskConical className="w-4 h-4" />
    },
    {
      id: 'FORMULAS',
      label: 'Formula & Definition Bank',
      icon: <Binary className="w-4 h-4" />
    },
    {
      id: 'MATERIALS',
      label: 'Study Materials Hub',
      icon: <FolderOpen className="w-4 h-4" />
    }
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#09090b] flex flex-col justify-between shrink-0 min-h-[calc(100vh-53px)] select-none">
      <div className="p-3 space-y-6">
        {/* Core Academic Navigation */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Study & Concept Clearing
          </div>
          <nav className="space-y-1">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.35)] font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-zinc-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-red-950 text-red-300 border border-red-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Academic Reference & Utilities */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Reference & Labs
          </div>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.35)] font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-zinc-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 m-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 text-[11px] text-zinc-400">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-zinc-200">AKTU 3rd Semester</span>
          <span className="font-mono text-[10px] text-red-400 bg-red-950/70 px-1 rounded border border-red-800/40">
            All 5 Units
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed">
          Clean academic hub for Section C. Built purely for concept understanding, derivations, and exam preparation.
        </p>
      </div>
    </aside>
  );
};
