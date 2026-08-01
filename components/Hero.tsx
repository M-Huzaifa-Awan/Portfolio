"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";
import { CountUp } from "./ui/CountUp";
import { HERO_STATS, SITE } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
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

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-10 pt-24 lg:items-center lg:pb-0 lg:pt-28"
    >
      {/* Cinematic portrait — full-bleed. Nudged up on mobile so the face
          sits above the text column. */}
      <div className="absolute inset-0 z-0 -translate-y-[7%] sm:translate-y-0">
        <motion.div
          aria-hidden
          style={{ x: imgX, y: imgY }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
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

      {/* Content */}
      <div className="container-x relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
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

          <motion.h1
            variants={item}
            className="mt-4 text-balance text-[2rem] font-bold leading-[1.06] sm:mt-6 sm:text-6xl lg:text-7xl"
          >
            <span className="block text-ink">Muhammad</span>
            <span className="block text-ink">Huzaifa Awan</span>
          </motion.h1>

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

          {/* Stat row */}
          <motion.dl
            variants={item}
            className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:mt-14 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="border-l border-line pl-3 sm:pl-4">
                <dt className="font-heading text-xl font-bold text-ink sm:text-2xl">
                  {/* Delay outlasts the intro loader + curtain wipe so the
                      count plays in full view */}
                  <CountUp value={s.value} delay={3.9} duration={2} />
                </dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-muted sm:mt-1 sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
