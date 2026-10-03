import React, { useState } from 'react';
import { Assignment } from '../types';
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ArrowRightCircle,
  Tag
} from 'lucide-react';

interface PlannerViewProps {
  assignments: Assignment[];
  onUpdateStatus: (id: string, status: Assignment['status']) => void;
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  coursesList: { code: string; title: string }[];
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  assignments,
  onUpdateStatus,
  onAddAssignment,
  coursesList,
}) => {
  const [filterCourse, setFilterCourse] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New assignment form fields
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState(coursesList[0]?.code || 'CS201');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Assignment['priority']>('medium');
  const [notes, setNotes] = useState('');

  const filtered = assignments.filter((a) => {
    if (filterCourse === 'ALL') return true;
    return a.courseCode === filterCourse;
  });

  const todoList = filtered.filter((a) => a.status === 'todo');
  const inProgressList = filtered.filter((a) => a.status === 'in_progress');
  const completedList = filtered.filter((a) => a.status === 'completed');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onAddAssignment({
      title: title.trim(),
      courseCode,
      dueDate,
      priority,
      status: 'todo',
      notes: notes.trim(),
    });

    setTitle('');
    setDueDate('');
    setNotes('');
    setShowAddModal(false);
  };

  const getPriorityBadge = (p: Assignment['priority']) => {
    switch (p) {
      case 'high':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800/80 text-rose-300">High Priority</span>;
      case 'medium':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/80 text-amber-300">Medium</span>;
      case 'low':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">Low</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Assignment & Lab Tracker</h3>
            <p className="text-xs text-slate-400">
              Manage coursework deliverables, reports, and problem sets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Courses</option>
            {coursesList.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: To Do */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                To Do ({todoList.length})
              </h4>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {todoList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No pending tasks
              </div>
            ) : (
              todoList.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900/60">
                      {item.courseCode}
                    </span>
                    {getPriorityBadge(item.priority)}
                  </div>

                  <h5 className="font-semibold text-sm text-slate-100">{item.title}</h5>

                  {item.notes && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Due {item.dueDate}
                    </span>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'in_progress')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <span>Start</span>
                      <ArrowRightCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                In Progress ({inProgressList.length})
              </h4>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {inProgressList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No tasks in progress
              </div>
            ) : (
              inProgressList.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/80 border border-amber-900/30 rounded-xl p-4 space-y-3 hover:border-amber-700/50 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900/60">
                      {item.courseCode}
                    </span>
                    {getPriorityBadge(item.priority)}
                  </div>

                  <h5 className="font-semibold text-sm text-slate-100">{item.title}</h5>

                  {item.notes && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-amber-300 flex items-center gap-1 font-mono text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      Due {item.dueDate}
                    </span>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'completed')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Completed / Submitted */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Submitted & Graded ({completedList.length})
              </h4>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {completedList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No submitted assignments
              </div>
            ) : (
              completedList.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {item.courseCode}
                    </span>
                    {item.score ? (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        Score: {item.score}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-semibold">Submitted</span>
                    )}
                  </div>

                  <h5 className="font-semibold text-sm text-slate-200 line-through decoration-slate-600">
                    {item.title}
                  </h5>

                  {item.notes && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Turned in
                    </span>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'in_progress')}
                      className="text-[11px] text-slate-400 hover:text-slate-200"
                    >
                      Reopen
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-400" />
                Add New Academic Deliverable
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lab 5: Graph BFS/DFS Implementation"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course *
                  </label>
                  <select
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {coursesList.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.title.split(' ')[0]}...
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Assignment['priority'])}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deliverable Notes & Rubric
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key requirements, test cases, or submission guidelines..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                >
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
