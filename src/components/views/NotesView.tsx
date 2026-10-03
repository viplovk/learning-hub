import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Share2,
  Lock,
  Tag,
  Search,
  Sparkles,
  Trash2,
  Edit3,
  Check,
  Calendar
} from 'lucide-react';
import { AcademicNote } from '../../types';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';

interface NotesViewProps {
  notes: AcademicNote[];
  onSaveNotes: (notes: AcademicNote[]) => void;
  currentUser: string;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onSaveNotes,
  currentUser
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const currentNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const filteredNotes = notes.filter(
    (n) =>
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNewNote = () => {
    const newNote: AcademicNote = {
      id: 'note-' + Date.now(),
      title: 'Untitled Lecture Note',
      subjectId: 'kcs301',
      unitNumber: 1,
      content: `# New Academic Note\n\nWrite your concepts, lecture takeaways, and exam highlights here...`,
      isShared: true,
      author: currentUser,
      tags: ['Revision', '3rd-Sem'],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    const updated = [newNote, ...notes];
    onSaveNotes(updated);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  const handleSaveEdit = () => {
    if (!currentNote) return;
    const updated = notes.map((n) =>
      n.id === currentNote.id
        ? {
            ...n,
            title: editTitle,
            content: editContent,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : n
    );
    onSaveNotes(updated);
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    onSaveNotes(updated);
    if (selectedNoteId === id && updated[0]) {
      setSelectedNoteId(updated[0].id);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Academic Notes & Cheatsheets
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            Notion-style markdown notes linked to syllabus units • Section C shared collaboration & personal notes.
          </p>
        </div>

        <button
          onClick={handleCreateNewNote}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer self-start sm:self-auto shadow-md shadow-red-950"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[500px]">
        {/* Left Sidebar: Notes list */}
        <div className="md:col-span-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-3 space-y-3 flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes or #tags..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Notes items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[500px]">
            {filteredNotes.map((n) => {
              const isSelected = n.id === currentNote?.id;
              return (
                <div
                  key={n.id}
                  onClick={() => {
                    setSelectedNoteId(n.id);
                    setIsEditing(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-zinc-800 border-zinc-700 text-white shadow-sm'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-red-400">
                      {n.subjectId.toUpperCase()} • Unit {n.unitNumber}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {n.lastUpdated}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold truncate">{n.title}</h4>

                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {n.isShared ? (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 flex items-center gap-1">
                        <Share2 className="w-2.5 h-2.5 text-zinc-400" /> Sec C
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-zinc-400" /> Private
                      </span>
                    )}
                    {n.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Editor / Reader Pane */}
        <div className="md:col-span-8 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between space-y-4">
          {currentNote ? (
            <div className="space-y-4 flex-1">
              {/* Note Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2">
                <div className="space-y-1">
                  {!isEditing ? (
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {currentNote.title}
                    </h2>
                  ) : (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-lg font-bold text-white bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 w-full"
                    />
                  )}
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>Author: {currentNote.author}</span>
                    <span>•</span>
                    <span>Subject: {currentNote.subjectId.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditTitle(currentNote.title);
                        setEditContent(currentNote.content);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Note</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white cursor-pointer shadow-md shadow-red-950"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteNote(currentNote.id)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Body */}
              {!isEditing ? (
                <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono whitespace-pre-line overflow-y-auto max-h-[480px]">
                  {currentNote.content}
                </div>
              ) : (
                <textarea
                  rows={14}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full text-xs sm:text-sm p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono focus:outline-none focus:border-red-600 leading-relaxed"
                />
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500 text-xs">
              Select or create a note to view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
