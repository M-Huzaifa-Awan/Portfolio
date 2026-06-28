import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiDocument, HiGlobe, HiPhotograph } from 'react-icons/hi';
import Lightbox from './Lightbox';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Apex Synchronia Intelligence',
    featured: true,
    headline: 'AI-powered intelligence platform',
    description:
      'AI-powered analytics platform for affiliate-driven businesses — portfolio overview, revenue trends, territories, configurable metrics and an admin panel. Integrates Claude and OpenAI APIs with structured outputs, prompt engineering and CSV ingestion.',
    image: '/projects/apex/cover.jpg',
    gallery: [
      { src: '/projects/apex/cover.jpg', caption: 'Portfolio overview — multi-client roll-up' },
      { src: '/projects/apex/overview.jpg', caption: 'Per-client overview with revenue trend' },
      { src: '/projects/apex/affiliates.jpg', caption: 'Affiliate performance & metrics table' },
      { src: '/projects/apex/territories.jpg', caption: 'Territories — geographic distribution' },
      { src: '/projects/apex/admin-panel.jpg', caption: 'Admin panel — user management & roles' },
    ],
    stack: ['Next.js', 'Claude API', 'OpenAI', 'Supabase', 'TypeScript'],
    tags: ['AI', 'Analytics', 'Real-time'],
    liveUrl: 'https://apex-seven-tau.vercel.app/intelligence',
    pdf: 'APEX INTELLIGENCE0.pdf',
    color: '#ef4444',
  },
  {
    id: 7,
    title: 'Studio OS',
    featured: true,
    headline: 'Custom MCP server · 80+ AI tools',
    description:
      'Solo-engineered AI integration platform that lets Claude and other AI assistants control a team\'s tools through a single secure interface. Exposes 80+ tools across ClickUp, Outlook (dual M365 tenants via Microsoft Graph), Apple Health and Oura. Built OAuth 2.0 device-code auth, migrated transport from SSE to Streamable HTTP, and shipped a Windows installer with AES-256-GCM credential encryption. Now in active client delivery.',
    image: '/projects/studio-os/cover.png',
    gallery: [
      { src: '/projects/studio-os/cover.png', caption: 'Architecture — Claude → MCP Server → ClickUp, Outlook, Apple Health, Oura' },
      { src: '/projects/studio-os/clickup-demo.png', caption: 'Live ClickUp workspace via Studio OS — 11 spaces, 592 open tasks surfaced by Claude' },
    ],
    stack: ['FastAPI', 'Python', 'Microsoft Graph', 'Neon PostgreSQL', 'Fly.io'],
    tags: ['AI', 'MCP', 'API'],
    color: '#a855f7',
  },
  {
    id: 2,
    title: 'LEO Multilingual Salon Builder',
    description:
      'Real-time multi-tenant website builder powering salon storefronts across the LEO Innovate SaaS platform. WebSocket-driven live preview pushes client-side updates without page refreshes; supports six themes, custom typography, and full English/Spanish i18n.',
    image: '/projects/builder/cover.jpg',
    gallery: [
      { src: '/projects/builder/cover.jpg', caption: 'Builder shell with theme controls (Luxury / English)' },
      { src: '/projects/builder/live-content.jpg', caption: 'Live preview rendering services & products' },
      { src: '/projects/builder/themes.jpg', caption: 'Theme variants — Minimal & Vibrant' },
      { src: '/projects/builder/theme-nature.jpg', caption: 'Nature theme preview' },
      { src: '/projects/builder/spanish.jpg', caption: 'Same site rendered in Spanish (i18n)' },
    ],
    stack: ['ASP.NET Core', 'React', 'WebSockets', 'i18n', 'Multi-tenant SaaS'],
    tags: ['SaaS', 'Real-time', 'i18n'],
    liveUrl: 'https://uat-portal.goleo.app',
    pdf: 'Multilingual Website Builder.pdf',
    color: '#6366f1',
  },
  {
    id: 3,
    title: 'LEO Salon Analytics Dashboard',
    description:
      'Bilingual operations dashboard for salon owners — live queue, walk-in traffic, expected earnings, low-stock alerts and reviews. Backed by Redis caching that achieved a 95% hit rate and sub-50ms responses under 100+ concurrent users.',
    image: '/projects/dashboard/cover.jpg',
    gallery: [
      { src: '/projects/dashboard/cover.jpg', caption: 'Desktop dashboard (English) — KPIs, queue, charts' },
      { src: '/projects/dashboard/spanish.jpg', caption: 'Same dashboard in Spanish' },
      { src: '/projects/dashboard/mobile-en.jpg', caption: 'Mobile dashboard (English)' },
      { src: '/projects/dashboard/mobile-es.jpg', caption: 'Mobile dashboard (Spanish)' },
    ],
    stack: ['React', '.NET 8', 'SQL Server', 'Redis', 'Recharts'],
    tags: ['Dashboard', 'Analytics', 'Performance'],
    pdf: 'Multilingual Dashboard.pdf',
    color: '#a855f7',
  },
  {
    id: 4,
    title: 'LEO Innovate Onboarding Portal',
    description:
      'End-to-end bilingual onboarding wizard — owner info, plan selection, add-ons, business details, branch setup, services, teams, migration and Stripe payment. Firebase OTP verification, save-and-resume across sessions, and dynamic PDF service-agreement generation.',
    image: '/projects/onboard/cover.jpg',
    gallery: [
      { src: '/projects/onboard/cover.jpg', caption: 'Welcome — owner details (English)' },
      { src: '/projects/onboard/plans.jpg', caption: 'Plan selection — Spark / Hero / Legend / Beyond' },
      { src: '/projects/onboard/otp.jpg', caption: 'Firebase OTP verification' },
      { src: '/projects/onboard/business.jpg', caption: 'Business details & social handles' },
      { src: '/projects/onboard/resume.jpg', caption: 'Save-and-resume across sessions' },
    ],
    stack: ['React', 'ASP.NET Core', 'Firebase OTP', 'Stripe', 'iTextSharp'],
    tags: ['Onboarding', 'Stripe', 'OTP'],
    liveUrl: 'https://uat-portal.goleo.app',
    pdf: 'Onboarding.pdf',
    color: '#3b82f6',
  },
  {
    id: 5,
    title: 'LEO Self-Service Kiosk',
    description:
      'Touch-optimized check-in kiosk for in-salon walk-ins — phone-number lookup with Firebase OTP verification, guest count, walk-in vs reserved flow, service browser and stylist selection. Pairs with a TV queue display.',
    image: '/projects/kiosk/cover.jpg',
    orientation: 'portrait',
    gallery: [
      { src: '/projects/kiosk/cover.jpg', caption: 'Phone-number entry (touch numpad)' },
      { src: '/projects/kiosk/guests.jpg', caption: 'Guest count + service intent' },
      { src: '/projects/kiosk/options.jpg', caption: 'Walk-in options — first available or pick stylist' },
      { src: '/projects/kiosk/services.jpg', caption: 'Service browser with pricing' },
      { src: '/projects/kiosk/barber.jpg', caption: 'Stylist selection grid' },
    ],
    stack: ['React', 'PWA', 'Firebase OTP', 'WebSockets'],
    tags: ['Kiosk', 'PWA', 'Touch'],
    pdf: 'kiosk.pdf',
    color: '#f59e0b',
  },
  {
    id: 6,
    title: 'Affiliate Management System',
    description:
      'Direct-selling platform with tiered bundles, rank progression (Consultant → Director), referral tracking and member dashboards. Stripe subscriptions, one-time payments and webhook handling on a Next.js + Supabase PostgreSQL stack.',
    image: '/projects/affiliate/cover.jpg',
    orientation: 'portrait',
    gallery: [
      { src: '/projects/affiliate/cover.jpg', caption: 'Landing — bundles, ranks, why-choose' },
      { src: '/projects/affiliate/plans.jpg', caption: 'Business plans & rank requirements' },
      { src: '/projects/affiliate/products.jpg', caption: 'Product catalog' },
      { src: '/projects/affiliate/signup.jpg', caption: 'Signup flow with bundle selection' },
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'Tailwind'],
    tags: ['Affiliate', 'Stripe', 'Dashboard'],
    liveUrl: 'https://affiliate-system-omega.vercel.app',
    pdf: 'Affiliate System.pdf',
    color: '#10b981',
  },
];

