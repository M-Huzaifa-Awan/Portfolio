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
    slug: "connect-ai-to-outlook-calendar-mcp",
    title: "Connect Any AI Assistant to Your Outlook Inbox and Calendar with MCP",
    description:
      "How I built Atlas, an MCP server that lets any compatible AI assistant read, draft, and send Outlook email and manage calendars across multiple accounts. Architecture, Microsoft Graph auth, and the safety rules that make an AI you can trust with your inbox.",
    excerpt:
      "What it takes to let any MCP-compatible AI assistant safely read, draft, and send email and book meetings through Outlook.",
    date: "2026-07-15",
    readTime: "7 min read",
    tags: ["AI", "MCP", "Product"],
    keywords: [
      "AI Outlook integration",
      "connect AI to email",
      "MCP server Outlook",
      "AI calendar integration",
      "Microsoft Graph MCP",
      "AI email assistant",
      "Model Context Protocol",
    ],
    body: [
      {
        type: "p",
        text: "Email and calendar are where knowledge workers actually live, yet most AI assistants can only talk about them in the abstract. I wanted an AI assistant to check my schedule, find a free slot, draft the reply, and book the meeting, all in one conversation. So I built [Atlas](https://atlas-web-bice-pi.vercel.app/), a SaaS product that connects Microsoft Outlook email and calendar to any **MCP-compatible AI assistant**. This is how it works and what I learned shipping it.",
      },
      { type: "h2", text: "Why MCP instead of a chatbot wrapper" },
      {
        type: "p",
        text: "The obvious approach is a custom chat app that calls an LLM and sprinkles in some API calls. The problem: you inherit all the product work of a chat interface and none of the ecosystem. MCP flips that. You expose **tools** (read_inbox, send_mail, find_free_slots, create_event) from a small server, and the connected AI assistant decides when to call them inside the conversation the user already has open. Atlas applies the protocol to the highest-stakes data most people have: their inbox.",
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
          "**Account layer**: multi-tenancy from day one, because real people have a work account and a personal account. Every tool accepts a tenant label so the AI assistant can read both calendars without mixing up accounts.",
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
        text: "The workflow change is bigger than I expected. Instead of tabbing to Outlook, you stay in the conversation: \"what does my morning look like, reply to Sarah that Thursday works, and book 45 minutes with the design team next week.\" Your AI assistant checks both calendars, drafts the reply for approval, finds the slot, and creates the event. Each step is a tool call you can see. It reads less like automation and more like handing your inbox to a careful assistant.",
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
        text: "Atlas is live with a free trial at [atlas-web-bice-pi.vercel.app](https://atlas-web-bice-pi.vercel.app/). And if you want an MCP server built for your own product or internal tools, that is exactly the kind of work I take on: [get in touch](/#contact).",
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
