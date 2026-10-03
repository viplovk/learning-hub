import React, { useState } from 'react';
import { CommunityNote } from '../types';
import {
  FileText,
  ThumbsUp,
  Share2,
  Tag,
  Plus,
  Search,
  Code2,
  UserCheck,
  Check,
  Calendar
} from 'lucide-react';

interface NotesHubViewProps {
  notes: CommunityNote[];
  onUpvoteNote: (noteId: string) => void;
  onAddNote: (note: Omit<CommunityNote, 'id' | 'upvotes' | 'date'>) => void;
  searchQuery?: string;
}

export const NotesHubView: React.FC<NotesHubViewProps> = ({
  notes,
  onUpvoteNote,
  onAddNote,
  searchQuery = '',
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [expandedNote, setExpandedNote] = useState<CommunityNote | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // New Note form fields
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('CS201');
  const [topic, setTopic] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [content, setContent] = useState('');
  const [snippet, setSnippet] = useState('');

  // Extract all unique tags
  const allTags = Array.from(
    new Set(notes.flatMap((n) => n.tags))
  );

  const filteredNotes = notes.filter((n) => {
    const matchesTag = selectedTag === 'ALL' || n.tags.includes(selectedTag);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(q) ||
      n.courseCode.toLowerCase().includes(q) ||
      n.topic.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddNote({
      title: title.trim(),
      author: 'You (Student)',
      courseCode,
      topic: topic.trim() || 'General',
      tags: parsedTags.length > 0 ? parsedTags : ['StudyGuide'],
      content: content.trim(),
      snippet: snippet.trim() || undefined,
    });

    setTitle('');
    setTopic('');
    setTagsStr('');
    setContent('');
    setSnippet('');
    setShowAddModal(false);
  };

  const handleShare = (noteId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/#note-${noteId}`);
    setCopiedLink(noteId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Peer & Community Notes</h3>
            <p className="text-xs text-slate-400">
              Exam summaries, algorithm cheat sheets, and student-curated guides
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish Note</span>
        </button>
      </div>

      {/* Tag Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold pr-1">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          Topics:
        </span>
        <button
          onClick={() => setSelectedTag('ALL')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedTag === 'ALL'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All Topics ({notes.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 backdrop-blur-sm transition-all shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                  {note.courseCode}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {note.date}
                </span>
              </div>

              <h4
                onClick={() => setExpandedNote(note)}
                className="font-bold text-sm text-white hover:text-teal-300 cursor-pointer transition-colors line-clamp-2"
              >
                {note.title}
              </h4>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {note.content}
              </p>

              {note.snippet && (
                <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800/80 font-mono text-[11px] text-teal-300 line-clamp-2 overflow-hidden">
                  <code>{note.snippet}</code>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {note.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Author & Upvote footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  {note.author}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(note.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Share note link"
                  >
                    {copiedLink === note.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onUpvoteNote(note.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      note.hasUpvoted
                        ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{note.upvotes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Note Modal */}
      {expandedNote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-teal-400 font-bold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60">
                  {expandedNote.courseCode} • {expandedNote.topic}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  {expandedNote.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  By {expandedNote.author} on {expandedNote.date}
                </p>
              </div>
              <button
                onClick={() => setExpandedNote(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {expandedNote.content}
            </div>

            {expandedNote.snippet && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                  <Code2 className="w-3.5 h-3.5 text-teal-400" />
                  Code / Query Reference
                </div>
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-teal-300 overflow-x-auto">
                  <code>{expandedNote.snippet}</code>
                </pre>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex gap-1.5">
                {expandedNote.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onUpvoteNote(expandedNote.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  expandedNote.hasUpvoted
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{expandedNote.upvotes} Helpful</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post New Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                Publish Study Note or Cheat Sheet
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
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dijkstra vs Floyd-Warshall Summary"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. CS201"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Topic Area
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Graph Algorithms"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="DSA, Graphs, ExamTips"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Study Note Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write clear principles, formulas, bullet points..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Optional Code / Snippet
                </label>
                <textarea
                  rows={2}
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  placeholder="Code, SQL query, or formula"
                  className="w-full bg-slate-950 font-mono border border-slate-700 rounded-xl p-3 text-xs text-teal-300 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
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
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md shadow-teal-600/30"
                >
                  Publish Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
