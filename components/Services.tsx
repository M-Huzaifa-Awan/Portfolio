"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;

/**
 * Services as an auto-playing billboard: one big hook question at a time,
 * then the answer fades in underneath. The progress bar drives the rotation
 * (its animationend advances the slide), so pausing the bar pauses the show.
 */
export function Services() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const service = SERVICES[index];

  // Keep the active tab visible as the show auto-advances — on phones the
  // tab row scrolls and later tabs would otherwise drift off-screen.
  useEffect(() => {
    const tabs = tabsRef.current;
    const btn = tabs?.children[index] as HTMLElement | undefined;
    if (!tabs || !btn) return;
    tabs.scrollTo({
      left: btn.offsetLeft - tabs.clientWidth / 2 + btn.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  const go = (i: number) =>
    setIndex(((i % SERVICES.length) + SERVICES.length) % SERVICES.length);

  // Only pause on devices that actually hover — on touch, mouseenter fires
  // on tap and would freeze the rotation.
  const setHoverPaused = (v: boolean) => {
    if (window.matchMedia("(hover: hover)").matches) setPaused(v);
  };

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            What I can <span className="text-gradient">build for you.</span>
          </>
        }
        description="Plain and simple: you bring the business problem, I deliver working software. Here's what people hire me for."
      />

      <div
        className="glass relative mt-12 overflow-hidden rounded-[2rem]"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
        />

        {/* Selector tabs */}
        <div className="relative border-b border-line">
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto p-3 scrollbar-none sm:p-4"
          >
            {SERVICES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                  i === index
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-line bg-white/[0.02] text-muted hover:text-ink",
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.short}
              </button>
            ))}
          </div>
          {/* Edge fade: hints that the tab row scrolls on phones */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#101010] to-transparent sm:hidden"
          />
        </div>

        {/* Stage */}
        {/* min-h covers the tallest slide per breakpoint so the card keeps a
            stable height and the page below doesn't jump between slides */}
        <div className="relative min-h-[31rem] p-6 sm:min-h-[24rem] sm:p-10 lg:min-h-[23rem] lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                <service.icon className="h-4 w-4" />
                {service.title}
              </p>

              {/* Hook question, word by word */}
              <h3 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {service.hook.split(" ").map((w, i) => (
                  <motion.span
                    key={`${w}-${i}`}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    {w}{" "}
                  </motion.span>
                ))}
              </h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
                >
                  Let&apos;s talk about it <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar — drives the auto-advance */}
        {!reducedMotion && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
            <span
              key={index}
              onAnimationEnd={() => go(index + 1)}
              className="block h-full origin-left bg-accent"
              style={{
                transform: "scaleX(0)",
                animation: `svc-progress ${SLIDE_MS}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </span>
        )}
        <style>{`@keyframes svc-progress { to { transform: scaleX(1); } }`}</style>
      </div>
    </Section>
  );
}
