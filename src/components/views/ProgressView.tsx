import React from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  Flame,
  Brain,
  BookOpen,
  HelpCircle,
  RotateCcw,
  CheckSquare
} from 'lucide-react';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';
import { TopicUserProgress, StudentProfile } from '../../types';

interface ProgressViewProps {
  currentProfile: StudentProfile;
  topicProgressMap: Record<string, TopicUserProgress>;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  currentProfile,
  topicProgressMap
}) => {
  let totalTopics = 0;
  let masteredTopics = 0;
  let understoodTopics = 0;
  let feynmanPassed = 0;
  let totalPracticeAttempts = 0;
  let totalPracticeCorrect = 0;

  OFFICIAL_SUBJECTS.forEach((s) => {
    s.units.forEach((u) => {
      u.topics.forEach((t) => {
        totalTopics++;
        const prog = topicProgressMap[t.id];
        if (prog) {
          if (prog.state === 'MASTERED') masteredTopics++;
          if (prog.state === 'UNDERSTOOD' || prog.state === 'STRONG' || prog.state === 'MASTERED') {
            understoodTopics++;
          }
          if (prog.feynmanCompleted) feynmanPassed++;
          totalPracticeAttempts += prog.practiceAttempts;
          totalPracticeCorrect += prog.practiceCorrect;
        }
      });
    });
  });

  const overallMasteryRate = totalTopics > 0 ? Math.round((masteredTopics / totalTopics) * 100) : 0;
  const syllabusCoveredRate = totalTopics > 0 ? Math.round((understoodTopics / totalTopics) * 100) : 0;
  const practiceAccuracy =
    totalPracticeAttempts > 0
      ? Math.round((totalPracticeCorrect / totalPracticeAttempts) * 100)
      : 85;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-600/20 text-red-500">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Academic Progress & Mastery Evidence
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Student Profile: <span className="text-white font-semibold">{currentProfile.name}</span> ({currentProfile.section}) • Target GPA: <span className="text-red-400 font-mono font-bold">{currentProfile.targetGpa}</span>
            </p>
          </div>
        </div>

        {/* Evidence-Based Mastery Philosophy Card */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-red-400 font-mono block mb-1">
            EVIDENCE-BASED MASTERY STANDARD:
          </span>
          A topic is never marked "Mastered" simply because you read it. It requires multi-stage verification:
          <strong> Conceptual Clarity → Feynman Explanation Passed → Active Recall &gt; 80% → University Exam Problem Solved</strong>.
        </div>
      </div>

      {/* 4 Pillars of Readiness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <span className="text-xs text-zinc-400">Proven Mastery</span>
          <div className="text-2xl font-black font-mono text-white">
            {masteredTopics} <span className="text-xs text-zinc-500">/ {totalTopics}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full rounded-full" style={{ width: `${overallMasteryRate}%` }} />
          </div>
          <span className="text-[10px] text-zinc-400">{overallMasteryRate}% of syllabus mastered</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <span className="text-xs text-zinc-400">Feynman Explanations</span>
          <div className="text-2xl font-black font-mono text-amber-400">
            {feynmanPassed} <span className="text-xs text-zinc-500">completed</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, feynmanPassed * 20)}%` }} />
          </div>
          <span className="text-[10px] text-zinc-400">Evaluated by AI diagnostic rubric</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <span className="text-xs text-zinc-400">Practice Accuracy</span>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {practiceAccuracy}%
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${practiceAccuracy}%` }} />
          </div>
          <span className="text-[10px] text-zinc-400">{totalPracticeCorrect} of {totalPracticeAttempts} correct</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <span className="text-xs text-zinc-400">Syllabus Coverage</span>
          <div className="text-2xl font-black font-mono text-white">
            {syllabusCoveredRate}%
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${syllabusCoveredRate}%` }} />
          </div>
          <span className="text-[10px] text-zinc-400">Understood & in progress</span>
        </div>
      </div>

      {/* Subject-by-Subject Deep Breakdown */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">
          Subject-wise Exam Readiness & Coverage
        </h2>

        <div className="space-y-3">
          {OFFICIAL_SUBJECTS.map((sub) => {
            const subTopics: any[] = [];
            sub.units.forEach((u) => subTopics.push(...u.topics));
            const subMastered = subTopics.filter(
              (t) => topicProgressMap[t.id]?.state === 'MASTERED'
            ).length;
            const subRate = subTopics.length > 0 ? Math.round((subMastered / subTopics.length) * 100) : 0;

            return (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/70 border border-red-800/40">
                      {sub.code}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{sub.name}</h3>
                      <p className="text-xs text-zinc-400">{sub.credits} Credits • {sub.units.length} Units</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-white">
                      {subRate}% Mastered
                    </span>
                    <span className="text-[11px] text-zinc-400 block">
                      ({subMastered} of {subTopics.length} topics)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full rounded-full" style={{ width: `${subRate}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
