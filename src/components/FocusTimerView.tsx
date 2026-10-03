import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CloudRain,
  Radio,
  Coffee,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface FocusTimerViewProps {
  secondsRemaining: number;
  isRunning: boolean;
  onToggleRunning: () => void;
  onResetTimer: (newSeconds?: number) => void;
  activeMode: 'focus' | 'shortBreak' | 'longBreak';
  onChangeMode: (mode: 'focus' | 'shortBreak' | 'longBreak') => void;
  completedPomodoros: number;
  totalFocusMinutes: number;
}

export const FocusTimerView: React.FC<FocusTimerViewProps> = ({
  secondsRemaining,
  isRunning,
  onToggleRunning,
  onResetTimer,
  activeMode,
  onChangeMode,
  completedPomodoros,
  totalFocusMinutes,
}) => {
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'white'>('none');

  const modeDurations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const currentMax = modeDurations[activeMode];
  const progressPercent = Math.min(100, Math.max(0, ((currentMax - secondsRemaining) / currentMax) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSoundChange = (type: 'none' | 'rain' | 'white') => {
    setAmbientSound(type);
    if (type === 'none') {
      soundSynth.stopAmbient();
    } else {
      soundSynth.startAmbient(type);
    }
  };

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      soundSynth.stopAmbient();
    };
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
          <Clock className="w-6 h-6 text-amber-400" />
          Focus Pomodoro & Soundscape
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Calibrated intervals designed to eliminate cognitive fatigue and maintain deep flow.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-2 shadow-lg">
          <button
            onClick={() => onChangeMode('focus')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'focus'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Deep Focus (25m)</span>
          </button>

          <button
            onClick={() => onChangeMode('shortBreak')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'shortBreak'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Short Break (5m)</span>
          </button>

          <button
            onClick={() => onChangeMode('longBreak')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'longBreak'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Long Break (15m)</span>
          </button>
        </div>
      </div>

      {/* Big Timer Circle Display */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Circular Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className={`transition-all duration-1000 ${
                activeMode === 'focus'
                  ? 'stroke-amber-400'
                  : activeMode === 'shortBreak'
                  ? 'stroke-emerald-400'
                  : 'stroke-indigo-400'
              }`}
              strokeWidth="8"
              strokeDasharray="276%"
              strokeDashoffset={`${276 - (276 * progressPercent) / 100}%`}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Central Digits & Status */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-5xl sm:text-6xl font-black text-white tracking-tighter">
              {formatTime(secondsRemaining)}
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-2">
              {isRunning
                ? activeMode === 'focus'
                  ? 'Stay Focused'
                  : 'Rest & Stretch'
                : 'Paused'}
            </span>

            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Session {completedPomodoros + 1} of 4</span>
            </div>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => onResetTimer()}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Reset interval"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleRunning}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 shadow-xl transition-all ${
              isRunning
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Begin Flow</span>
              </>
            )}
          </button>

          <button
            onClick={() => soundSynth.playCompletionChime()}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Test completion bell"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Synthesized Ambient Audio Soundscape */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-indigo-400" />
            <h4 className="font-bold text-sm text-white">Study Ambience Soundscape</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Generated client-side via Web Audio API
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSoundChange('none')}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all ${
              ambientSound === 'none'
                ? 'bg-slate-800 border-indigo-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Silent / Mute</span>
            </div>
            {ambientSound === 'none' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
          </button>

          <button
            onClick={() => handleSoundChange('rain')}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all ${
              ambientSound === 'rain'
                ? 'bg-slate-800 border-indigo-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <span>Calming Rain (Pink Noise)</span>
            </div>
            {ambientSound === 'rain' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => handleSoundChange('white')}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all ${
              ambientSound === 'white'
                ? 'bg-slate-800 border-indigo-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-400" />
              <span>White Noise Static</span>
            </div>
            {ambientSound === 'white' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Daily Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{completedPomodoros}</div>
            <div className="text-xs text-slate-400 font-medium">Completed Focus Cycles</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalFocusMinutes} min</div>
            <div className="text-xs text-slate-400 font-medium">Total Deep Work Logged</div>
          </div>
        </div>
      </div>
    </div>
  );
};
