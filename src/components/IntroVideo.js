import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay } from 'react-icons/hi';
import './IntroVideo.css';

const LOOM_ID = '491ea3048e4b4bdba169a1b62529061c';

const IntroVideo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="intro-video" className="intro-video">
      <div className="container">
        <motion.div
          className="intro-video-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="intro-video-text">
            <p className="intro-eyebrow">▸ Quick intro</p>
            <h3 className="intro-heading">
              Prefer a 60-second walk-through?
            </h3>
            <p className="intro-sub">
              A short Loom where I introduce myself, my work, and how I
              collaborate with US-based teams.
            </p>
          </div>

          <div className="intro-video-frame">
            {playing ? (
              <iframe
                src={`https://www.loom.com/embed/${LOOM_ID}?autoplay=1&hide_owner=true&hide_share=true`}
                title="Huzaifa Awan — Introduction"
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                className="intro-video-poster"
                onClick={() => setPlaying(true)}
                aria-label="Play introduction video"
              >
                <span className="intro-video-play">
                  <HiPlay />
                </span>
                <span className="intro-video-poster-label">
                  Play intro · Loom
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroVideo;
