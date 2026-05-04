import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiLocationMarker, HiCalendar, HiBadgeCheck, HiExternalLink, HiAcademicCap, HiStar } from 'react-icons/hi';
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

        <motion.div
          id="certifications"
          className="certifications"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="certifications-header">
            <HiBadgeCheck className="certifications-icon" />
            <h3 className="certifications-title">Education & Certifications</h3>
          </div>

          <div className="cert-grid">
            <a
              href="/Degree.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card cert-card-featured"
              aria-label="View NUML Islamabad degree certificate"
            >
              <span className="cert-honor-badge">
                <HiStar /> Brilliant Academic Achiever
              </span>
              <div className="cert-image">
                <img src="/Degree.jpeg" alt="NUML Islamabad — Bachelor's Degree Certificate" loading="lazy" />
              </div>
              <div className="cert-info">
                <span className="cert-issuer">
                  <HiAcademicCap /> NUML Islamabad
                </span>
                <h4 className="cert-name">Bachelor's in Software Engineering</h4>
                <p className="cert-description">
                  Graduated with a CGPA of 3.72/4.00 (Grade A) and was recognized
                  by the university with the title <strong>Brilliant Academic Achiever</strong>.
                </p>
                <div className="cert-stats">
                  <span className="cert-stat">
                    <span className="stat-value">3.72</span>
                    <span className="stat-label">CGPA / 4.00</span>
                  </span>
                  <span className="cert-stat">
                    <span className="stat-value">A</span>
                    <span className="stat-label">Grade</span>
                  </span>
                </div>
                <div className="cert-meta">
                  <span className="cert-view">
                    View Degree <HiExternalLink />
                  </span>
                </div>
              </div>
            </a>

            <a
              href="/micro1.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
              aria-label="View micro1 Full Stack Developer certification"
            >
              <div className="cert-image">
                <img src="/micro1.jpg" alt="micro1 Full Stack Developer Certification" loading="lazy" />
              </div>
              <div className="cert-info">
                <span className="cert-issuer">
                  <HiBadgeCheck /> Certified by micro1
                </span>
                <h4 className="cert-name">Full Stack Developer</h4>
                <p className="cert-description">
                  Officially certified after passing micro1's AI-driven technical interview.
                </p>
                <div className="cert-meta">
                  <span className="cert-date">
                    <HiCalendar /> May 3, 2026
                  </span>
                  <span className="cert-view">
                    View Certificate <HiExternalLink />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
