import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Smartphone,
} from 'lucide-react';
import './engine/scrollcraft.js';
import { EMBEDDED_CV_PDF_BASE64 } from './cvData';
import {
  PORTFOLIO_DATA,
  type CertificateItem,
  type ProjectItem,
} from './data/portfolioData';
import { FloatingPillNav, type NavChapter } from './components/FloatingPillNav';
import { BuildInspectorChapter } from './components/BuildInspectorChapter';
import { PortfolioModals } from './components/PortfolioModals';

// Streamlined 4 chapter links; "MH Hakim" on the left unifies Home & Profile
const NAV_CHAPTERS: NavChapter[] = [
  { id: 'work', label: 'Work' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroStageRef = useRef<HTMLDivElement | null>(null);

  // Navigation & reading ledger state
  const [activeChapter, setActiveChapter] = useState<string>('home');
  const [visitedChapters, setVisitedChapters] = useState<Set<string>>(() => new Set(['home']));
  const [overPaper, setOverPaper] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stack ledger filter
  const [techFilter, setTechFilter] = useState<string>('All');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectScreenMode, setProjectScreenMode] = useState<'dual' | 'splash' | 'dashboard'>(
    'dual'
  );
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [certViewPage, setCertViewPage] = useState<'primary' | 'secondary'>('primary');
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvSlideIndex, setCvSlideIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Correspondence desk state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactContextProject, setContactContextProject] = useState<string | null>(null);
  const [contactFeedback, setContactFeedback] = useState<string | null>(null);

  // Mount untouched ScrollCraft runtime cleanly with teardown on unmount
  useEffect(() => {
    const api = window.ScrollCraft?.mount(rootRef.current || document);
    return () => {
      api?.destroy();
    };
  }, []);

  // Re-layout ScrollCraft when stack filter alters page height
  useEffect(() => {
    const instance = window.ScrollCraft?.instances?.[0];
    if (instance) {
      const id = window.requestAnimationFrame(() => instance.layout());
      return () => window.cancelAnimationFrame(id);
    }
  }, [techFilter]);

  // Additive desktop fine-pointer depth for Hero portrait composition
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !finePointer) return;

    const stage = heroStageRef.current;
    if (!stage) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId = 0;

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      stage.style.setProperty('--ptr-x', cx.toFixed(4));
      stage.style.setProperty('--ptr-y', cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      tx = Math.max(-1, Math.min(1, nx));
      ty = Math.max(-1, Math.min(1, ny));
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Active chapter tracker + paper-chapter nav contrast awareness
  useEffect(() => {
    const ids = ['home', 'profile', 'work', 'credentials', 'stack', 'contact'];
    const onScroll = () => {
      const probeY = window.scrollY + Math.min(window.innerHeight * 0.34, 280);
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (probeY >= top && probeY < top + height) {
          current = id;
          break;
        }
      }
      setActiveChapter(current);
      setVisitedChapters((prev) => {
        if (prev.has(current)) return prev;
        const next = new Set(prev);
        next.add(current);
        return next;
      });

      const paperEl = document.getElementById('credentials');
      if (paperEl) {
        const r = paperEl.getBoundingClientRect();
        setOverPaper(r.top <= 76 && r.bottom >= 24);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape key closes modals & mobile menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedCertificate(null);
        setShowCvModal(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredTechStack = useMemo(() => {
    if (techFilter === 'All') return PORTFOLIO_DATA.techStack;
    return PORTFOLIO_DATA.techStack.filter((item) => item.category === techFilter);
  }, [techFilter]);

  const navigateTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  // Verified CV PDF Download with %PDF- magic byte check & embedded binary fallback
  const handleDownloadCv = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch(PORTFOLIO_DATA.profile.cvPdfUrl);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const isValidPdf =
          bytes.length > 5 &&
          bytes[0] === 0x25 &&
          bytes[1] === 0x50 &&
          bytes[2] === 0x44 &&
          bytes[3] === 0x46 &&
          bytes[4] === 0x2d;

        if (isValidPdf) {
          const blob = new Blob([buffer], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'CV_Muslim_Hakim_Muhammad.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
          return;
        }
      }
    } catch {
      // Fallback to embedded base64 PDF
    }

    const binaryString = window.atob(EMBEDDED_CV_PDF_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'CV_Muslim_Hakim_Muhammad.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
  };

  const handleDiscussProject = (project: ProjectItem) => {
    setSelectedProject(null);
    setContactContextProject(project.title);
    setContactForm((prev) => ({
      ...prev,
      subject: `Project Inquiry: ${project.title}`,
      message:
        prev.message.trim() ||
        `Hi Hakim, I inspected ${project.title} (${project.platform}) on your portfolio and would like to discuss an Android or web opportunity.`,
    }));
    navigateTo('contact');
  };

  const getFormattedContactText = () => {
    const senderName = contactForm.name.trim() || 'Prospective Collaborator';
    const senderEmail = contactForm.email.trim() || 'Not provided';
    const subjectLine = contactForm.subject.trim() || 'Portfolio Inquiry / Collaboration';
    const bodyText =
      contactForm.message.trim() ||
      'Hi Hakim, I reviewed your Android Developer portfolio and would love to connect.';

    return {
      subjectLine,
      fullBody: `Hello Muslim Hakim,\n\n${bodyText}\n\n---\nName: ${senderName}\nEmail: ${senderEmail}\nSubject: ${subjectLine}`,
    };
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullBody } = getFormattedContactText();
    const waUrl = `https://wa.me/${PORTFOLIO_DATA.contact.whatsappNumber}?text=${encodeURIComponent(
      fullBody
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setContactFeedback('WhatsApp chat opened in a new tab with your pre-filled message.');
    window.setTimeout(() => setContactFeedback(null), 4500);
  };

  const handleSendEmail = () => {
    const { subjectLine, fullBody } = getFormattedContactText();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailtoUrl;
    setContactFeedback(
      `Email client opened with your message addressed to ${PORTFOLIO_DATA.contact.email}.`
    );
    window.setTimeout(() => setContactFeedback(null), 4500);
  };

  const bangkitCert = PORTFOLIO_DATA.certificates[0];
  const dicodingCerts = PORTFOLIO_DATA.certificates.slice(1);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#0B0C0F] text-[#F4F2EC] relative">
      {/* Keyboard Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ScrollCraft top hairline progress indicator */}
      <div data-sc-progress aria-hidden="true" />

      {/* Subtle architectural matte grain */}
      <div className="sc-grain" aria-hidden="true" />

      {/* Streamlined Floating Pill Navigation (MH Hakim = Profile + 4 Chapters) */}
      <FloatingPillNav
        chapters={NAV_CHAPTERS}
        activeChapter={activeChapter}
        visitedChapters={visitedChapters}
        overPaper={overPaper}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen((prev) => !prev)}
        onNavigate={navigateTo}
        onOpenCv={() => {
          setMobileMenuOpen(false);
          setShowCvModal(true);
        }}
      />

      <main id="main-content">
        {/* ====================================================================
            TITLE PAGE (#home): OBSIDIAN EDITORIAL OPENING (PORTRAIT ONLY)
        ==================================================================== */}
        <section
          id="home"
          data-sc-act="flow"
          className="chapter--obsidian relative min-h-[100dvh] flex items-center pt-24 pb-14 sm:pt-32 sm:pb-24 overflow-x-clip"
        >
          <div className="sc-wrap w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Editorial Masthead & Title */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7 relative z-10">
                <p className="font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#3DDC84]">
                  Android Developer · Bekasi, Indonesia
                </p>

                <h1 className="hero-headline">
                  Muslim Hakim
                  <br />
                  Muhammad.
                </h1>

                <p className="text-base sm:text-lg text-[#B8BCC7] max-w-[46ch] leading-relaxed">
                  {PORTFOLIO_DATA.profile.shortHeroBio}
                </p>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('work')}
                    className="btn-primary-emerald min-h-[46px] px-5 sm:px-6 rounded-full text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore Projects</span>
                    <ArrowDownRight aria-hidden="true" className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCvModal(true)}
                    className="btn-hairline min-h-[46px] px-5 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <FileText aria-hidden="true" className="w-4 h-4 text-[#3DDC84]" />
                    <span>View CV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="min-h-[44px] px-2.5 text-sm font-medium text-[#CFD3DC] hover:text-[#3DDC84] underline underline-offset-4 decoration-[#F4F2EC]/25 hover:decoration-[#3DDC84] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Contact
                  </button>
                </div>

                {/* Responsive Verified Highlights Strip */}
                <div className="pt-7 border-t border-[#F4F2EC]/10 grid grid-cols-1 min-[420px]:grid-cols-3 gap-4 max-w-xl">
                  <div>
                    <p className="font-mono text-xs text-[#A4A8B3]">Focus</p>
                    <p className="font-display text-sm sm:text-base font-medium text-[#F4F2EC] mt-1">
                      Kotlin &amp; Compose
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#A4A8B3]">Program</p>
                    <p className="font-display text-sm sm:text-base font-medium text-[#F4F2EC] mt-1">
                      Bangkit Distinction
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#A4A8B3]">Record</p>
                    <p className="font-display text-sm sm:text-base font-medium text-[#F4F2EC] mt-1">
                      4 Apps · GPA 3.54
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Studio Portrait Only (No PWA Overlay) */}
              <div
                ref={heroStageRef}
                className="lg:col-span-5 hero-depth-stage flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-[370px] pt-3 pb-3">
                  {/* Subtle Rear Coordinate Plate */}
                  <div
                    data-sc-parallax="-0.75"
                    aria-hidden="true"
                    className="hero-plane-bg absolute -top-2 -right-2 sm:-top-3 sm:-right-4 w-[94%] aspect-[4/4.8] rounded-3xl border border-[#F4F2EC]/10 bg-[#12141B] editorial-grid-plate"
                  />

                  {/* Focal Subject: Studio Portrait Plate */}
                  <figure
                    data-sc-parallax="-0.25"
                    className="hero-plane-subject relative z-10 w-full rounded-3xl overflow-hidden bg-[#181B23] border border-[#F4F2EC]/14 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.75)]"
                  >
                    <div className="p-2.5 pb-0 bg-[#151820]">
                      <div className="rounded-2xl overflow-hidden bg-[#D9DCE2] aspect-[4/4.6]">
                        <img
                          src={PORTFOLIO_DATA.profile.avatarUrl}
                          alt="Muslim Hakim Muhammad, Android Developer"
                          width={768}
                          height={880}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <figcaption className="px-4 py-3 flex items-center justify-between bg-[#151820] border-t border-[#F4F2EC]/8">
                      <span className="font-mono text-[11px] text-[#E6E3DC]">
                        Muslim Hakim M.
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3DDC84]">
                        Available
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CHAPTER I (#profile): PROFILE & EDUCATION LEDGER
        ==================================================================== */}
        <section
          id="profile"
          aria-labelledby="profile-heading"
          className="chapter--graphite scroll-mt-20 py-14 sm:py-24"
        >
          <div className="sc-wrap space-y-14 lg:space-y-18">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5" data-sc-in data-sc-stagger="60">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#3DDC84]">
                    Chapter I
                  </span>
                  <span aria-hidden="true" className="w-8 h-px bg-[#F4F2EC]/20" />
                  <span className="font-mono text-xs tracking-wider uppercase text-[#A4A8B3]">
                    Profile &amp; Grounding
                  </span>
                </div>
                <h2
                  id="profile-heading"
                  className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.028em] leading-[1.08] text-[#F4F2EC]"
                >
                  {PORTFOLIO_DATA.profile.aboutLead}
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-8" data-sc-in data-sc-stagger="70">
                <p className="text-base sm:text-lg text-[#CFD3DC] leading-relaxed max-w-[60ch]">
                  {PORTFOLIO_DATA.profile.aboutDescription}
                </p>

                {/* Verified Numbers Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 pt-6 border-t border-[#F4F2EC]/12">
                  {PORTFOLIO_DATA.profile.verifiedMetrics.map((metric) => (
                    <div key={metric.id}>
                      <p className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F2EC] tracking-tight sc-nums">
                        <span
                          data-sc-count={`${metric.from} ${metric.to}`}
                          data-sc-count-ms="1300"
                        >
                          {metric.to}
                        </span>
                        <span className="text-[#3DDC84]">{metric.suffix}</span>
                      </p>
                      <p className="text-xs font-medium text-[#E6E3DC] mt-1.5">{metric.label}</p>
                      <p className="text-[11px] text-[#A4A8B3] mt-0.5 leading-snug">
                        {metric.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chronological Education Ledger */}
            <div className="pt-10 sm:pt-12 border-t border-[#F4F2EC]/10">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6 sm:mb-8">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F4F2EC]">
                  Academic &amp; Engineering Training
                </h3>
                <button
                  type="button"
                  onClick={handleDownloadCv}
                  className="font-mono text-xs text-[#3DDC84] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Download aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>Download CV PDF</span>
                </button>
              </div>

              <div className="divide-y divide-[#F4F2EC]/10 border-y border-[#F4F2EC]/10">
                {PORTFOLIO_DATA.education.map((edu) => (
                  <div
                    key={edu.id}
                    data-sc-in
                    className="py-5 sm:py-7 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-8 items-baseline"
                  >
                    <div className="lg:col-span-3 flex flex-wrap lg:block items-center gap-x-3 gap-y-1">
                      <p className="font-mono text-xs text-[#3DDC84]">{edu.period}</p>
                      <p className="font-mono text-[11px] text-[#A4A8B3] lg:mt-1">
                        {edu.location}
                      </p>
                    </div>
                    <div className="lg:col-span-4">
                      <h4 className="font-display text-lg font-semibold text-[#F4F2EC]">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-[#CFD3DC] mt-0.5">{edu.program}</p>
                    </div>
                    <div className="lg:col-span-5 space-y-1.5">
                      <p className="font-mono text-xs text-[#E6E3DC]">{edu.metric}</p>
                      <p className="text-sm text-[#A4A8B3] leading-relaxed">{edu.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CHAPTER II (#work): SELECTED WORK & ALIGNED BUILD INSPECTOR
        ==================================================================== */}
        <BuildInspectorChapter
          projects={PORTFOLIO_DATA.projects}
          onInspectProject={(project) => {
            setSelectedProject(project);
            setProjectScreenMode('dual');
          }}
          onDiscussProject={handleDiscussProject}
        />

        {/* ====================================================================
            CHAPTER III (#credentials): HARD-CUT ARCHIVAL PAPER CREDENTIALS
        ==================================================================== */}
        <section
          id="credentials"
          data-sc-act="flow"
          aria-labelledby="credentials-heading"
          className="chapter--paper scroll-mt-20 py-16 sm:py-24 lg:py-28"
        >
          <div className="sc-wrap space-y-10 sm:space-y-14">
            <div className="max-w-3xl" data-sc-in data-sc-stagger="60">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs tracking-widest uppercase text-[#0B7A42] font-semibold">
                  Chapter III
                </span>
                <span aria-hidden="true" className="w-8 h-px bg-[#121418]/25" />
                <span className="font-mono text-xs tracking-wider uppercase text-[#484D57]">
                  Verified Credentials
                </span>
              </div>
              <h2
                id="credentials-heading"
                className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.06] text-[#121418]"
              >
                Verified proof, archived with official credential records.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#484D57] max-w-[58ch] leading-relaxed">
                Every certificate below links directly to its issuing record and opens in full
                resolution with complete module syllabi.
              </p>
            </div>

            {/* Featured Bangkit Academy Distinction Spread */}
            <article
              data-sc-reveal="up"
              data-sc-reveal-at="0.04 0.32"
              className="rounded-3xl bg-[#F7F4EE] border border-[#121418]/15 p-5 sm:p-8 lg:p-10 shadow-[0_18px_40px_-16px_rgba(18,20,24,0.16)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
            >
              <div className="lg:col-span-6">
                <button
                  type="button"
                  data-sc-tilt="4"
                  onClick={() => {
                    setSelectedCertificate(bangkitCert);
                    setCertViewPage('primary');
                  }}
                  aria-label={`Inspect ${bangkitCert.title}`}
                  className="group block w-full rounded-2xl overflow-hidden border border-[#121418]/15 bg-white shadow-sm cursor-pointer text-left"
                >
                  <img
                    src={bangkitCert.image}
                    alt={bangkitCert.title}
                    width={960}
                    height={680}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </button>
              </div>

              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#0B7A42] font-medium">
                  <Award aria-hidden="true" className="w-4 h-4" />
                  <span>{bangkitCert.issuer}</span>
                </div>

                <h3 className="font-display text-xl sm:text-3xl font-semibold text-[#121418] leading-tight">
                  {bangkitCert.title}
                </h3>

                <p className="font-mono text-xs text-[#484D57] break-all">
                  Issued {bangkitCert.issueDate} · ID {bangkitCert.credentialId}
                </p>

                <p className="text-sm text-[#32363E] leading-relaxed">
                  Completed all 9 core competencies including {bangkitCert.highlights.join(', ')}.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCertificate(bangkitCert);
                      setCertViewPage('primary');
                    }}
                    className="min-h-[42px] px-5 rounded-full bg-[#121418] text-[#F7F4EE] hover:bg-[#0B7A42] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Inspect Certificate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCertificate(bangkitCert);
                      setCertViewPage('secondary');
                    }}
                    className="min-h-[42px] px-4 rounded-full border border-[#121418]/25 text-[#121418] hover:border-[#0B7A42] hover:text-[#0B7A42] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Transcript
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyText(bangkitCert.credentialId, bangkitCert.id)}
                    className="min-h-[42px] px-3 font-mono text-xs text-[#484D57] hover:text-[#121418] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === bangkitCert.id ? (
                      <>
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-[#0B7A42]" />
                        <span className="text-[#0B7A42]">Copied ID</span>
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* Remaining 4 Dicoding Certificates */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
              data-sc-in
              data-sc-stagger="60"
            >
              {dicodingCerts.map((cert) => (
                <article
                  key={cert.id}
                  data-sc-tilt="5"
                  className="rounded-2xl bg-[#F7F4EE] border border-[#121418]/14 p-4 sm:p-6 flex flex-col justify-between gap-5 shadow-[0_8px_24px_-12px_rgba(18,20,24,0.12)]"
                >
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCertificate(cert);
                        setCertViewPage('primary');
                      }}
                      aria-label={`Inspect ${cert.title}`}
                      className="block w-full rounded-xl overflow-hidden border border-[#121418]/12 bg-white cursor-pointer"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        width={720}
                        height={510}
                        loading="lazy"
                        className="w-full aspect-[16/11] object-cover object-top"
                      />
                    </button>

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#0B7A42] font-medium">
                        {cert.issuer} · {cert.issueDate}
                      </p>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[#121418] mt-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-[#484D57] mt-2 leading-relaxed">
                        {cert.highlights.slice(0, 4).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#121418]/10 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-[#484D57] break-all">
                      ID: {cert.credentialId}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCertificate(cert);
                          setCertViewPage('primary');
                        }}
                        className="min-h-[36px] text-xs font-semibold text-[#121418] hover:text-[#0B7A42] transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[36px] text-xs font-semibold text-[#0B7A42] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Verify</span>
                        <ExternalLink aria-hidden="true" className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CHAPTER IV (#stack): TECHNICAL SPECIFICATION LEDGER
        ==================================================================== */}
        <section
          id="stack"
          aria-labelledby="stack-heading"
          className="chapter--graphite scroll-mt-20 py-14 sm:py-24"
        >
          <div className="sc-wrap space-y-8 sm:space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
              <div className="max-w-2xl" data-sc-in data-sc-stagger="50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#3DDC84]">
                    Chapter IV
                  </span>
                  <span aria-hidden="true" className="w-8 h-px bg-[#F4F2EC]/20" />
                  <span className="font-mono text-xs tracking-wider uppercase text-[#A4A8B3]">
                    Technical Specification
                  </span>
                </div>
                <h2
                  id="stack-heading"
                  className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.028em] text-[#F4F2EC]"
                >
                  Tools and platforms used in production.
                </h2>
              </div>

              {/* Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter technical skills by category"
                className="flex flex-wrap items-center gap-1.5"
              >
                {[
                  'All',
                  'Mobile & Programming',
                  'Web & Backend',
                  'Architecture & Tools',
                ].map((cat) => {
                  const active = techFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTechFilter(cat)}
                      className={`min-h-[38px] px-3.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                          : 'bg-[#181B23] text-[#B8BCC7] hover:text-[#F4F2EC] border border-[#F4F2EC]/10'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Specification Ledger */}
            <div className="border-y border-[#F4F2EC]/12 divide-y divide-[#F4F2EC]/8">
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3]">
                <div className="sm:col-span-4">Technology</div>
                <div className="sm:col-span-3">Domain</div>
                <div className="sm:col-span-3">Primary Application</div>
                <div className="sm:col-span-2 sm:text-right">Level</div>
              </div>

              {filteredTechStack.map((skill) => (
                <div
                  key={skill.name}
                  className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline hover:bg-white/[0.025] transition-colors px-2 -mx-2 rounded-lg"
                >
                  <div className="sm:col-span-4 flex items-center justify-between sm:block gap-2">
                    <span className="font-display text-base font-medium text-[#F4F2EC]">
                      {skill.name}
                    </span>
                    <span
                      className={`sm:hidden font-mono text-xs ${
                        skill.proficiency === 'Advanced' ? 'text-[#3DDC84]' : 'text-[#CFD3DC]'
                      }`}
                    >
                      {skill.proficiency}
                    </span>
                  </div>
                  <div className="sm:col-span-3 font-mono text-xs text-[#A4A8B3]">
                    {skill.category}
                  </div>
                  <div className="sm:col-span-3 text-sm text-[#CFD3DC]">{skill.role}</div>
                  <div className="hidden sm:block sm:col-span-2 sm:text-right">
                    <span
                      className={`font-mono text-xs ${
                        skill.proficiency === 'Advanced' ? 'text-[#3DDC84]' : 'text-[#CFD3DC]'
                      }`}
                    >
                      {skill.proficiency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CHAPTER V (#contact): CORRESPONDENCE & COLOPHON
        ==================================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="chapter--obsidian scroll-mt-20 py-14 sm:py-24 border-t border-[#F4F2EC]/12"
        >
          <div className="sc-wrap space-y-12 sm:space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Direct Channels */}
              <div className="lg:col-span-5 space-y-7 sm:space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-[#3DDC84]">
                      Chapter V
                    </span>
                    <span aria-hidden="true" className="w-8 h-px bg-[#F4F2EC]/20" />
                    <span className="font-mono text-xs tracking-wider uppercase text-[#A4A8B3]">
                      Correspondence
                    </span>
                  </div>
                  <h2
                    id="contact-heading"
                    className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.028em] text-[#F4F2EC] leading-tight"
                  >
                    Start a conversation about your next Android or web build.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#A4A8B3] leading-relaxed">
                    {PORTFOLIO_DATA.contact.availability}
                  </p>
                </div>

                {/* Direct Channel Hairline List */}
                <div className="divide-y divide-[#F4F2EC]/10 border-y border-[#F4F2EC]/10">
                  {[
                    {
                      id: 'whatsapp',
                      label: 'WhatsApp / Phone',
                      value: PORTFOLIO_DATA.contact.phone,
                      href: PORTFOLIO_DATA.contact.whatsappLink,
                      icon: Phone,
                    },
                    {
                      id: 'email',
                      label: 'Email',
                      value: PORTFOLIO_DATA.contact.email,
                      href: `mailto:${PORTFOLIO_DATA.contact.email}`,
                      icon: Mail,
                    },
                    {
                      id: 'linkedin',
                      label: 'LinkedIn',
                      value: PORTFOLIO_DATA.contact.linkedinHandle,
                      href: PORTFOLIO_DATA.contact.linkedin,
                      icon: Linkedin,
                    },
                    {
                      id: 'github',
                      label: 'GitHub',
                      value: PORTFOLIO_DATA.contact.githubHandle,
                      href: PORTFOLIO_DATA.contact.github,
                      icon: Github,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group py-4 flex items-center justify-between gap-4 hover:pl-1 transition-[padding] duration-150"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Icon aria-hidden="true" className="w-4 h-4 text-[#3DDC84] shrink-0" />
                          <div className="min-w-0">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-[#A4A8B3]">
                              {item.label}
                            </p>
                            <p className="font-display text-sm sm:text-base font-medium text-[#F4F2EC] group-hover:text-[#3DDC84] transition-colors truncate">
                              {item.value}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="w-4 h-4 text-[#A4A8B3] group-hover:text-[#3DDC84] shrink-0 transition-colors"
                        />
                      </a>
                    );
                  })}
                </div>

                {/* Quick CV Access Block */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCvModal(true)}
                    className="btn-hairline min-h-[44px] px-4 rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <FileText aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                    <span>View CV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCv}
                    className="btn-hairline min-h-[44px] px-4 rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <Download aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                    <span>Download CV PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Dual-Dispatch Composer */}
              <div className="lg:col-span-7 surface-plate rounded-3xl p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F4F2EC]">
                      Direct Message Desk
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A4A8B3] mt-1">
                      Compose once and dispatch directly via WhatsApp or your Email client.
                    </p>
                  </div>
                  {contactContextProject && (
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#3DDC84]/12 text-[#3DDC84] border border-[#3DDC84]/30">
                      Topic: {contactContextProject}
                    </span>
                  )}
                </div>

                <form
                  method="post"
                  action="#contact"
                  onSubmit={handleSendWhatsApp}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs text-[#CFD3DC] mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Budi Santoso"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0B0C0F] border border-[#F4F2EC]/14 focus:border-[#3DDC84] focus:outline-none text-base sm:text-sm text-[#F4F2EC] placeholder:text-[#787D8A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs text-[#CFD3DC] mb-1.5"
                      >
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="name@company.com"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0B0C0F] border border-[#F4F2EC]/14 focus:border-[#3DDC84] focus:outline-none text-base sm:text-sm text-[#F4F2EC] placeholder:text-[#787D8A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono text-xs text-[#CFD3DC] mb-1.5"
                    >
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder="Android Developer Opportunity / Project Collaboration"
                      className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0B0C0F] border border-[#F4F2EC]/14 focus:border-[#3DDC84] focus:outline-none text-base sm:text-sm text-[#F4F2EC] placeholder:text-[#787D8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs text-[#CFD3DC] mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Hello Hakim, I would love to discuss an Android or Web project with you..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0C0F] border border-[#F4F2EC]/14 focus:border-[#3DDC84] focus:outline-none text-base sm:text-sm text-[#F4F2EC] placeholder:text-[#787D8A] resize-y"
                    />
                  </div>

                  <div aria-live="polite">
                    {contactFeedback && (
                      <div
                        role="status"
                        className="p-3.5 rounded-xl bg-[#3DDC84]/10 border border-[#3DDC84]/35 text-xs text-[#B6F7D2] flex items-center gap-2"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-4 h-4 shrink-0 text-[#3DDC84]"
                        />
                        <span>{contactFeedback}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      type="submit"
                      className="btn-primary-emerald min-h-[46px] px-5 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Send aria-hidden="true" className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="btn-hairline min-h-[46px] px-5 rounded-full text-sm font-medium flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Mail aria-hidden="true" className="w-4 h-4 text-[#3DDC84]" />
                      <span>Open Email Client</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(getFormattedContactText().fullBody, 'contact-copy')
                      }
                      className="min-h-[44px] px-4 rounded-full font-mono text-xs text-[#A4A8B3] hover:text-[#F4F2EC] hover:bg-white/6 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                    >
                      {copiedId === 'contact-copy' ? (
                        <>
                          <Check aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                          <span className="text-[#3DDC84]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quiet Editorial Colophon */}
            <footer className="pt-8 sm:pt-10 border-t border-[#F4F2EC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A4A8B3]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="font-display font-medium text-[#F4F2EC]">
                  {PORTFOLIO_DATA.profile.fullName}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                  <span>{PORTFOLIO_DATA.contact.location}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Smartphone aria-hidden="true" className="w-3.5 h-3.5 text-[#3DDC84]" />
                  <span>Android &amp; PWA Engineering</span>
                </span>
              </div>
              <p className="font-mono text-[11px]">
                © {new Date().getFullYear()} · Built with ScrollCraft &amp; UI/UX Pro Max
              </p>
            </footer>
          </div>
        </section>
      </main>

      {/* Interactive Modals */}
      <PortfolioModals
        selectedProject={selectedProject}
        projectScreenMode={projectScreenMode}
        onChangeProjectScreenMode={setProjectScreenMode}
        onCloseProject={() => setSelectedProject(null)}
        onDiscussProject={handleDiscussProject}
        selectedCertificate={selectedCertificate}
        certViewPage={certViewPage}
        onChangeCertViewPage={setCertViewPage}
        onCloseCertificate={() => setSelectedCertificate(null)}
        copiedId={copiedId}
        onCopyText={handleCopyText}
        showCvModal={showCvModal}
        cvPages={PORTFOLIO_DATA.profile.cvPages}
        cvSlideIndex={cvSlideIndex}
        onChangeCvSlideIndex={setCvSlideIndex}
        onDownloadCv={handleDownloadCv}
        onCloseCv={() => setShowCvModal(false)}
      />
    </div>
  );
}
