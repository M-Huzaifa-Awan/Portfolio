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
    linkedin: "https://www.linkedin.com/in/muhammadhuzaifaawan",
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
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  // `short` is used by the intro title card, where long labels break the
  // typographic rhythm; `label` stays for the hero itself.
  { value: "6+", label: "Years experience", short: "Years" },
  {
    value: "50+",
    label: "Enterprise production systems delivered",
    short: "Systems shipped",
  },
  { value: "20+", label: "Technologies used", short: "Technologies" },
  { value: "100%", label: "Job success", short: "Job success" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  /** Big attention-grabbing question shown as the slide headline. */
  hook: string;
  /** Short label for the selector tabs. */
  short: string;
  description: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Rocket,
    title: "Turn Your Idea Into a Product",
    hook: "Have a business idea that needs software?",
    short: "Your idea",
    description:
      "Have a business idea that needs software? I take it from a conversation to a launched product: sign-ups, payments, an admin area, everything your customers touch. You describe the business, I handle all the technology.",
    points: ["Idea to launch", "Payments built in", "Ready for real customers"],
  },
  {
    icon: Boxes,
    title: "Websites, Portals & Dashboards",
    hook: "Need a website your customers actually use?",
    short: "Websites",
    description:
      "A professional website for your business, a portal where your customers log in, or a dashboard where you see sales, bookings, and stock at a glance. Fast, clean, and it works just as well on a phone.",
    points: ["Business websites", "Customer portals", "Live dashboards"],
  },
  {
    icon: Sparkles,
    title: "Put AI to Work in Your Business",
    hook: "What if AI answered your customers for you?",
    short: "AI",
    description:
      "An assistant that answers customer questions, reads your documents and finds the answer, drafts replies, or summarizes what happened today. Built on the same AI behind ChatGPT and Claude, connected safely to your data.",
    points: ["Customer-facing assistants", "Answers from your files", "Draft & summarize"],
  },
  {
    icon: Workflow,
    title: "Automate the Repetitive Work",
    hook: "Still copy-pasting between spreadsheets?",
    short: "Automation",
    description:
      "If your team copies data between spreadsheets, emails, and other systems, I connect those tools so it happens automatically: bookings flow into your calendar, orders into invoices, numbers into a weekly report.",
    points: ["Connect your tools", "Automatic reports", "Fewer manual steps"],
  },
  {
    icon: Cloud,
    title: "Get Online & Stay Online",
    hook: "Ready to launch without the tech headaches?",
    short: "Hosting",
    description:
      "I put your product on the internet properly: secure hosting, your own domain, backups, and updates that don't break anything. When traffic grows, it keeps up, and I keep an eye on it after launch.",
    points: ["Secure hosting", "Backups & updates", "Grows with you"],
  },
  {
    icon: RefreshCw,
    title: "Rescue Slow or Broken Software",
    hook: "Is your current system slow, buggy, or old?",
    short: "Rescue",
    description:
      "Already have a website or system that's slow, buggy, or built years ago? I fix and modernize it without shutting your business down. I've cut 3-second page loads to under half a second and cleared 50+ long-standing bugs.",
    points: ["Speed it up", "Fix the bugs", "No downtime"],
  },
];

export type Project = {
  id: number;
  title: string;
  /** Temporarily exclude this project from the public projects gallery. */
  hidden?: boolean;
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
    id: 10,
    title: "Atlas",
    featured: true,
    headline: "Connect your inbox and calendar to any AI",
    description:
      "A SaaS product I designed, built, and launched. Atlas connects Microsoft Outlook email and calendar to any MCP-compatible AI assistant, so you can read, draft, and send mail or manage your schedule in plain English. It handles multiple work and personal accounts at once, finds open times, and books meetings across calendars with OAuth-secured, multi-tenant access.",
    image: "/projects/atlas/cover.png",
    stack: ["Next.js", "MCP", "Microsoft Graph", "OAuth 2.0", "TypeScript"],
    tags: ["SaaS", "AI", "MCP"],
    metrics: [
      { value: "2-way", label: "Email + calendar" },
      { value: "Multi", label: "Outlook accounts" },
    ],
    liveUrl: "https://atlas-web-rho-hazel.vercel.app/",
    color: "#2563eb",
  },
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
  /** True for roles still running ("Present"). Leading current roles are
   *  rendered as parallel branches in the experience timeline. */
  current?: boolean;
};

