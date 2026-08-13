"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

const HEX = "M100 26 L164 63 L164 137 L100 174 L36 137 L36 63 Z";

// Base intro length — never tied to data/asset loading. Longer quotes extend
// the hold (capped) so they can be read in full before the dissolve.
const BASE_DURATION = 3400;
const MAX_DURATION = 4200;

// Word-reveal timing: quotes appear early and quickly so most of the intro
// is reading time, not reveal time.
const WORD_DELAY = 0.4;
const WORD_STAGGER = 0.04;

/**
 * Uniform random repeats far more than people expect — with 32 quotes there
 * is a ~50% chance of seeing a duplicate within 7 loads. Remembering the
 * recent ones and drawing only from the rest makes it feel random.
 */
const RECENT_KEY = "intro-quote-history";
const RECENT_KEEP = 20;

function pickQuote() {
  let recent: number[] = [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) recent = JSON.parse(raw);
  } catch {
    // storage unavailable (private mode, etc.) — fall back to plain random
  }

  const fresh = QUOTES.map((_, i) => i).filter((i) => !recent.includes(i));
  const pool = fresh.length > 0 ? fresh : QUOTES.map((_, i) => i);
  const picked = pool[Math.floor(Math.random() * pool.length)];

  try {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([picked, ...recent].slice(0, RECENT_KEEP)),
    );
  } catch {
    // ignore
  }

  return QUOTES[picked];
}

function durationFor(wordCount: number) {
  return Math.min(
    MAX_DURATION,
    BASE_DURATION + Math.max(0, wordCount - 8) * 150,
  );
}

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
  { t: "No man is free who is not master of himself.", a: "Epictetus" },
  { t: "It's not what happens to you, but how you react that matters.", a: "Epictetus" },
  { t: "Wherever you go, go with all your heart.", a: "Confucius" },
  { t: "Wonder is the beginning of wisdom.", a: "Socrates" },
  { t: "The only true wisdom is in knowing you know nothing.", a: "Socrates" },
  { t: "Nature does not hurry, yet everything is accomplished.", a: "Lao Tzu" },
  { t: "The soul becomes dyed with the color of its thoughts.", a: "Marcus Aurelius" },
  { t: "Begin at once to live, and count each separate day as a separate life.", a: "Seneca" },
  { t: "Luck is what happens when preparation meets opportunity.", a: "Seneca" },
  { t: "He who is brave is free.", a: "Seneca" },
  { t: "What you seek is seeking you.", a: "Rumi" },
  { t: "The wound is the place where the light enters you.", a: "Rumi" },
  { t: "Muddy water is best cleared by leaving it alone.", a: "Alan Watts" },
  { t: "In the middle of difficulty lies opportunity.", a: "Albert Einstein" },
  { t: "I think, therefore I am.", a: "René Descartes" },
  { t: "The beginning is the most important part of the work.", a: "Plato" },
  { t: "Courage is knowing what not to fear.", a: "Plato" },
  { t: "Well begun is half done.", a: "Aristotle" },
];

