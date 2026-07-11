"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEX = "M100 26 L164 63 L164 137 L100 174 L36 137 L36 63 Z";

// Fixed intro length — never tied to data/asset loading.
const DURATION = 3400;

const QUOTES: { t: string; a: string }[] = [
  { t: "The unexamined life is not worth living.", a: "Socrates" },
  { t: "He who has a why to live can bear almost any how.", a: "Friedrich Nietzsche" },
  { t: "We suffer more often in imagination than in reality.", a: "Seneca" },
  { t: "You have power over your mind, not outside events.", a: "Marcus Aurelius" },
  { t: "What stands in the way becomes the way.", a: "Marcus Aurelius" },
  { t: "Knowing yourself is the beginning of all wisdom.", a: "Aristotle" },
  { t: "Happiness depends upon ourselves.", a: "Aristotle" },
  { t: "The mind is everything. What you think, you become.", a: "Buddha" },
  { t: "It does not matter how slowly you go, so long as you do not stop.", a: "Confucius" },
  { t: "The journey of a thousand miles begins with a single step.", a: "Lao Tzu" },
  { t: "When I let go of what I am, I become what I might be.", a: "Lao Tzu" },
  { t: "Life can only be understood backwards; but it must be lived forwards.", a: "Søren Kierkegaard" },
  { t: "No man ever steps in the same river twice.", a: "Heraclitus" },
  { t: "Waste no more time arguing what a good man should be. Be one.", a: "Marcus Aurelius" },
];

export function Loader() {
  const [done, setDone] = useState(false);
  const [quote, setQuote] = useState<{ t: string; a: string } | null>(null);

  useEffect(() => {
    // Pick a random quote on the client (avoids SSR hydration mismatch).
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    // Always play the full intro on every load.
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), DURATION);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* Ambient bloom (opacity-only animation keeps it cheap on mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[260px] w-[260px] rounded-full blur-[80px]"
            style={{
              background: "rgba(255,107,53,0.2)",
              animation: "ldr-bloom 2.2s ease-in-out infinite",
            }}
          />

          <motion.div
            className="relative"
            exit={{
              scale: 1.12,
              opacity: 0,
              transition: { duration: 0.6, ease: "easeIn" },
            }}
          >
            <svg width="132" height="132" viewBox="0 0 200 200" fill="none" className="relative">
              {/* Faint ring track */}
              <circle cx="100" cy="100" r="94" stroke="rgba(255,107,53,0.10)" strokeWidth="3" />
              {/* Spinner ring — a rotated dashed circle. Rotating a circle is a
                  pure transform (GPU-composited), so it never hitches. */}
              <circle
                cx="100"
                cy="100"
                r="94"
                stroke="url(#ldr-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: "0.26 0.74",
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "ldr-spin 1.4s linear infinite",
                }}
              />

              {/* Hexagon (draws in once) */}
              <path
                d={HEX}
                stroke="url(#ldr-grad)"
                strokeWidth="6"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "ldr-draw 1s 0.1s ease forwards",
                }}
              />
              {/* "A" caret */}
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
                  animation: "ldr-draw 0.9s 0.55s ease forwards",
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

          {/* Quote + progress */}
          <motion.div
            className="relative mt-11 flex w-full max-w-sm flex-col items-center gap-5 text-center"
            exit={{ opacity: 0, y: 8, transition: { duration: 0.4 } }}
          >
            <div className="flex min-h-[4.5rem] flex-col items-center justify-center gap-2">
              <motion.p
                key={quote?.t ?? "ph"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: quote ? 1 : 0, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-balance text-sm font-medium leading-relaxed text-ink/90 sm:text-base"
              >
                {quote ? `“${quote.t}”` : ""}
              </motion.p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: quote ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-xs font-medium uppercase tracking-[0.18em] text-accent/90"
              >
                {quote ? `— ${quote.a}` : ""}
              </motion.span>
            </div>

            {/* GPU-composited progress (transform, not width — no layout jank) */}
            <span className="relative h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
              <span
                className="absolute inset-0 origin-left rounded-full"
                style={{
                  background: "linear-gradient(90deg,#ff6b35,#ff8a4c)",
                  transform: "scaleX(0)",
                  animation: `ldr-progress ${DURATION}ms cubic-bezier(0.65,0,0.35,1) forwards`,
                }}
              />
            </span>

            <span className="font-heading text-[10px] font-medium uppercase tracking-[0.4em] text-muted/60">
              Huzaifa&nbsp;Awan
            </span>
          </motion.div>

          <style>{`
            @keyframes ldr-spin { to { transform: rotate(360deg); } }
            @keyframes ldr-draw { to { stroke-dashoffset: 0; } }
            @keyframes ldr-progress { to { transform: scaleX(1); } }
            @keyframes ldr-bloom {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="ldr-"] { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
