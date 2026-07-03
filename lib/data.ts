import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cloud,
  Cpu,
  Layers,
  RefreshCw,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";

export const SITE = {
  name: "Muhammad Huzaifa Awan",
  shortName: "Huzaifa Awan",
  title: "Senior Full Stack Developer",
  subtitle:
    "I build scalable web applications, AI-powered SaaS products, enterprise systems, and modern digital experiences.",
  email: "mhuzaifaawan7@gmail.com",
  location: "Remote · Working across US timezones",
  cv: "/Huzaifa_Awan_Senior_CV.pdf",
  agency: {
    name: "Eyrie Digital",
    role: "Co-Founder & COO",
    url: "https://www.eyriedigital.com/",
  },
  socials: {
    github: "https://github.com/M-Huzaifa-Awan",
    linkedin: "https://www.linkedin.com/in/mhuzaifaawan",
    upwork: "https://www.upwork.com/freelancers/~01b2cac225f43ef332",
    email: "mailto:mhuzaifaawan7@gmail.com",
  },
  githubUser: "M-Huzaifa-Awan",
};

// GitHub section headline numbers. Most client work is private / under NDA,
// so these are curated rather than pulled from the public API.
// TODO: set `totalRepos` to your real total (public + private).
export const GITHUB_TOTALS = {
  totalRepos: "18",
  visibility: "Mostly private",
  stack: "C# · TS",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "3+", label: "Years shipping production" },
  { value: "95%", label: "Redis cache hit rate" },
  { value: "<50ms", label: "API response under load" },
  { value: "5.0", label: "Upwork client rating" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Rocket,
    title: "SaaS Product Development",
    description:
      "Multi-tenant SaaS built end-to-end — onboarding, billing, dashboards and real-time features. Systems serving 100+ concurrent users at sub-50ms with a 95% Redis cache hit rate.",
    points: ["Multi-tenant", "Onboarding & billing", "Realtime dashboards"],
  },
  {
    icon: Boxes,
    title: "MCP Servers & AI Agents",
    description:
      "Custom Model Context Protocol servers that let Claude securely read and write across your real tools. I shipped a production MCP exposing 60+ tools — a capability most senior devs don't have.",
    points: ["60+ tools exposed", "OAuth 2.0", "ClickUp / Graph / Health"],
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description:
      "Claude and OpenAI wired into products — structured outputs, prompt engineering, Claude Vision image analysis, and reliable LLM pipelines you can ship to real users.",
    points: ["Claude / OpenAI", "Claude Vision", "Structured outputs"],
  },
  {
    icon: Workflow,
    title: "APIs & Real-Time Systems",
    description:
      "REST and real-time APIs — WebSockets for live preview, Stripe webhooks for payments, and well-documented contracts your frontend can trust.",
    points: ["REST & WebSockets", "Stripe / webhooks", "Live preview"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Deploys that scale — Azure DevOps, GitHub Actions, Docker, Fly.io and Vercel, with Redis caching and query tuning for fast responses under concurrency.",
    points: ["CI/CD pipelines", "Docker", "Fly.io / Vercel"],
  },
  {
    icon: RefreshCw,
    title: "Legacy Modernization",
    description:
      "Migrate aging monoliths to modern architecture without downtime. I've taken 3s page loads down to under 500ms and resolved 50+ defects to stabilize production.",
    points: ["Monolith migration", "Perf tuning", "Defect burndown"],
  },
];