const allFilters = ['All', 'AI', 'MCP', 'SaaS', 'Stripe', 'i18n', 'Real-time', 'Dashboard', 'PWA'];

const matchesFilter = (project, filter) => {
  if (filter === 'All') return true;
  const haystack = [...(project.tags || []), ...(project.stack || [])].map((s) => s.toLowerCase());
  const needle = filter.toLowerCase();
  return haystack.some((s) => s.includes(needle));
};

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');

  const visibleProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p, filter)),
    [filter]
  );

  const openLightbox = useCallback((project, idx = 0) => {
    setActiveProject(project);
    setActiveIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => setActiveProject(null), []);

  const prev = useCallback(() => {
    if (!activeProject) return;
    setActiveIndex((i) => (i - 1 + activeProject.gallery.length) % activeProject.gallery.length);
  }, [activeProject]);

  const next = useCallback(() => {
    if (!activeProject) return;
    setActiveIndex((i) => (i + 1) % activeProject.gallery.length);
  }, [activeProject]);

  const jump = useCallback((i) => setActiveIndex(i), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-number">03.</span>
            My Projects
          </h2>
          <p className="section-subtitle">
            Production work shipped to real users — SaaS, AI, and payments
          </p>
        </motion.div>

        <div className="project-filters" role="tablist" aria-label="Filter projects by tag">
          {allFilters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`project-filter ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          className="projects-grid"
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              className={`project-card ${project.featured ? 'is-featured' : ''} ${
                project.orientation === 'portrait' ? 'is-portrait-card' : ''
              }`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              style={{ '--project-color': project.color }}
            >
              {project.featured && (
                <span className="project-featured-badge" aria-label="Featured project">
                  ★ Featured Build
                </span>
              )}

              <button
                type="button"
                className={`project-image ${
                  project.orientation === 'portrait' ? 'is-portrait' : ''
                }`}
                onClick={() => openLightbox(project, 0)}
                aria-label={`View ${project.gallery.length} screenshots of ${project.title}`}
              >
                <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                <div className="project-image-fade" />
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-image-cta">
                  <HiPhotograph />
                  <span>{project.gallery.length} screenshots</span>
                </span>
              </button>

              <div className="project-body">
                {project.headline && (
                  <p className="project-headline">{project.headline}</p>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiGlobe className="link-icon" />
                      <span>Visit Live Site</span>
                      <HiExternalLink className="link-icon" />
                    </motion.a>
                  )}
                  {project.pdf && (
                    <motion.a
                      href={`/${project.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-secondary"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiDocument className="link-icon" />
                      <span>View Case Study (PDF)</span>
                      <HiExternalLink className="link-icon" />
                    </motion.a>
                  )}
                </div>
              </div>

              <motion.div
                className="project-glow"
                animate={{
                  opacity: hoveredProject === project.id ? 0.3 : 0,
                  scale: hoveredProject === project.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <p className="projects-empty">
            No projects match <strong>{filter}</strong> — try another tag.
          </p>
        )}
      </div>

      <Lightbox
        project={activeProject}
        index={activeIndex}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
        onJump={jump}
      />
    </section>
  );
};

export default Projects;
