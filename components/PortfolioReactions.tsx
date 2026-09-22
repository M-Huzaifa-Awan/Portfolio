"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Pause,
  Play,
  Quote,
} from "lucide-react";
import { PORTFOLIO_REACTIONS } from "@/lib/data";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function PortfolioReactions() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = PORTFOLIO_REACTIONS.length;

  const advance = useCallback(
    (step: number) => {
      setDirection(step > 0 ? 1 : -1);
      setIndex((current) => (current + step + count) % count);
    },
    [count],
  );

  const autoplayActive = playing && !paused && !reducedMotion;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setInterval(() => advance(1), 5500);
    return () => window.clearInterval(timer);
  }, [advance, autoplayActive]);

  const active = PORTFOLIO_REACTIONS[index];

  return (
    <Section
      id="portfolio-reactions"
      className="overflow-hidden !py-14 sm:!py-20 lg:!py-24"
    >
      <div aria-hidden="true" className="hex-scene">
        <span className="hex-scene-shape hex-scene-shape-one" />
        <span className="hex-scene-shape hex-scene-shape-two" />
        <span className="hex-scene-shape hex-scene-shape-three" />
      </div>

      <div className="relative z-10">
        <SectionHeading
          align="center"
          eyebrow="Portfolio reactions"
          title={
            <>
              Kind words from people who{" "}
              <span className="text-gradient">explored my work.</span>
            </>
          }
          description="A few notes shared after developers and professionals visited this portfolio."
        />

        <Reveal className="mx-auto mt-10 max-w-5xl lg:mt-12">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Portfolio reactions"
          >
            <div
              className="hex-carousel-stage relative min-h-[29rem] sm:min-h-[25rem] lg:min-h-[23rem]"
              aria-live={autoplayActive ? "off" : "polite"}
              aria-atomic="true"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active.commentUrl ?? active.name}
                  initial={{
                    opacity: 0,
                    x: reducedMotion ? 0 : direction * 44,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: reducedMotion ? 0 : direction * -32,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.28,
                    ease: "easeOut",
                  }}
                  className="absolute inset-y-0 inset-x-3 sm:inset-x-4"
                >
                  <article
                    className="hex-card group h-full"
                    aria-label={"Reaction " + (index + 1) + " of " + count}
                  >
                    <span aria-hidden="true" className="hex-card-depth" />
                    <div className="hex-card-frame h-full">
                      <div className="hex-card-surface flex h-full flex-col px-8 py-7 sm:px-10 sm:py-8">
                        {!reducedMotion && (
                          <motion.span
                            aria-hidden="true"
                            className="hex-card-sheen"
                            initial={{ x: "-150%" }}
                            animate={{ x: "520%" }}
                            transition={{
                              duration: 1.1,
                              delay: 0.35,
                              ease: "easeInOut",
                            }}
                          >
                            <span className="block h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent" />
                          </motion.span>
                        )}
                        <div className="flex items-center justify-between gap-4">
                          <span className="hex-quote-mark">
                            <Quote
                              aria-hidden="true"
                              className="h-5 w-5 text-accent"
                            />
                          </span>
                          {active.commentUrl ? (
                            <a
                              href={active.commentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hex-source inline-flex min-h-11 items-center gap-1.5 px-4 text-xs font-medium text-[#8bc5ff] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70b5f9] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
                              aria-label={
                                "Read " +
                                active.name +
                                "'s original LinkedIn comment (opens in a new tab)"
                              }
                            >
                              <Linkedin
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              View comment
                            </a>
                          ) : (
                            <span className="hex-source inline-flex min-h-11 items-center gap-1.5 px-4 text-xs font-medium text-[#8bc5ff]">
                              <Linkedin
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              {active.source}
                            </span>
                          )}
                        </div>

                        <blockquote className="mt-6 flex flex-1 flex-col">
                          <p className="text-base leading-relaxed text-ink sm:text-lg">
                            &ldquo;{active.quote}&rdquo;
                          </p>
                          <footer className="mt-7 border-t border-accent/15 pt-5">
                            {active.profileUrl ? (
                              <a
                                href={active.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-sm font-heading font-semibold text-ink underline decoration-accent/35 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
                                aria-label={
                                  active.name +
                                  " on LinkedIn (opens in a new tab)"
                                }
                              >
                                {active.name}
                              </a>
                            ) : (
                              <cite className="not-italic font-heading font-semibold text-ink">
                                {active.name}
                              </cite>
                            )}
                            {active.role && (
                              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-[13px]">
                                {active.role}
                              </p>
                            )}
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  advance(-1);
                }}
                aria-label="Previous reaction"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="flex min-w-24 items-center justify-center gap-2 font-mono text-xs tabular-nums text-muted">
                <span className="text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
                <span>{String(count).padStart(2, "0")}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (playing) {
                    setPlaying(false);
                    return;
                  }
                  advance(1);
                  setPlaying(true);
                }}
                disabled={Boolean(reducedMotion)}
                aria-label={
                  reducedMotion
                    ? "Automatic slideshow disabled by reduced motion preference"
                    : playing
                      ? "Pause automatic slideshow"
                      : "Play automatic slideshow"
                }
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {playing && !reducedMotion ? (
                  <Pause aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Play aria-hidden="true" className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  advance(1);
                }}
                aria-label="Next reaction"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