export function Loader() {
  const [done, setDone] = useState(false);
  const [quote, setQuote] = useState<{ t: string; a: string } | null>(null);
  const [drawing, setDrawing] = useState(false);
  const isMobile = useIsMobile();

  // Stroke drawing is not GPU-composited, so it stalls if it runs while
  // React is still hydrating. Two frames of headroom puts the whole draw
  // after that work instead of through it.
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setDrawing(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  useEffect(() => {
    // Pick on the client (avoids SSR hydration mismatch).
    const q = pickQuote();
    setQuote(q);

    // Always play the full intro on every load.
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(
      () => setDone(true),
      durationFor(q.t.split(" ").length),
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
      // Signal the Hero to start its greeting sequence.
      window.dispatchEvent(new Event("intro:done"));
    }
  }, [done]);

  const words = quote ? quote.t.split(" ") : [];
  const duration = durationFor(words.length);
  const authorDelay = isMobile
    ? 0.55
    : WORD_DELAY + words.length * WORD_STAGGER + 0.3;

  return (
    <AnimatePresence>
      {!done && (
        <>
          {/* Screen dissolves while the composition pushes toward the
              viewer — a camera move through the title card into the page. */}
          <motion.div
            key="loader"
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-bg px-6"
            // Scaling a full-screen layer is expensive to composite on
            // phones — mobile gets a plain fade.
            exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Ambient bloom — static: animating opacity on a heavily blurred
                layer repaints the blur every frame and stutters on phones. */}
            <div
              aria-hidden
              className="pointer-events-none absolute h-[260px] w-[260px] rounded-full blur-[80px]"
              style={{ background: "rgba(255,107,53,0.2)" }}
            />

            {/* Logo draws itself in, starting once hydration is done */}
            <div className="relative">
              <svg width="132" height="132" viewBox="0 0 200 200" fill="none" className="relative">
                {/* Hexagon */}
                <path
                  d={HEX}
                  stroke="url(#ldr-grad)"
                  strokeWidth="6"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                    animation: drawing
                      ? "ldr-draw 1s cubic-bezier(0.65,0,0.35,1) forwards"
                      : "none",
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
                    animation: drawing
                      ? "ldr-draw 0.85s 0.45s cubic-bezier(0.65,0,0.35,1) forwards"
                      : "none",
                  }}
                />
                <defs>
                  <linearGradient id="ldr-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#ff8a4c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Quote (word-by-word reveal) + progress */}
            <div className="relative mt-11 flex w-full max-w-sm flex-col items-center gap-5 text-center">
              <div className="flex min-h-[4.5rem] flex-col items-center justify-center gap-2">
                <p className="text-balance text-sm font-medium leading-relaxed text-ink/90 sm:text-base">
                  {/* Mobile: one cheap fade for the whole quote — dozens of
                      per-word animations stutter on phones while the page is
                      still hydrating. Desktop keeps the word-by-word reveal. */}
                  {quote && isMobile && (
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
                    >
                      <span className="text-accent/80">&ldquo;</span>
                      {quote.t}
                      <span className="text-accent/80">&rdquo;</span>
                    </motion.span>
                  )}
                  {quote && !isMobile && (
                    <>
                      <motion.span
                        className="inline-block text-accent/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        &ldquo;
                      </motion.span>
                      {words.map((w, i) => (
                        <motion.span
                          key={`${w}-${i}`}
                          className="inline-block whitespace-pre"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: WORD_DELAY + i * WORD_STAGGER,
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                        >
                          {w}
                          {i < words.length - 1 ? " " : ""}
                        </motion.span>
                      ))}
                      <motion.span
                        className="inline-block text-accent/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: authorDelay - 0.1, duration: 0.4 }}
                      >
                        &rdquo;
                      </motion.span>
                    </>
                  )}
                </p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: quote ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: authorDelay }}
                  className="text-xs font-medium uppercase tracking-[0.18em] text-accent/90"
                >
                  {quote ? `— ${quote.a}` : ""}
                </motion.span>
              </div>

              {/* GPU-composited progress (transform, not width — no layout
                  jank). The animation starts only once the quote is picked
                  (post-hydration) so the bar and quote stay in sync — on slow
                  phones the bar used to run during hydration and the quote
                  then popped in at the last moment. */}
              <span className="relative h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
                <span
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#ff6b35,#ff8a4c)",
                    transform: "scaleX(0)",
                    animation: quote
                      ? `ldr-progress ${duration}ms cubic-bezier(0.33,1,0.68,1) forwards`
                      : "none",
                  }}
                />
              </span>

              <span className="font-heading text-[10px] font-medium uppercase tracking-[0.4em] text-muted/60">
                Huzaifa&nbsp;Awan
              </span>
            </div>

            <style>{`
              @keyframes ldr-draw { to { stroke-dashoffset: 0; } }
              @keyframes ldr-progress { to { transform: scaleX(1); } }
              @media (prefers-reduced-motion: reduce) {
                [style*="ldr-"] { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
