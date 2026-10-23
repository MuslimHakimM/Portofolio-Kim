# Muslim Hakim Muhammad — Interactive Android Developer Portfolio

An interactive, responsive personal portfolio website crafted in the **Portofolio_V5** deep-space glassmorphic aesthetic (`#030014`), showcasing the real Android and web engineering work, academic credentials, and verified certifications of **Muslim Hakim Muhammad**. The application runs entirely client-side with zero external database dependencies, pairing real extracted visual assets from the provided portfolio PDF with high-precision interactive SVG phone mockups and instant email/WhatsApp messaging workflows.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices incorporate your confirmed answers from our clarification step:

- **Confirmed Decision 1 — Real PDF Asset Extraction + Interactive SVG Fallbacks**: Visual assets (your portrait photo, the 4 Dicoding certificates, the Bangkit Academy certificate & transcript, and the dual-screen mobile app screenshots for *Pet Friends*, *HealthyMe*, *CarePoint*, and *Tilawah Tracker*) will be cropped directly from the attached `Porto_Hakim_ffbdf3b6.pdf` into high-resolution local image assets, backed by custom interactive SVG fallbacks so zero broken images ever occur.
- **Confirmed Decision 2 — Direct Portfolio PDF Download & In-App Preview Modal**: Clicking the **Download CV / Portfolio** action in the About section will offer both a direct one-click file download of `/assets/aistudio/Porto_Hakim_ffbdf3b6.pdf` and an interactive in-app PDF/Resume preview modal.
- **Confirmed Decision 3 — Side-by-Side Dual-Screen Mobile Showcase**: Each of the 4 projects will feature a side-by-side dual-phone frame layout displaying both the **Splash Screen** (left frame) and **Main Application Dashboard** (right frame), matching your original portfolio presentation and expanding into high-resolution interactive views inside the Project Details modal.

---

### 1. Overview & Core Concept

- **What It Does**: Presents an end-to-end interactive developer showcase featuring an animated 2-second splash intro, a split-screen hero with cycling role titles, an About & Education section with interactive KPI cards and academic/bootcamp timeline, a 3-tab Portfolio Showcase (*Projects*, *Certificates*, *Tech Stack*) with full-screen detail and lightbox modals, and a dual-channel Contact section supporting pre-filled WhatsApp and `mailto:` dispatch.
- **Target Audience / Persona**: Technical recruiters, hiring managers, engineering leads, and potential freelance/project collaborators evaluating Android (Kotlin, Jetpack Compose) and Full-Stack Web/PWA capabilities.
- **Key Value**: Transforms a static slide-based PDF portfolio into a living, high-retention web experience with verifiable credential IDs, inspectable dual-screen mobile UI showcases, and frictionless one-click outreach.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Welcome Splash Intro (2 Seconds)**: Upon arrival, a sleek dark-space intro screen animates glowing developer icons and *"Welcome To Muslim Hakim's Portfolio"* before smoothly transitioning (`opacity` + `transform`) into the main workspace (with an instant "Skip Intro" affordance and `prefers-reduced-motion` support).
  2. **Navigation & Scroll Spy**: A sticky top navigation bar follows the clean 3-zone contract: Brand wordmark (`Hakim`) on the left, concise single-line section links (`Home`, `About`, `Education`, `Portfolio`, `Contact`) with active scroll-spy tracking in the center, and a primary action (`Download CV`) on the right.
  3. **Hero Exploration**: Users view the *"Ready to Innovate"* introduction, cycling role titles (*"Android Developer"*, *"Mobile App Developer"*, *"Kotlin & Jetpack Compose Enthusiast"*, *"Tech Enthusiast"*), core skill stack, and an interactive dual-device Android Studio / Kotlin showcase on the right.
  4. **About, KPIs & Education Timeline**: Users inspect Hakim's Informatics degree from Bhayangkara Jakarta Raya University (GPA 3.54/4.00), trigger the CV download or preview modal, click the 3 interactive stat cards (`4` Mobile & Web Apps, `5+` Verified Certificates, `3.54` GPA) to jump to relevant tabs, and browse the structured timeline covering Bhayangkara University, Bangkit Academy (Google, GoTo, Traveloka), and Dicoding Academy Bootcamp.
  5. **3-Tab Portfolio Matrix & Deep-Dive Modals**:
     - **Tab 1 — Projects**: Displays *Pet Friends*, *HealthyMe*, *CarePoint*, and *Tilawah Tracker (KabarQLC)* with side-by-side dual-phone mockups, unboxed metadata tags, GitHub links, conditional Live Demo links (active for *Tilawah Tracker*, cleanly disabled/highlighted GitHub CTA when empty), and a **Details** button that opens a full-screen glassmorphic modal with zoomable dual screens, key features, and architecture breakdown.
     - **Tab 2 — Certificates**: Displays all 5 verified credentials (*Bangkit Academy 2023 Mobile Development* + 4 *Dicoding Indonesia* certificates) with exact Credential IDs, dates, course syllabus highlights, and a full-screen Lightbox modal showing the extracted certificate imagery and transcript.
     - **Tab 3 — Tech Stack**: Categorizes all 18 technologies across *Mobile & Programming*, *Web & Backend*, and *Architecture & Tools* with interactive category filtering and subtle hover elevation.
  6. **Direct Outreach (Contact Flow)**: Users either click direct glass cards for WhatsApp (`+62 87888568242`), Email (`muslimhakim374@gmail.com`), LinkedIn, and GitHub, or fill out the message form (Name, Email, Subject, Message) and choose **Send via WhatsApp** or **Send via Email (`mailto:`)** with URL-encoded pre-filled copy.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Deep-space dark editorial portfolio (`Portofolio_V5` homage) balanced with strict anti-slop restraint—clean unboxed metadata with middle-dot (`·`) separators, single-elevation glassmorphic surfaces, and high-contrast media framing.
  - *Color Palette & Mood*:
    - **60% Dominant Neutral Canvas**: Deep space obsidian `#030014` (`--background`) with subtle ambient indigo/violet radial light fields.
    - **30% Structural & Media Surfaces**: Translucent slate glass `rgba(15, 23, 42, 0.65)` with crisp `1px solid rgba(255, 255, 255, 0.08)` hairline borders and `#94A3B8` muted prose.
    - **10% Focal Accent Budget**: Electric indigo `#6366F1` and violet `#A855F7` reserved strictly for primary CTAs, active tab indicators, and focus rings.
  - *Typography & Hierarchy*:
    - **Display / Headings**: `Outfit` (SemiBold/Bold 600–700, tight tracking `-0.02em`, `text-wrap: balance`).
    - **Body Prose**: `Plus Jakarta Sans` (Regular 400 / Medium 500, `15px–16px`, comfortable `1.65` line height).
    - **Metrics, Credential IDs & Dates**: `JetBrains Mono` with `tabular-nums` for GPA (`3.54/4.00`), project indices (`01`–`04`), and certificate verification codes.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Self-Contained Data Architecture (`PORTFOLIO_DATA`)**
  - *Chosen Approach*: Consolidate all personal bio data, social links, education timeline entries, project specifications, certificate credentials, and tech stack items into a strongly typed, top-level `PORTFOLIO_DATA` configuration object inside the main application entry.
  - *Why*: Allows immediate inspection and effortless future edits (such as swapping image paths or adding new projects) in one place without hunting across multiple files.
