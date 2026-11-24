import React from 'react';
import { ArrowDownRight, FileText, Menu, X } from 'lucide-react';

export interface NavChapter {
  id: string;
  label: string;
}

interface FloatingPillNavProps {
  chapters: NavChapter[];
  activeChapter: string;
  visitedChapters: Set<string>;
  overPaper: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onNavigate: (chapterId: string) => void;
  onOpenCv: () => void;
}

export const FloatingPillNav: React.FC<FloatingPillNavProps> = ({
  chapters,
  activeChapter,
  visitedChapters,
  overPaper,
  mobileOpen,
  onToggleMobile,
  onNavigate,
  onOpenCv,
}) => {
  // Unified Home + Profile state represented by "MH Hakim"
  const isProfileActive = activeChapter === 'home' || activeChapter === 'profile';

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-40 pointer-events-none px-3 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Floating Pill Bar */}
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto floating-pill-shell w-full lg:w-auto rounded-full px-2 py-1.5 flex items-center justify-between gap-2 ${
            overPaper ? 'floating-pill-shell--over-paper' : ''
          }`}
        >
          {/* Left: Unified Brand + Profile Button ("MH Hakim") */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-current={isProfileActive ? 'location' : undefined}
            className={`floating-pill-btn flex items-center gap-2 pl-1.5 pr-3.5 h-10 lg:h-9 rounded-full cursor-pointer shrink-0 ${
              isProfileActive
                ? 'bg-[#F4F2EC] text-[#0B0C0F] font-semibold'
                : 'text-[#F4F2EC] hover:bg-white/10'
            }`}
            aria-label="Muslim Hakim Muhammad, Profile and Top"
          >
            <span
              className={`w-7 h-7 lg:w-6 lg:h-6 rounded-full font-display font-bold text-[11px] tracking-tight flex items-center justify-center shrink-0 ${
                isProfileActive
                  ? 'bg-[#0B0C0F] text-[#3DDC84]'
                  : 'bg-[#3DDC84] text-[#07130C]'
              }`}
            >
              MH
            </span>
            <span className="font-display font-semibold text-sm lg:text-xs tracking-tight whitespace-nowrap">
              Hakim
            </span>
          </button>

          {/* Center (Desktop >= 1024px): Streamlined 4 Chapter Links */}
          <div className="hidden lg:flex items-center gap-1 px-1">
            {chapters.map((chapter) => {
              const isActive = activeChapter === chapter.id;
              const isVisited = visitedChapters.has(chapter.id);
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => onNavigate(chapter.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`floating-pill-btn h-9 px-3.5 rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#F4F2EC] text-[#0B0C0F] font-semibold'
                      : 'text-[#C8CCD5] hover:text-[#F4F2EC] hover:bg-white/8'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#0B7A42]'
                        : isVisited
                        ? 'bg-[#3DDC84]/80'
                        : 'bg-white/20'
                    }`}
                  />
                  <span>{chapter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Clean Actions + Mobile/Tablet Menu Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              aria-hidden="true"
              className="hidden lg:block w-px h-5 bg-white/14 mx-0.5"
            />
            <button
              type="button"
              onClick={onOpenCv}
              className="floating-pill-btn h-10 lg:h-9 px-3.5 lg:px-3 rounded-full text-xs font-medium text-[#E6E3DC] hover:text-white bg-white/8 lg:bg-transparent hover:bg-white/14 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
              <span>View CV</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="hidden lg:flex floating-pill-btn h-9 px-3.5 rounded-full text-xs font-semibold bg-[#3DDC84] text-[#07130C] hover:brightness-105 items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Explore Projects</span>
              <ArrowDownRight aria-hidden="true" className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleMobile}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden floating-pill-btn w-10 h-10 rounded-full bg-white/10 hover:bg-white/16 text-[#F4F2EC] flex items-center justify-center cursor-pointer shrink-0"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="w-4 h-4" />
              ) : (
                <Menu aria-hidden="true" className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Solid Obsidian Mobile & Tablet Floating Menu Sheet */}
        {mobileOpen && (
          <div
            role="dialog"
            aria-label="Mobile Navigation"
            className="pointer-events-auto lg:hidden mt-2.5 w-full floating-pill-drawer rounded-3xl p-3 text-[#F4F2EC]"
          >
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                aria-current={isProfileActive ? 'location' : undefined}
                className={`w-full min-h-[46px] px-4 py-2.5 rounded-2xl flex items-center justify-between text-left text-sm transition-colors cursor-pointer ${
                  isProfileActive
                    ? 'bg-[#F4F2EC] text-[#0B0C0F] font-semibold'
                    : 'text-[#D6D9E0] hover:bg-white/8'
                }`}
              >
                <span>Profile</span>
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${
                    isProfileActive ? 'bg-[#0B7A42]' : 'bg-[#3DDC84]/80'
                  }`}
                />
              </button>

              {chapters.map((chapter) => {
                const isActive = activeChapter === chapter.id;
                const isVisited = visitedChapters.has(chapter.id);
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => onNavigate(chapter.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-2xl flex items-center justify-between text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F4F2EC] text-[#0B0C0F] font-semibold'
                        : 'text-[#D6D9E0] hover:bg-white/8'
                    }`}
                  >
                    <span>{chapter.label}</span>
                    <span
                      aria-hidden="true"
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? 'bg-[#0B7A42]'
                          : isVisited
                          ? 'bg-[#3DDC84]/80'
                          : 'bg-white/20'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onOpenCv}
                className="min-h-[44px] rounded-2xl bg-white/8 hover:bg-white/12 text-xs font-medium text-[#F4F2EC] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                <span>View CV</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('work')}
                className="min-h-[44px] rounded-2xl bg-[#3DDC84] text-xs font-semibold text-[#07130C] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Projects</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
