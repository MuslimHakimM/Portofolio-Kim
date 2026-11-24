import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  MessageSquare,
  Smartphone,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

type InspectMode = 'scroll' | 'splash' | 'dashboard' | 'dual';

interface BuildInspectorChapterProps {
  projects: ProjectItem[];
  onInspectProject: (project: ProjectItem) => void;
  onDiscussProject: (project: ProjectItem) => void;
}

const CleanDeviceScreen: React.FC<{
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}> = ({ src, alt, fallbackTitle, className = '' }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`w-full h-full bg-[#13151B] flex flex-col items-center justify-center p-5 text-center ${className}`}
      >
        <Smartphone aria-hidden="true" className="w-7 h-7 text-[#3DDC84] mb-2.5" />
        <p className="font-display text-sm font-semibold text-[#F4F2EC]">{fallbackTitle}</p>
        <p className="font-mono text-[11px] text-[#A4A8B3] mt-1">Preview unavailable</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover object-top select-none ${className}`}
    />
  );
};

export const BuildInspectorChapter: React.FC<BuildInspectorChapterProps> = ({
  projects,
  onInspectProject,
  onDiscussProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectMode, setInspectMode] = useState<InspectMode>('scroll');
  const [manualWipe, setManualWipe] = useState(72);
  const [manualLocked, setManualLocked] = useState(false);
  const [mobileModes, setMobileModes] = useState<Record<string, 'splash' | 'dashboard' | 'dual'>>(
    () =>
      Object.fromEntries(projects.map((p) => [p.id, 'dashboard'])) as Record<
        string,
        'splash' | 'dashboard' | 'dual'
      >
  );

  const dossierRefs = useRef<(HTMLElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pctReadoutRef = useRef<HTMLSpanElement | null>(null);
  const modeRef = useRef<InspectMode>(inspectMode);
  const manualLockedRef = useRef<boolean>(manualLocked);
  const manualWipeRef = useRef<number>(manualWipe);
  modeRef.current = inspectMode;
  manualLockedRef.current = manualLocked;
  manualWipeRef.current = manualWipe;

  const applyWipe = (val: number, labelOverride?: string) => {
    const stage = stageRef.current;
    if (!stage) return;
    const clamped = Math.max(0, Math.min(1, val));
    stage.style.setProperty('--wipe-p', clamped.toFixed(4));
    if (pctReadoutRef.current) {
      pctReadoutRef.current.textContent = labelOverride ?? `${Math.round(clamped * 100)}%`;
    }
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateFromScroll = () => {
      rafId = 0;
      const vh = window.innerHeight || 860;
      const focusY = vh * 0.34;
      let bestIdx = 0;
      let bestDist = Infinity;
      let localProgress = 0.72;

      dossierRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const anchor = rect.top + Math.min(rect.height * 0.35, 160);
        const dist = Math.abs(anchor - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
          const span = Math.max(rect.height * 0.85, 1);
          const raw = (vh * 0.56 - rect.top) / span;
          localProgress = Math.max(0, Math.min(1, raw));
        }
      });

      if (!manualLockedRef.current) {
        setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
      }

      if (reduced || modeRef.current === 'dashboard') {
        applyWipe(1, '100%');
      } else if (modeRef.current === 'splash') {
        applyWipe(0, '0%');
      } else if (modeRef.current === 'dual') {
        applyWipe(1, 'DUAL');
      } else if (manualLockedRef.current) {
        applyWipe(manualWipeRef.current / 100);
      } else {
        applyWipe(localProgress);
      }
    };

    const schedule = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [projects.length]);

  useEffect(() => {
    if (inspectMode === 'splash') {
      applyWipe(0, '0%');
    } else if (inspectMode === 'dashboard') {
      applyWipe(1, '100%');
    } else if (inspectMode === 'dual') {
      applyWipe(1, 'DUAL');
    } else {
      applyWipe(manualWipe / 100);
    }
  }, [inspectMode, activeIndex, manualWipe]);

  const activeProject = projects[activeIndex] || projects[0];

  const handleSelectProject = (index: number, shouldScroll = false) => {
    setActiveIndex(index);
    setManualLocked(true);
    window.setTimeout(() => setManualLocked(false), 1200);
    if (shouldScroll) {
      const target = dossierRefs.current[index];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleManualSlider = (val: number) => {
    setManualWipe(val);
    setInspectMode('scroll');
    setManualLocked(true);
    applyWipe(val / 100);
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="chapter--studio scroll-mt-20 relative py-14 sm:py-24"
    >
      <div className="sc-wrap">
        {/* Compact Chapter Header aligned cleanly with the workbench below */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl" data-sc-in data-sc-stagger="50">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-widest uppercase text-[#3DDC84]">
                Chapter II
              </span>
              <span aria-hidden="true" className="w-8 h-px bg-[#F4F2EC]/20" />
              <span className="font-mono text-xs tracking-wider uppercase text-[#A4A8B3]">
                Selected Work
              </span>
            </div>
            <h2
              id="work-heading"
              className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[#F4F2EC]"
            >
              Four shipped applications, ready to inspect screen by screen.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#A4A8B3] max-w-[44ch] leading-relaxed">
            Select a project card or scroll gently to inspect the{' '}
            <span className="text-[#F4F2EC]">Splash to Dashboard</span> transition side by side in
            the Build Inspector.
          </p>
        </div>

        {/* ================================================================
            DESKTOP LAYOUT (>= 1024px):
            Top-aligned side-by-side Workbench (topDeltaPx: 0)
        ================================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* Left Column: 4 Compact Interactive Editorial Project Dossiers */}
          <div className="lg:col-span-5 space-y-4">
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={project.id}
                  ref={(el) => {
                    dossierRefs.current[idx] = el;
                  }}
                  data-sc-act="flow"
                  onClick={() => handleSelectProject(idx, false)}
                  className={`scroll-mt-24 rounded-2xl p-5 xl:p-6 border transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#151820] border-[#3DDC84]/55 shadow-[inset_3px_0_0_#3DDC84] opacity-100'
                      : 'bg-[#101218]/80 border-[#F4F2EC]/10 hover:border-[#F4F2EC]/25 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#3DDC84]">
                        {project.code}
                      </span>
                      <span aria-hidden="true" className="text-[#A4A8B3]/50">
                        ·
                      </span>
                      <span className="font-mono text-xs text-[#A4A8B3]">{project.platform}</span>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#F4F2EC] leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#3DDC84]">{project.subtitle}</p>

                  <p className="mt-3 text-sm text-[#CFD3DC] leading-relaxed">
                    {project.description}
                  </p>

                  {isActive && (
                    <div className="mt-4 space-y-3.5 pt-3.5 border-t border-[#F4F2EC]/10">
                      <p className="pl-3 border-l border-[#3DDC84]/50 text-xs text-[#A4A8B3] leading-relaxed">
                        {project.architectureNote}
                      </p>

                      <ul className="space-y-1.5">
                        {project.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-xs text-[#E4E1DA] leading-relaxed"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3DDC84] shrink-0"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-4 font-mono text-[11px] text-[#A4A8B3]">
                    {project.techStack.join('  ·  ')}
                  </p>

                  <div
                    className="mt-4 pt-3.5 border-t border-[#F4F2EC]/8 flex flex-wrap items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onInspectProject(project)}
                      className="btn-primary-emerald h-9 px-3.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Layers aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>Inspect Dossier</span>
                    </button>

                    {project.liveDemoLink && (
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-hairline h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>Live App</span>
                        <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                      </a>
                    )}

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hairline h-9 px-3 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <Github aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onDiscussProject(project)}
                      className="h-9 px-2.5 rounded-xl text-xs font-medium text-[#A4A8B3] hover:text-[#F4F2EC] flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors"
                    >
                      <MessageSquare aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                      <span>Discuss</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Column: Aligned, Viewport-Fitted Sticky Build Inspector */}
          <div className="lg:col-span-7 sticky top-20">
            <div
              ref={stageRef}
              style={{ ['--wipe-p' as string]: 0.72 }}
              className="surface-plate-elevated rounded-3xl p-5 xl:p-6 overflow-hidden relative"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 editorial-grid-plate opacity-40"
              />

              {/* Inspector Top Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F4F2EC]/10">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3]">
                    <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
                    <span>Build Inspector</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#F4F2EC]">{activeProject.code}</span>
                    <span aria-hidden="true">·</span>
                    <span ref={pctReadoutRef} className="text-[#3DDC84] sc-nums">
                      72%
                    </span>
                  </div>
                  <p className="font-display text-lg font-semibold text-[#F4F2EC] truncate mt-0.5">
                    {activeProject.title}
                  </p>
                </div>

                {/* Inspection Mode Controls */}
                <div
                  role="group"
                  aria-label="Inspector screen mode"
                  className="inline-flex items-center rounded-full bg-[#0B0C0F] p-1 border border-[#F4F2EC]/12"
                >
                  {(
                    [
                      { id: 'scroll', label: 'Scroll Wipe' },
                      { id: 'splash', label: 'Splash' },
                      { id: 'dashboard', label: 'Dashboard' },
                      { id: 'dual', label: 'Dual' },
                    ] as const
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setInspectMode(mode.id);
                        if (mode.id === 'scroll') setManualLocked(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        inspectMode === mode.id
                          ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                          : 'text-[#A4A8B3] hover:text-[#F4F2EC]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Inspector Body */}
              <div className="relative z-10 py-5 grid grid-cols-12 gap-5 items-center min-h-[405px]">
                {inspectMode === 'dual' ? (
                  <div className="col-span-12 flex items-center justify-center gap-6 py-1">
                    <figure className="w-[184px] xl:w-[196px]">
                      <div className="inspector-bezel rounded-[26px] p-1.5">
                        <div className="relative aspect-[9/19.5] rounded-[20px] overflow-hidden bg-[#090A0E]">
                          <CleanDeviceScreen
                            src={activeProject.splashImage}
                            alt={`${activeProject.title} Splash Screen`}
                            fallbackTitle={`${activeProject.title} Splash`}
                          />
                        </div>
                      </div>
                      <figcaption className="mt-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3]">
                        Launch Splash
                      </figcaption>
                    </figure>

                    <figure className="w-[184px] xl:w-[196px]">
                      <div className="inspector-bezel rounded-[26px] p-1.5">
                        <div className="relative aspect-[9/19.5] rounded-[20px] overflow-hidden bg-[#090A0E]">
                          <CleanDeviceScreen
                            src={activeProject.dashboardImage}
                            alt={`${activeProject.title} Live Dashboard`}
                            fallbackTitle={`${activeProject.title} Dashboard`}
                          />
                        </div>
                      </div>
                      <figcaption className="mt-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-[#3DDC84]">
                        Active Dashboard
                      </figcaption>
                    </figure>
                  </div>
                ) : (
                  <>
                    <div className="col-span-5 xl:col-span-6 flex justify-center">
                      <div className="w-[194px] xl:w-[212px] inspector-bezel rounded-[30px] p-2">
                        <div className="relative aspect-[9/19.5] rounded-[22px] overflow-hidden bg-[#090A0E]">
                          <div className="absolute inset-0">
                            <CleanDeviceScreen
                              src={activeProject.splashImage}
                              alt={`${activeProject.title} Splash Screen`}
                              fallbackTitle={`${activeProject.title} Splash`}
                            />
                          </div>

                          <div className="absolute inset-0 inspector-dashboard-curtain">
                            <CleanDeviceScreen
                              src={activeProject.dashboardImage}
                              alt={`${activeProject.title} Live Dashboard`}
                              fallbackTitle={`${activeProject.title} Dashboard`}
                            />
                          </div>

                          <div
                            aria-hidden="true"
                            className="inspector-scanline pointer-events-none absolute inset-x-0 h-[2px] bg-[#3DDC84] z-20"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-7 xl:col-span-6 space-y-5 pr-1">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3] flex items-center justify-between border-b border-[#F4F2EC]/10 pb-2">
                        <span>Layer Breakdown</span>
                        <span className="text-[#3DDC84]">
                          {inspectMode === 'splash'
                            ? 'Cold Start'
                            : inspectMode === 'dashboard'
                            ? 'Live State'
                            : 'Splash -> Dashboard'}
                        </span>
                      </div>

                      {activeProject.callouts.map((callout, cIdx) => (
                        <div
                          key={`${activeProject.id}-${callout.label}`}
                          className="relative pl-9"
                          style={{ ['--trace-delay' as string]: (cIdx * 0.14).toFixed(2) }}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 34 22"
                            className="absolute left-0 top-1 w-7 h-5 overflow-visible"
                            fill="none"
                          >
                            <circle cx="3" cy="11" r="2.5" fill="#3DDC84" />
                            <path
                              d="M6 11 H22 L31 4"
                              stroke="#3DDC84"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              className="spec-trace-path"
                            />
                          </svg>

                          <p className="font-mono text-[11px] uppercase tracking-wider text-[#3DDC84]">
                            {callout.label}
                          </p>
                          <p className="mt-0.5 text-sm text-[#E6E3DC] leading-snug">
                            {callout.detail}
                          </p>
                        </div>
                      ))}

                      {/* Accessible Transition Scrubber */}
                      <div className="pt-3 border-t border-[#F4F2EC]/10 space-y-2">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <label htmlFor="wipe-scrubber" className="text-[#A4A8B3]">
                            Scrub Screen Transition
                          </label>
                          <button
                            type="button"
                            onClick={() => onInspectProject(activeProject)}
                            className="font-sans font-medium text-[#3DDC84] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Dossier</span>
                            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          id="wipe-scrubber"
                          type="range"
                          min={0}
                          max={100}
                          value={
                            inspectMode === 'splash'
                              ? 0
                              : inspectMode === 'dashboard'
                              ? 100
                              : manualWipe
                          }
                          onChange={(e) => handleManualSlider(Number(e.target.value))}
                          aria-label="Adjust screen transition from Splash to Dashboard"
                          className="inspector-range w-full"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Quick App Switcher Strip */}
              <div className="relative z-10 pt-3.5 border-t border-[#F4F2EC]/10 grid grid-cols-4 gap-2">
                {projects.map((p, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectProject(idx, true)}
                      aria-pressed={active}
                      className={`px-3 py-2 rounded-xl text-left transition-colors cursor-pointer border ${
                        active
                          ? 'bg-[#1D212B] border-[#3DDC84]/55 text-[#F4F2EC]'
                          : 'bg-transparent border-transparent hover:bg-white/5 text-[#A4A8B3]'
                      }`}
                    >
                      <span className="block font-mono text-[10px] text-[#3DDC84]">{p.code}</span>
                      <span className="block text-xs font-medium truncate mt-0.5">{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            MOBILE & TABLET ART DIRECTION (< 1024px)
        ================================================================ */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          {projects.map((project) => {
            const currentMode = mobileModes[project.id] || 'dashboard';
            return (
              <article
                key={project.id}
                className="surface-plate rounded-3xl p-4 sm:p-6 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] sm:text-xs text-[#3DDC84]">
                    {project.code} · {project.platform}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[#A4A8B3]">
                    {project.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F2EC] tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#3DDC84]">{project.subtitle}</p>
                </div>

                <div className="space-y-3.5">
                  <div className="inline-flex rounded-full bg-[#0B0C0F] p-1 border border-[#F4F2EC]/12">
                    {(
                      [
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'splash', label: 'Splash' },
                        { id: 'dual', label: 'Dual' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setMobileModes((prev) => ({
                            ...prev,
                            [project.id]: m.id,
                          }))
                        }
                        className={`min-h-[38px] px-3.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          currentMode === m.id
                            ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                            : 'text-[#A4A8B3]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-[#090A0E] border border-[#F4F2EC]/10 p-4 sm:p-5 flex items-center justify-center">
                    {currentMode === 'dual' ? (
                      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                        <div className="inspector-bezel rounded-[20px] p-1.5">
                          <div className="aspect-[9/19.5] rounded-[14px] overflow-hidden bg-[#090A0E]">
                            <CleanDeviceScreen
                              src={project.splashImage}
                              alt={`${project.title} Splash`}
                              fallbackTitle={project.title}
                            />
                          </div>
                        </div>
                        <div className="inspector-bezel rounded-[20px] p-1.5">
                          <div className="aspect-[9/19.5] rounded-[14px] overflow-hidden bg-[#090A0E]">
                            <CleanDeviceScreen
                              src={project.dashboardImage}
                              alt={`${project.title} Dashboard`}
                              fallbackTitle={project.title}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-[200px] sm:w-[230px] inspector-bezel rounded-[28px] p-2">
                        <div className="aspect-[9/19.5] rounded-[20px] overflow-hidden bg-[#090A0E]">
                          <CleanDeviceScreen
                            src={
                              currentMode === 'splash'
                                ? project.splashImage
                                : project.dashboardImage
                            }
                            alt={`${project.title} ${currentMode}`}
                            fallbackTitle={project.title}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[#CFD3DC] leading-relaxed">{project.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#F4F2EC]/10">
                  {project.callouts.map((c) => (
                    <div key={c.label}>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[#3DDC84]">
                        {c.label}
                      </p>
                      <p className="text-xs text-[#E4E1DA] mt-0.5">{c.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => onInspectProject(project)}
                    className="btn-primary-emerald min-h-[44px] px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers aria-hidden="true" className="w-3.5 h-3.5" />
                    <span>Inspect Dossier</span>
                  </button>

                  {project.liveDemoLink ? (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hairline min-h-[44px] px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Live App</span>
                      <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                    </a>
                  ) : (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hairline min-h-[44px] px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <Github aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onDiscussProject(project)}
                    className="col-span-2 sm:col-span-1 btn-hairline min-h-[44px] px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                    <span>Discuss Project</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
