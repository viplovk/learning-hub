import React, { useState } from 'react';
import {
  Compass,
  FileDown,
  BookOpen,
  Code,
  ExternalLink,
  GraduationCap,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  course: string;
  category: 'PYQ' | 'CheatSheet' | 'Roadmap' | 'Textbook';
  year?: string;
  fileSize: string;
  description: string;
}

export const ResourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const resources: ResourceItem[] = [
    {
      id: 'res-1',
      title: 'AKTU / University End-Semester Paper CS201 (2025)',
      course: 'CS201 Data Structures',
      category: 'PYQ',
      year: 'Dec 2025',
      fileSize: '1.8 MB PDF',
      description: 'Official solved questions on AVL Rotations, B-Trees, and Dynamic Programming with grading rubrics.'
    },
    {
      id: 'res-2',
      title: 'End-Term Question Bank & Solutions: DBMS (2024-2025)',
      course: 'CS305 DBMS',
      category: 'PYQ',
      year: 'May 2025',
      fileSize: '2.4 MB PDF',
      description: 'University exam solutions covering BCNF, Relational Algebra queries, and Deadlock detection graphs.'
    },
    {
      id: 'res-3',
      title: 'Ultimate Data Structures & Algorithms Complexity Chart',
      course: 'CS201 / General',
      category: 'CheatSheet',
      fileSize: '850 KB PDF',
      description: 'Color-coded Big-O asymptotic notations, worst vs average cases, and recursion tree equations.'
    },
    {
      id: 'res-4',
      title: 'SQL Query Optimization & Indexing Field Handbook',
      course: 'CS305 DBMS',
      category: 'CheatSheet',
      fileSize: '1.2 MB PDF',
      description: 'PostgreSQL EXPLAIN ANALYZE cheat sheet, composite index ordering, and partition pruning.'
    },
    {
      id: 'res-5',
      title: 'Computer Science & Engineering 4-Year Semester Roadmap',
      course: 'B.Tech Curriculum',
      category: 'Roadmap',
      fileSize: '3.1 MB PDF',
      description: 'Curated semester-by-semester course milestones, elective recommendations, and placement prep timelines.'
    },
    {
      id: 'res-6',
      title: 'Full-Stack Modern Web Engineering 2026 Developer Roadmap',
      course: 'CS410 Web Dev',
      category: 'Roadmap',
      fileSize: '2.0 MB PDF',
      description: 'React 19, TypeScript, Node.js microservices, Docker containerization, and cloud deployment pipelines.'
    },
    {
      id: 'res-7',
      title: 'Computer Networking: Top-Down Protocol Reference Guide',
      course: 'CS420 Networks',
      category: 'Textbook',
      fileSize: '4.5 MB PDF',
      description: 'Packet headers for IPv4/IPv6, TCP flags, TLS 1.3 handshake cryptographic exchanges, and Wireshark filters.'
    }
  ];

  const filtered = resources.filter(
    (r) => selectedCategory === 'ALL' || r.category === selectedCategory
  );

  const handleDownload = (res: ResourceItem) => {
    // Generate text/blob download simulating textbook resource
    const blob = new Blob(
      [
        `=======================================================\nLEARNING HUB ACADEMIC RESOURCE ARCHIVE\n=======================================================\n\nResource: ${res.title}\nCourse: ${res.course}\nCategory: ${res.category}\nDate: ${res.year || '2026'}\n\nContents:\nSummary notes, theoretical definitions, and exam questions.\nFor full course materials, visit Learning Hub Academic Portal.\n=======================================================`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(res.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Academic Archives & Resource Library</h3>
            <p className="text-xs text-slate-400">
              Official past year papers, syllabus roadmaps, and reference materials
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {['ALL', 'PYQ', 'CheatSheet', 'Roadmap', 'Textbook'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'ALL'
                ? 'All Resources'
                : cat === 'PYQ'
                ? 'Past Papers (PYQs)'
                : cat === 'CheatSheet'
                ? 'Cheat Sheets'
                : cat === 'Roadmap'
                ? 'Roadmaps'
                : 'Textbooks'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 backdrop-blur-sm transition-all shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {item.fileSize}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold block mb-1">
                  {item.course}
                </span>
                <h4 className="font-bold text-sm text-white leading-snug">
                  {item.title}
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              {item.year ? (
                <span className="text-[11px] text-slate-400 font-mono">
                  Exam Term: {item.year}
                </span>
              ) : (
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Updated 2026
                </span>
              )}

              <button
                onClick={() => handleDownload(item)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  downloadSuccess === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess === item.id ? 'Downloaded' : 'Download'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
