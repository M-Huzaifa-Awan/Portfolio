import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './Lightbox.css';

const Lightbox = ({ project, index, onClose, onPrev, onNext, onJump }) => {
  const handleKey = useCallback(
    (e) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [project, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!project) return undefined;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, handleKey]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshots`}
        >
          <motion.div
            className="lightbox-shell"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="lightbox-header">
              <div>
                <h3 className="lightbox-title">{project.title}</h3>
                <p className="lightbox-caption">
                  {project.gallery[index].caption}
                  <span className="lightbox-counter">
                    {' · '}
                    {index + 1} / {project.gallery.length}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="lightbox-close"
                aria-label="Close"
                onClick={onClose}
              >
                <HiX />
              </button>
            </header>

            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-left"
                aria-label="Previous"
                onClick={onPrev}
              >
                <HiChevronLeft />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={project.gallery[index].src}
                  src={project.gallery[index].src}
                  alt={project.gallery[index].caption}
                  className={`lightbox-image ${
                    project.orientation === 'portrait' ? 'is-portrait' : ''
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
              </AnimatePresence>

              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-right"
                aria-label="Next"
                onClick={onNext}
              >
                <HiChevronRight />
              </button>
            </div>

            <div className="lightbox-thumbs">
              {project.gallery.map((shot, i) => (
                <button
                  type="button"
                  key={shot.src}
                  className={`lightbox-thumb ${i === index ? 'is-active' : ''}`}
                  onClick={() => onJump(i)}
                  aria-label={`Show ${shot.caption}`}
                >
                  <img src={shot.src} alt="" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
