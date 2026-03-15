import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaDatabase, 
  FaCloud, 
  FaPalette, 
  FaRocket,
  FaReact,
  FaNode,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaServer
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Web Development', icon: <FaCode />, color: '#6366f1' },
    { name: 'Full-Stack Development', icon: <FaNode />, color: '#8b5cf6' },
    { name: 'UI/UX Design', icon: <FaPalette />, color: '#ec4899' },
    { name: 'Database Management', icon: <FaDatabase />, color: '#10b981' },
    { name: 'API Development', icon: <FaCloud />, color: '#3b82f6' },
    { name: 'Problem Solving', icon: <FaRocket />, color: '#f59e0b' },
  ];

  const technologies = [
    { name: 'React', icon: <FaReact />, level: 90 },
    { name: 'Node.js', icon: <FaNode />, level: 85 },
    { name: 'JavaScript', icon: <FaJs />, level: 90 },
    { name: 'C# .NET MVC', icon: <FaCode />, level: 85 },
    { name: 'MySQL', icon: <FaDatabase />, level: 88 },
    { name: 'RESTful APIs', icon: <FaServer />, level: 90 },
    { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
              I'm a passionate software developer with a keen interest in creating 
              innovative solutions and solving complex problems. My work spans across 
              various domains including web development, application design, and intelligent systems.
            </p>
            <p>
              I enjoy working on projects that challenge me to think creatively and push 
              the boundaries of what's possible with technology. Each project is an opportunity 
              to learn, grow, and make a meaningful impact.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="skills-container">
              <h3 className="skills-title">Skills & Expertise</h3>
              <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{ '--skill-color': skill.color }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-name">{skill.name}</div>
                  </motion.div>
                ))}
              </motion.div>
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
          <h3 className="tech-title">Technologies I Work With</h3>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="tech-icon">{tech.icon}</div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-bar">
                  <motion.div
                    className="tech-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
                <div className="tech-level">{tech.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
