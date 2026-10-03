import React, { useState } from 'react';
import {
  Binary,
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { FORMULA_BANK, DEFINITION_BANK } from '../../data/formulaBank';

export const FormulaBankView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FORMULAS' | 'DEFINITIONS'>('FORMULAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredFormulas = FORMULA_BANK.filter((f) => {
    if (selectedSubject !== 'all' && f.subjectCode !== selectedSubject) return false;
    if (
      searchQuery &&
      !f.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.formula.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.topicName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const filteredDefinitions = DEFINITION_BANK.filter((d) => {
    if (selectedSubject !== 'all' && d.subjectCode !== selectedSubject) return false;
    if (
      searchQuery &&
      !d.term.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.definition.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Binary className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Formula & Definition Reference Bank
            </h1>
          </div>
          <p className="text-xs text-zinc-400">
            Immediate cheat sheet for mathematical invariants, engineering formulas, and academic definitions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-zinc-950 border border-zinc-800 p-1 text-xs">
          <button
            onClick={() => setActiveTab('FORMULAS')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'FORMULAS' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Formula Bank ({FORMULA_BANK.length})
          </button>
          <button
            onClick={() => setActiveTab('DEFINITIONS')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'DEFINITIONS' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Definition Bank ({DEFINITION_BANK.length})
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across ${activeTab.toLowerCase()} (e.g. 'Normal', 'Queue', 'Poset')...`}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
          />
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-300 focus:outline-none focus:border-red-600 shrink-0 w-full sm:w-auto"
        >
          <option value="all">All Course Codes</option>
          <option value="KCS-301">KCS-301 (DS)</option>
          <option value="KCS-302">KCS-302 (COA)</option>
          <option value="KAS-302">KAS-302 (Math-IV)</option>
          <option value="BCC-301">BCC-301 (Cyber Sec)</option>
          <option value="KCS-303">KCS-303 (DSTL)</option>
        </select>
      </div>

      {/* Content Feed */}
      {activeTab === 'FORMULAS' ? (
        <div className="space-y-4">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/70 border border-red-800/40">
                    {f.subjectCode}
                  </span>
                  <span className="text-xs text-zinc-400">{f.subjectName}</span>
                </div>
                <span className="text-xs text-zinc-400 font-mono">{f.topicName}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm sm:text-base text-red-400 font-bold tracking-wide">
                  {f.formula}
                </div>
              </div>

              {/* Variables Meaning Breakdown */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                  Variable Definitions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {f.variables.map((v, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60 flex items-center gap-2"
                    >
                      <code className="text-red-400 font-bold">{v.name}:</code>
                      <span className="text-zinc-300">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 text-xs text-zinc-400 border border-zinc-900 leading-relaxed">
                <strong className="text-zinc-300">Exam Note:</strong> {f.notes}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDefinitions.map((d) => (
            <div
              key={d.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/70 border border-red-800/40">
                  {d.subjectCode}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{d.context}</span>
              </div>

              <h3 className="text-base font-bold text-white">{d.term}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                {d.definition}
              </p>

              {d.example && (
                <div className="p-2.5 rounded-lg bg-zinc-950 text-xs text-zinc-400">
                  <span className="text-zinc-300 font-semibold">Example:</span> {d.example}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
