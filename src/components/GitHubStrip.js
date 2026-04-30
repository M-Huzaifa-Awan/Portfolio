import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import './GitHubStrip.css';

const GH_USER = 'M-Huzaifa-Awan';
const MAX_EVENTS = 4;
const CACHE_KEY = 'gh-strip-cache-v1';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes — stay nice to the GitHub API

const friendlyEvent = (e) => {
  const repo = e.repo?.name?.split('/')?.[1] || e.repo?.name || 'a repo';
  switch (e.type) {
    case 'PushEvent': {
      const commit = e.payload?.commits?.[e.payload.commits.length - 1];
      return {
        verb: 'Pushed',
        target: repo,
        detail: commit?.message?.split('\n')[0] || `${e.payload?.size || 0} commits`,
      };
    }
    case 'PullRequestEvent':
      return {
        verb: e.payload?.action === 'closed' ? 'Closed PR in' : 'Opened PR in',
        target: repo,
        detail: e.payload?.pull_request?.title,
      };
    case 'IssuesEvent':
      return {
        verb: e.payload?.action === 'closed' ? 'Closed issue in' : 'Opened issue in',
        target: repo,
        detail: e.payload?.issue?.title,
      };
    case 'CreateEvent':
      return {
        verb: `Created ${e.payload?.ref_type || 'something'} in`,
        target: repo,
        detail: e.payload?.ref || '',
      };
    case 'WatchEvent':
      return { verb: 'Starred', target: repo, detail: '' };
    case 'ForkEvent':
      return { verb: 'Forked', target: repo, detail: '' };
    case 'PublicEvent':
      return { verb: 'Made public', target: repo, detail: '' };
    default:
      return { verb: e.type.replace('Event', ''), target: repo, detail: '' };
  }
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
  return `${mo}mo ago`;
};

const GitHubStrip = () => {
  const [events, setEvents] = useState(null);
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
      setEvents(cached);
      return undefined;
    }

    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=15`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        const filtered = data
          .filter((e) =>
            ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'PublicEvent'].includes(e.type)
          )
          .slice(0, MAX_EVENTS);
        setEvents(filtered);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: filtered }));
        } catch (_) {}
      })
      .catch(() => !cancelled && setError(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (error || (events && events.length === 0)) return null;

  return (
    <motion.section
      className="gh-strip"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      aria-label="Currently building"
    >
      <div className="container">
        <div className="gh-strip-inner">
          <div className="gh-strip-head">
            <span className="gh-pulse" aria-hidden="true" />
            <span className="gh-eyebrow">Currently building</span>
            <a
              href={`https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-strip-link"
            >
              <FaGithub /> @{GH_USER} <HiExternalLink />
            </a>
          </div>

          <ul className="gh-strip-list">
            {!events &&
              Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="gh-strip-item is-skeleton">
                  <span className="gh-skel" />
                </li>
              ))}

            {events &&
              events.map((e) => {
                const { verb, target, detail } = friendlyEvent(e);
                return (
                  <li key={e.id} className="gh-strip-item">
                    <span className="gh-verb">{verb}</span>{' '}
                    <a
                      href={`https://github.com/${e.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gh-target"
                    >
                      {target}
                    </a>
                    {detail ? <span className="gh-detail"> — {detail}</span> : null}
                    <span className="gh-time"> · {timeAgo(e.created_at)}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubStrip;
