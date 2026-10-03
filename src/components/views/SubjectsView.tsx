import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';
import { Subject, TopicConcept } from '../../types';

interface SubjectsViewProps {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
  onSelectTopic: (topic: TopicConcept) => void;
  onNavigateLearn: () => void;
  onNavigatePractice: () => void;
  onNavigateRevision: () => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  selectedSubject,
  onSelectSubject,
  onSelectTopic,
  onNavigateLearn,
  onNavigatePractice,
  onNavigateRevision
}) => {
  const activeSubject = selectedSubject || subjects[0];
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(
    activeSubject.units[0]?.id || null
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        {subjects.map((sub) => {
          const isSelected = sub.id === activeSubject.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub);
                setExpandedUnitId(sub.units[0]?.id || null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
              <span>{sub.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Subject Main Header Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/70 border border-red-800/50">
                {activeSubject.code}
              </span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs text-zinc-400 font-mono">
                {activeSubject.credits} Credits • Semester {activeSubject.semester}
              </span>
              {activeSubject.hasLab && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  Lab: {activeSubject.labCode}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {activeSubject.name}
            </h1>
          </div>

          {/* Quick Subject Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigatePractice}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Practice Questions</span>
            </button>
            <button
              onClick={onNavigateRevision}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Flashcards</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          {activeSubject.description}
        </p>

        {/* 5 Units Indicator */}
        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-500" />
            <span className="font-semibold">All 5 Official AKTU Units Covered</span>
          </div>
          <span className="text-zinc-500 font-mono text-[11px]">
            {activeSubject.units.length} Units in Syllabus
          </span>
        </div>
      </div>

      {/* Units & Topics Accordion / Drilldown */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <span>Complete 5-Unit Curriculum Breakdown</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">
            ({activeSubject.code})
          </span>
        </h2>

        <div className="space-y-3">
          {activeSubject.units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            return (
              <div
                key={unit.id}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800 overflow-hidden transition-all"
              >
                {/* Unit Header Bar */}
                <button
                  onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-zinc-800/50 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/80 border border-red-800/50">
                      Unit {unit.unitNumber}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{unit.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{unit.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                      {unit.topics.length} Topics • {unit.pyqCount} Exam Questions
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Topics Grid inside unit */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-zinc-800/80 bg-zinc-950/40 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                      {unit.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60 font-semibold">
                                {topic.importance}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-400">
                                {topic.difficulty} • ~{topic.estimatedMinutes} mins
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-white hover:text-red-400 transition-colors">
                              {topic.name}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                              {topic.quickExplanation}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Unit {unit.unitNumber} Core Topic
                            </span>
                            <button
                              onClick={() => {
                                onSelectTopic(topic);
                                onNavigateLearn();
                              }}
                              className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              <span>Study Concept</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Academic Textbooks */}
      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
        <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold">
          Recommended Textbooks & References (AKTU Curriculum)
        </h3>
        <ul className="space-y-1 text-xs text-zinc-300">
          {activeSubject.referenceBooks.map((book, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>{book}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
