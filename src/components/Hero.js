import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            className="hero-badge"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <span className="badge-text">Welcome to my Portfolio</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="greeting">Hi, I'm</span>
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
              href="/Huzaifa_Awan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiDownload className="btn-icon" />
              Download CV
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

        <motion.div
          className="hero-visual"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="floating-card card-1">
            <div className="card-content">💻</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-content">🚀</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-content">✨</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToAbout}
      >
        <HiArrowDown className="scroll-icon" />
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
