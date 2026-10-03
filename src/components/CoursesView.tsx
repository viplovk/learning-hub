import React, { useState } from 'react';
import { Course, Topic } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  ListCheck,
  FolderOpen
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  onToggleTopicCompletion: (courseId: string, moduleId: string, topicId: string) => void;
  searchQuery?: string;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onToggleTopicCompletion,
  searchQuery = '',
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(
    courses[0]?.modules[0]?.topics[0] || null
  );
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Filter courses by search if applicable
  const filteredCourses = courses.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.modules.some((m) =>
        m.topics.some(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.content.toLowerCase().includes(q)
        )
      )
    );
  });

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Find module id for selected topic to allow toggling completion
  const findModuleIdForTopic = (topicId: string): string => {
    if (!activeCourse) return '';
    for (const mod of activeCourse.modules) {
      if (mod.topics.some((t) => t.id === topicId)) {
        return mod.id;
      }
    }
    return '';
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Course Cards Carousel / Row */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Enrolled Academic Subjects ({courses.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click to inspect modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCourses.map((course) => {
            const isSelected = course.id === activeCourse?.id;
            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setSelectedTopic(course.modules[0]?.topics[0] || null);
                }}
                className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500/60 shadow-lg shadow-indigo-900/20 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${course.color}`}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    {course.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {course.semester}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1">
                  {course.title}
                </h4>
                <p className="text-xs text-slate-400 mb-4 line-clamp-1">{course.instructor}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Course Progress</span>
                    <span className="font-semibold text-slate-200">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Course Detail Split Screen */}
      {activeCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Modules & Topics Accordion */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{activeCourse.title}</h4>
                <p className="text-xs text-slate-400">{activeCourse.department} • {activeCourse.instructor}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                {activeCourse.progress}% Completed
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
              {activeCourse.modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-2 py-1 bg-slate-800/50 rounded-lg">
                    <span>{module.title}</span>
                    <span className="text-slate-400 text-[11px] font-normal">
                      {module.duration}
                    </span>
                  </div>

                  <div className="space-y-1 pl-1">
                    {module.topics.map((topic) => {
                      const isCurrent = selectedTopic?.id === topic.id;
                      return (
                        <div
                          key={topic.id}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            isCurrent
                              ? 'bg-indigo-600/20 text-white border border-indigo-500/40 font-medium'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                          }`}
                        >
                          <button
                            onClick={() => setSelectedTopic(topic)}
                            className="flex-1 flex items-center gap-2.5 text-left truncate mr-2"
                          >
                            <ChevronRight
                              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                isCurrent ? 'text-indigo-400 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{topic.title}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleTopicCompletion(activeCourse.id, module.id, topic.id);
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                            title={topic.completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {topic.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Topic Content Reader */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-6 min-h-[500px]">
            {selectedTopic ? (
              <div className="space-y-6">
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono text-indigo-400 uppercase font-semibold">
                        {activeCourse.code} • Concept Note
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {selectedTopic.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      const modId = findModuleIdForTopic(selectedTopic.id);
                      if (modId) {
                        onToggleTopicCompletion(activeCourse.id, modId, selectedTopic.id);
                        setSelectedTopic({ ...selectedTopic, completed: !selectedTopic.completed });
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedTopic.completed
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {selectedTopic.completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark as Studied</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Main Explanation */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                    {selectedTopic.content}
                  </p>
                </div>

                {/* Key Takeaways */}
                {selectedTopic.keyTakeaways && selectedTopic.keyTakeaways.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ListCheck className="w-4 h-4 text-indigo-400" />
                      Key Principles & Exam Takeaways
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedTopic.keyTakeaways.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-200"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Snippet if present */}
                {selectedTopic.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-indigo-400" />
                        Standard Implementation ({selectedTopic.codeSnippet.language})
                      </h5>
                      <button
                        onClick={() => handleCopyCode(selectedTopic.codeSnippet!.code)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <div className="bg-slate-900/90 px-4 py-2 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex justify-between">
                        <span>algorithm.{selectedTopic.codeSnippet.language}</span>
                        <span>Read-only snippet</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                        <code>{selectedTopic.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Supplementary Reading & Resources */}
                {selectedTopic.resources && selectedTopic.resources.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FolderOpen className="w-4 h-4 text-indigo-400" />
                      Supplementary Documents & Visualizers
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedTopic.resources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                              {res.type}
                            </span>
                            <span className="text-xs text-slate-200 truncate">{res.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                            {res.readTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Select a topic from the curriculum to view lesson notes.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
