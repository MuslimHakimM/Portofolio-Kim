/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Smartphone,
  Award,
  Layers,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  FileText,
  Sparkles,
  ChevronRight,
  X,
  Check,
  Copy,
  Send,
  GraduationCap,
  Calendar,
  Eye,
  ArrowUpRight,
  Terminal,
  Database,
  Cpu,
  Globe,
  GitBranch,
  Layout,
  Menu,
  CheckCircle2,
  ZoomIn,
  ChevronLeft,
} from 'lucide-react';

// ============================================================================
// 1. EXACT PERSONAL DATA (PORTFOLIO_DATA)
// Single source of truth. Replace any image URLs here at any time.
// ============================================================================

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  githubLink: string;
  liveDemoLink: string;
  splashImage: string;
  dashboardImage: string;
  dualImage: string;
  accentColor: string;
}

export interface CertificateItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil?: string;
  credentialId: string;
  image: string;
  secondaryImage?: string;
  secondaryLabel?: string;
  highlights: string[];
  verifyUrl: string;
  pdfUrl?: string;
}

export interface TechSkillItem {
  name: string;
  category: 'Mobile & Programming' | 'Web & Backend' | 'Architecture & Tools';
  role: string;
  proficiency: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    fullName: 'Muslim Hakim Muhammad',
    nickname: 'Hakim',
    primaryRole: 'Android Developer',
    cyclingRoles: [
      'Android Developer',
      'Mobile App Developer',
      'Kotlin & Jetpack Compose Enthusiast',
      'Tech Enthusiast',
    ],
    heroBadge: 'Ready to Innovate',
    shortHeroBio:
      'An enthusiastic Android application developer passionate about tackling complex challenges and crafting engaging digital experiences.',
    aboutDescription:
      "My name is Hakim, and I'm a graduate from The University of Bhayangkara Jakarta Raya majoring in Informatics (GPA: 3.54/4.00). Specialized in Mobile Development through Bangkit Academy (led by Google, GoTo, and Traveloka) and Dicoding Academy, I am passionate about building intuitive, high-performance Android and web applications. I welcome collaborations and new opportunities to bring innovative ideas to life.",
    heroSkills: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'REST API', 'PWA'],
    // Easily customizable avatar URL (currently extracted from your attached PDF)
    avatarUrl: '/assets/portfolio/profile_hakim.png',
    cvPdfUrl: '/assets/aistudio/Porto_Hakim_ffbdf3b6.pdf',
    pdfSlidePages: [
      '/assets/portfolio/pages/page_01.png',
      '/assets/portfolio/pages/page_02.png',
      '/assets/portfolio/pages/page_03.png',
      '/assets/portfolio/pages/page_04.png',
      '/assets/portfolio/pages/page_05.png',
      '/assets/portfolio/pages/page_06.png',
      '/assets/portfolio/pages/page_07.png',
      '/assets/portfolio/pages/page_08.png',
      '/assets/portfolio/pages/page_09.png',
      '/assets/portfolio/pages/page_10.png',
    ],
    stats: [
      {
        id: 'projects',
        value: '4',
        title: 'Total Projects',
        label: 'Mobile & Web Apps Crafted',
        targetSection: 'portfolio',
        targetTab: 'projects' as const,
      },
      {
        id: 'certificates',
        value: '5+',
        title: 'Certificates',
        label: 'Verified Dicoding & Bangkit Certificates',
        targetSection: 'portfolio',
        targetTab: 'certificates' as const,
      },
      {
        id: 'education',
        value: '3.54',
        title: 'Education & Bootcamp',
        label: 'GPA - Bachelor of Computer Science',
        targetSection: 'education',
        targetTab: null,
      },
    ],
  },

  contact: {
    phone: '+62 87888568242',
    whatsappNumber: '6287888568242',
    whatsappLink: 'https://wa.me/6287888568242',
    email: 'muslimhakim374@gmail.com',
    linkedin: 'https://www.linkedin.com/in/m-hakim-m',
    linkedinHandle: 'in/m-hakim-m',
    github: 'https://github.com/MuslimHakimM',
    githubHandle: 'MuslimHakimM',
    location: 'Bekasi, Indonesia',
  },

  education: [
    {
      id: 'edu-1',
      institution: 'Bhayangkara Jakarta Raya University',
      program: 'Bachelor of Computer Science / Informatics',
      metric: 'GPA: 3.54/4.00',
      period: 'Sep 2020 – Aug 2024',
      location: 'Bekasi, Indonesia',
      summary:
        'Focused on software engineering, mobile application architecture, object-oriented programming, algorithms, and database management systems.',
    },
    {
      id: 'edu-2',
      institution: 'Bangkit Academy (by Google, GoTo, Traveloka)',
      program: 'Android Developer / Mobile Development Cohort',
      metric: 'Distinction Graduate · 900+ Hours',
      period: 'Feb 2023 – Jul 2023',
      location: 'Bandung, Indonesia',
      summary:
        'Intensive Kampus Merdeka career readiness program led by Google, GoTo, and Traveloka mastering Kotlin, Jetpack Compose, Clean Architecture, SOLID principles, UX Design, and multidisciplinary Capstone delivery.',
    },
    {
      id: 'edu-3',
      institution: 'Dicoding Academy Bootcamp',
      program: 'Pengembangan Aplikasi Android',
      metric: 'Verified Android Path',
      period: 'Aug 2022 – Dec 2022',
      location: 'Bandung, Indonesia',
      summary:
        'Structured technical bootcamp covering Git version control, Kotlin fundamentals, Android UI/UX components, local persistence, background processes, and RESTful API integration.',
    },
  ],

  projects: [
    {
      id: 'pet-friends',
      number: '01',
      title: 'Pet Friends',
      subtitle: 'Smart Pet Care & Daily Activity Reminder App',
      description:
        "A mobile application designed to help users manage pet care activities. The app simplifies monitoring pet health and daily needs while providing notifications to ensure important tasks aren't missed. With a user-friendly interface, users can easily schedule and view care activities efficiently.",
      features: [
        'Pet care category management (Vaccine, Food, Shower, Medicine, Grooming, Weight)',
        'Daily Reminder Activity with notification alerts',
        'Animated informational slides',
        'Intuitive mobile UI',
      ],
      techStack: ['Kotlin', 'Android Studio', 'XML / UI Design', 'Local Notification'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project1_splash.png',
      dashboardImage: '/assets/portfolio/project1_dashboard.png',
      dualImage: '/assets/portfolio/project1_dual.png',
      accentColor: '#38bdf8',
    },
    {
      id: 'healthy-me',
      number: '02',
      title: 'HealthyMe',
      subtitle: 'Calorie Counter & Interactive BMI Health Tracker',
      description:
        'A calorie counting mobile application designed to help users manage their food intake and monitor their health. It simplifies the process of calculating calories in meals and tracking Body Mass Index (BMI) with a user-friendly interface, ideal for anyone aiming to achieve or maintain a healthy weight.',
      features: [
        'Food & Menu Calorie Search via API',
        'Interactive BMI (Body Mass Index) Calculator',
        'Daily calorie intake monitoring',
        'Clean health dashboard UI',
      ],
      techStack: ['Kotlin', 'Android SDK', 'REST API', 'Material Design'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project2_splash.png',
      dashboardImage: '/assets/portfolio/project2_dashboard.png',
      dualImage: '/assets/portfolio/project2_dual.png',
      accentColor: '#6366f1',
    },
    {
      id: 'care-point',
      number: '03',
      title: 'CarePoint',
      subtitle: 'Indonesia Hospital Finder & Real-Time Capacity Directory',
      description:
        'An Android application designed to help users find hospitals across Indonesia. The application provides a list of selectable provinces and cities along with vital hospital details to improve accessibility to healthcare services for the community.',
      features: [
        'Province and City search filter across Indonesia',
        'Real-time Hospital room capacity information',
        'Complete hospital address & phone contact integration',
        "Distance calculation from user's location via REST API",
      ],
      techStack: ['Kotlin', 'Android SDK', 'REST API', 'Location Services'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project3_splash.png',
      dashboardImage: '/assets/portfolio/project3_dashboard.png',
      dualImage: '/assets/portfolio/project3_dual.png',
      accentColor: '#06b6d4',
    },
    {
      id: 'tilawah-tracker',
      number: '04',
      title: 'Tilawah Tracker (KabarQLC)',
      subtitle: "Structured Al-Qur'an Khatam & Digital Mushaf PWA",
      description:
        "A dedicated platform designed to help users maintain consistency in reading the Al-Qur'an. It offers structured khatam programs (25-day or 30-day targets) along with a manual mode for personalized pacing, organizing reading tasks by prayer times with an integrated digital Mushaf.",
      features: [
        'Structured 25-Day & 30-Day Khatam Programs',
        'Smart dashboard organized by daily prayer times',
        '"Start Reading" auto-bookmark to the last-read page in integrated Digital Mushaf',
        'Detailed progress percentage & statistics',
        'Progressive Web App (PWA) support',
      ],
      techStack: ['NativePHP', 'MySQL', 'PWA', 'Modern Web UI'],
      githubLink: 'https://github.com/MuslimHakimM',
      liveDemoLink: 'https://dev-tracktilawah.kyym.my.id/',
      splashImage: '/assets/portfolio/project4_splash.png',
      dashboardImage: '/assets/portfolio/project4_dashboard.png',
      dualImage: '/assets/portfolio/project4_dual.png',
      accentColor: '#10b981',
    },
  ] as ProjectItem[],

  certificates: [
    {
      id: 'cert-bangkit',
      number: '01',
      title: 'Bangkit Academy 2023 - Certificate of Completion (Mobile Development)',
      issuer: 'Google, GoTo, Traveloka, Kampus Merdeka',
      issueDate: 'July 27, 2023',
      credentialId: 'BA23/GRAD/XXIII-07/A147DSX3364',
      image: '/assets/portfolio/cert_bangkit.png',
      secondaryImage: '/assets/portfolio/cert_bangkit_transcript.png',
      secondaryLabel: 'Student Learning Achievement Transcript',
      highlights: [
        'Associate Android Developer Prep (Score: 100)',
        'Capstone / Final Project (Score: 93)',
        'Android Fundamental (Score: 80)',
        'Soft skill & Career Development (Score: 76)',
        'Kotlin Basic (Score: 74)',
        'Android Programming for Beginners (Score: 74)',
        'Intermediate Android Development (Score: 72)',
        'Build Android Apps using Jetpack Compose (Score: 72)',
        'UX Design (Score: 72)',
        'SOLID Paradigm (Score: 68)',
      ],
      verifyUrl: 'https://grow.google/intl/id_id/bangkit/',
      pdfUrl: '/assets/certificates/cert_bangkit.pdf',
    },
    {
      id: 'cert-intermediate',
      number: '02',
      title: 'Belajar Pengembangan Aplikasi Android Intermediate',
      issuer: 'Dicoding Indonesia (Google Developers Authorized Training Partner)',
      issueDate: '29 Juni 2023',
      validUntil: '29 Juni 2026',
      credentialId: '4EXGN1699ZRL',
      image: '/assets/portfolio/cert_android_intermediate.png',
      highlights: [
        'Advanced UI: Custom View, Widget & WebView (11h 50m)',
        'Animation: Property Animation & MotionLayout (8h 10m)',
        'Localization & Accessibility Support (11h 35m)',
        'Service & Background Thread Processing (5h 20m)',
        'Media Management: Audio, Video, CameraX & Multipart Upload (13h 10m)',
        'Geo Location, Google Maps API & Geofencing (7h 20m)',
        'Advanced Testing: Unit Testing (Test Double) & UI Testing (Idling Resource, MockWebServer)',
        'Advanced Database: Architecture Components & TDD (9h 50m)',
        'Firebase Integration: Auth, Realtime DB, Cloud Messaging/FCM',
        'Final Submission: Story App with Paging 3 (Total: 150 Hours)',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/4EXGN1699ZRL',
      pdfUrl: '/assets/certificates/cert_android_intermediate.pdf',
    },
    {
      id: 'cert-fundamental',
      number: '03',
      title: 'Belajar Fundamental Aplikasi Android',
      issuer: 'Dicoding Indonesia (Google Developers Authorized Training Partner)',
      issueDate: '15 Oktober 2022',
      validUntil: '15 Oktober 2025',
      credentialId: '6RPN6358RP2M',
      image: '/assets/portfolio/cert_android_fundamental.png',
      highlights: [
        'Android Studio & Components Installation (5h 10m)',
        'Fundamental: Activity, Intent, Fragment & Debugging (16h 55m)',
        'Layout: View & ViewGroup, Style & Theme, ViewBinding (18h 20m)',
        'Navigation: Navigation Component, Action Bar, Drawer, Bottom Nav & ViewPager2 (12h 45m)',
        'Background Process & Networking: JSON REST API, Retrofit2 & OkHttp (9h 35m)',
        'Android Architecture Components: ViewModel & LiveData (8h 50m)',
        'Testing: Automated Unit Testing & Instrumentation Testing (4h 20m)',
        'Local Data Persistence: File Storage, DataStore & Room Database (25h 50m)',
        'Background Task & Scheduler: AlarmManager & WorkManager (11h 40m)',
        'Final Submission: App with Web API & Local Database (Total: 150 Hours)',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/6RPN6358RP2M',
      pdfUrl: '/assets/certificates/cert_android_fundamental.pdf',
    },
    {
      id: 'cert-kotlin',
      number: '04',
      title: 'Memulai Pemrograman Dengan Kotlin',
      issuer: 'Dicoding Indonesia (Google Developers Authorized Training Partner)',
      issueDate: '07 Oktober 2023',
      validUntil: '07 Oktober 2026',
      credentialId: '0LZ0Q54LNZ65',
      image: '/assets/portfolio/cert_kotlin.png',
      highlights: [
        'Kotlin Ecosystem, Tools Setup & Gradle Kotlin DSL (4h 30m)',
        'Gradle Structure, Dependencies & Plugin Configuration (5h)',
        'Kotlin Fundamental: Data Types, Null Safety & String Templates (5h)',
        'Control Flow: Expressions, When, Enumeration & Loops (4h)',
        'Data Classes, Collections & Sequences (4h 30m)',
        'Functional Programming: Lambda, Higher-Order, Extensions & Scope Functions (7h 30m)',
        'Object-Oriented Programming (Inheritance, Interfaces, Generics, Overloading) (7h 20m)',
        'Kotlin Generics & Variance (2h 30m)',
        'Kotlin Coroutines: Concurrency, Deadlock, Livelock & Race Condition Handling (5h 25m)',
        'Final Submission: Kotlin Concurrency Project & Exam (Total: 50 Hours)',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/0LZ0Q54LNZ65',
      pdfUrl: '/assets/certificates/cert_kotlin.pdf',
    },
    {
      id: 'cert-git',
      number: '05',
      title: 'Belajar Dasar Git dengan GitHub',
      issuer: 'Dicoding Indonesia',
      issueDate: '14 Agustus 2022',
      validUntil: '14 Agustus 2025',
      credentialId: '72ZDOR3LQXYW',
      image: '/assets/portfolio/cert_git.png',
      highlights: [
        'Git & GitHub Industry Fundamentals (1h 45m)',
        'Repository Management, Commits & Checkout (2h 5m)',
        'Branching Concepts, Merging & Merge Conflict Resolution (2h 10m)',
        'Team Collaboration: Forking, Squashing Changes & Code Reviews (2h 50m)',
        'Case Study: Collaborative Pull Requests on Active Repositories (1h 15m)',
        'GitHub as Professional Portfolio: Markdown Readme Documentation (1h 20m)',
        'Final Submission: Practical Repository & Final Exam (Total: 15 Hours)',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/72ZDOR3LQXYW',
      pdfUrl: '/assets/certificates/cert_git.pdf',
    },
  ] as CertificateItem[],

  techStack: [
    // Mobile & Programming
    {
      name: 'Kotlin',
      category: 'Mobile & Programming',
      role: 'Primary Android Language',
      proficiency: 'Advanced',
    },
    {
      name: 'Java',
      category: 'Mobile & Programming',
      role: 'Object-Oriented & Legacy Android',
      proficiency: 'Intermediate',
    },
    {
      name: 'Jetpack Compose',
      category: 'Mobile & Programming',
      role: 'Declarative Modern Android UI',
      proficiency: 'Advanced',
    },
    {
      name: 'Android Studio',
      category: 'Mobile & Programming',
      role: 'Official Android IDE & Profiler',
      proficiency: 'Advanced',
    },
    {
      name: 'Android SDK',
      category: 'Mobile & Programming',
      role: 'Platform APIs & Lifecycle',
      proficiency: 'Advanced',
    },
    {
      name: 'XML Layout',
      category: 'Mobile & Programming',
      role: 'ConstraintLayout & Material Views',
      proficiency: 'Advanced',
    },

    // Web & Backend
    {
      name: 'NativePHP',
      category: 'Web & Backend',
      role: 'Server-Side Application Logic',
      proficiency: 'Advanced',
    },
    {
      name: 'MySQL',
      category: 'Web & Backend',
      role: 'Relational Database Design',
      proficiency: 'Intermediate',
    },
    {
      name: 'REST API',
      category: 'Web & Backend',
      role: 'JSON Integration & Retrofit',
      proficiency: 'Advanced',
    },
    {
      name: 'Progressive Web App (PWA)',
      category: 'Web & Backend',
      role: 'Installable Offline-Ready Web',
      proficiency: 'Advanced',
    },
    {
      name: 'HTML5',
      category: 'Web & Backend',
      role: 'Semantic Web Structure',
      proficiency: 'Advanced',
    },
    {
      name: 'CSS3',
      category: 'Web & Backend',
      role: 'Responsive Layout & Styling',
      proficiency: 'Advanced',
    },
    {
      name: 'JavaScript',
      category: 'Web & Backend',
      role: 'Interactive Client Scripting',
      proficiency: 'Intermediate',
    },

    // Architecture & Tools
    {
      name: 'Git',
      category: 'Architecture & Tools',
      role: 'Distributed Version Control',
      proficiency: 'Advanced',
    },
    {
      name: 'GitHub',
      category: 'Architecture & Tools',
      role: 'Repository & Collaborative CI',
      proficiency: 'Advanced',
    },
    {
      name: 'SOLID Paradigm',
      category: 'Architecture & Tools',
      role: 'Clean & Maintainable OOP Design',
      proficiency: 'Advanced',
    },
    {
      name: 'UX Design / Figma',
      category: 'Architecture & Tools',
      role: 'Wireframing & Interactive Prototypes',
      proficiency: 'Intermediate',
    },
    {
      name: 'Postman',
      category: 'Architecture & Tools',
      role: 'API Endpoint Testing & Debugging',
      proficiency: 'Advanced',
    },
  ] as TechSkillItem[],
};

// ============================================================================
// 2. RESILIENT IMAGE COMPONENT WITH CUSTOM SVG FALLBACKS
// Guarantees zero broken images even if user replaces image URLs later.
// ============================================================================

const ResilientPhoneScreen: React.FC<{
  src: string;
  alt: string;
  projectTitle: string;
  variant: 'splash' | 'dashboard';
  accentColor: string;
}> = ({ src, alt, projectTitle, variant, accentColor }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full aspect-[9/19.5] rounded-[22px] bg-[#07051a] border-[3px] border-slate-700/80 shadow-2xl overflow-hidden flex flex-col select-none">
      {/* Top Speaker Notch */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 w-16 h-3.5 bg-black rounded-full flex items-center justify-center">
        <div className="w-6 h-1 rounded-full bg-slate-800" />
      </div>

      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col justify-between p-4 text-left"
          style={{
            background: `radial-gradient(circle at 50% 25%, ${accentColor}33, #090621 75%)`,
          }}
        >
          <div className="pt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>9:41</span>
            <span>5G · 100%</span>
          </div>
          {variant === 'splash' ? (
            <div className="my-auto flex flex-col items-center text-center px-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border border-white/15"
                style={{ backgroundColor: `${accentColor}25` }}
              >
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <p className="font-display font-bold text-sm text-white leading-tight">
                {projectTitle}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Splash Screen</p>
            </div>
          ) : (
            <div className="my-auto space-y-2.5">
              <div className="h-7 rounded-lg bg-white/10 px-2.5 flex items-center text-[10px] text-slate-300">
                {projectTitle} Dashboard
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-14 rounded-lg bg-white/5 border border-white/10 p-2">
                  <div className="w-5 h-1.5 rounded bg-indigo-400/60 mb-1.5" />
                  <div className="w-10 h-2 rounded bg-white/30" />
                </div>
                <div className="h-14 rounded-lg bg-white/5 border border-white/10 p-2">
                  <div className="w-5 h-1.5 rounded bg-purple-400/60 mb-1.5" />
                  <div className="w-10 h-2 rounded bg-white/30" />
                </div>
              </div>
              <div className="h-16 rounded-lg bg-white/5 border border-white/10 p-2.5 flex flex-col justify-between">
                <div className="w-2/3 h-2 rounded bg-white/40" />
                <div className="w-full h-1.5 rounded bg-indigo-500/40" />
              </div>
            </div>
          )}
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto" />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. WELCOME SPLASH SCREEN (Portofolio_V5 2-Second Intro)
// ============================================================================

const WelcomeSplash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#030014] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Radial Background Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-indigo-600/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-purple-600/25 blur-[130px]" />

      {/* Animated Icon Trio */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 mb-8"
      >
        {[Code2, Smartphone, Cpu].map((Icon, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.35 }}
            className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.28)]"
          >
            <Icon className="w-6 h-6 text-indigo-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Welcome Headline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="text-center max-w-xl"
      >
        <p className="text-xs font-mono tracking-widest text-indigo-400 mb-3">
          ANDROID &amp; MOBILE APPLICATION PORTFOLIO
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Welcome To{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Muslim Hakim&apos;s
          </span>{' '}
          Portfolio
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          github.com/MuslimHakimM · Bekasi, Indonesia
        </p>
      </motion.div>

      {/* Progress Bar & Skip Button */}
      <div className="mt-10 flex flex-col items-center gap-4 w-64">
        <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.85, ease: 'easeInOut' }}
            className="h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
          />
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Skip Intro →
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// 4. MAIN PORTFOLIO APPLICATION
// ============================================================================

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio Showcase Tabs: 'projects' | 'certificates' | 'tech'
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'tech'>('projects');
  const [techFilter, setTechFilter] = useState<string>('All');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectScreenMode, setProjectScreenMode] = useState<'dual' | 'splash' | 'dashboard'>('dual');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [certViewPage, setCertViewPage] = useState<'primary' | 'secondary'>('primary');
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvSlideIndex, setCvSlideIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactFeedback, setContactFeedback] = useState<string | null>(null);

  // 2-Second Splash Intro Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cycling Role Titles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.profile.cyclingRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Escape key handler for all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSplash) setShowSplash(false);
        setSelectedProject(null);
        setSelectedCertificate(null);
        setShowCvModal(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSplash]);

  // Active Scroll Spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'education', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered Tech Stack
  const filteredTechStack = useMemo(() => {
    if (techFilter === 'All') return PORTFOLIO_DATA.techStack;
    return PORTFOLIO_DATA.techStack.filter((item) => item.category === techFilter);
  }, [techFilter]);

  // Helper: Smooth scroll to section
  const scrollToSection = (sectionId: string, tab?: 'projects' | 'certificates' | 'tech' | null) => {
    if (tab) {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper: Copy text to clipboard
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper: Build formatted message for WhatsApp / Mailto
  const getFormattedContactText = () => {
    const senderName = contactForm.name.trim() || 'Prospective Collaborator';
    const senderEmail = contactForm.email.trim() || 'Not provided';
    const subjectLine = contactForm.subject.trim() || 'Portfolio Inquiry / Collaboration';
    const bodyText =
      contactForm.message.trim() ||
      'Hi Hakim, I reviewed your Android Developer portfolio and would love to connect.';

    return {
      subjectLine,
      fullBody: `Hello Muslim Hakim,\n\n${bodyText}\n\n—\nName: ${senderName}\nEmail: ${senderEmail}\nSubject: ${subjectLine}`,
    };
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullBody } = getFormattedContactText();
    const waUrl = `https://wa.me/${PORTFOLIO_DATA.contact.whatsappNumber}?text=${encodeURIComponent(fullBody)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setContactFeedback('WhatsApp chat opened in a new tab with your pre-filled message.');
    setTimeout(() => setContactFeedback(null), 4000);
  };

  const handleSendEmail = () => {
    const { subjectLine, fullBody } = getFormattedContactText();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailtoUrl;
    setContactFeedback('Email client opened with your pre-filled message to muslimhakim374@gmail.com.');
    setTimeout(() => setContactFeedback(null), 4000);
  };

  const getTechCategoryIcon = (category: TechSkillItem['category']) => {
    if (category === 'Mobile & Programming') return <Smartphone className="w-4 h-4 text-indigo-400" />;
    if (category === 'Web & Backend') return <Database className="w-4 h-4 text-purple-400" />;
    return <GitBranch className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 relative overflow-x-hidden">
      {/* Welcome Splash Intro */}
      <AnimatePresence>
        {showSplash && <WelcomeSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Ambient Deep-Space Radial Glow Blobs (Portofolio_V5 signature atmosphere) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-600/18 blur-[140px]" />
        <div className="absolute top-[28%] -right-48 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-[560px] h-[560px] rounded-full bg-cyan-600/10 blur-[160px]" />
      </div>

      {/* ====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
          Zone 1: Brand Wordmark | Zone 2: 5 Nav Links | Zone 3: 1 Primary CTA
      ==================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#030014]/80 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent whitespace-nowrap shrink-0"
          >
            Muslim Hakim
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowCvModal(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              Download CV
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-[#080420]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-3"
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'education', label: 'Education' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ====================================================================
          HERO SECTION (#home)
      ==================================================================== */}
      <main className="relative z-10">
        <section
          id="home"
          className="max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Intro, Cycling Role, Bio, Skills, CTAs, Socials */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300 tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{PORTFOLIO_DATA.profile.heroBadge}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">{PORTFOLIO_DATA.contact.location}</span>
              </div>

              <div className="space-y-3">
                <p className="text-sm sm:text-base font-medium text-slate-400">
                  Hello, I am{' '}
                  <span className="text-slate-200 font-semibold">
                    {PORTFOLIO_DATA.profile.fullName}
                  </span>
                </p>

                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  Crafting Intuitive{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Mobile &amp; Web
                  </span>{' '}
                  Experiences
                </h1>

                {/* Cycling Role Indicator */}
                <div className="h-9 flex items-center gap-2 text-lg sm:text-2xl font-display font-semibold text-indigo-300">
                  <Terminal className="w-5 h-5 text-purple-400 shrink-0" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={PORTFOLIO_DATA.profile.cyclingRoles[roleIndex]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gradient-to-r from-indigo-200 to-purple-300 bg-clip-text text-transparent"
                    >
                      {PORTFOLIO_DATA.profile.cyclingRoles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Short Hero Bio */}
              <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
                {PORTFOLIO_DATA.profile.shortHeroBio}
              </p>

              {/* Core Stack Metadata Line (Clean unboxed typography with separators) */}
              <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-mono text-slate-300">
                <span className="text-indigo-400 font-semibold">Core Stack:</span>
                {PORTFOLIO_DATA.profile.heroSkills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <button
                      type="button"
                      onClick={() => scrollToSection('portfolio', 'tech')}
                      className="hover:text-indigo-300 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {skill}
                    </button>
                    {idx < PORTFOLIO_DATA.profile.heroSkills.length - 1 && (
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('portfolio', 'projects')}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_28px_rgba(99,102,241,0.35)] flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>View Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-indigo-500/40 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Social Icon Buttons */}
              <div className="pt-2 flex items-center gap-3">
                {[
                  {
                    label: 'GitHub',
                    href: PORTFOLIO_DATA.contact.github,
                    icon: Github,
                  },
                  {
                    label: 'LinkedIn',
                    href: PORTFOLIO_DATA.contact.linkedin,
                    icon: Linkedin,
                  },
                  {
                    label: 'WhatsApp',
                    href: PORTFOLIO_DATA.contact.whatsappLink,
                    icon: Phone,
                  },
                  {
                    label: 'Email',
                    href: `mailto:${PORTFOLIO_DATA.contact.email}`,
                    icon: Mail,
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      title={social.label}
                      className="w-11 h-11 rounded-xl bg-slate-900/75 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-950/50 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            ABOUT ME SECTION (#about)
        ==================================================================== */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.06]"
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono tracking-wider text-indigo-400 mb-2">
              01. PROFILE &amp; BACKGROUND
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Profile Portrait Frame */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-slate-900/55 border border-white/10 p-6 backdrop-blur-xl">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-5">
                <img
                  src={PORTFOLIO_DATA.profile.avatarUrl}
                  alt={PORTFOLIO_DATA.profile.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="font-display font-bold text-base text-white">
                      {PORTFOLIO_DATA.profile.fullName}
                    </p>
                    <p className="text-xs text-indigo-300 font-mono">
                      {PORTFOLIO_DATA.profile.primaryRole} · {PORTFOLIO_DATA.contact.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Metadata */}
              <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">University</span>
                  <span className="text-right text-slate-200">Bhayangkara Jakarta Raya</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-slate-400">Degree &amp; GPA</span>
                  <span className="text-right text-indigo-300">B.CompSc · 3.54 / 4.00</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Academy Cohort</span>
                  <span className="text-right text-slate-200">Bangkit 2023 &amp; Dicoding</span>
                </div>
              </div>
            </div>

            {/* Right: Bio Description, CV Action Buttons & 3 Interactive Stat Cards */}
            <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl bg-slate-900/55 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              <div className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-white">
                  Hello, I&apos;m{' '}
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {PORTFOLIO_DATA.profile.nickname}
                  </span>{' '}
                  — Android &amp; Web Application Developer
                </h3>

                <p className="text-slate-300 text-base leading-relaxed">
                  {PORTFOLIO_DATA.profile.aboutDescription}
                </p>

                {/* Action Bar: Direct Download PDF + Interactive Preview Modal + View Projects */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.cvPdfUrl}
                    download="Portfolio_Muslim_Hakim_Muhammad.pdf"
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_24px_rgba(99,102,241,0.3)] flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV / Portfolio PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setCvSlideIndex(0);
                      setShowCvModal(true);
                    }}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Eye className="w-4 h-4 text-indigo-400" />
                    <span>Preview Portfolio Slides</span>
                  </button>
                </div>
              </div>

              {/* 3 Interactive KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
                {PORTFOLIO_DATA.profile.stats.map((stat, idx) => {
                  const icons = [Code2, Award, GraduationCap];
                  const Icon = icons[idx % icons.length];
                  return (
                    <button
                      key={stat.id}
                      type="button"
                      onClick={() => scrollToSection(stat.targetSection, stat.targetTab)}
                      className="group text-left rounded-xl bg-[#07041c]/90 hover:bg-indigo-950/40 border border-white/10 hover:border-indigo-500/40 p-5 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {stat.value}
                        </span>
                      </div>
                      <div>
                        <p className="font-display text-sm font-semibold text-slate-200 flex items-center justify-between">
                          <span>{stat.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            EDUCATION & BOOTCAMP TIMELINE SECTION (#education)
        ==================================================================== */}
        <section
          id="education"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.06]"
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono tracking-wider text-indigo-400 mb-2">
              02. ACADEMIC &amp; COHORT MILESTONES
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Education &amp; Bootcamp Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.education.map((edu, index) => (
              <div
                key={edu.id}
                className="rounded-2xl bg-slate-900/55 border border-white/10 hover:border-indigo-500/40 p-6 backdrop-blur-xl flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top Index + Period Metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 mb-4 border-b border-white/[0.08]">
                    <span className="text-indigo-400 font-semibold">0{index + 1}</span>
                    <span>{edu.period}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1.5">
                    {edu.institution}
                  </h3>

                  <p className="text-sm font-semibold text-indigo-300 mb-3">
                    {edu.program}
                  </p>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-6">
                    {edu.summary}
                  </p>
                </div>

                {/* Unboxed Bottom Metadata with · separator */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-slate-200 font-medium">{edu.metric}</span>
                  <span aria-hidden="true">·</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            PORTFOLIO SHOWCASE SECTION (#portfolio) — 3 ANIMATED TABS
            Tab 1: Projects | Tab 2: Certificates | Tab 3: Tech Stack
        ==================================================================== */}
        <section
          id="portfolio"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.06]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-mono tracking-wider text-indigo-400 mb-2">
                03. PORTFOLIO SHOWCASE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Projects, Certificates &amp; Tech Stack
              </h2>
            </div>

            {/* Interactive 3-Tab Segmented Control */}
            <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-900/90 border border-white/10 self-start">
              {[
                { id: 'projects' as const, label: 'Projects (4)', icon: Code2 },
                { id: 'certificates' as const, label: 'Certificates (5)', icon: Award },
                { id: 'tech' as const, label: 'Tech Stack (18)', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Tab Content */}
          <AnimatePresence mode="wait">
            {/* --------------------------------------------------------------
                TAB 1: PROJECTS (Side-by-Side Dual-Screen Mobile Showcases)
            -------------------------------------------------------------- */}
            {activeTab === 'projects' && (
              <motion.div
                key="tab-projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {PORTFOLIO_DATA.projects.map((project) => (
                  <article
                    key={project.id}
                    className="group rounded-2xl bg-slate-900/55 border border-white/10 hover:border-indigo-500/45 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Side-by-Side Dual-Screen Showcase Frame */}
                      <div
                        onClick={() => {
                          setSelectedProject(project);
                          setProjectScreenMode('dual');
                        }}
                        className="relative rounded-xl bg-[#060318] border border-white/[0.08] p-5 mb-6 cursor-pointer overflow-hidden"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                          <span>Project #{project.number}</span>
                          <span className="text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Click to inspect screens</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                          <ResilientPhoneScreen
                            src={project.splashImage}
                            alt={`${project.title} Splash Screen`}
                            projectTitle={project.title}
                            variant="splash"
                            accentColor={project.accentColor}
                          />
                          <ResilientPhoneScreen
                            src={project.dashboardImage}
                            alt={`${project.title} Main Dashboard`}
                            projectTitle={project.title}
                            variant="dashboard"
                            accentColor={project.accentColor}
                          />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2.5">
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.number}. {project.title}
                        </h3>
                        <p className="text-xs font-mono text-indigo-300/90">
                          {project.subtitle}
                        </p>
                        <p className="text-sm text-slate-300/90 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Metadata Line (Unboxed text with · separators) */}
                      <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-400">
                        {project.techStack.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            <span className="text-slate-200">{tech}</span>
                            {idx < project.techStack.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Footer: Live Demo (if available), GitHub, Details Modal */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {project.liveDemoLink ? (
                          <>
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-white/10 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          </>
                        ) : (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub Repository</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProject(project);
                          setProjectScreenMode('dual');
                        }}
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </motion.div>
            )}

            {/* --------------------------------------------------------------
                TAB 2: CERTIFICATES (5 Verified Dicoding & Bangkit Credentials)
            -------------------------------------------------------------- */}
            {activeTab === 'certificates' && (
              <motion.div
                key="tab-certificates"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {PORTFOLIO_DATA.certificates.map((cert) => (
                  <article
                    key={cert.id}
                    className={`group rounded-2xl bg-slate-900/55 border border-white/10 hover:border-indigo-500/45 p-6 backdrop-blur-xl flex flex-col justify-between transition-all ${
                      cert.id === 'cert-bangkit' ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div>
                      {/* Certificate Preview Frame */}
                      <div
                        onClick={() => {
                          setSelectedCertificate(cert);
                          setCertViewPage('primary');
                        }}
                        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-5 cursor-pointer"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                          <span className="text-xs font-mono text-white flex items-center gap-1.5">
                            <ZoomIn className="w-4 h-4 text-indigo-400" />
                            <span>Open Certificate Lightbox</span>
                          </span>
                        </div>
                      </div>

                      {/* Issuer & Date Metadata */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-indigo-300 mb-2">
                        <span>{cert.issuer}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400">Issued: {cert.issueDate}</span>
                        {cert.validUntil && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-emerald-400/90">Valid: {cert.validUntil}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                        {cert.title}
                      </h3>

                      {/* Credential ID Line */}
                      <p className="text-xs font-mono text-slate-400 mb-4">
                        Credential ID:{' '}
                        <span className="text-slate-200 select-all">{cert.credentialId}</span>
                      </p>

                      {/* Course Syllabus Highlights */}
                      <div className="pt-3 border-t border-white/[0.07]">
                        <p className="text-xs font-mono text-slate-400 mb-2">
                          Course Syllabus &amp; Competency Highlights:
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cert.highlights.join(' · ')}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleCopyText(cert.credentialId, cert.id)}
                          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          {copiedId === cert.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">ID Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy ID</span>
                            </>
                          )}
                        </button>

                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCertificate(cert);
                          setCertViewPage('primary');
                        }}
                        className="px-3.5 py-2 rounded-lg text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Certificate</span>
                      </button>
                    </div>
                  </article>
                ))}
              </motion.div>
            )}

            {/* --------------------------------------------------------------
                TAB 3: TECH STACK & SKILLS (18 Categorized Technologies)
            -------------------------------------------------------------- */}
            {activeTab === 'tech' && (
              <motion.div
                key="tab-tech"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-8"
              >
                {/* Category Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    'All',
                    'Mobile & Programming',
                    'Web & Backend',
                    'Architecture & Tools',
                  ].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setTechFilter(category)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        techFilter === category
                          ? 'bg-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.3)]'
                          : 'bg-slate-900/75 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Grid of Tech Stack Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTechStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="group rounded-xl bg-slate-900/55 border border-white/10 hover:border-indigo-500/45 p-5 backdrop-blur-xl flex items-start justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTechCategoryIcon(tech.category)}
                          <h3 className="font-display text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {tech.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-300">{tech.role}</p>
                        <p className="text-[11px] font-mono text-slate-400 pt-1">
                          {tech.category} · {tech.proficiency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ====================================================================
            CONTACT SECTION (#contact) — Direct Channels + Dual-Dispatch Form
        ==================================================================== */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.06]"
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono tracking-wider text-indigo-400 mb-2">
              04. GET IN TOUCH
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Connect With Me
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Open for Android Developer roles, mobile engineering collaborations, and web/PWA projects in Bekasi, Jakarta, or remote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Clickable Glass Contact Cards */}
            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  id: 'whatsapp',
                  title: 'WhatsApp / Phone',
                  value: PORTFOLIO_DATA.contact.phone,
                  subtitle: 'Direct instant message via WhatsApp',
                  href: PORTFOLIO_DATA.contact.whatsappLink,
                  icon: Phone,
                },
                {
                  id: 'email',
                  title: 'Email Address',
                  value: PORTFOLIO_DATA.contact.email,
                  subtitle: 'Official inquiries & collaboration',
                  href: `mailto:${PORTFOLIO_DATA.contact.email}`,
                  icon: Mail,
                },
                {
                  id: 'linkedin',
                  title: 'LinkedIn Profile',
                  value: PORTFOLIO_DATA.contact.linkedinHandle,
                  subtitle: 'Professional network & credentials',
                  href: PORTFOLIO_DATA.contact.linkedin,
                  icon: Linkedin,
                },
                {
                  id: 'github',
                  title: 'GitHub Repositories',
                  value: PORTFOLIO_DATA.contact.githubHandle,
                  subtitle: 'Source code & Android projects',
                  href: PORTFOLIO_DATA.contact.github,
                  icon: Github,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-2xl bg-slate-900/55 border border-white/10 hover:border-indigo-500/45 p-5 backdrop-blur-xl transition-all"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-mono text-slate-400">{card.title}</p>
                          <p className="font-display text-base font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                            {card.value}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{card.subtitle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Right Column: Interactive Message Dispatcher (WhatsApp + Mailto) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/55 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out your message below and choose whether to dispatch it directly via WhatsApp or your Email client with pre-filled details.
              </p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g. Budi Santoso"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07041c] border border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07041c] border border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Android Developer Opportunity / Project Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07041c] border border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Hello Hakim, I would love to discuss an Android or Web project with you..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07041c] border border-white/10 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder:text-slate-500 resize-y"
                  />
                </div>

                {contactFeedback && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{contactFeedback}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_24px_rgba(99,102,241,0.3)] flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Open Email Client (mailto:)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(getFormattedContactText().fullBody, 'contact-copy')
                    }
                    className="px-4 py-3 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    {copiedId === 'contact-copy' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Message Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER (Quiet, Clean & Authentic)
      ==================================================================== */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#02000d] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={PORTFOLIO_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="hover:text-white transition-colors"
            >
              {PORTFOLIO_DATA.contact.email}
            </a>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          MODAL 1: PROJECT DETAILS GLASSMORPHIC MODAL
      ==================================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-2xl bg-[#090524] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-indigo-400">
                    Project #{selectedProject.number}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white truncate">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Dual-Screen Interactive Showcase */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Mobile Interface Preview
                    </span>
                    <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-white/10">
                      {(
                        [
                          { id: 'dual', label: 'Dual View' },
                          { id: 'splash', label: 'Splash' },
                          { id: 'dashboard', label: 'Dashboard' },
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setProjectScreenMode(mode.id)}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            projectScreenMode === mode.id
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#050214] border border-white/10 p-6 flex items-center justify-center">
                    {projectScreenMode === 'dual' ? (
                      <div className="grid grid-cols-2 gap-5 w-full max-w-md">
                        <ResilientPhoneScreen
                          src={selectedProject.splashImage}
                          alt={`${selectedProject.title} Splash`}
                          projectTitle={selectedProject.title}
                          variant="splash"
                          accentColor={selectedProject.accentColor}
                        />
                        <ResilientPhoneScreen
                          src={selectedProject.dashboardImage}
                          alt={`${selectedProject.title} Dashboard`}
                          projectTitle={selectedProject.title}
                          variant="dashboard"
                          accentColor={selectedProject.accentColor}
                        />
                      </div>
                    ) : (
                      <div className="w-56">
                        <ResilientPhoneScreen
                          src={
                            projectScreenMode === 'splash'
                              ? selectedProject.splashImage
                              : selectedProject.dashboardImage
                          }
                          alt={`${selectedProject.title} ${projectScreenMode}`}
                          projectTitle={selectedProject.title}
                          variant={projectScreenMode}
                          accentColor={selectedProject.accentColor}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Full Project Specification, Key Features & Tech Stack */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <p className="text-xs font-mono text-indigo-400 mb-1">
                      {selectedProject.subtitle}
                    </p>
                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                      {selectedProject.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Key Features List */}
                  <div className="pt-4 border-t border-white/10">
                    <h5 className="font-display text-sm font-semibold text-white mb-3">
                      Key Features &amp; Capabilities
                    </h5>
                    <ul className="space-y-2.5">
                      {selectedProject.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t border-white/10">
                    <h5 className="font-display text-sm font-semibold text-white mb-2">
                      Technologies Used
                    </h5>
                    <p className="text-xs font-mono text-indigo-300">
                      {selectedProject.techStack.join(' · ')}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {selectedProject.liveDemoLink && (
                      <a
                        href={selectedProject.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Launch Live Application</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL 2: CERTIFICATE LIGHTBOX & SYLLABUS MODAL
      ==================================================================== */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#090524] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
                <div className="min-w-0">
                  <p className="text-xs font-mono text-indigo-400">
                    {selectedCertificate.issuer} · Issued {selectedCertificate.issueDate}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white truncate">
                    {selectedCertificate.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close certificate preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Toggle for Bangkit Certificate vs Transcript if available */}
                {selectedCertificate.secondaryImage && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCertViewPage('primary')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        certViewPage === 'primary'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      Certificate of Completion
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertViewPage('secondary')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        certViewPage === 'secondary'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {selectedCertificate.secondaryLabel || 'Transcript'}
                    </button>
                  </div>
                )}

                {/* High-Res Certificate Scan */}
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/10">
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

                {/* Metadata & Syllabus Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  <div className="md:col-span-5 space-y-3 font-mono text-xs">
                    <div>
                      <p className="text-slate-400 mb-1">Credential ID:</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold select-all bg-white/5 px-2.5 py-1 rounded border border-white/10">
                          {selectedCertificate.credentialId}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(
                              selectedCertificate.credentialId,
                              `modal-${selectedCertificate.id}`
                            )
                          }
                          className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 hover:text-white hover:bg-indigo-500/30 transition-colors cursor-pointer"
                        >
                          {copiedId === `modal-${selectedCertificate.id}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {selectedCertificate.validUntil && (
                      <div>
                        <p className="text-slate-400 mb-0.5">Status Masa Berlaku:</p>
                        <span className="text-emerald-400 font-semibold">
                          Berlaku hingga {selectedCertificate.validUntil}
                        </span>
                      </div>
                    )}

                    <div className="pt-2">
                      <a
                        href={selectedCertificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-[0_0_16px_rgba(99,102,241,0.3)]"
                      >
                        <span>Verifikasi Kredensial Resmi</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-xs font-mono text-slate-400 mb-2">
                      Verified Curriculum &amp; Competencies:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {selectedCertificate.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-white/[0.06]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL 3: PORTFOLIO PDF / CV SLIDE PREVIEW & DOWNLOAD MODAL
      ==================================================================== */}
      <AnimatePresence>
        {showCvModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setShowCvModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-2xl bg-[#090524] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            >
              {/* Top Bar */}
              <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      Muslim Hakim Muhammad — Official Portfolio PDF
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Slide {cvSlideIndex + 1} of {PORTFOLIO_DATA.profile.pdfSlidePages.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.cvPdfUrl}
                    download="Portfolio_Muslim_Hakim_Muhammad.pdf"
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowCvModal(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close PDF preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Slide Viewer */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-white/10 aspect-video flex items-center justify-center">
                  <img
                    src={PORTFOLIO_DATA.profile.pdfSlidePages[cvSlideIndex]}
                    alt={`Portfolio PDF Slide ${cvSlideIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />

                  {/* Prev / Next Controls */}
                  <button
                    type="button"
                    onClick={() =>
                      setCvSlideIndex((prev) =>
                        prev === 0 ? PORTFOLIO_DATA.profile.pdfSlidePages.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-indigo-600 text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCvSlideIndex(
                        (prev) => (prev + 1) % PORTFOLIO_DATA.profile.pdfSlidePages.length
                      )
                    }
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-indigo-600 text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Selector Strip */}
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                  {PORTFOLIO_DATA.profile.pdfSlidePages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCvSlideIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer shrink-0 ${
                        cvSlideIndex === idx
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