export const EXPERIENCE: Role[] = [
  {
    company: "Lotte Innovate",
    role: "Full Stack Developer (Subcontract)",
    product: "MCP Tooling, Real Estate & Data Platforms",
    period: "Mar 2026 - Present",
    location: "Remote · Los Angeles, CA",
    current: true,
    highlights: [
      "Built custom Model Context Protocol (MCP) servers that let AI assistants securely read and write across internal tools, enabling automated workflows across client systems.",
      "Delivered the Virginia MLS Solutions real estate platform: nine React pages backed by SQL Server covering listings, search, and detail views on live data, with a fast, responsive UI.",
      "Built the Network Change Scanner, a Windows desktop app that snapshots a live network and returns a clear go / no-go decision, flagging exactly what was added, removed, or modified since the last run.",
    ],
    stack: ["MCP", "Anthropic", "React", "SQL Server", ".NET", "C#", "WPF", "TypeScript"],
  },
  {
    company: "Independent Consultant",
    role: "Senior Full Stack Developer (Freelance & Consulting)",
    product: "Direct Clients & Upwork",
    period: "Feb 2020 - Present",
    location: "Remote",
    current: true,
    url: "https://www.upwork.com/freelancers/~01b2cac225f43ef332",
    highlights: [
      "Deliver production SaaS, CRM, dashboard, and AI-enabled applications for international B2B clients using ASP.NET Core, React, TypeScript, and PostgreSQL.",
      "Rebuilt a multi-tenant salon SaaS, cutting page loads from 3s to under 500ms while shipping five major features and resolving 200+ tickets.",
      "Completed 2,000+ billed hours across international engagements, including long-term client relationships that continued through direct contracts.",
    ],
    stack: ["ASP.NET Core", "React", "TypeScript", "PostgreSQL", "Redis", "Stripe", "FastAPI", "Python"],
  },
  {
    company: "LEO Innovate",
    role: "Senior Full Stack Developer",
    product: "SaaS Salon Management Platform",
    period: "Feb 2025 - Aug 2026",
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
    company: "DPS Model Town · Fabco Systems",
    role: "Full Stack Web Developer",
    product: "Internship · School Management Systems",
    period: "Jun 2024 - Sep 2024",
    location: "Lahore, Pakistan · On-site",
    highlights: [
      "Built full-stack features with C#, ASP.NET MVC, REST APIs, HTML, CSS, and Bootstrap.",
      "Designed and optimized MySQL stored procedures and queries for school management systems.",
    ],
    stack: ["C#", "ASP.NET MVC", "REST APIs", "Bootstrap", "MySQL"],
  },
  {
    company: "NUML",
    role: "Web Development Specialist",
    product: "Apprenticeship · University Systems",
    period: "Aug 2023 - Jun 2024",
    location: "Lahore, Pakistan · On-site",
    highlights: [
      "Designed and built the initial digital Attendance Management System for student and staff tracking.",
      "Developed frontend interfaces and backend logic in JavaScript and C# within the university's internal environment.",
    ],
    stack: ["JavaScript", "C#", "Internal Systems"],
  },
  {
    company: "DPS Model Town · Fabco Systems",
    role: "Database Programmer",
    product: "Internship · Database Systems",
    period: "May 2023 - Jul 2023",
    location: "Lahore, Pakistan · On-site",
    highlights: [
      "Designed normalized MySQL schemas supporting admissions, academics, payroll, and inventory.",
      "Wrote optimized SQL queries, stored procedures, and triggers with proper indexing and referential integrity.",
    ],
    stack: ["MySQL", "Stored Procedures", "Triggers", "Indexing"],
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
    endorsements: ["Committed to Quality", "Clear Communicator", "Detail Oriented"],
  },
];

// Honest reference note (no fabricated quote).
export const LEO_REFERENCE =
  "The CEO at LEO Innovate offered to write a personal letter of recommendation after the salon SaaS platform work. Reference available on request.";

/* ------------------------------ FAQ ------------------------------ */
/* Rendered in the FAQ section and emitted as FAQPage JSON-LD for
   featured snippets (AEO) and AI answer engines (GEO/AIO). */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Who is Muhammad Huzaifa Awan?",
    a: "Muhammad Huzaifa Awan is a Senior Full Stack Developer with years of experience architecting and shipping SaaS platforms, AI products, and payment infrastructure for US-based product teams. He previously worked with LEO Innovate on a multi-tenant salon SaaS platform, currently subcontracts for Lotte Innovate, freelances and consults directly with clients and on Upwork, and is the creator of Atlas, a SaaS product that connects Outlook email and calendar to MCP-compatible AI assistants.",
  },
  {
    q: "What services does Huzaifa Awan offer?",
    a: "End-to-end SaaS product development, custom MCP servers and AI agents, AI integration with the Claude and OpenAI APIs, high-performance APIs and real-time systems, cloud and DevOps on Azure, and legacy system modernization.",
  },
  {
    q: "What technologies does Huzaifa Awan work with?",
    a: "React, Next.js, TypeScript, .NET and ASP.NET Core, Node.js, SQL Server, PostgreSQL, Redis, WebSockets, Azure, and the Model Context Protocol (MCP), plus the Claude and OpenAI APIs for AI products.",
  },
  {
    q: "Is Huzaifa Awan available for hire?",
    a: "Yes. He is open to senior full stack roles and select remote contract roles with founders and agencies. The fastest way to reach him is email at mhuzaifaawan7@gmail.com or a message on LinkedIn, and he typically replies within a day.",
  },
  {
    q: "What is Atlas?",
    a: "Atlas is a SaaS product Huzaifa designed, built, and launched. It connects Microsoft Outlook email and calendar to any MCP-compatible AI assistant, so you can read and send mail, check your schedule, and book meetings in plain English across multiple work and personal accounts.",
  },
  {
    q: "Does Huzaifa Awan have verified client reviews?",
    a: "Yes. His Upwork profile carries verified 5-star client reviews praising reliability, clear communication, and attention to detail, and the CEO at LEO Innovate offered a personal letter of recommendation after the salon SaaS platform work.",
  },
];

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
