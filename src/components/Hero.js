import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiPlay, HiBadgeCheck } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToCertifications = () => {
    const element = document.getElementById('certifications');
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-badge hero-status"
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
          >
            <span className="status-dot" aria-hidden="true" />
            <span className="badge-text">
              Open to senior full-stack roles · US timezones
            </span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="greeting">Hi, I'm</span>
            <span className="hero-inline-photo" aria-hidden="true">
              <img src="/huzaifa-awan.png" alt="" />
            </span>
            <span className="name">
              <motion.span
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="gradient-text"
              >
                Huzaifa Awan
              </motion.span>
              <button
                type="button"
                className="verified-badge"
                onClick={scrollToCertifications}
                aria-label="Certified — view certifications"
              >
                <HiBadgeCheck className="verified-icon" aria-hidden="true" />
                <span className="verified-tooltip">Certified</span>
              </button>
            </span>
            <span className="role">Software Developer & Creative Problem Solver</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            Building innovative solutions and turning ideas into reality through code.
            Passionate about creating exceptional digital experiences.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/Huzaifa_Awan_Senior_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiDownload className="btn-icon" />
              Download CV
            </motion.a>
            <motion.a
              href="https://www.youtube.com/watch?v=0eMOzNhqzvY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiPlay className="btn-icon" />
              Watch Introduction
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-social"
            variants={itemVariants}
          >
            <motion.a
              href="https://github.com/M-Huzaifa-Awan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mhuzaifaawan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
