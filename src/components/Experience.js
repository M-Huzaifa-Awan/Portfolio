import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import './Experience.css';

const Experience = () => {
  const roles = [
    {
      company: 'LEO Innovate',
      role: 'Senior Full Stack Developer',
      product: 'SaaS Salon Management Platform',
      period: 'Jun 2024 – Present',
      location: 'Remote · Florida, USA',
      highlights: [
        'Architected a real-time website builder with WebSocket-powered live preview on ASP.NET Core + React across a multi-tenant SaaS environment.',
        'Tuned SQL Server queries and introduced a Redis caching strategy — 95% cache hit rate and sub-50ms response times under 100+ concurrent users.',
        'Built the analytics dashboard, TV queue display and self-service kiosk check-in flow with Firebase OTP mobile verification.',
        'Led the multilingual (English/Spanish) rollout with proper URL structure, routing and redirects.',
        'Drove a 5,000+ line C# refactor that cut technical debt by ~30% and accelerated feature delivery.',
        'Reduced production incidents by 40% via testing frameworks and structured issue documentation.',
      ],
      stack: ['ASP.NET Core', 'React', '.NET 8', 'SQL Server', 'Redis', 'WebSockets', 'iTextSharp', 'Azure DevOps'],
    },
    {
      company: 'FABCO Inc. / Divisional Public School',
      role: 'Full Stack Developer',
      product: 'Legacy Migration & Platform Build-out',
      period: 'May 2023 – Sep 2024',
      location: 'Lahore, Pakistan',
      highlights: [
        'Led the migration of a legacy monolithic application to a modern full-stack architecture on .NET + JavaScript — now serving 200+ daily active users.',
        'Optimized the MySQL layer: page loads dropped from 3s to under 500ms via query restructuring and indexing.',
        'Resolved 50+ legacy code defects, improving system reliability by ~40%.',
        'Designed and built RESTful APIs and responsive frontend interfaces from scratch to support the migrated platform.',
      ],
      stack: ['.NET', 'JavaScript', 'MySQL', 'REST APIs', 'jQuery', 'Bootstrap'],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
    }),
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-number">02.</span>
            Experience
          </h2>
          <p className="section-subtitle">
            3+ years shipping production systems with US-based product teams
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />

          {roles.map((role, i) => (
            <motion.div
              key={role.company}
              className="timeline-item"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
            >
              <div className="timeline-dot" aria-hidden="true">
                <HiBriefcase />
              </div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role">{role.role}</h3>
                    <p className="timeline-company">
                      <span className="company-name">{role.company}</span>
                      <span className="company-sep">·</span>
                      <span className="company-product">{role.product}</span>
                    </p>
                  </div>
                  <div className="timeline-meta">
                    <span className="meta-item">
                      <HiCalendar /> {role.period}
                    </span>
                    <span className="meta-item">
                      <HiLocationMarker /> {role.location}
                    </span>
                  </div>
                </div>

                <ul className="timeline-highlights">
                  {role.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <div className="timeline-stack">
                  {role.stack.map((s) => (
                    <span key={s} className="stack-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