- **Decision 2: Extracted Real PDF Assets Paired with Custom SVG Fallbacks**
  - *Chosen Approach*: Extract the exact portrait, certificate scans, and dual-phone project screens from `Porto_Hakim_ffbdf3b6.pdf` into local static assets, and wrap every image in a resilient media component with custom-rendered SVG fallbacks.
  - *Why*: Honors the authentic visuals from your existing portfolio while guaranteeing 100% visual reliability even if a user replaces a URL later.
- **Decision 3: Dual-Channel Serverless Contact Dispatcher**
  - *Chosen Approach*: Client-side validated contact form that formats the visitor's Name, Email, Subject, and Message into both a `https://wa.me/6287888568242?text=...` deep link and a `mailto:muslimhakim374@gmail.com?subject=...&body=...` URI, plus a one-click "Copy Message" fallback.
  - *Why*: Delivers instant, zero-maintenance message delivery directly to Hakim's WhatsApp and inbox without requiring a backend database or third-party form API keys.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO_DATA (Single Source)                       │
│   Profile & Bio · Stats · Education · 4 Projects · 5 Certificates · Skills  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Portfolio Application State Root                       │
│  • showSplash (2s timer + skip)      • activeSection (IntersectionObserver) │
│  • activeTab ('projects'|'certs'|'stack') • activeTechFilter ('all'|...)    │
│  • selectedProject (Modal state)     • selectedCert (Lightbox state)        │
│  • showCvModal (PDF Preview state)   • contactForm (Name, Email, Subj, Msg) │
└───────┬──────────────────┬──────────────────┬───────────────────┬───────────┘
        │                  │                  │                   │
        ▼                  ▼                  ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌────────────────────┐
│  Top Navbar & │  │ About, KPIs & │  │ 3-Tab Showcase│  │  Modal & Lightbox  │
│  Hero Section │  │   Education   │  │   Workspace   │  │   Overlay Layer    │
├───────────────┤  ├───────────────┤  ├───────────────┤  ├────────────────────┤
│ • 3-Zone Nav  │  │ • Portrait +  │  │ • Tab 1: Dual │  │ • Project Details  │
│ • Cycling Role│  │   CV Actions  │  │   Phone Cards │  │   (Dual Screen Zoom│
│   Typewriter  │  │ • 3 Clickable │  │ • Tab 2: Cert │  │   + Features + CTA)│
│ • Interactive │  │   Stat Cards  │  │   Cards + IDs │  │ • Cert Lightbox    │
│   Mobile Dev  │  │ • 3-Milestone │  │ • Tab 3: Tech │  │   (Scan + Syllabus)│
│   Visual Rig  │  │   Timeline    │  │   Filter Grid │  │ • CV / PDF Viewer  │
└───────────────┘  └───────────────┘  └───────────────┘  └────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **Splash Screen Controller**: Runs a 2,000ms timer on mount (`useEffect`) that transitions `showSplash` to `false`, with an immediate `Skip Intro` button and `Escape` key listener.
  - **Scroll Spy & Smooth Navigation**: Observes `#home`, `#about`, `#education`, `#portfolio`, and `#contact` sections to highlight the active nav item and smoothly scroll on click.
  - **Interactive KPI Cards**: Clicking any of the 3 About stat cards (`4 Projects`, `5+ Certificates`, `3.54 GPA`) smoothly scrolls to the corresponding section and switches `activeTab` automatically.
  - **Project Detail Modal (`selectedProject`)**: Opens with keyboard (`Escape`) and backdrop-click dismissal, allowing users to toggle between the Splash Screen and Main Dashboard mockups, inspect the full feature breakdown, and launch GitHub or Live Demo links.
  - **Certificate Lightbox (`selectedCert`)**: Renders the high-resolution certificate scan (plus the Bangkit Student Learning Achievement transcript for Certificate #01), verification ID copy-to-clipboard button, and complete course syllabus list.
  - **Contact Form Dispatcher**: Validates required fields inline, previews the formatted message, and triggers either WhatsApp (`wa.me/6287888568242`) or default email client (`mailto:muslimhakim374@gmail.com`) alongside a toast confirmation.
