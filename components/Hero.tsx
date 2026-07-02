"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";
import { HERO_STATS, SITE } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  // Mouse parallax for the portrait
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
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Cinematic portrait — full-bleed on the right */}
      <motion.div
        aria-hidden
        style={{ x: imgX, y: imgY }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src="/cover.png"
            alt="Muhammad Huzaifa Awan"
            fill
            priority
            sizes="100vw"
            className="animate-float object-cover object-[75%_center] md:object-[80%_center]"
          />
        </motion.div>
      </motion.div>

      {/* Cinematic gradient overlays for text legibility + warm ambient light */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-bg via-bg/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-bg via-transparent to-bg/40"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 z-[1] h-[500px] w-[500px] rounded-full bg-accent/[0.08] blur-[150px]"
      />

      {/* Content */}
      <div className="container-x relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={item}>
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for senior roles &amp; freelance
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-ink">Muhammad</span>
            <span className="block text-ink">Huzaifa Awan</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 flex items-center gap-3 text-lg font-medium text-accent sm:text-xl"
          >
            <Sparkles className="h-5 w-5" />
            {SITE.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {SITE.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
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
            className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-x-4"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="border-l border-line pl-4">
                <dt className="font-heading text-2xl font-bold text-ink">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Floating credibility chip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 right-6 z-10 hidden lg:block"
      >
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
            <Star className="h-4 w-4 fill-accent" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-ink">3.72 / 4.00 CGPA</p>
            <p className="text-xs text-muted">Brilliant Academic Achiever</p>
          </div>
        </div>
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
