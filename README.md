# Muhammad Huzaifa Awan — Portfolio

A premium personal portfolio built from scratch with **Next.js 15 (App Router)**,
**TypeScript**, **Tailwind CSS**, **Framer Motion** and **Lucide** icons.
Dark-mode-only, cinematic, fully responsive, and production-ready.

Live: [huzaifaawan.com](https://huzaifaawan.com)

## Stack

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 3 (custom design tokens)
- Framer Motion (parallax, reveals, magnetic buttons, carousels)
- Lucide React icons
- Google Fonts: Space Grotesk (headings) + Inter (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact-form delivery via [web3forms.com](https://web3forms.com) (free). Without it the form falls back to opening the visitor's mail client. |
| `NEXT_PUBLIC_GITHUB_USER` | GitHub username for the live "GitHub Activity" section (defaults to `M-Huzaifa-Awan`). |

## Structure

```
app/
  layout.tsx        # fonts, SEO metadata, <html> shell
  page.tsx          # assembles all sections
  globals.css       # Tailwind + design tokens, noise, utilities
components/
  Hero, About, Services, Projects, TechStack, Experience,
  Testimonials, GitHubActivity, Contact, Footer, Navbar
  Background, CursorGlow, ScrollProgress
  ui/  Section, SectionHeading, Reveal, SpotlightCard, MagneticButton
lib/
  data.ts           # ALL content lives here: projects, experience, services...
  utils.ts
public/              # portrait (cover.png), project screenshots, PDFs, CV
```

**Editing content:** everything is data-driven from [`lib/data.ts`](lib/data.ts).

## Deploy

Deploy to **Vercel** (zero-config): import this repository, add the environment
variables above, and point the `huzaifaawan.com` domain at the project.
