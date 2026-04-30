import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiDocument, HiGlobe } from 'react-icons/hi';
import './Projects.css';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'LEO Multilingual Salon Builder',
      description:
        'Real-time multi-tenant website builder powering salon storefronts across the LEO Innovate SaaS platform. WebSocket-driven live preview pushes client-side updates without page refreshes; supports six themes, custom typography, and full English/Spanish i18n with proper URL routing.',
      image: '/projects/builder/cover.jpg',
      stack: ['ASP.NET Core', 'React', 'WebSockets', 'i18n', 'Multi-tenant SaaS'],
      tags: ['SaaS', 'Real-time', 'i18n'],
      liveUrl: 'https://uat-portal.goleo.app',
      pdf: 'Multilingual Website Builder.pdf',
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'LEO Salon Analytics Dashboard',
      description:
        'Bilingual operations dashboard for salon owners — live queue, walk-in traffic, expected earnings, low-stock alerts and reviews. Backed by Redis caching that achieved a 95% hit rate and sub-50ms responses under 100+ concurrent users.',
      image: '/projects/dashboard/cover.jpg',
      stack: ['React', '.NET 8', 'SQL Server', 'Redis', 'Recharts'],
      tags: ['Dashboard', 'Analytics', 'Performance'],
      pdf: 'Multilingual Dashboard.pdf',
      color: '#a855f7',
    },
    {
      id: 3,
      title: 'LEO Innovate Onboarding Portal',
      description:
        'End-to-end bilingual onboarding wizard — owner info, plan selection, add-ons, business details, branch setup, services, teams, migration and Stripe payment. Firebase OTP verification, save-and-resume across sessions, and dynamic PDF service-agreement generation.',
      image: '/projects/onboard/cover.jpg',
      stack: ['React', 'ASP.NET Core', 'Firebase OTP', 'Stripe', 'iTextSharp'],
      tags: ['Onboarding', 'Stripe', 'OTP'],
      liveUrl: 'https://uat-portal.goleo.app',
      pdf: 'Onboarding.pdf',
      color: '#3b82f6',
    },
    {
      id: 4,
      title: 'LEO Self-Service Kiosk',
      description:
        'Touch-optimized check-in kiosk for in-salon walk-ins — phone-number lookup with Firebase OTP verification, guest count, walk-in vs reserved flow, service browser and stylist selection. Pairs with a TV queue display for in-store hospitality.',
      image: '/projects/kiosk/cover.jpg',
      orientation: 'portrait',
      stack: ['React', 'PWA', 'Firebase OTP', 'WebSockets'],
      tags: ['Kiosk', 'PWA', 'Touch'],
      pdf: 'kiosk.pdf',
      color: '#f59e0b',
    },
    {
      id: 5,
      title: 'Apex Synchronia Intelligence',
      description:
        'AI-powered analytics platform for affiliate-driven businesses — portfolio overview, revenue trends, territories, configurable metrics and an admin panel. Integrates Claude and OpenAI APIs with structured outputs, prompt engineering and CSV ingestion.',
      image: '/projects/apex/cover.jpg',
      stack: ['Next.js', 'Claude API', 'OpenAI', 'Supabase', 'TypeScript'],
      tags: ['AI', 'Analytics', 'Real-time'],
      liveUrl: 'https://apex-seven-tau.vercel.app/intelligence',
      pdf: 'APEX INTELLIGENCE0.pdf',
      color: '#ef4444',
    },
    {
      id: 6,
      title: 'Affiliate Management System',
      description:
        'Direct-selling platform with tiered bundles, rank progression (Consultant → Director), referral tracking and member dashboards. Stripe subscriptions, one-time payments and webhook handling on a Next.js + Supabase PostgreSQL stack.',
      image: '/projects/affiliate/cover.jpg',
      orientation: 'portrait',
      stack: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'Tailwind'],
      tags: ['Affiliate', 'Stripe', 'Dashboard'],
      liveUrl: 'https://affiliate-system-omega.vercel.app',
      pdf: 'Affiliate System.pdf',
      color: '#10b981',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
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

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={cardVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              style={{ '--project-color': project.color }}
            >
              <div
                className={`project-image ${
                  project.orientation === 'portrait' ? 'is-portrait' : ''
                }`}
              >
                <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                <div className="project-image-fade" />
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="project-body">
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
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
