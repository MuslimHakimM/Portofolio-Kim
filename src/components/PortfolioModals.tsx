import React, { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  MessageSquare,
  X,
} from 'lucide-react';
import { EMBEDDED_CV_PAGES } from '../cvData';
import type { CertificateItem, ProjectItem } from '../data/portfolioData';

interface PortfolioModalsProps {
  selectedProject: ProjectItem | null;
  projectScreenMode: 'dual' | 'splash' | 'dashboard';
  onChangeProjectScreenMode: (mode: 'dual' | 'splash' | 'dashboard') => void;
  onCloseProject: () => void;
  onDiscussProject: (project: ProjectItem) => void;

  selectedCertificate: CertificateItem | null;
  certViewPage: 'primary' | 'secondary';
  onChangeCertViewPage: (page: 'primary' | 'secondary') => void;
  onCloseCertificate: () => void;
  copiedId: string | null;
  onCopyText: (text: string, id: string) => void;

  showCvModal: boolean;
  cvPages: string[];
  cvSlideIndex: number;
  onChangeCvSlideIndex: (index: number) => void;
  onDownloadCv: (e?: React.MouseEvent) => void;
  onCloseCv: () => void;
}

export const PortfolioModals: React.FC<PortfolioModalsProps> = ({
  selectedProject,
  projectScreenMode,
  onChangeProjectScreenMode,
  onCloseProject,
  onDiscussProject,
  selectedCertificate,
  certViewPage,
  onChangeCertViewPage,
  onCloseCertificate,
  copiedId,
  onCopyText,
  showCvModal,
  cvPages,
  cvSlideIndex,
  onChangeCvSlideIndex,
  onDownloadCv,
  onCloseCv,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const isAnyOpen = Boolean(selectedProject || selectedCertificate || showCvModal);

  useEffect(() => {
    if (isAnyOpen) {
      openerRef.current = document.activeElement as HTMLElement | null;
      const id = window.requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    } else if (openerRef.current) {
      openerRef.current.focus();
      openerRef.current = null;
    }
  }, [isAnyOpen]);

  return (
    <>
      {/* ====================================================================
          MODAL 1: PROJECT DOSSIER
      ==================================================================== */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onCloseProject}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-3xl bg-[#111319] border border-[#F4F2EC]/15 shadow-2xl overflow-hidden my-auto max-h-[90dvh] flex flex-col"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#F4F2EC]/10 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs text-[#3DDC84] shrink-0">
                  {selectedProject.code}
                </span>
                <span aria-hidden="true" className="text-[#A4A8B3]/50">
                  ·
                </span>
                <h3
                  id="project-modal-title"
                  className="font-display text-base sm:text-xl font-semibold text-[#F4F2EC] truncate"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onCloseProject}
                className="w-10 h-10 rounded-full text-[#A4A8B3] hover:text-[#F4F2EC] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close project dossier"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#A4A8B3]">Mobile Interface Preview</span>
                  <div className="inline-flex rounded-full bg-[#0B0C0F] p-1 border border-[#F4F2EC]/12">
                    {(
                      [
                        { id: 'dual', label: 'Dual' },
                        { id: 'splash', label: 'Splash' },
                        { id: 'dashboard', label: 'Dashboard' },
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => onChangeProjectScreenMode(mode.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          projectScreenMode === mode.id
                            ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                            : 'text-[#A4A8B3] hover:text-[#F4F2EC]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#090A0E] border border-[#F4F2EC]/10 p-4 sm:p-6 flex items-center justify-center">
                  {projectScreenMode === 'dual' ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                      <div className="inspector-bezel rounded-[22px] sm:rounded-[26px] p-1.5">
                        <div className="aspect-[9/19.5] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#090A0E]">
                          <img
                            src={selectedProject.splashImage}
                            alt={`${selectedProject.title} Splash`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                      <div className="inspector-bezel rounded-[22px] sm:rounded-[26px] p-1.5">
                        <div className="aspect-[9/19.5] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#090A0E]">
                          <img
                            src={selectedProject.dashboardImage}
                            alt={`${selectedProject.title} Dashboard`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 sm:w-56 inspector-bezel rounded-[28px] p-2">
                      <div className="aspect-[9/19.5] rounded-[20px] overflow-hidden bg-[#090A0E]">
                        <img
                          src={
                            projectScreenMode === 'splash'
                              ? selectedProject.splashImage
                              : selectedProject.dashboardImage
                          }
                          alt={`${selectedProject.title} ${projectScreenMode}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="font-mono text-xs text-[#3DDC84] mb-1">
                    {selectedProject.subtitle}
                  </p>
                  <h4 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F2EC] mb-3">
                    {selectedProject.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#CFD3DC] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4F2EC]/10">
                  <h5 className="font-display text-sm font-semibold text-[#F4F2EC] mb-3">
                    Key Features &amp; Capabilities
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedProject.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-[#E4E1DA]"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-4 h-4 text-[#3DDC84] shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F4F2EC]/10">
                  <h5 className="font-display text-sm font-semibold text-[#F4F2EC] mb-1.5">
                    Technologies Used
                  </h5>
                  <p className="font-mono text-xs text-[#3DDC84]">
                    {selectedProject.techStack.join('  ·  ')}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4F2EC]/10 flex flex-wrap items-center gap-3">
                  {selectedProject.liveDemoLink && (
                    <a
                      href={selectedProject.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-emerald min-h-[42px] px-4 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap"
                    >
                      <Globe aria-hidden="true" className="w-4 h-4" />
                      <span>Launch Live App</span>
                      <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hairline min-h-[42px] px-4 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap"
                  >
                    <Github aria-hidden="true" className="w-4 h-4" />
                    <span>View Source on GitHub</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onDiscussProject(selectedProject)}
                    className="btn-hairline min-h-[42px] px-4 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare aria-hidden="true" className="w-4 h-4 text-[#3DDC84]" />
                    <span>Discuss Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: CERTIFICATE ARCHIVAL LIGHTBOX
      ==================================================================== */}
      {selectedCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={onCloseCertificate}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-3xl bg-[#111319] border border-[#F4F2EC]/15 shadow-2xl overflow-hidden my-auto max-h-[90dvh] flex flex-col"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#F4F2EC]/10 flex items-center justify-between gap-4 shrink-0">
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#3DDC84] truncate">
                  {selectedCertificate.issuer} · Issued {selectedCertificate.issueDate}
                </p>
                <h3
                  id="cert-modal-title"
                  className="font-display text-base sm:text-lg font-semibold text-[#F4F2EC] truncate"
                >
                  {selectedCertificate.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onCloseCertificate}
                className="w-10 h-10 rounded-full text-[#A4A8B3] hover:text-[#F4F2EC] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close certificate preview"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {selectedCertificate.secondaryImage && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeCertViewPage('primary')}
                    className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      certViewPage === 'primary'
                        ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                        : 'bg-[#1B1E26] text-[#A4A8B3] hover:text-[#F4F2EC]'
                    }`}
                  >
                    Certificate of Completion
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeCertViewPage('secondary')}
                    className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      certViewPage === 'secondary'
                        ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                        : 'bg-[#1B1E26] text-[#A4A8B3] hover:text-[#F4F2EC]'
                    }`}
                  >
                    {selectedCertificate.secondaryLabel || 'Transcript'}
                  </button>
                </div>
              )}

              <div className="rounded-2xl overflow-hidden bg-[#090A0E] border border-[#F4F2EC]/10">
                <img
                  src={
                    certViewPage === 'secondary' && selectedCertificate.secondaryImage
                      ? selectedCertificate.secondaryImage
                      : selectedCertificate.image
                  }
                  alt={selectedCertificate.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[520px] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <div className="md:col-span-5 space-y-2.5 font-mono text-xs">
                  <p className="text-[#A4A8B3]">Credential ID</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#F4F2EC] font-semibold select-all break-all">
                      {selectedCertificate.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(
                          selectedCertificate.credentialId,
                          `modal-${selectedCertificate.id}`
                        )
                      }
                      className="text-[#3DDC84] hover:underline cursor-pointer"
                    >
                      {copiedId === `modal-${selectedCertificate.id}` ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <a
                    href={selectedCertificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#3DDC84] hover:underline pt-1"
                  >
                    <span>Verify Official Issuer</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="md:col-span-7">
                  <p className="font-mono text-xs text-[#A4A8B3] mb-2">
                    Verified Modules &amp; Competencies
                  </p>
                  <p className="text-xs sm:text-sm text-[#E6E3DC] leading-relaxed">
                    {selectedCertificate.highlights.join('  ·  ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 3: CV PREVIEW & DOWNLOAD
      ==================================================================== */}
      {showCvModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          onClick={onCloseCv}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-3xl bg-[#111319] border border-[#F4F2EC]/15 shadow-2xl overflow-hidden my-auto max-h-[92dvh] flex flex-col"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#F4F2EC]/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <FileText aria-hidden="true" className="w-5 h-5 text-[#3DDC84] shrink-0" />
                <div className="min-w-0">
                  <h3
                    id="cv-modal-title"
                    className="font-display text-sm sm:text-lg font-semibold text-[#F4F2EC] truncate"
                  >
                    Muslim Hakim Muhammad: Curriculum Vitae
                  </h3>
                  <p className="font-mono text-xs text-[#A4A8B3]">
                    Page {cvSlideIndex + 1} of {cvPages.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onDownloadCv}
                  className="btn-primary-emerald h-9 px-4 rounded-full text-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Download aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>Download CV PDF</span>
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={onCloseCv}
                  className="w-10 h-10 rounded-full text-[#A4A8B3] hover:text-[#F4F2EC] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close CV preview"
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-center gap-2">
                {cvPages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChangeCvSlideIndex(idx)}
                    className={`min-h-[36px] px-4 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                      cvSlideIndex === idx
                        ? 'bg-[#3DDC84] text-[#07130C] font-semibold'
                        : 'bg-[#1B1E26] text-[#A4A8B3] hover:text-[#F4F2EC]'
                    }`}
                  >
                    Page {idx + 1}
                  </button>
                ))}
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#F4F2EC]/15 max-w-2xl mx-auto shadow-2xl">
                <img
                  src={cvPages[cvSlideIndex]}
                  alt={`CV Muslim Hakim Muhammad, Page ${cvSlideIndex + 1}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = EMBEDDED_CV_PAGES[cvSlideIndex];
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-auto object-contain block"
                />

                <button
                  type="button"
                  onClick={() =>
                    onChangeCvSlideIndex(
                      cvSlideIndex === 0 ? cvPages.length - 1 : cvSlideIndex - 1
                    )
                  }
                  aria-label="Previous CV page"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0C0F]/85 hover:bg-[#3DDC84] text-[#F4F2EC] hover:text-[#07130C] flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                >
                  <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => onChangeCvSlideIndex((cvSlideIndex + 1) % cvPages.length)}
                  aria-label="Next CV page"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0C0F]/85 hover:bg-[#3DDC84] text-[#F4F2EC] hover:text-[#07130C] flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                >
                  <ChevronRight aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
