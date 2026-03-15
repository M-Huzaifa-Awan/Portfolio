import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-text">
            <p>
              Built with <FaHeart className="heart-icon" /> by Huzaifa Awan
            </p>
            <p className="footer-year">&copy; {currentYear} All rights reserved</p>
          </div>
          <motion.div
            className="footer-note"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p>Made with passion and attention to detail</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
