"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TECH_GROUPS, TECH_PILLS } from "@/lib/data";

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="mask-fade-x relative flex overflow-hidden py-1">
      <div
        className="flex shrink-0 items-center gap-3 pr-3"
        style={{
          animation: `marquee 38s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...TECH_PILLS, ...TECH_PILLS].map((pill, i) => (
          <span
            key={`${pill}-${i}`}
            className="whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Tech Stack"
        title={
          <>
            The tools I <span className="text-gradient">ship with.</span>
          </>
        }
        description="Depth across the full stack: backend architecture, modern frontend, data, cloud, and AI."
      />

      <div className="mt-12 flex flex-col gap-3">
        <Marquee />
        <Marquee reverse />
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TECH_GROUPS.map((group, gi) => (
          <Reveal key={group.heading} delayIndex={gi}>
            <div className="glass h-full rounded-3xl p-6">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                {group.heading}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ y: -2 }}
                    className="rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-ink"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