export type Project = {
  id: number;
  title: string;
  featured?: boolean;
  headline?: string;
  description: string;
  image?: string;
  orientation?: "portrait" | "landscape";
  stack: string[];
  tags: string[];
  metrics?: { value: string; label: string }[];
  liveUrl?: string;
  githubUrl?: string;
  pdf?: string;
  color: string;
  /** True when the shown image is a self-made mockup because the real UI,
   *  screenshots and links are the client's property and can't be shared. */
  mockup?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Apex Synchronia Intelligence",
    featured: true,
    headline: "AI-powered intelligence platform",
    description:
      "AI analytics platform for affiliate-driven businesses, with portfolio overview, revenue trends, territories, configurable metrics, and an admin panel. Integrates Claude and OpenAI with structured outputs, prompt engineering, and CSV ingestion.",
    image: "/projects/apex/cover.jpg",
    stack: ["Next.js", "Claude API", "OpenAI", "Supabase", "TypeScript"],
    tags: ["AI", "Analytics", "Real-time"],
    metrics: [
      { value: "2", label: "LLMs orchestrated" },
      { value: "Multi", label: "Client roll-up" },
    ],
    liveUrl: "https://apex-seven-tau.vercel.app/intelligence",
    pdf: "/APEX INTELLIGENCE0.pdf",
    color: "#ef4444",
  },
  {
    id: 7,
    title: "Studio OS",
    featured: true,
    headline: "Custom MCP server · 80+ AI tools",
    description:
      "Solo-engineered AI integration platform that lets Claude control a team's tools through one secure interface. Exposes 80+ tools across ClickUp, Outlook (dual M365 tenants via Microsoft Graph), Apple Health, and Oura. OAuth 2.0 device-code auth, an SSE to Streamable HTTP migration, and a Windows installer with AES-256-GCM credential encryption.",
    image: "/projects/studio-os/cover.png",
    stack: ["FastAPI", "Python", "Microsoft Graph", "Neon PostgreSQL", "Fly.io"],
    tags: ["AI", "MCP", "API"],
    metrics: [
      { value: "80+", label: "AI tools exposed" },
      { value: "AES-256", label: "Credential encryption" },
    ],
    color: "#a855f7",
  },
  {
    id: 2,
    title: "LEO Multilingual Salon Builder",
    description:
      "Real-time multi-tenant website builder powering salon storefronts across the LEO Innovate SaaS platform. WebSocket-driven live preview pushes updates without refreshes, with six themes, custom typography, and full English and Spanish i18n.",
    image: "/projects/builder/mockup.png",
    mockup: true,
    stack: ["ASP.NET Core", "React", "WebSockets", "i18n", "Multi-tenant"],
    tags: ["SaaS", "Real-time", "i18n"],
    metrics: [
      { value: "6", label: "Live themes" },
      { value: "EN/ES", label: "Full i18n" },
    ],
    color: "#6366f1",
  },
  {
    id: 3,
    title: "LEO Salon Analytics Dashboard",
    description:
      "Bilingual operations dashboard for salon owners, covering live queue, walk-in traffic, expected earnings, low-stock alerts, and reviews. Backed by Redis caching with a 95% hit rate and sub-50ms responses under 100+ concurrent users.",
    image: "/projects/dashboard/mockup.png",
    mockup: true,
    stack: ["React", ".NET 8", "SQL Server", "Redis", "Recharts"],
    tags: ["Dashboard", "Analytics", "Performance"],
    metrics: [
      { value: "95%", label: "Cache hit rate" },
      { value: "<50ms", label: "Response time" },
    ],
    color: "#a855f7",
  },
  {
    id: 8,
    title: "Virginia MLS Solutions",
    headline: "Real estate listings platform",
    description:
      "Real estate platform for Virginia MLS Solutions. Built around nine React pages backed by SQL Server, covering property listings, search, and detail views connected to live data, with a clean, responsive UI and a fast browsing experience.",
    image: "/projects/virginia-mls/cover.png",
    mockup: true,
    stack: ["React", "SQL Server", "REST APIs", ".NET"],
    tags: ["Real Estate", "Web App", "SQL"],
    metrics: [
      { value: "9", label: "React pages" },
      { value: "SQL", label: "Live data" },
    ],
    color: "#14b8a6",
  },
  {
    id: 4,
    title: "LEO Innovate Onboarding Portal",
    description:
      "End-to-end bilingual onboarding wizard covering owner info, plan selection, add-ons, branch setup, services, teams, migration, and Stripe payment. Firebase OTP verification, save-and-resume, and dynamic PDF service-agreement generation.",
    image: "/projects/onboard/mockup.png",
    mockup: true,
    stack: ["React", "ASP.NET Core", "Firebase OTP", "Stripe", "iTextSharp"],
    tags: ["Onboarding", "Stripe", "OTP"],
    metrics: [
      { value: "9-step", label: "Guided wizard" },
      { value: "Resume", label: "Across sessions" },
    ],
    color: "#3b82f6",
  },
  {
    id: 9,
    title: "Network Change Scanner",
    headline: "Scan. Compare. Detect. Decide.",
    description:
      "Desktop application that scans a network, captures a snapshot of the current state, and gives a clear go or no-go decision. On each run it compares against the last stored copy, and if the data has changed it flags exactly what was added, removed, or modified and warns you not to proceed. Built for fast, reliable change detection on a live network.",
    image: "/projects/network-scanner/cover.png",
    mockup: true,
    stack: ["C#", ".NET", "WPF", "Networking"],
    tags: ["Desktop", "Networking", "Automation"],
    metrics: [
      { value: "Go/No-Go", label: "Decision engine" },
      { value: "Diff", label: "Change detection" },
    ],
    color: "#22d3ee",
  },
  {
    id: 5,
    title: "LEO Self-Service Kiosk",
    description:
      "Touch-optimized check-in kiosk for in-salon walk-ins, with phone-number lookup and Firebase OTP, guest count, walk-in vs reserved flow, service browser, and stylist selection. Pairs with a live TV queue display.",
    image: "/projects/kiosk/mockup.png",
    mockup: true,
    orientation: "portrait",
    stack: ["React", "PWA", "Firebase OTP", "WebSockets"],
    tags: ["Kiosk", "PWA", "Touch"],
    metrics: [
      { value: "PWA", label: "Offline-ready" },
      { value: "OTP", label: "Verified check-in" },
    ],
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Affiliate Management System",
    description:
      "Direct-selling platform with tiered bundles, rank progression (Consultant to Director), referral tracking, and member dashboards. Stripe subscriptions, one-time payments, and webhook handling on Next.js and Supabase.",
    image: "/projects/affiliate/cover.jpg",
    orientation: "portrait",
    stack: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "Tailwind"],
    tags: ["Affiliate", "Stripe", "Dashboard"],
    metrics: [
      { value: "Tiered", label: "Rank engine" },
      { value: "Stripe", label: "Subs + webhooks" },
    ],
    liveUrl: "https://affiliate-system-omega.vercel.app",
    pdf: "/Affiliate System.pdf",
    color: "#10b981",
  },
];

