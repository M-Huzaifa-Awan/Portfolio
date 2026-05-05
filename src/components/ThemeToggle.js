import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiColorSwatch, HiCheck, HiX } from 'react-icons/hi';
import { useTheme } from '../theme/ThemeContext';
import './ThemeToggle.css';

const HINT_STORAGE_KEY = 'portfolio-theme-hint-seen';
const HINT_DELAY_MS = 2200;

const ThemeToggle = () => {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const wrapperRef = useRef(null);

  const current = themes.find((t) => t.id === theme) || themes[0];

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(HINT_STORAGE_KEY) === 'true';
    } catch {
      seen = false;
    }
    if (seen) return undefined;
    const t = setTimeout(() => setHintVisible(true), HINT_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setHintVisible(false);
    try {
      localStorage.setItem(HINT_STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const pick = (id) => {
    setTheme(id);
    setOpen(false);
    dismissHint();
  };

  const handleTriggerClick = () => {
    setOpen((v) => !v);
    if (hintVisible) dismissHint();
  };

  return (
    <div className="theme-picker" ref={wrapperRef}>
      <motion.button
        type="button"
        className={`theme-picker-trigger ${hintVisible ? 'is-hinting' : ''}`}
        onClick={handleTriggerClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme — ${current.name}. Click to change.`}
        title={`Theme: ${current.name}`}
      >
        <HiColorSwatch className="theme-picker-icon" aria-hidden="true" />
        <span className="theme-picker-swatches" aria-hidden="true">
          {current.swatches.map((c, i) => (
            <span key={i} className="picker-swatch" style={{ background: c }} />
          ))}
        </span>
        <span className="theme-picker-label">{current.name}</span>
      </motion.button>

      <AnimatePresence>
        {hintVisible && !open && (
          <motion.div
            className="theme-hint"
            role="status"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="theme-hint-text">
              Theme not to your liking? <strong>Try another →</strong>
            </span>
            <button
              type="button"
              className="theme-hint-close"
              onClick={dismissHint}
              aria-label="Dismiss theme hint"
            >
              <HiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-picker-menu"
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <p className="theme-picker-heading">Choose a theme</p>
            <ul>
              {themes.map((t) => {
                const active = t.id === theme;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`theme-option ${active ? 'is-active' : ''}`}
                      onClick={() => pick(t.id)}
                    >
                      <span className="theme-option-swatches" aria-hidden="true">
                        {t.swatches.map((c, i) => (
                          <span key={i} className="picker-swatch" style={{ background: c }} />
                        ))}
                      </span>
                      <span className="theme-option-text">
                        <span className="theme-option-name">{t.name}</span>
                        <span className="theme-option-desc">{t.description}</span>
                      </span>
                      {active && <HiCheck className="theme-option-check" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
