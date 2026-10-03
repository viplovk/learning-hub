import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  BookOpen,
  HelpCircle,
  Award,
  RotateCcw,
  AlertTriangle,
  Brain,
  MessageSquare,
  User,
  GraduationCap
} from 'lucide-react';
import { askAITutor, TutorMode } from '../../utils/geminiClient';
import { OFFICIAL_SUBJECTS } from '../../data/curriculumData';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AITutorView: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('kcs301');
  const [selectedTopicName, setSelectedTopicName] = useState<string>('Stack & Infix to Postfix');
  const [activeMode, setActiveMode] = useState<TutorMode>('EXPLAIN');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-01',
      sender: 'tutor',
      text: `Hello Viplov and Section C classmates! I am your **AKTU CSE 3rd Semester AI Academic Tutor**.
I am grounded in the official syllabus for **Data Structures, COA, Mathematics-IV, Cyber Security, DSTL, and Technical Communication**.

How can I help you master your curriculum today? You can choose a mode above (like **Exam Prep**, **Teach Me**, or **Quiz Me**) and ask any question!`,
      timestamp: '10:00 AM'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedSubject = OFFICIAL_SUBJECTS.find((s) => s.id === selectedSubjectId);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputPrompt;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const responseText = await askAITutor({
        prompt: promptToSend,
        mode: activeMode,
        subjectName: selectedSubject?.name,
        unitTitle: 'Unit 1-5',
        topicName: selectedTopicName
      });

      const tutorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const modesConfig: { id: TutorMode; label: string; desc: string }[] = [
    { id: 'EXPLAIN', label: 'Explain', desc: 'Concept clarity with analogies' },
    { id: 'TEACH_ME', label: 'Teach Me', desc: 'Step-by-step breakdown' },
    { id: 'QUIZ_ME', label: 'Quiz Me', desc: 'One targeted question at a time' },
    { id: 'SOCRATIC', label: 'Socratic', desc: 'Guide thinking with questions' },
    { id: 'FEYNMAN', label: 'Feynman', desc: 'Diagnose your explanation' },
    { id: 'EXAM_PREP', label: 'Exam Prep', desc: 'AKTU 2/5/10 mark format' },
    { id: 'QUICK_REVISION', label: 'Quick Revision', desc: '60-sec high-yield summary' },
    { id: 'FIND_MISTAKE', label: 'Find Mistake', desc: 'Detect misconceptions' }
  ];

  const quickPrompts = [
    'How do I convert Infix to Postfix with step-by-step stack status for AKTU 10 marks?',
    "Explain Booth's multiplication algorithm using a table with (+7) and (-3).",
    'What are the key penal sections of the Indian IT Act 2000?',
    'Quiz me on AVL tree rotations (LL, RR, LR, RL) one question at a time.',
    "Explain Lagrange's method of multipliers for solving Pp + Qq = R."
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                AI Academic Study Tutor
              </h1>
              <p className="text-xs text-zinc-400">
                Grounded in official AKTU B.Tech CSE syllabus • Promotes active thinking
              </p>
            </div>
          </div>

          {/* Subject Context Selector */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-600 cursor-pointer"
            >
              {OFFICIAL_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.shortName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 8 Modes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-zinc-800">
          {modesConfig.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                activeMode === m.id
                  ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-950'
                  : 'bg-zinc-950/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80'
              }`}
            >
              <div className="text-xs font-bold">{m.label}</div>
              <div
                className={`text-[10px] line-clamp-1 ${
                  activeMode === m.id ? 'text-red-100' : 'text-zinc-500'
                }`}
              >
                {m.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 min-h-[360px] max-h-[480px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                  isUser
                    ? 'bg-zinc-700 text-white'
                    : 'bg-red-600/20 border border-red-500/40 text-red-400'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] sm:max-w-[78%] whitespace-pre-line ${
                  isUser
                    ? 'bg-red-600 text-white font-medium rounded-tr-none'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-tl-none font-mono'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 font-mono">
              AI Tutor is analyzing curriculum and formulating structured response...
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold px-1">
          High-Yield Academic Prompts:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-900 border border-zinc-800">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={`Ask AI Tutor in [${activeMode}] mode...`}
          className="w-full bg-transparent text-xs sm:text-sm px-3 text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputPrompt.trim()}
          className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
