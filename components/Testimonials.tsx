"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, BadgeCheck } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TESTIMONIALS, LEO_REFERENCE } from "@/lib/data";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-accent text-accent" : "text-line",
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [paused, count]);

  const active = TESTIMONIALS[index];

  return (
    <Section id="testimonials">
      <SectionHeading
        align="center"
        eyebrow="Testimonials"
        title={
          <>
            What clients say about{" "}
            <span className="text-gradient">working with me.</span>
          </>
        }
        description="Verified 5-star reviews from real Upwork clients."
      />

      <div
        className="relative mx-auto mt-14 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div layout className="glass rounded-3xl p-7 sm:p-12">
          <div className="flex items-center justify-between">
            <Quote className="h-9 w-9 text-accent/30 sm:h-10 sm:w-10" />
            {active.rating && <Stars rating={active.rating} />}
          </div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-4"
            >
              <p className="text-base leading-relaxed text-ink sm:text-xl">
                &ldquo;{active.quote}&rdquo;
              </p>

              {active.endorsements && (
                <div className="relative mt-5 overflow-hidden rounded-2xl">
                  <div className="flex flex-wrap gap-2">
                    {active.endorsements.map((e) => (
                      <span
                        key={e}
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 text-xs text-accent"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {e}
                      </span>
                    ))}
                  </div>
                  {/* One-shot sheen: draws the eye to the verified proof each
                      time a new testimonial lands (transform-only). */}
                  {!reducedMotion && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.13] to-transparent"
                      initial={{ x: "-160%" }}
                      animate={{ x: "460%" }}
                      transition={{ duration: 1.15, delay: 0.6, ease: "easeInOut" }}
                    />
                  )}
                </div>
              )}

              <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="font-heading font-semibold text-ink">
                  {active.name}
                </span>
                <span className="text-sm text-muted">{active.role}</span>
                {active.source && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    <BadgeCheck className="h-3 w-3" /> {active.source}
                    {active.date ? ` · ${active.date}` : ""}
                  </span>
                )}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-accent"
                    : "w-2 bg-white/15 hover:bg-white/30",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Honest reference note (no fabricated quote) */}
        <Reveal className="mt-8">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-5 text-center sm:text-left">
            <BadgeCheck className="mt-0.5 hidden h-5 w-5 shrink-0 text-accent sm:block" />
            <p className="text-sm leading-relaxed text-muted">
              {LEO_REFERENCE}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
