import React, { useState } from 'react';
import {
  Map,
  ArrowRight,
  GitBranch,
  Layers,
  BookOpen
} from 'lucide-react';
import { Subject, TopicConcept } from '../../types';

interface SemesterRoadmapViewProps {
  subjects: Subject[];
  onSelectTopic: (topic: TopicConcept) => void;
  onNavigateLearn: () => void;
}

export const SemesterRoadmapView: React.FC<SemesterRoadmapViewProps> = ({
  subjects,
  onSelectTopic,
  onNavigateLearn
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  const filteredSubjects = subjects.filter((s) =>
    selectedSubjectId === 'all' ? true : s.id === selectedSubjectId
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Map className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              3rd Semester Curriculum Roadmaps (All 5 Units)
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            Structured unit-by-unit roadmaps with prerequisites and concept progression across all subjects.
          </p>
        </div>

        {/* Subject Filter */}
        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600 self-start sm:self-auto"
        >
          <option value="all">All 6 Subjects (30 Units Total)</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code}: {s.shortName}
            </option>
          ))}
        </select>
      </div>

      {/* Roadmap Tree Visualization */}
      <div className="space-y-8">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6"
          >
            {/* Subject Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-red-400 px-2 py-1 rounded bg-red-950/70 border border-red-800/50">
                  {subject.code}
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">{subject.name}</h2>
                  <p className="text-xs text-zinc-400">
                    {subject.credits} Credits • All {subject.units.length} Syllabus Units
                  </p>
                </div>
              </div>
            </div>

            {/* Units Flow */}
            <div className="space-y-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="relative pl-6 sm:pl-8 border-l-2 border-zinc-800 space-y-4">
                  {/* Step Marker */}
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-zinc-900 border-2 border-red-600 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                    {unit.unitNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-red-400">
                        UNIT {unit.unitNumber}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <h3 className="text-sm font-bold text-zinc-100">{unit.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{unit.description}</p>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {unit.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-red-950 text-red-300 border border-red-800/60 font-semibold">
                              {topic.importance} PRIORITY
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              ~{topic.estimatedMinutes} mins
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-white hover:text-red-400 transition-colors">
                            {topic.name}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                            {topic.quickExplanation}
                          </p>
                        </div>

                        {/* Prerequisites */}
                        <div className="space-y-2 pt-2 border-t border-zinc-900 text-[11px]">
                          {topic.prerequisites.length > 0 && (
                            <div className="flex items-center gap-1.5 text-zinc-400">
                              <GitBranch className="w-3 h-3 text-zinc-500 shrink-0" />
                              <span className="text-[10px] text-zinc-500">Prereq:</span>
                              <span className="text-zinc-300 font-mono text-[10px] truncate">
                                {topic.prerequisites.join(', ')}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] font-mono text-zinc-500">
                              Unit {unit.unitNumber}
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
