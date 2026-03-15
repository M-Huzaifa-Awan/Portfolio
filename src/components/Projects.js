import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiDocument } from 'react-icons/hi';
import './Projects.css';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'APEX Intelligence',
      description: 'An intelligent system designed to deliver advanced solutions and cutting-edge technology implementations. Features AI-powered analytics and real-time processing capabilities.',
      icon: '🚀',
      pdf: 'APEX INTELLIGENCE0.pdf',
      color: '#6366f1',
      tags: ['AI', 'Analytics', 'Real-time']
    },
    {
      id: 2,
      title: 'Multilingual Website Builder',
      description: 'A comprehensive platform for building multilingual websites with seamless translation and localization features. Supports 50+ languages with automatic content adaptation.',
      icon: '🌐',
      pdf: 'Multilingual Website Builder.pdf',
      color: '#8b5cf6',
      tags: ['Web', 'i18n', 'CMS']
    },
    {
      id: 3,
      title: 'Multilingual Dashboard',
      description: 'An intuitive dashboard solution with multilingual support, providing comprehensive data visualization and analytics. Real-time updates and customizable widgets.',
      icon: '📊',
      pdf: 'Multilingual Dashboard.pdf',
      color: '#ec4899',
      tags: ['Dashboard', 'Analytics', 'Data Viz']
    },
    {
      id: 4,
      title: 'Kiosk System',
      description: 'An interactive kiosk solution designed for seamless user experience and efficient service delivery. Touch-optimized interface with offline capabilities.',
      icon: '🛒',
      pdf: 'kiosk.pdf',
      color: '#10b981',
      tags: ['Kiosk', 'Touch', 'Offline']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: "easeOut",
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
            <span className="title-number">02.</span>
            My Projects
          </h2>
          <p className="section-subtitle">
            A collection of my recent work showcasing innovation and technical expertise
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <motion.div
                  className="project-number"
                  animate={{
                    scale: hoveredProject === project.id ? 1.2 : 1,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <motion.a
                href={`/${project.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDocument className="link-icon" />
                <span>View Project Details</span>
                <HiExternalLink className="link-icon" />
              </motion.a>

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
