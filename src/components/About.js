import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact,
  FaNode,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaStripe,
  FaServer,
  FaBrain,
} from 'react-icons/fa';
import {
  SiDotnet,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiSupabase,
  SiOpenai,
  SiFirebase,
  SiSqlite,
  SiAzuredevops,
  SiVercel,
} from 'react-icons/si';
import './About.css';

const StatCard = ({ value, prefix = '', suffix = '', label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const duration = 1100;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About = () => {
  const stackGroups = [
    {
      heading: 'Backend',
      items: [
        { name: 'C# / .NET 8', icon: <SiDotnet /> },
        { name: 'ASP.NET Core', icon: <SiDotnet /> },
        { name: 'Node.js', icon: <FaNode /> },
        { name: 'REST APIs', icon: <FaServer /> },
        { name: 'WebSockets', icon: <FaServer /> },
      ],
    },
    {
      heading: 'Frontend',
      items: [
        { name: 'React', icon: <FaReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
      ],
    },
    {
      heading: 'Databases & Caching',
      items: [
        { name: 'SQL Server', icon: <FaDatabase /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'MySQL', icon: <SiMysql /> },
        { name: 'Redis', icon: <SiRedis /> },
        { name: 'Supabase', icon: <SiSupabase /> },
        { name: 'SQLite', icon: <SiSqlite /> },
      ],
    },
    {
      heading: 'AI & Integrations',
      items: [
        { name: 'Claude API', icon: <FaBrain /> },
        { name: 'OpenAI API', icon: <SiOpenai /> },
        { name: 'Stripe', icon: <FaStripe /> },
        { name: 'Firebase OTP', icon: <SiFirebase /> },
      ],
    },
    {
      heading: 'DevOps & Tooling',
      items: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'Azure DevOps', icon: <SiAzuredevops /> },
        { name: 'Docker', icon: <FaDocker /> },
        { name: 'Vercel', icon: <SiVercel /> },
      ],
    },
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Years shipping production' },
    { value: 95, suffix: '%', label: 'Redis cache hit rate' },
    { value: 50, prefix: '<', suffix: 'ms', label: 'API response under load' },
    { value: 40, suffix: '%', label: 'Fewer prod incidents' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-number">01.</span>
            About Me
          </h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-intro">
              Senior Full Stack Developer with 3+ years architecting and shipping
              SaaS platforms, AI-driven applications and payment infrastructure
              alongside US-based product teams.
            </p>
            <p>
              I own complex problems end-to-end — database design, API
              architecture, frontend performance and production monitoring. I've
              built systems serving 100+ concurrent users with sub-50ms response
              times and 95% Redis cache hit rates, integrated Claude and OpenAI
              APIs with structured outputs, and rolled out multilingual
              experiences (English/Spanish) at scale.
            </p>
            <p>
              My day-to-day is .NET Core, React, Next.js and TypeScript, but I'll
              reach for whatever the problem actually needs — WebSockets for live
              preview, iTextSharp for dynamic PDFs, Stripe for subscriptions,
              WPF for desktop apps.
            </p>

            <div className="about-stats">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="skills-container">
              <h3 className="skills-title">What I Do</h3>
              <ul className="capability-list">
                <li>Architect multi-tenant SaaS platforms end-to-end</li>
                <li>Build real-time experiences with WebSockets &amp; live preview</li>
                <li>Tune SQL/Redis for sub-50ms responses under concurrent load</li>
                <li>Integrate Claude / OpenAI with structured outputs &amp; prompt engineering</li>
                <li>Ship Stripe subscription, one-time and webhook flows</li>
                <li>Roll out multilingual (i18n) experiences with proper URL routing</li>
                <li>Generate dynamic PDFs with multilingual content (iTextSharp)</li>
                <li>Lead legacy refactors that cut tech debt &amp; speed up delivery</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="technologies-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="tech-title">Stack I Ship With</h3>

          <motion.div
            className="stack-groups"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stackGroups.map((group) => (
              <motion.div
                key={group.heading}
                className="stack-group"
                variants={itemVariants}
              >
                <h4 className="stack-group-heading">{group.heading}</h4>
                <div className="stack-chips">
                  {group.items.map((item) => (
                    <div key={item.name} className="stack-chip-large">
                      <span className="stack-chip-icon">{item.icon}</span>
                      <span className="stack-chip-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
