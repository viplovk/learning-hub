import React, { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Download,
  FileCheck,
  Search,
  Loader2
} from 'lucide-react';
import { StudyMaterialDoc, Subject } from '../../types';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';

interface StudyMaterialsViewProps {
  materials: StudyMaterialDoc[];
  onAddMaterial: (material: StudyMaterialDoc) => void;
  onNavigateTopic?: (topicId: string) => void;
}

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  materials,
  onAddMaterial,
  onNavigateTopic
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadSubjectId, setUploadSubjectId] = useState('kcs301');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const filteredMaterials = materials.filter((m) =>
    selectedSubjectId === 'all' ? true : m.subjectId === selectedSubjectId
  );

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    setUploadSuccessMessage(null);

    setTimeout(() => {
      const newDoc: StudyMaterialDoc = {
        id: 'mat-' + Date.now(),
        name: uploadFileName,
        fileName: uploadFileName.replace(/\s+/g, '_') + '.pdf',
        subjectId: uploadSubjectId,
        unitNumber: 2,
        fileSize: '3.6 MB',
        type: 'PDF',
        uploadDate: new Date().toISOString().split('T')[0],
        extractedConcepts: [
          'Memory Hierarchy & Locality of Reference',
          'Cache Hit Ratio Calculations',
          'Virtual Memory Page Replacement Algorithms'
        ],
        mappedTopicIds: ['coa-cache-mapping', 'coa-addressing-modes']
      };

      onAddMaterial(newDoc);
      setIsUploading(false);
      setUploadFileName('');
      setUploadSuccessMessage(
        `Successfully imported "${newDoc.name}". 3 core concepts mapped directly to the AKTU syllabus!`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner: Syllabus vs Study Material Principle */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-5 h-5 text-red-500" />
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Study Materials Hub & Concept Mapping
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Transforming raw PDFs, lecture slides, and handwritten notes into structured syllabus knowledge nodes.
            </p>
          </div>
        </div>

        {/* Academic Principle Card */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 border-l-2 border-red-600 pl-3">
            <span className="font-mono font-bold text-red-400">OFFICIAL SYLLABUS:</span>
            <p className="text-zinc-400 leading-relaxed">
              Authoritative AKTU curriculum requirements, unit scope, and examination boundaries.
            </p>
          </div>
          <div className="space-y-1 border-l-2 border-zinc-700 pl-3">
            <span className="font-mono font-bold text-zinc-300">STUDY MATERIALS:</span>
            <p className="text-zinc-400 leading-relaxed">
              Teacher PPTs, handwritten notes, and solved PYQ papers that illustrate and reinforce the syllabus topics.
            </p>
          </div>
        </div>
      </div>

      {/* Upload & Ingestion Simulator */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-red-500" />
            <span>Import Study Material & Map to Syllabus</span>
          </h2>
          <span className="text-[10px] font-mono text-zinc-500">
            PDF • PPT • Handwritten Notes
          </span>
        </div>

        <form onSubmit={handleSimulateUpload} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <input
              type="text"
              value={uploadFileName}
              onChange={(e) => setUploadFileName(e.target.value)}
              placeholder="Document title (e.g. 'Unit 2 Linked List Class Notes by Teacher')"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={uploadSubjectId}
              onChange={(e) => setUploadSubjectId(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-red-600"
            >
              {OFFICIAL_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.shortName}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={isUploading || !uploadFileName.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-xs font-bold text-white transition-colors cursor-pointer shadow-md shadow-red-950"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Import & Connect</span>
                </>
              )}
            </button>
          </div>
        </form>

        {uploadSuccessMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{uploadSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">
            Imported Materials & Connected Knowledge Nodes
          </h3>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="text-xs bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-zinc-300 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            {OFFICIAL_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredMaterials.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                    <p className="text-[11px] font-mono text-zinc-400">
                      {doc.fileName} • {doc.fileSize} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 self-start sm:self-auto">
                  {doc.type}
                </span>
              </div>

              {/* Extracted Concepts Mapping */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-[10px] font-mono uppercase text-red-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Extracted Concepts Mapped to Syllabus:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {doc.extractedConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
