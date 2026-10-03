import React from 'react';
import {
  GraduationCap,
  Search,
  User,
  Command,
  BookOpen
} from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentProfile: StudentProfile;
  onSwitchProfile: (profile: StudentProfile) => void;
  availableProfiles: StudentProfile[];
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onSwitchProfile,
  availableProfiles,
  onOpenCommandPalette
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between">
      {/* College & Project Badge */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 font-bold shadow-[0_0_15px_rgba(220,38,38,0.2)]">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">
              IEC CSE <span className="text-red-500 font-mono text-xs px-1.5 py-0.5 rounded bg-red-950/60 border border-red-800/50">SEC-C</span>
            </span>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="text-xs text-zinc-400 hidden md:inline font-medium">
              Study & Learning Hub
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 hidden sm:block">
            IEC College of Engineering & Technology • B.Tech 2nd Year (3rd Sem)
          </p>
        </div>
      </div>

      {/* Center Search Bar / Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-zinc-400 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors group cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 transition-colors" />
            <span>Search topics, units, formulas, notes, PYQs...</span>
          </span>
          <kbd className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 border border-zinc-700 rounded">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Profile & Search on Mobile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search button on small screens */}
        <button
          onClick={onOpenCommandPalette}
          className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Profile */}
        <div className="relative group">
          <button className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition-colors cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold font-mono">
              {currentProfile.name.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-white leading-tight">
                {currentProfile.name}
              </div>
              <div className="text-[10px] text-zinc-400 leading-tight">
                {currentProfile.section}
              </div>
            </div>
          </button>

          {/* Profile Dropdown */}
          <div className="absolute right-0 mt-1.5 w-60 p-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            <div className="px-2 py-1.5 border-b border-zinc-800 mb-1">
              <p className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">
                Student Profile
              </p>
              <p className="text-xs font-bold text-white">{currentProfile.name}</p>
              <p className="text-[11px] text-zinc-400">{currentProfile.college}</p>
            </div>
            <p className="px-2 py-1 text-[10px] text-zinc-500">Switch profile:</p>
            {availableProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => onSwitchProfile(p)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  p.id === currentProfile.id
                    ? 'bg-red-950/60 text-red-200 border border-red-800/50'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <span>{p.name}</span>
                {p.id === currentProfile.id && (
                  <span className="text-[10px] font-mono text-red-400">Active</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
