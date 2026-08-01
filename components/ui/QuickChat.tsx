"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, MessageSquareText, Ghost, ArrowUpRight } from "lucide-react";
import { LogoMark } from "./LogoMark";

const TEASER_KEY = "qc-teaser-seen";
const TEASER_SHOW_DELAY = 2600;
const TEASER_AUTO_HIDE = 8000;

const ACTIONS = [
  {
    icon: MessageSquareText,
    label: "Leave a message",
    hint: "Jump to the contact form",
    href: "#contact",
  },
  {
    icon: Ghost,
    label: "Leave anonymous feedback",
    hint: "No name or email needed",
    href: "#feedback",
  },
];

/** Floating chat-style launcher, bottom-right, with quick contact actions. */
export function QuickChat() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const reducedMotion = useReducedMotion();

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      // sessionStorage unavailable (private mode etc.) - harmless to skip
    }
  };

  const openPanel = () => {
    dismissTeaser();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Show a one-time "come say hi" teaser a couple seconds after arrival,
  // once per session, and auto-hide it if nobody engages.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      // ignore
    }
    if (seen) return;
    const showTimer = setTimeout(() => setTeaser(true), TEASER_SHOW_DELAY);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!teaser) return;
    const hideTimer = setTimeout(dismissTeaser, TEASER_AUTO_HIDE);
    return () => clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teaser]);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2.5rem)] max-w-[320px] overflow-hidden rounded-3xl border border-line bg-[#0d0d0d]/95 shadow-card backdrop-blur-xl sm:bottom-[4.5rem]"
          >
            <div className="flex items-center gap-3 border-b border-line p-4">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                <LogoMark className="h-5 w-5" glow={false} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111] bg-emerald-400" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">Huzaifa Awan</p>
                <p className="text-xs text-muted">Usually replies within a day</p>
              </div>
            </div>

            <div className="p-4">
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-ink">
                Hey 👋 Have a project in mind, or just want to say hi? Pick one below.
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {ACTIONS.map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    onClick={() => setOpen(false)}
                    target={a.href.startsWith("http") ? "_blank" : undefined}
                    rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-3.5 py-3 text-left transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <a.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {a.label}
                      </span>
                      <span className="block truncate text-xs text-muted">{a.hint}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser: "come say hi" bubble, shown once per session */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="card-surface absolute bottom-2 right-[4.5rem] flex max-w-[220px] items-center gap-2 whitespace-nowrap rounded-2xl py-2.5 pl-4 pr-2.5 shadow-card sm:right-[4.75rem]"
          >
            <button
              type="button"
              onClick={openPanel}
              className="text-left text-sm font-medium text-ink"
            >
              Wanna say hi? 👋
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              <X className="h-3 w-3" />
            </button>
            {/* Tail pointing at the launcher button */}
            <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-b border-line bg-[#111111]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {teaser && !open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
        )}
        <motion.button
          type="button"
          onClick={() => (open ? setOpen(false) : openPanel())}
          aria-label={open ? "Close quick contact" : "Open quick contact"}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-accent text-black shadow-glow transition-colors hover:bg-accent-hover"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
