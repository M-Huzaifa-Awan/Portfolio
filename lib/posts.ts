export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  tags: string[];
  keywords: string[];
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "connect-claude-to-outlook-calendar-mcp",
    title: "Connecting Claude to Your Outlook Inbox and Calendar with MCP",
    description:
      "How I built Atlas, an MCP server that lets Claude read, draft, and send Outlook email and manage calendars across multiple accounts. Architecture, Microsoft Graph auth, and the safety rules that make an AI you can trust with your inbox.",
    excerpt:
      "What it takes to let an AI assistant safely read, draft, and send email and book meetings: the architecture behind Atlas, my Outlook MCP server for Claude.",
    date: "2026-07-15",
    readTime: "7 min read",
    tags: ["AI", "MCP", "Product"],
    keywords: [
      "Claude Outlook integration",
      "connect Claude to email",
      "MCP server Outlook",
      "Claude calendar integration",
      "Microsoft Graph MCP",
      "AI email assistant",
      "Model Context Protocol",
    ],
    body: [
      {
        type: "p",
        text: "Email and calendar are where knowledge workers actually live, yet most AI assistants can only talk about them in the abstract. I wanted Claude to check my schedule, find a free slot, draft the reply, and book the meeting, all in one conversation. So I built [Atlas](https://atlas-web-rho-hazel.vercel.app/), a SaaS product that connects Microsoft Outlook email and calendar directly to Claude through a **Model Context Protocol (MCP)** server. This is how it works and what I learned shipping it.",
      },
      { type: "h2", text: "Why MCP instead of a chatbot wrapper" },
      {
        type: "p",
        text: "The obvious approach is a custom chat app that calls an LLM and sprinkles in some API calls. The problem: you inherit all the product work of a chat interface and none of the ecosystem. MCP flips that. You expose **tools** (read_inbox, send_mail, find_free_slots, create_event) from a small server, and Claude decides when to call them inside the conversation the user already has open. I covered the fundamentals in my [Studio OS writeup](/blog/building-an-mcp-server-for-claude); Atlas applies the same protocol to the highest-stakes data most people have: their inbox.",
      },
      { type: "h2", text: "The architecture" },
      {
        type: "p",
        text: "Atlas is a remote MCP server that talks to **Microsoft Graph**, the API surface behind Outlook, on the user's behalf. Three layers do the work:",
      },
      {
        type: "ul",
        items: [
          "**Tools layer**: typed tools for mail (list, search, read, draft, reply, send) and calendar (list events, check availability, suggest times, create, update, respond to invites).",
          "**Auth layer**: OAuth 2.0 against Microsoft Entra. Each user grants scoped permissions; Atlas never sees a password, and tokens are stored encrypted and refreshed server-side.",
          "**Account layer**: multi-tenancy from day one, because real people have a work account and a personal account. Every tool accepts a tenant label so Claude can read both calendars and never cross the streams.",
        ],
      },
      { type: "h2", text: "Multiple accounts is a feature, not an edge case" },
      {
        type: "p",
        text: "The single most requested behavior turned out to be the boring one: **look at both my calendars at once**. Scheduling across a work and a personal account is a genuinely hard human problem and a trivial machine problem, as long as your data model treats accounts as first class. In Atlas, reads default to querying every connected account and labeling the results, while writes always name their target account explicitly. That asymmetry matches how people think: aggregate my view, but never guess where to send from.",
      },
      { type: "h2", text: "Designing for trust: the send problem" },
      {
        type: "p",
        text: "Letting an AI read email is a privacy question. Letting it **send** email is a reputation question, and reputation does not get a second chance. Atlas enforces safety at the server, not in the prompt:",
      },
      {
        type: "ul",
        items: [
          "Sending requires explicit confirmation of recipients, subject, and body. The server rejects a send the user has not seen.",
          "A draft-first path creates a real Outlook draft the user can edit and send themselves, which is the default for anything sensitive.",
          "Every write operation is logged with what was changed, when, and on which account.",
          "Scopes are minimal: a user who only connects the calendar never grants mail access at all.",
        ],
      },
      {
        type: "quote",
        text: "Prompt instructions are suggestions. Server-side rules are guarantees. Anything that can embarrass a user must be a guarantee.",
      },
      { type: "h2", text: "What using it actually feels like" },
      {
        type: "p",
        text: "The workflow change is bigger than I expected. Instead of tabbing to Outlook, you stay in the conversation: \"what does my morning look like, reply to Sarah that Thursday works, and book 45 minutes with the design team next week.\" Claude checks both calendars, drafts the reply for approval, finds the slot, and creates the event. Each step is a tool call you can see. It reads less like automation and more like handing your inbox to a careful assistant.",
      },
      { type: "h2", text: "Lessons that transfer to any MCP project" },
      {
        type: "ul",
        items: [
          "Design tool outputs for the model, not for humans. Clean, labeled, predictable structures beat pretty formatting.",
          "Make destructive and outward-facing actions confirm-by-default at the server.",
          "Multi-account support is much cheaper to build on day one than to retrofit.",
          "OAuth device flows and token refresh are most of the real engineering. The AI part is the easy 20%.",
        ],
      },
      {
        type: "p",
        text: "Atlas is live with a free trial at [atlas-web-rho-hazel.vercel.app](https://atlas-web-rho-hazel.vercel.app/). And if you want an MCP server built for your own product or internal tools, that is exactly the kind of work I take on: [get in touch](/#contact).",
      },
    ],
  },
  {
    slug: "building-an-mcp-server-for-claude",
    title: "How I Built an MCP Server Exposing 60+ Tools to Claude",
    description:
      "A practical breakdown of architecting a production Model Context Protocol (MCP) server that gives Claude secure read and write access to 60+ real business tools: auth, transport, security, and the lessons that mattered.",
    excerpt:
      "Architecting a production MCP server that gives Claude secure access to 60+ real tools: the auth, transport, and security decisions that actually mattered.",
    date: "2026-06-15",
    readTime: "8 min read",
    tags: ["AI", "MCP", "Architecture"],
    keywords: [
      "MCP server",
      "Model Context Protocol",
      "Claude MCP",
      "MCP developer",
      "AI agent tools",
      "build an MCP server",
    ],
    body: [
      {
        type: "p",
        text: "Most teams talk to Claude through a chat box. The interesting work starts when you let Claude actually **do** things through your own systems: read a project board, check a calendar, pull a metric. That is what the **Model Context Protocol (MCP)** enables, and it is where I have spent a lot of my recent engineering time. I built and shipped a production MCP server, **Studio OS**, that exposes 60+ tools to Claude across project management, email, and health data. Here is how it is put together and what I learned.",
      },
      { type: "h2", text: "What an MCP server actually is" },
      {
        type: "p",
        text: "An MCP server is a small, well-defined service that advertises a set of **tools** (functions Claude can call) and **resources** (data Claude can read). Claude decides when to call a tool; your server executes it against real systems and returns structured results. The protocol handles the handshake, the tool schemas, and the transport, so you can focus on the tools.",
      },
      {
        type: "p",
        text: "The mental model that helped me most: an MCP server is an **API designed for an LLM to consume**, not a human. That reframes everything: naming, error messages, and payload shape all get optimized for a model that reads them literally.",
      },
      { type: "h2", text: "The architecture" },
      {
        type: "p",
        text: "Studio OS is a **FastAPI + Python** server that aggregates several external systems behind one secure interface. A single codebase ships two transports: a local **stdio** build (packaged as a Windows `.exe` with PyInstaller) and a remote **Streamable HTTP** deployment on Fly.io. State lives in Neon Postgres, with a nightly, idempotent GitHub Actions job ingesting data and a full write-audit log for anything Claude changes.",
      },
      {
        type: "ul",
        items: [
          "**Tools layer**: 60+ typed tools across ClickUp, Microsoft Outlook (dual M365 tenants via Microsoft Graph), Apple Health, and Oura.",
          "**Auth layer**: OAuth 2.0 device-code flow, multi-tenant, so one server can act on behalf of different accounts.",
          "**Transport layer**: stdio for local desktop use, Streamable HTTP for the hosted deployment, from the same core.",
          "**Persistence**: Neon Postgres with nightly idempotent ingest and audit logging.",
        ],
      },
      { type: "h2", text: "Auth was the hard part" },
      {
        type: "p",
        text: "Exposing write access to real systems means auth cannot be an afterthought. I used the **OAuth 2.0 device-code flow** so users authorize once, per tenant, without pasting secrets into config files. Credentials are encrypted at rest with **AES-256-GCM**, and every write Claude performs is logged with enough context to answer 'who changed what, when, and why' after the fact.",
      },
      { type: "h2", text: "Migrating transport without breaking clients" },
      {
        type: "p",
        text: "The MCP spec evolved from Server-Sent Events toward **Streamable HTTP**. Migrating a live server is exactly the kind of change that looks trivial and then eats a week. Keeping the tool layer transport-agnostic, so tools never knew which transport invoked them, is what made the migration a swap at the edges rather than a rewrite.",
      },
      { type: "h2", text: "Lessons if you are building your own" },
      {
        type: "ol",
        items: [
          "Design tools for the model. Clear names, tight schemas, and human-readable errors dramatically improve how reliably Claude uses them.",
          "Treat writes as dangerous. Confirmations, scoping, and audit logs turn 'the AI touched production' from a risk into a feature.",
          "Keep transport at the edges. A clean core means new transports are integrations, not rewrites.",
          "Ship it as a real product. A one-click installer and sane defaults are the difference between a demo and something a team actually uses daily.",
        ],
      },
      {
        type: "quote",
        text: "The value of an MCP server is not the AI. It is the boring, careful engineering around auth, transport, and safety that makes trusting the AI reasonable.",
      },
      {
        type: "p",
        text: "If you are building AI features and want tools Claude can safely use against your real systems, this is exactly the kind of work I do. Have a look at my [projects](/#projects) or [get in touch](/#contact).",
      },
    ],
  },
  {
    slug: "95-percent-redis-cache-hit-rate",
    title: "How I Hit a 95% Redis Cache Hit Rate Under Real Load",
    description:
      "The profiling, cache-key design, and invalidation strategy that took a .NET SaaS API to sub-50ms responses and a 95% Redis cache hit rate under 100+ concurrent users.",
    excerpt:
      "Profiling, cache-key design, and invalidation: the concrete steps that took a .NET SaaS API to sub-50ms responses and a 95% cache hit rate under load.",
    date: "2026-05-20",
    readTime: "7 min read",
    tags: ["Performance", ".NET", "Redis"],
    keywords: [
      "Redis caching",
      ".NET performance",
      "cache hit rate",
      "SQL Server optimization",
      "sub-50ms API",
      "scalable web application",
    ],
    body: [
      {
        type: "p",
        text: "On a multi-tenant SaaS dashboard I work on, response times climbed as concurrency grew. The fix was not a bigger server. It was a **Redis caching strategy** layered onto a .NET Core API. The result: a **95% cache hit rate** and **sub-50ms responses** under 100+ concurrent users. Here is the actual process, not the highlight reel.",
      },
      { type: "h2", text: "Measure before you cache" },
      {
        type: "p",
        text: "Caching the wrong thing hides problems and creates new ones. I started by profiling the API under realistic load to find the true hotspots: the endpoints that were both **frequently hit** and **expensive** to compute. Almost all the pain came from a handful of dashboard reads that ran heavy SQL Server aggregations on every request.",
      },
      {
        type: "ul",
        items: [
          "Frequent + expensive = cache it.",
          "Frequent + cheap = probably leave it.",
          "Rare + expensive = optimize the query, do not cache.",
        ],
      },
      { type: "h2", text: "Cache-key design is the whole game" },
      {
        type: "p",
        text: "A cache is only as good as its keys. For a multi-tenant app, every key has to be **scoped to the tenant** and to the exact parameters that change the result: date range, filters, locale. Get this wrong and you either leak data across tenants or get a hit rate near zero because no two keys ever match.",
      },
      {
        type: "code",
        lang: "text",
        code: "dashboard:{tenantId}:kpis:{from}:{to}:{locale}\ndashboard:{tenantId}:queue:live\ncatalog:{tenantId}:lowstock",
      },
      {
        type: "p",
        text: "Flat, predictable, and self-documenting. When a key names exactly what it holds, invalidation becomes obvious instead of guesswork.",
      },
      { type: "h2", text: "Invalidation without the footguns" },
      {
        type: "p",
        text: "The famous hard problem. I leaned on two techniques: **short, tuned TTLs** for data that is allowed to be a few seconds stale (KPI roll-ups), and **event-driven invalidation** for data that must be fresh: when a write happens, the specific keys it affects are evicted immediately. Mixing the two keeps the hit rate high without ever showing a user stale-but-important data.",
      },
      { type: "h2", text: "Verify the hit rate is real" },
      {
        type: "p",
        text: "A 95% hit rate only means something if you measure it under production-like concurrency, not a single-user test. I tracked hits, misses, and p95 latency while ramping concurrent users, and watched the cache warm and hold. That is also how you catch a key that looks cached but never actually matches.",
      },
      { type: "h2", text: "The takeaways" },
      {
        type: "ol",
        items: [
          "Profile first. Cache the endpoints that are frequent and expensive, nothing else.",
          "Scope keys to the tenant and every parameter that changes the result.",
          "Combine tuned TTLs with event-driven eviction so fresh data stays fresh.",
          "Prove the hit rate under real concurrency, not on your laptop.",
        ],
      },
      {
        type: "p",
        text: "Performance work like this, turning a slow app that scales poorly into a fast one, is a big part of what I do. See more of my [work](/#projects) or [reach out](/#contact) if your app is starting to feel the load.",
      },
    ],
  },
  {
    slug: "hiring-a-senior-full-stack-developer",
    title: "Hiring a Senior Full-Stack Developer: What Actually Matters",
    description:
      "Beyond the tech stack: the real signals that separate a senior full-stack developer from a mid-level one: ownership, communication, shipping to production, and judgment.",
    excerpt:
      "Beyond the stack: the real signals that separate a senior full-stack developer from a mid-level one, and how to evaluate them before you hire.",
    date: "2026-04-28",
    readTime: "6 min read",
    tags: ["Hiring", "Career"],
    keywords: [
      "hire full stack developer",
      "hire a senior developer",
      "senior full stack developer",
      "hire Next.js developer",
      "hire .NET developer",
      "software consultant",
    ],
    body: [
      {
        type: "p",
        text: "If you are hiring a **senior full-stack developer**, the resume tells you the stack: React, Next.js, .NET, whatever. It tells you almost nothing about whether they will actually move your product forward. After a few years shipping production systems with US-based teams, here is what I have learned actually separates a senior from a capable mid-level engineer.",
      },
      { type: "h2", text: "1. They own problems end-to-end" },
      {
        type: "p",
        text: "A mid-level developer completes tickets. A senior developer takes a fuzzy problem, like 'the dashboard feels slow', and owns it from database design and API architecture through frontend performance and production monitoring. They do not hand you back a list of reasons it is someone else's job. Ask a candidate about a time they owned something ambiguous end-to-end; the answer is revealing.",
      },
      { type: "h2", text: "2. They communicate like an adult" },
      {
        type: "p",
        text: "Remote, cross-timezone work lives and dies on communication. The best engineers I have worked with write clearly, flag risks early, and document decisions as they go so the next person is not spelunking. In an interview, watch how they explain a past technical decision. Can they make it simple? Do they acknowledge the trade-offs?",
      },
      { type: "h2", text: "3. They ship to real users" },
      {
        type: "p",
        text: "There is a large gap between 'it works on my machine' and 'it works for 100+ concurrent users at sub-50ms.' Seniors think about load, caching, error states, i18n, payments, and the boring production realities. Ask what broke in production on their last project and how they found it. Everyone has a story; the useful signal is how they tell it.",
      },
      { type: "h2", text: "4. They have judgment about tools" },
      {
        type: "p",
        text: "Reaching for the newest framework is easy. Knowing when **not** to is judgment: when to use WebSockets for live preview, when a simple cron job beats a queue, when to build vs. integrate. That judgment is what you are paying senior rates for, and it is what saves you from a rewrite in eighteen months.",
      },
      { type: "h2", text: "5. They use AI as leverage, carefully" },
      {
        type: "p",
        text: "The strongest engineers right now use AI to move faster **and** know exactly where it must not be trusted. Building AI into a product safely, with structured outputs, guardrails, and auditability, is a genuine skill, not a prompt. If a candidate can talk concretely about shipping AI features responsibly, that is a strong modern signal.",
      },
      { type: "h2", text: "How to evaluate for this" },
      {
        type: "ul",
        items: [
          "Ask about a problem they owned end-to-end, not a feature they built.",
          "Ask what broke in production and how they diagnosed it.",
          "Ask about a decision they would make differently now; self-awareness is seniority.",
          "Give a small, real, paid trial task. Nothing predicts working together like working together.",
        ],
      },
      {
        type: "quote",
        text: "Hire for ownership, communication, and judgment. The stack can be learned in weeks; those take years.",
      },
      {
        type: "p",
        text: "If you are looking for a senior full-stack developer with end-to-end ownership, clear communication, and a track record of shipping to production, that is exactly what I offer. Take a look at my [work](/#projects) and [experience](/#experience), or [book a call](/#contact).",
      },
    ],
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
