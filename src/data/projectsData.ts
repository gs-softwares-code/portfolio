// Authentic project data extracted from GitHub repositories
// Repository: https://github.com/Gulshan-Singh-gs

export type ProjectStatus = "live" | "in-development" | "prototype" | "early-stage";

export interface Project {
  id: string;
  name: string;
  slug: string;
  industry: string;
  status: ProjectStatus;
  description: string;
  longDescription: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const featuredProjects: Project[] = [
  {
    id: "off-the-grid-gym",
    name: "Off The Grid Gym",
    slug: "off-the-grid-gym",
    industry: "Health & Fitness",
    status: "live",
    description:
      "High-performance digital platform and owner admin system for a Punjab-based gym — converting website visitors into physical admissions without friction.",
    longDescription:
      "A production-ready web platform built for Off The Grid Gym, Ropar, Punjab. Includes a conversion-optimized public website with dynamic pricing, promotional offers, trainer profiles, and facility gallery — plus a non-technical owner admin dashboard for complete content control. No online payment friction; all admissions handled in-person or via WhatsApp.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    keyFeatures: [
      "Dynamic membership pricing (1–12 month INR plans)",
      "Owner admin dashboard — no code required",
      "Promotional offers management with auto-expiry",
      "Floating WhatsApp enquiry + sticky mobile CTA bar",
      "Interactive facility gallery with Lightbox",
      "Embedded Google Maps & verified directions",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/off_the_grid-gym",
    featured: true,
  },
  {
    id: "cafeos",
    name: "CafeOS",
    slug: "cafeos",
    industry: "Hospitality",
    status: "in-development",
    description:
      "Zero-commission multi-tenant café operations platform — replacing paper kots and aggregator fees with live kitchen management and mobile ordering.",
    longDescription:
      "CafeOS is engineered specifically for independent café owners in Punjab. Customers order via branded mobile storefront; baristas manage a live Kanban kitchen terminal. Features real-time order tracking across four stages, authentic Indian menu with INR pricing, multi-tenant isolation so each café's data is strictly separated, and a demo reset function. Server-side pricing prevents client-side manipulation.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "pnpm"],
    keyFeatures: [
      "Multi-tenant café storefronts (/cafe/[slug])",
      "Live kitchen Kanban — single-click status transitions",
      "Real-time order tracking (auto-update every 3.5s)",
      "Authentic Indian menu with INR pricing",
      "Dine-in & takeaway with table number support",
      "Sales analytics — daily gross, AOV, ticket counts",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/CafeOS",
    featured: true,
  },
  {
    id: "rupnagar-tailors",
    name: "Rupnagar Tailors",
    slug: "rupnagar-tailors",
    industry: "Retail & Fashion",
    status: "live",
    description:
      "Bespoke tailoring shop interface — premium UI/UX experiment using vanilla frontend with serverless Google Apps Script backend and live GitHub Pages deployment.",
    longDescription:
      "A high-end conceptual tailoring shop interface built to push the limits of vanilla frontend development. Features a custom CSS 'Magic Indicator' curved-notch navigation, two switchable themes (Royal light mode and Apex dark mode), a Fabric Estimator calculator, persistent user sessions via localStorage, and a serverless backend using Google Apps Script connected to Google Sheets as a real-time database.",
    techStack: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Google Apps Script",
      "Google Sheets API",
      "GitHub Pages",
    ],
    keyFeatures: [
      "Live deployment on GitHub Pages",
      "Serverless backend via Google Apps Script",
      "Dual theme system: Royal (light) + Apex (dark)",
      "Fabric Estimator logic calculator",
      "Persistent user sessions with localStorage",
      "Custom curved-notch CSS navigation",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/Rupnagar-tailors",
    liveUrl: "https://gulshan-singh-gs.github.io/Rupnagar-tailors/",
    featured: true,
  },
  {
    id: "vyaparos",
    name: "VyaparOS",
    slug: "vyaparos",
    industry: "Retail & Commerce",
    status: "in-development",
    description:
      "Vernacular-first business OS for Indian small businesses — bills, inventory, udhaar (credit), suppliers, and GST preparation in one platform.",
    longDescription:
      "VyaparOS is a mobile-first merchant platform designed around how small Indian businesses actually work. Handwritten bills, stock changes, customer udhaar (credit), and supplier purchases are transformed into organized, auditable business records. Financially safe using integer paise arithmetic. Supports Hindi, Punjabi, English, and Hinglish merchants including those with unreliable internet access. AI can suggest, but deterministic logic and people control financial records.",
    techStack: [
      "TypeScript",
      "Turborepo",
      "pnpm Workspaces",
      "React",
      "Next.js",
    ],
    keyFeatures: [
      "Merchant dashboard: Bills, Inventory, Udhaar, Suppliers",
      "GST workspace and analytics",
      "Voice assistant for hands-free data entry",
      "Integer paise arithmetic — no floating-point errors",
      "Auditable ledgers for inventory and credit",
      "Offline-aware design for limited connectivity",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/VyaparOS",
    featured: true,
  },
];

export const additionalProjects: Project[] = [
  {
    id: "facultyos",
    name: "FacultyOS",
    slug: "facultyos",
    industry: "Education & Academia",
    status: "in-development",
    description:
      "Privacy-first academic operations platform for university professors — a deterministic syllabus policy compiler that auto-triages student requests on the Cloudflare edge.",
    longDescription:
      "FacultyOS converts course syllabi into a 100% deterministic policy compiler. It validates, routes, or auto-resolves student requests (deadline extensions, regrades, office hours) against published course rules in milliseconds — with zero medical data collection and FERPA compliance by design. Deployed on Cloudflare edge. 74/74 Vitest tests passing.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Cloudflare Workers",
      "Drizzle ORM",
      "Vitest",
      "pnpm",
    ],
    keyFeatures: [
      "Deterministic syllabus policy compiler",
      "FERPA compliant by design — zero personal data collection",
      "Cloudflare edge deployment",
      "74/74 automated tests passing",
      "Student request auto-triage system",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/FacultyOS",
    featured: false,
  },
  {
    id: "krishios",
    name: "KrishiOS",
    slug: "krishios",
    industry: "Agriculture",
    status: "in-development",
    description:
      "Offline-first agricultural intelligence for farmers — crop decisions, irrigation planning, market discovery, and farm records designed for limited connectivity.",
    longDescription:
      "KrishiOS is an agricultural intelligence project built around a client-first, offline-minded approach. The web interface includes a dashboard, mandi price comparison, irrigation tools, crop scanner, voice assistant, and sync center. Shared TypeScript contracts, Cloudflare Workers API, and market/weather data-processing pipelines are included. Available as web app and Android via Capacitor.",
    techStack: [
      "TypeScript",
      "React",
      "Capacitor",
      "Cloudflare Workers",
      "pnpm Workspaces",
    ],
    keyFeatures: [
      "Offline-first architecture for rural connectivity",
      "Mandi price comparison tool",
      "Irrigation planning calculator",
      "Crop scanner with voice assistant",
      "Android app via Capacitor",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/KrishiOS",
    featured: false,
  },
  {
    id: "monolith",
    name: "MONOLITH",
    slug: "monolith",
    industry: "Developer Tooling",
    status: "in-development",
    description:
      "Autonomous multi-agent SDLC platform and headed browser engine — a local-first AI software factory with Playwright browser automation and Merkle-chained audit ledger.",
    longDescription:
      "MONOLITH is a unified autonomous software factory. Agent personas plan, architect, scaffold, test, and run full-stack solutions end-to-end. Powered by Playwright for real browser automation. Operates 100% locally using open-weight models via Ollama for data sovereignty. Includes dual-engine LLM routing, Merkle SHA-256 audit ledger, injection guard, and LAN security management.",
    techStack: [
      "Python",
      "Playwright",
      "Ollama",
      "FastAPI",
      "Vanilla JS",
      "LAN mdns",
    ],
    keyFeatures: [
      "Autonomous agent personas for end-to-end dev",
      "Headed Playwright browser automation",
      "100% local — no cloud data exfiltration",
      "Merkle SHA-256 chained audit ledger",
      "Dual-engine LLM routing",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/monolith",
    featured: false,
  },
  {
    id: "guardpayos",
    name: "GuardPayOS",
    slug: "guardpayos",
    industry: "Fintech & Security",
    status: "prototype",
    description:
      "Privacy-first fraud protection layer for digital payments — exploring safer UPI payments, phishing checks, and explainable security decisions.",
    longDescription:
      "GuardPayOS is an early-stage TypeScript monorepo exploring user-controlled, privacy-conscious security for digital payments. Aimed at helping users inspect suspicious payment links and messages, understand warning signs, and make informed decisions. The project prioritizes local processing and minimal data collection.",
    techStack: [
      "TypeScript",
      "React",
      "Vite",
      "pnpm Workspaces",
      "Cloudflare Workers",
    ],
    keyFeatures: [
      "Suspicious payment link inspector",
      "Privacy-first — local processing preferred",
      "Phishing and social-engineering awareness",
      "Explainable security decisions",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/GuardPayOS",
    featured: false,
  },
  {
    id: "campusos",
    name: "CampusOS",
    slug: "campusos",
    industry: "Education",
    status: "prototype",
    description:
      "Campus operations platform for RBU — a full-stack TypeScript web application with Supabase backend and Cloudflare edge deployment.",
    longDescription:
      "CampusOS is a campus operations platform built for RBU (Rayat Bahra University). Built as a full-stack TypeScript application with Vite, Supabase, and Cloudflare Workers deployment. Includes a comprehensive architectural audit examining its path to enterprise readiness.",
    techStack: [
      "TypeScript",
      "Vite",
      "Supabase",
      "Tailwind CSS",
      "Cloudflare Workers",
      "pnpm",
    ],
    keyFeatures: [
      "Campus operations management",
      "Cloudflare edge deployment",
      "Supabase backend integration",
      "Enterprise-grade architectural design",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/CampusOs-rbu",
    featured: false,
  },
  {
    id: "inventory",
    name: "Inventory",
    slug: "inventory",
    industry: "Developer Tooling",
    status: "live",
    description:
      "Open-source, self-hosted product database — zero-dependency vanilla JS with dynamic filtering, hash routing, and offline-first GitHub Pages deployment.",
    longDescription:
      "A standalone, self-hosted product catalog system built with pure vanilla HTML/CSS/JS. No build step required — works offline or via GitHub Pages. Features auto-generated dynamic filters (Category, Stack, License, Difficulty), shareable hash URLs, and a glassmorphism dark mode UI.",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    keyFeatures: [
      "Zero dependencies — pure Vanilla JS",
      "Offline-first via file:// or GitHub Pages",
      "Dynamic filtering from JSON data",
      "Shareable hash routing (#/category/...)",
      "Glassmorphism dark mode UI",
    ],
    githubUrl: "https://github.com/Gulshan-Singh-gs/Inventory",
    featured: false,
  },
];

export const allProjects = [...featuredProjects, ...additionalProjects];

export const getProjectBySlug = (slug: string) =>
  allProjects.find((p) => p.slug === slug);

