"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";
import { CountUp } from "./ui/CountUp";
import { HERO_STATS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Intro sequence:
 *  1 "Hi." centered
 *  2 a title card composes itself — rule, "I am", name, role, then the four
 *    stats revealing one at a time and counting to their value
 *  3 everything except the name fades, leaving the name alone
 *  4 the name morphs character by character into the hero headline while the
 *    backdrop dissolves and the site fades up behind it
 */
type Phase = 0 | 1 | 2 | 3 | 4;

const HI_MS = 1600;
/**
 * The card must finish before it leaves. The last stat starts counting at
 * STAT_START + 3×STAT_STEP and runs for COUNT_S, so everything has landed
 * by ~3.7s; the remainder is a deliberate hold.
 */
const CARD_MS = 4600;
/** Time for the chrome to clear before the name morphs. */
const CHROME_MS = 560;

const STAT_START = 2;
const STAT_STEP = 0.34;
const COUNT_S = 0.6;

// Expo-out — leaves fast, decelerates long, settles once.
const EASE = [0.16, 1, 0.3, 1] as const;

const NAME_LINES = ["Muhammad", "Huzaifa Awan"];

/**
 * Renders text one character per element, each carrying a stable layoutId.
 * The same prefix rendered in two places lets framer-motion move every glyph
 * between them. `colorFrom`/`colorTo` tween the colour across the move.
 */
function MorphChars({
  text,
  prefix,
  colorFrom,
  colorTo,
}: {
  text: string;
  prefix: string;
  colorFrom?: string;
  colorTo?: string;
}) {
  const tweensColor = Boolean(colorFrom && colorTo);
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${prefix}-${i}`}
          layoutId={`${prefix}-${i}`}
          initial={tweensColor ? { color: colorFrom } : false}
          animate={tweensColor ? { color: colorTo } : undefined}
          transition={{ duration: 0.95, ease: EASE }}
          className="inline-block whitespace-pre"
        >
          {ch}
        </motion.span>
      ))}
    </>
  );
}

/**
 * The name, split per character so each glyph carries its own layoutId.
 * Rendering the same ids on the title card and on the hero headline makes
 * framer-motion move every character from one to the other — PowerPoint's
 * Morph transition, at glyph level.
 */
function MorphName({ lineClassName }: { lineClassName?: string }) {
  let n = 0;
  return (
    <>
      {NAME_LINES.map((line) => (
        <span key={line} className={cn("block", lineClassName)}>
          {Array.from(line).map((ch) => {
            const id = `name-${n++}`;
            return (
              <motion.span
                key={id}
                layoutId={id}
                transition={{ duration: 0.95, ease: EASE }}
                className="inline-block whitespace-pre"
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/**
 * Text sliding up from behind a clipped edge: the reveal that makes title
 * sequences feel expensive. Transform-only, so it never costs a repaint.
 */
function MaskReveal({
  children,
  delay = 0,
  className,
  duration = 1,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={cn("block", className)}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Hero() {
  const [phase, setPhase] = useState<Phase>(0);
  const phaseRef = useRef<Phase>(0);
  phaseRef.current = phase;
  const reducedMotion = useReducedMotion();
  const settled = phase === 4;
  const showCard = phase === 2 || phase === 3;

  useEffect(() => {
    if (reducedMotion) {
      setPhase(4);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = () => {
      if (phaseRef.current !== 0) return;
      setPhase(1);
      timers.push(setTimeout(() => setPhase(2), HI_MS));
      timers.push(setTimeout(() => setPhase(3), HI_MS + CARD_MS));
      timers.push(setTimeout(() => setPhase(4), HI_MS + CARD_MS + CHROME_MS));
    };
    window.addEventListener("intro:done", start);
    // Fallback in case the loader event never arrives.
    timers.push(setTimeout(start, 6000));
    return () => {
      window.removeEventListener("intro:done", start);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  // Keep the page pinned while the intro plays.
  useEffect(() => {
    if (phase >= 1 && phase <= 3) {
      document.documentElement.style.overflow = "hidden";
    } else if (phase === 4) {
      document.documentElement.style.overflow = "";
    }
  }, [phase]);

  // Mouse parallax for the portrait (desktop pointers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const imgY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const chromeFade = { opacity: phase >= 3 ? 0 : 1 };
  const chromeTransition = { duration: 0.5, ease: "easeOut" as const };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-10 pt-24 lg:items-center lg:pb-0 lg:pt-28"
    >
      {/* Cinematic portrait — held back until the intro settles. */}
      <div className="absolute inset-0 z-0 -translate-y-[7%] sm:translate-y-0">
        <motion.div
          aria-hidden
          style={{ x: imgX, y: imgY }}
          className="absolute inset-0"
        >
          <motion.div
            initial={false}
            animate={
              settled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }
            }
            transition={{ duration: 1.4, ease: EASE }}
            className="relative h-full w-full"
          >
            <Image
              src="/cover.png"
              alt="Muhammad Huzaifa Awan"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[72%_top] brightness-[1.05] sm:object-[80%_18%] sm:brightness-100 md:animate-float"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlays: left scrim for text on desktop, strong bottom
          scrim on mobile so the text column reads cleanly under the portrait. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-bg via-bg/70 to-transparent sm:via-bg/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-bg via-bg/60 to-transparent sm:via-transparent sm:to-bg/40"
      />
      {/* Warm glow over the face on mobile — stands in for the desktop cursor
          glow so the portrait isn't flat/dim on touch devices. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] sm:hidden"
        style={{
          background:
            "radial-gradient(58% 32% at 72% 20%, rgba(255,138,76,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 z-[1] hidden h-[500px] w-[500px] rounded-full bg-accent/[0.08] blur-[150px] sm:block"
      />

      {/* Intro backdrop — separate from the content so it can cross-dissolve
          while the name morphs across it. Carries the loader's warm bloom so
          the intro reads as one continuous scene. */}
      <AnimatePresence>
        {phase >= 1 && phase <= 3 && (
          <motion.div
            key="backdrop"
            className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-bg"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div
              aria-hidden
              className="h-[300px] w-[300px] rounded-full blur-[90px] sm:h-[460px] sm:w-[460px] sm:blur-[130px]"
              style={{ background: "rgba(255,107,53,0.2)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Hi." */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="hi"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center font-heading text-7xl font-bold text-ink sm:text-8xl"
          >
            Hi<span className="text-accent">.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title card. Rendered without an exit animation so that when it
          unmounts, the name's per-character layoutIds hand straight over to
          the hero headline instead of being duplicated by an exiting copy. */}
      {showCard && (
        <div className="pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          {/* Accent hairline — same warm gradient the site uses elsewhere */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: phase >= 3 ? 0 : 1 }}
            transition={{ duration: 0.9, delay: phase >= 3 ? 0 : 0.12, ease: EASE }}
            className="block h-px w-16 bg-gradient-to-r from-transparent via-accent/70 to-transparent sm:w-24"
          />

          <motion.p
            animate={chromeFade}
            transition={chromeTransition}
            className="mt-7 text-[10px] font-medium uppercase tracking-[0.42em] text-muted/80 sm:mt-8 sm:text-xs"
          >
            <MaskReveal delay={0.3} duration={0.8}>
              I am
            </MaskReveal>
          </motion.p>

          {/* The name: stays put while the chrome clears, then morphs. */}
          <h2 className="mt-4 font-heading text-[2.4rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:mt-5 sm:text-6xl lg:text-7xl">
            {phase === 2 ? (
              <>
                <MaskReveal delay={0.6} duration={0.9}>
                  Muhammad
                </MaskReveal>
                <MaskReveal delay={0.72} duration={0.9}>
                  Huzaifa Awan
                </MaskReveal>
              </>
            ) : (
              <MorphName />
            )}
          </h2>

          {/* Role in wide-tracked small caps — monochrome on purpose; the
              accent stays reserved for the period in "Hi." */}
          <motion.p
            animate={chromeFade}
            transition={chromeTransition}
            className="mt-6 max-w-xs text-[10px] font-medium uppercase leading-[2] tracking-[0.34em] text-muted sm:mt-7 sm:max-w-none sm:text-xs sm:tracking-[0.42em]"
          >
            <MaskReveal delay={1.15} duration={0.8}>
              Software Engineer
            </MaskReveal>
            <MaskReveal delay={1.26} duration={0.8}>
              Senior Full Stack Developer
            </MaskReveal>
          </motion.p>

          <motion.span
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: phase >= 3 ? 0 : 1 }}
            transition={{ duration: 1, delay: phase >= 3 ? 0 : 1.6, ease: EASE }}
            className="mt-9 block h-px w-full max-w-[19rem] bg-gradient-to-r from-transparent via-line to-transparent sm:mt-11 sm:max-w-2xl"
          />

          {/* Stats: revealed one at a time, counting as they arrive. The
              numerals stay through the chrome fade so they can morph. */}
          <dl className="mt-8 grid grid-cols-2 gap-y-8 sm:mt-10 sm:flex sm:items-start sm:gap-0">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "px-5 sm:px-8",
                  i > 0 && "sm:border-l sm:border-line",
                )}
              >
                {/* Accent numerals + bold weight, matching how stats read
                    everywhere else on the site. */}
                <dt className="font-heading text-3xl font-bold tabular-nums text-ink sm:text-[2.6rem]">
                  {phase === 2 ? (
                    <MaskReveal
                      delay={STAT_START + i * STAT_STEP}
                      duration={0.8}
                    >
                      <CountUp
                        value={s.value}
                        // Explicit trigger: the mask's overflow clip hides
                        // this from the intersection observer.
                        start
                        delay={STAT_START + 0.05 + i * STAT_STEP}
                        duration={COUNT_S}
                      />
                    </MaskReveal>
                  ) : (
                    <MorphChars text={s.value} prefix={`stat-${i}`} />
                  )}
                </dt>
                <motion.dd
                  animate={chromeFade}
                  transition={chromeTransition}
                  className="mt-2.5 text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:text-[10px]"
                >
                  <MaskReveal
                    delay={STAT_START + 0.1 + i * STAT_STEP}
                    duration={0.8}
                  >
                    {s.short}
                  </MaskReveal>
                </motion.dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* ---- The site ---- */}
      <div className="container-x relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={settled ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          {/* Hidden on mobile but its space is preserved to keep the composition */}
          <motion.div variants={item} className="invisible sm:visible">
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute hidden h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 sm:inline-flex" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for senior roles &amp; freelance
            </span>
          </motion.div>

          {/* No fade variant: the morphing characters must be visible the
              instant the card hands them over. */}
          <h1 className="mt-4 text-balance text-[2rem] font-bold leading-[1.06] text-ink sm:mt-6 sm:text-6xl lg:text-7xl">
            {settled ? (
              <MorphName />
            ) : (
              <>
                <span className="block">Muhammad</span>
                <span className="block">Huzaifa Awan</span>
              </>
            )}
          </h1>

          <motion.p
            variants={item}
            className="mt-3 flex items-center gap-2.5 text-base font-medium text-accent sm:mt-5 sm:gap-3 sm:text-xl"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            {SITE.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-lg"
          >
            <span className="sm:hidden">
              Scalable web apps, AI-powered SaaS products, and enterprise
              systems.
            </span>
            <span className="hidden sm:inline">{SITE.subtitle}</span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9"
          >
            <MagneticButton href="#contact" variant="primary">
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#projects" variant="secondary">
              View Projects
            </MagneticButton>
            <MagneticButton
              href={SITE.cv}
              variant="ghost"
              external
              className="px-4"
            >
              <Download className="h-4 w-4" /> CV
            </MagneticButton>
          </motion.div>

          {/* No fade variant: the numerals arriving from the title card must
              be visible the moment they are handed over. */}
          <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:mt-14 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6">
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className="border-l border-line pl-3 sm:pl-4">
                <dt className="font-heading text-xl font-bold tabular-nums text-ink sm:text-2xl">
                  {settled ? (
                    <MorphChars text={s.value} prefix={`stat-${i}`} />
                  ) : (
                    s.value
                  )}
                </dt>
                <motion.dd
                  animate={{ opacity: settled ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: settled ? 0.5 : 0,
                    ease: EASE,
                  }}
                  className="mt-0.5 text-[11px] leading-snug text-muted sm:mt-1 sm:text-xs"
                >
                  {s.label}
                </motion.dd>
              </div>
            ))}
          </dl>

          {/* Credibility chip — inline on mobile, floating on desktop */}
          <motion.div variants={item} className="mt-6 lg:hidden">
            <a
              href="#certifications"
              className="group inline-flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.05] px-3.5 py-2 transition-colors hover:border-accent/40"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
                <Star className="h-3.5 w-3.5 fill-accent" />
              </span>
              <span className="text-xs">
                <span className="font-semibold text-ink">3.72 / 4.00 CGPA</span>
                <span className="text-muted"> · Brilliant Academic Achiever</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating credibility chip (desktop) */}
      <motion.div
        initial={false}
        animate={settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: settled ? 1 : 0, duration: 0.7, ease: EASE }}
        className="absolute bottom-28 right-6 z-10 hidden lg:block"
      >
        <a
          href="#certifications"
          className="group glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
            <Star className="h-4 w-4 fill-accent" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-ink">3.72 / 4.00 CGPA</p>
            <p className="text-xs text-muted">Brilliant Academic Achiever</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={false}
        animate={{ opacity: settled ? 1 : 0 }}
        transition={{ delay: settled ? 1.2 : 0 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </span>
      </motion.a>
    </section>
  );
}