export type TechGroup = { heading: string; items: string[] };

export const TECH_GROUPS: TechGroup[] = [
  {
    heading: "Backend",
    items: ["C#", ".NET Core", ".NET 8", "ASP.NET", "Node.js", "REST APIs", "GraphQL", "SignalR"],
  },
  {
    heading: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    heading: "Data & Cloud",
    items: ["SQL Server", "PostgreSQL", "Redis", "Supabase", "Azure", "Docker", "Fly.io", "Vercel"],
  },
  {
    heading: "AI & Payments",
    items: ["Anthropic", "OpenAI", "MCP", "Stripe", "Firebase OTP", "iTextSharp"],
  },
];

// Flat marquee list
export const TECH_PILLS = [
  "ASP.NET",
  ".NET Core",
  "C#",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "SQL Server",
  "PostgreSQL",
  "Azure",
  "Docker",
  "Redis",
  "SignalR",
  "OpenAI",
  "Anthropic",
  "REST APIs",
  "GraphQL",
];

export type Role = {
  company: string;
  role: string;
  product: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
  url?: string;
};

export const EXPERIENCE: Role[] = [
  {
    company: "Eyrie Digital",
    role: "Co-Founder & COO",
    product: "Web & Mobile App Development Agency",
    period: "2025 - Present",
    location: "Doha, Qatar · Serving the Gulf & internationally",
    url: "https://www.eyriedigital.com/",
    highlights: [
      "Co-founded a web and mobile app development agency delivering scalable digital products for clients across the Gulf and international markets.",
      "Own operations and delivery end-to-end — scoping, architecture, team coordination, and quality — while staying hands-on in engineering.",
      "Ship production web and mobile applications with a focus on AI-powered, modern digital experiences.",
    ],
    stack: ["Next.js", "React", ".NET", "Node.js", "AI Integration", "Cloud"],
  },
  {
    company: "LEO Innovate",
    role: "Senior Full Stack Developer",
    product: "SaaS Salon Management Platform",
    period: "Jun 2024 - Present",
    location: "Remote · Florida, USA",
    highlights: [
      "Architected a real-time website builder with WebSocket-powered live preview on ASP.NET Core and React across a multi-tenant SaaS environment.",
      "Tuned SQL Server queries and introduced a Redis caching strategy, hitting a 95% cache hit rate and sub-50ms responses under 100+ concurrent users.",
      "Built the analytics dashboard, TV queue display, and self-service kiosk check-in flow with Firebase OTP verification.",
      "Led the multilingual (English and Spanish) rollout with proper URL structure, routing, and redirects.",
      "Drove a 5,000+ line C# refactor that cut technical debt by ~30% and reduced production incidents by 40%.",
    ],
    stack: ["ASP.NET Core", "React", ".NET 8", "SQL Server", "Redis", "WebSockets", "Azure DevOps"],
  },
  {
    company: "FABCO Inc. / Divisional Public School",
    role: "Full Stack Developer",
    product: "Legacy Migration & Platform Build-out",
    period: "May 2023 - Sep 2024",
    location: "Lahore, Pakistan",
    highlights: [
      "Led migration of a legacy monolith to a modern full-stack architecture on .NET and JavaScript, now serving 200+ daily active users.",
      "Optimized the MySQL layer, dropping page loads from 3s to under 500ms via query restructuring and indexing.",
      "Resolved 50+ legacy defects, improving system reliability by ~40%.",
      "Designed and built RESTful APIs and responsive frontend interfaces from scratch.",
    ],
    stack: [".NET", "JavaScript", "MySQL", "REST APIs", "jQuery", "Bootstrap"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
  date?: string;
  source?: string;
  endorsements?: string[];
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Awan jumped in fast, understood the issue without needing any handholding, and had it fixed within a day. Clean code, no cutting corners. Will definitely hire again for our next sprint.",
    name: "Verified Upwork Client",
    role: "Bug fix & sprint work",
    rating: 5,
    source: "Upwork",
    endorsements: [
      "Reliable",
      "Solution Oriented",
      "Clear Communicator",
      "Accountable for Outcomes",
      "Detail Oriented",
    ],
  },
  {
    quote:
      "Great communication throughout. Delivered exactly what was asked, pixel-perfect. He also flagged a small responsiveness bug I hadn't noticed, which was a nice bonus. Solid developer.",
    name: "Verified Upwork Client",
    role: "UI Minor Fixes for Dashboard Design Compliance",
    rating: 5,
    date: "May 2026",
    source: "Upwork",
  },
];

// Honest reference note (no fabricated quote).
export const LEO_REFERENCE =
  "The CEO at LEO Innovate offered to write a personal letter of recommendation after the salon SaaS platform work. Reference available on request.";

export type Cert = {
  issuer: string;
  name: string;
  note: string;
  image: string;
  icon: "degree" | "award" | "badge";
};

export const CERTS: Cert[] = [
  {
    issuer: "NUML Islamabad",
    name: "B.S. Computer Science",
    note: "Graduated 2026 with a CGPA of 3.72 / 4.00 (Grade A).",
    image: "/Degree.jpeg",
    icon: "degree",
  },
  {
    issuer: "NUML Islamabad",
    name: "Certificate of Merit",
    note: "Awarded for Brilliant Academic Achievements (BS CS).",
    image: "/certificate.png",
    icon: "award",
  },
  {
    issuer: "micro1",
    name: "Certified Full Stack Developer",
    note: "Certified after passing micro1's AI-driven technical interview.",
    image: "/micro1.jpg",
    icon: "badge",
  },
];

export const ABOUT_CAPABILITIES = [
  "Architect multi-tenant SaaS platforms end-to-end",
  "Build real-time experiences with WebSockets and live preview",
  "Tune SQL and Redis for sub-50ms responses under load",
  "Integrate Claude and OpenAI with structured outputs",
  "Ship Stripe subscription, one-time, and webhook flows",
  "Roll out multilingual (i18n) experiences at scale",
  "Generate dynamic multilingual PDFs (iTextSharp)",
  "Lead legacy refactors that cut technical debt",
];

export const PROJECT_ICON: LucideIcon = Layers;
export const CPU_ICON: LucideIcon = Cpu;
