import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import IntroVideo from './components/IntroVideo';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubStrip from './components/GitHubStrip';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import './theme/theme-overrides.css';
import './App.css';

const INITIAL_LOAD_MS = 1600;
const THEME_TRANSITION_MS = 1100;

const Loader = ({ statusText }) => (
  <motion.div
    key="loader"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.55, ease: 'easeInOut' }}
    className="loader"
  >
    <div className="loader-grid" aria-hidden="true" />
    <div className="loader-glow" aria-hidden="true" />

    <motion.div
      className="loader-content"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="loader-stage" aria-hidden="true">
        <div className="loader-ring loader-ring-1" />
        <div className="loader-ring loader-ring-2" />
        <div className="loader-ring loader-ring-3" />
        <div className="loader-monogram" data-text="A">A</div>
      </div>

      <div className="loader-meta">
        <p className="loader-name">Huzaifa Awan</p>
        <p className="loader-role">Software Developer · Portfolio</p>
      </div>

      <div className="loader-progress" role="progressbar" aria-label={statusText}>
        <div className="loader-progress-bar" />
      </div>

      <p className="loader-status">
        <span className="loader-status-dot" />
        <span className="loader-status-text">{statusText}</span>
      </p>
    </motion.div>
  </motion.div>
);

const AppContent = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [statusText, setStatusText] = useState('Initializing experience');
  const initialMount = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), INITIAL_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return undefined;
    }
    setStatusText('Applying theme');
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStatusText('Initializing experience');
    }, THEME_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading ? (
          <Loader statusText={statusText} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ParticleBackground />
            <Navbar />
            <Hero />
            <About />
            <IntroVideo />
            <Experience />
            <Projects />
            <GitHubStrip />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
