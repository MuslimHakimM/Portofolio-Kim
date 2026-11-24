export interface ProjectItem {
  id: string;
  code: string;
  year: string;
  platform: string;
  title: string;
  subtitle: string;
  description: string;
  architectureNote: string;
  features: string[];
  techStack: string[];
  githubLink: string;
  liveDemoLink: string;
  splashImage: string;
  dashboardImage: string;
  dualImage: string;
  callouts: {
    label: string;
    detail: string;
  }[];
}

export interface CertificateItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  image: string;
  secondaryImage?: string;
  secondaryLabel?: string;
  highlights: string[];
  verifyUrl: string;
}

export interface TechSkillItem {
  name: string;
  category: 'Mobile & Programming' | 'Web & Backend' | 'Architecture & Tools';
  role: string;
  proficiency: 'Advanced' | 'Intermediate';
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  metric: string;
  period: string;
  location: string;
  summary: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    fullName: 'Muslim Hakim Muhammad',
    nickname: 'Hakim',
    monogram: 'MH',
    primaryRole: 'Android Developer',
    shortHeroBio:
      'Android Developer crafting Kotlin, Jetpack Compose, and modern web applications backed by Bangkit Academy engineering discipline.',
    aboutLead:
      'Built for daily reliability on real screens, from clean mobile architecture to installable web tools.',
    aboutDescription:
      'My name is Hakim, an Informatics graduate from Bhayangkara Jakarta Raya University (GPA 3.54/4.00). Specialized in Mobile Development through Bangkit Academy (led by Google, GoTo, and Traveloka) and Dicoding Academy, I focus on building intuitive, high-performance Android and web applications ready for real users.',
    heroSkills: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'REST API', 'PWA'],
    avatarUrl: '/assets/portfolio/profile_hakim.png',
    cvPdfUrl: '/CV_Muslim_Hakim_Muhammad.pdf',
    cvPages: [
      '/assets/portfolio/cv/cv_page_01.png',
      '/assets/portfolio/cv/cv_page_02.png',
    ],
    verifiedMetrics: [
      {
        id: 'projects',
        from: '0',
        to: '4',
        suffix: '',
        label: 'Shipped Apps',
        note: 'Native Android & Progressive Web Apps',
      },
      {
        id: 'bangkit-hours',
        from: '0',
        to: '900',
        suffix: '+',
        label: 'Bangkit Hours',
        note: 'Distinction Graduate in Mobile Development',
      },
      {
        id: 'gpa',
        from: '0.00',
        to: '3.54',
        suffix: '',
        label: 'Informatics GPA',
        note: 'Out of 4.00, Bhayangkara Jakarta Raya Univ.',
      },
      {
        id: 'certificates',
        from: '0',
        to: '5',
        suffix: '',
        label: 'Verified Credentials',
        note: 'Bangkit Academy & Dicoding Indonesia',
      },
    ],
  },

  contact: {
    phone: '+62 87888568242',
    whatsappNumber: '628788568242',
    whatsappLink: 'https://wa.me/628788568242',
    email: 'muslimhakim374@gmail.com',
    linkedin: 'https://www.linkedin.com/in/m-hakim-m',
    linkedinHandle: 'in/m-hakim-m',
    github: 'https://github.com/MuslimHakimM',
    githubHandle: 'MuslimHakimM',
    location: 'Bekasi, Indonesia',
    availability:
      'Open for Android Developer roles, mobile engineering collaborations, and web/PWA builds in Bekasi, Jakarta, or remote.',
  },

  education: [
    {
      id: 'edu-1',
      institution: 'Bhayangkara Jakarta Raya University',
      program: 'Bachelor of Computer Science, Informatics',
      metric: 'GPA 3.54 / 4.00',
      period: 'Sep 2020 - Aug 2024',
      location: 'Bekasi, Indonesia',
      summary:
        'Focused on software engineering, mobile application architecture, object-oriented programming, algorithms, and relational database systems.',
    },
    {
      id: 'edu-2',
      institution: 'Bangkit Academy (Google, GoTo, Traveloka)',
      program: 'Android Developer & Mobile Development Cohort',
      metric: 'Distinction Graduate · 900+ Hours',
      period: 'Feb 2023 - Jul 2023',
      location: 'Bandung, Indonesia',
      summary:
        'Intensive Kampus Merdeka program mastering Kotlin, Jetpack Compose, Clean Architecture, SOLID principles, UX Design, and multidisciplinary Capstone delivery.',
    },
    {
      id: 'edu-3',
      institution: 'Dicoding Academy Bootcamp',
      program: 'Android Application Development Path',
      metric: 'Verified Android Path',
      period: 'Aug 2022 - Dec 2022',
      location: 'Bandung, Indonesia',
      summary:
        'Structured technical track covering Git workflows, Kotlin fundamentals, Android UI components, local persistence, background processes, and RESTful API integration.',
    },
  ] as EducationItem[],

  projects: [
    {
      id: 'pet-friends',
      code: 'APP-01',
      year: 'Android Native',
      platform: 'Kotlin · Android Studio',
      title: 'Pet Friends',
      subtitle: 'Smart Pet Care & Daily Activity Reminder App',
      description:
        'A mobile application designed to help pet owners stay consistent with daily routines. It organizes health tasks across six core categories and delivers timely local notifications so vital care schedules are never missed.',
      architectureNote:
        'Structured around modular category screens, local notification scheduling, and lightweight XML layouts tuned for fast cold starts.',
      features: [
        'Pet care category management (Vaccine, Food, Shower, Medicine, Grooming, Weight)',
        'Daily Reminder Activity with local notification alerts',
        'Animated informational slides for care guidance',
        'Clean, single-thumb mobile dashboard UI',
      ],
      techStack: ['Kotlin', 'Android Studio', 'XML / UI Design', 'Local Notification'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project1_splash.png',
      dashboardImage: '/assets/portfolio/project1_dashboard.png',
      dualImage: '/assets/portfolio/project1_dual.png',
      callouts: [
        { label: 'Category Grid', detail: '6 structured daily pet care tracks' },
        { label: 'Reminder Engine', detail: 'Scheduled local notification triggers' },
        { label: 'UI Layer', detail: 'Kotlin + XML responsive Android layout' },
      ],
    },
    {
      id: 'healthy-me',
      code: 'APP-02',
      year: 'Android Native',
      platform: 'Kotlin · REST API',
      title: 'HealthyMe',
      subtitle: 'Calorie Counter & Interactive BMI Health Tracker',
      description:
        'A health monitoring Android application built to simplify daily calorie logging and Body Mass Index (BMI) calculation. Users search meal nutrition via REST API and track targets through a calm, scannable dashboard.',
      architectureNote:
        'Connects remote nutrition search endpoints to real-time client-side BMI evaluation using Material Design components.',
      features: [
        'Food and menu calorie search powered by REST API',
        'Interactive Body Mass Index (BMI) calculator',
        'Daily calorie intake monitoring dashboard',
        'Focused Material Design visual hierarchy',
      ],
      techStack: ['Kotlin', 'Android SDK', 'REST API', 'Material Design'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project2_splash.png',
      dashboardImage: '/assets/portfolio/project2_dashboard.png',
      dualImage: '/assets/portfolio/project2_dual.png',
      callouts: [
        { label: 'Nutrition Query', detail: 'Live meal calorie lookup over REST API' },
        { label: 'BMI Logic', detail: 'Instant metric computation & classification' },
        { label: 'Design System', detail: 'Material Design cards & input states' },
      ],
    },
    {
      id: 'care-point',
      code: 'APP-03',
      year: 'Android Native',
      platform: 'Kotlin · Location Services',
      title: 'CarePoint',
      subtitle: 'Indonesia Hospital Finder & Real-Time Capacity Directory',
      description:
        'An Android healthcare directory helping people locate hospitals across Indonesian provinces and cities. It pairs real-time room availability with direct contact info and distance calculation from the user.',
      architectureNote:
        'Combines regional API filtering with Android Location Services to compute live proximity and render actionable hospital cards.',
      features: [
        'Province and city search filter across Indonesia',
        'Real-time hospital room capacity visibility',
        'Complete hospital address and phone contact integration',
        "Distance calculation from the user's location via REST API",
      ],
      techStack: ['Kotlin', 'Android SDK', 'REST API', 'Location Services'],
      githubLink: 'https://github.com/MuslimHakimM/Pet-Friends-App',
      liveDemoLink: '',
      splashImage: '/assets/portfolio/project3_splash.png',
      dashboardImage: '/assets/portfolio/project3_dashboard.png',
      dualImage: '/assets/portfolio/project3_dual.png',
      callouts: [
        { label: 'Regional Filter', detail: 'Province & city search across Indonesia' },
        { label: 'Capacity Feed', detail: 'Real-time hospital room status display' },
        { label: 'Geolocation', detail: 'Proximity distance via Location Services' },
      ],
    },
    {
      id: 'tilawah-tracker',
      code: 'APP-04',
      year: 'Live Production PWA',
      platform: 'NativePHP · MySQL · PWA',
      title: 'Tilawah Tracker (KabarQLC)',
      subtitle: "Structured Al-Qur'an Khatam & Digital Mushaf PWA",
      description:
        "A live Progressive Web App built to help readers stay consistent with daily Al-Qur'an recitation. It structures 25-day and 30-day khatam programs around prayer times and opens directly to the reader's last bookmarked page.",
      architectureNote:
        'Installable offline-capable PWA backed by NativePHP and MySQL with prayer-time task grouping and automatic Mushaf bookmarking.',
      features: [
        'Structured 25-Day and 30-Day Khatam programs plus manual pacing',
        'Smart dashboard organized around daily prayer times',
        'Auto-bookmark "Start Reading" directly to last-read Mushaf page',
        'Detailed completion percentage and progress statistics',
        'Installable Progressive Web App (PWA) experience',
      ],
      techStack: ['NativePHP', 'MySQL', 'PWA', 'Modern Web UI'],
      githubLink: 'https://github.com/MuslimHakimM',
      liveDemoLink: 'https://dev-tracktilawah.kyym.my.id/',
      splashImage: '/assets/portfolio/project4_splash.png',
      dashboardImage: '/assets/portfolio/project4_dashboard.png',
      dualImage: '/assets/portfolio/project4_dual.png',
      callouts: [
        { label: 'Khatam Engine', detail: '25-day & 30-day progress percentage ring' },
        { label: 'Prayer Schedule', detail: 'Daily recitation tasks synced by prayer time' },
        { label: 'Digital Mushaf', detail: 'Auto-bookmarking PWA deployed in production' },
      ],
    },
  ] as ProjectItem[],

  certificates: [
    {
      id: 'cert-bangkit',
      code: 'CRED-01',
      title: 'Bangkit Academy 2023: Certificate of Completion (Mobile Development)',
      issuer: 'Google, GoTo, Traveloka, Kampus Merdeka',
      issueDate: 'July 27, 2023',
      credentialId: 'BA23/GRAD/XXIII-07/A147DSX3364',
      image: '/assets/portfolio/cert_bangkit.png',
      secondaryImage: '/assets/portfolio/cert_bangkit_transcript.png',
      secondaryLabel: 'Student Learning Achievement Transcript',
      highlights: [
        'Kotlin Basic',
        'Android Programming for Beginners',
        'Android Fundamental',
        'Intermediate Android Development',
        'Jetpack Compose',
        'UX Design',
        'SOLID Paradigm',
        'Associate Android Developer Prep',
        'Capstone Project',
      ],
      verifyUrl: 'https://grow.google/intl/id_id/bangkit/',
    },
    {
      id: 'cert-intermediate',
      code: 'CRED-02',
      title: 'Belajar Pengembangan Aplikasi Android Intermediate',
      issuer: 'Dicoding Indonesia',
      issueDate: 'June 29, 2023',
      credentialId: '4EXGNM99ZRL',
      image: '/assets/portfolio/cert_android_intermediate.png',
      highlights: [
        'Custom Views & Canvas Animation',
        'Localization & Accessibility',
        'Media Player, CameraX & ExoPlayer',
        'Geo-Location & Google Maps API',
        'Paging 3 & Room PagingSource',
        'Advanced Unit & UI Testing',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/4EXGNM99ZRL',
    },
    {
      id: 'cert-fundamental',
      code: 'CRED-03',
      title: 'Belajar Fundamental Aplikasi Android',
      issuer: 'Dicoding Indonesia',
      issueDate: 'October 15, 2022',
      credentialId: '6RPN6358RP2M',
      image: '/assets/portfolio/cert_android_fundamental.png',
      highlights: [
        'Fragments & Navigation Component',
        'Background Thread & Coroutines',
        'Networking with Retrofit2 & OkHttp',
        'Android Architecture Components (ViewModel & LiveData)',
        'Room Local Database & DataStore',
        'WorkManager & BroadcastReceiver',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/6RPN6358RP2M',
    },
    {
      id: 'cert-kotlin',
      code: 'CRED-04',
      title: 'Memulai Pemrograman Dengan Kotlin',
      issuer: 'Dicoding Indonesia',
      issueDate: 'August 25, 2022',
      credentialId: 'N9ZO7JAL0ZG5',
      image: '/assets/portfolio/cert_kotlin.png',
      highlights: [
        'Kotlin Fundamental & Control Flow',
        'Data Classes, Collections & Sequences',
        'Functional Programming (Lambda & Higher-Order Functions)',
        'Object-Oriented Programming (Inheritance, Interfaces, Generics)',
        'Kotlin Coroutines & Concurrency Basics',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/N9ZO7JAL0ZG5',
    },
    {
      id: 'cert-git',
      code: 'CRED-05',
      title: 'Belajar Dasar Git dengan GitHub',
      issuer: 'Dicoding Indonesia',
      issueDate: 'August 14, 2022',
      credentialId: '72ZDOR8LQXYW',
      image: '/assets/portfolio/cert_git.png',
      highlights: [
        'Git Repository & Commit Lifecycle',
        'Branching, Merging & Conflict Resolution',
        'GitHub Remote Collaboration & Pull Requests',
        'Code Review & Team Version Control Workflows',
      ],
      verifyUrl: 'https://www.dicoding.com/certificates/72ZDOR8LQXYW',
    },
  ] as CertificateItem[],

  techStack: [
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
