"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEX = "M100 26 L164 63 L164 137 L100 174 L36 137 L36 63 Z";
const DURATION = 2000;

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show the intro once per tab session.
    if (typeof window !== "undefined" && sessionStorage.getItem("ha-intro")) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("ha-intro", "1");
      setDone(true);
    }, DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* Ambient bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[340px] w-[340px] rounded-full blur-[110px]"
            style={{ background: "rgba(255,107,53,0.18)", animation: "ldr-bloom 2.2s ease-in-out infinite" }}
          />
          <div className="noise pointer-events-none absolute inset-0 opacity-[0.04]" />

          <motion.div
            className="relative"
            exit={{ scale: 1.12, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 200 200"
              fill="none"
              className="relative"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,107,53,0.35))" }}
            >
              {/* faint track */}
              <path
                d={HEX}
                stroke="rgba(255,107,53,0.14)"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* traveling light around the hexagon */}
              <path
                d={HEX}
                stroke="url(#ldr-grad)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: "0.3 0.7",
                  animation: "ldr-trace 1.5s linear infinite",
                  filter: "drop-shadow(0 0 6px rgba(255,138,76,0.8))",
                }}
              />
              {/* the "A" caret */}
              <path
                d="M70 134 L100 56 L130 134"
                stroke="#ff8a4c"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "ldr-draw 0.9s 0.25s ease forwards, ldr-glow 1.8s 1.1s ease-in-out infinite",
                  filter: "drop-shadow(0 0 8px rgba(255,107,53,0.7))",
                }}
              />
              {/* crossbar */}
              <path
                d="M83 106 L117 106"
                stroke="#ff8a4c"
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "ldr-draw 0.5s 0.85s ease forwards, ldr-glow 1.8s 1.1s ease-in-out infinite",
                  filter: "drop-shadow(0 0 8px rgba(255,107,53,0.7))",
                }}
              />
              <defs>
                <linearGradient id="ldr-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#ff8a4c" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* wordmark + progress */}
          <motion.div
            className="relative mt-10 flex flex-col items-center gap-3"
            exit={{ opacity: 0, y: 8, transition: { duration: 0.4 } }}
          >
            <span className="font-heading text-xs font-medium uppercase tracking-[0.4em] text-muted">
              Huzaifa&nbsp;Awan
            </span>
            <span className="relative h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg,#ff6b35,#ff8a4c)",
                  boxShadow: "0 0 12px rgba(255,107,53,0.7)",
                  animation: `ldr-progress ${DURATION}ms cubic-bezier(0.65,0,0.35,1) forwards`,
                }}
              />
            </span>
          </motion.div>

          <style>{`
            @keyframes ldr-trace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
            @keyframes ldr-draw { to { stroke-dashoffset: 0; } }
            @keyframes ldr-progress { from { width: 0%; } to { width: 100%; } }
            @keyframes ldr-bloom {
              0%, 100% { opacity: 0.55; transform: scale(0.92); }
              50% { opacity: 1; transform: scale(1.08); }
            }
            @keyframes ldr-glow {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="ldr-"] { animation: none !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
