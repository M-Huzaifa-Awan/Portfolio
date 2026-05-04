import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import './GitHubStrip.css';

const GH_USER = 'M-Huzaifa-Awan';
const MAX_REPOS = 6;
const CACHE_KEY = 'gh-repos-cache-v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

// Common GitHub language colors (matches github.com)
const LANG_COLOR = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Shell: '#89e051',
  PHP: '#4F5D95',
};

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
};

const GitHubStrip = () => {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = (() => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.ts < CACHE_TTL_MS) return parsed.data;
      } catch (_) {}
      return null;
    })();

    if (cached) {
      setRepos(cached);
      return undefined;
    }

    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=30`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        const filtered = data
          .filter((r) => !r.fork && !r.archived && !r.private)
          .sort((a, b) => {
            // Prioritize starred + recently pushed
            const score = (r) =>
              r.stargazers_count * 5 +
              (Date.now() - new Date(r.pushed_at).getTime() < 1000 * 60 * 60 * 24 * 60 ? 3 : 0);
            return score(b) - score(a);
          })
          .slice(0, MAX_REPOS)
          .map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            pushed_at: r.pushed_at,
            topics: r.topics || [],
          }));
        setRepos(filtered);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: filtered }));
        } catch (_) {}
      })
      .catch(() => !cancelled && setError(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (error || (repos && repos.length === 0)) return null;

  return (
    <motion.section
      className="gh-strip"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      aria-label="Recent GitHub repositories"
    >
      <div className="container">
        <div className="gh-strip-head">
          <span className="gh-pulse" aria-hidden="true" />
          <span className="gh-eyebrow">Live from GitHub</span>
          <h3 className="gh-strip-title">Recent open-source &amp; side projects</h3>
          <a
            href={`https://github.com/${GH_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-strip-link"
          >
            <FaGithub /> @{GH_USER} <HiExternalLink />
          </a>
        </div>

        <div className="gh-grid">
          {!repos &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="gh-card is-skeleton">
                <span className="gh-skel" />
              </div>
            ))}

          {repos &&
            repos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-card"
              >
                <div className="gh-card-head">
                  <FaGithub className="gh-card-icon" />
                  <span className="gh-card-name">{r.name}</span>
                  <HiExternalLink className="gh-card-ext" />
                </div>

                <p className="gh-card-desc">
                  {r.description || 'No description provided.'}
                </p>

                <div className="gh-card-footer">
                  {r.language && (
                    <span className="gh-card-lang">
                      <span
                        className="gh-card-lang-dot"
                        style={{ background: LANG_COLOR[r.language] || '#8b8b8b' }}
                      />
                      {r.language}
                    </span>
                  )}
                  {r.stars > 0 && (
                    <span className="gh-card-stat">
                      <FaStar /> {r.stars}
                    </span>
                  )}
                  {r.forks > 0 && (
                    <span className="gh-card-stat">
                      <FaCodeBranch /> {r.forks}
                    </span>
                  )}
                  <span className="gh-card-time">Updated {timeAgo(r.pushed_at)}</span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubStrip;
