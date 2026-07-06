"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  GitBranch,
  GitMerge,
} from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { EXPERIENCE, type Role } from "@/lib/data";

function RoleCard({ role, branch }: { role: Role; branch?: boolean }) {
  return (
    <div className="glass h-full rounded-3xl p-6 sm:p-7">
      {branch && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          <GitBranch className="h-3 w-3" />
          Active branch
          <span className="relative ml-0.5 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </div>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-xl font-semibold text-ink">
            {role.role}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {role.url ? (
              <a
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {role.company}
              </a>
            ) : (
              <span className="font-medium text-accent">{role.company}</span>
            )}
            <span className="mx-2 text-line">·</span>
            {role.product}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-muted sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {role.period}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {role.location}
          </span>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {role.highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
          >
            <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {role.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Leading roles still in progress render as parallel git branches.
  const current: Role[] = [];
  let i = 0;
  while (i < EXPERIENCE.length && EXPERIENCE[i].current) {
    current.push(EXPERIENCE[i]);
    i++;
  }
  const past = EXPERIENCE.slice(i);
  const hasBranches = current.length > 1;

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            3+ years shipping with{" "}
            <span className="text-gradient">US product teams.</span>
          </>
        }
      />

      <div className="mt-14">
        {hasBranches && (
          <div className="relative">
            {/* HEAD · Present */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                HEAD · Present
                <span className="text-accent/50">·</span>
                <span className="text-muted">
                  {current.length} concurrent roles
                </span>
              </span>
            </div>

            {/* Fork (desktop) */}
            <svg
              viewBox="0 0 100 44"
              preserveAspectRatio="none"
              className="hidden h-11 w-full md:block"
              aria-hidden="true"
            >
              <path
                d="M50 0 C 50 30, 25 14, 25 44"
                fill="none"
                stroke="rgb(255 107 53 / 0.5)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M50 0 C 50 30, 75 14, 75 44"
                fill="none"
                stroke="rgb(255 107 53 / 0.5)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Branch cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 md:mt-0 md:grid-cols-2">
              {current.map((role, idx) => (
                <motion.div
                  key={role.company}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                >
                  <RoleCard role={role} branch />
                </motion.div>
              ))}
            </div>

            {/* Merge (desktop) */}
            <svg
              viewBox="0 0 100 44"
              preserveAspectRatio="none"
              className="hidden h-11 w-full md:block"
              aria-hidden="true"
            >
              <path
                d="M25 0 C 25 30, 50 14, 50 44"
                fill="none"
                stroke="rgb(255 107 53 / 0.5)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M75 0 C 75 30, 50 14, 50 44"
                fill="none"
                stroke="rgb(255 107 53 / 0.5)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Merge node */}
            <div className="mt-6 flex justify-center md:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-muted">
                <GitMerge className="h-3 w-3 text-accent/70" />
                Merged history
              </span>
            </div>
          </div>
        )}

        {/* Trunk: earlier sequential roles */}
        <div ref={ref} className="relative mt-8 pl-6 sm:pl-8">
          <div className="absolute left-[9px] top-2 h-full w-px bg-line sm:left-[13px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[9px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent to-transparent sm:left-[13px]"
          />

          <div className="space-y-10">
            {past.map((role, idx) => (
              <motion.div
                key={role.company}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-6 top-1.5 grid h-[19px] w-[19px] place-items-center rounded-full border border-accent/40 bg-bg sm:-left-8 sm:h-[27px] sm:w-[27px]">
                  <span className="h-2 w-2 rounded-full bg-accent shadow-glow-sm sm:h-2.5 sm:w-2.5" />
                </span>
                <RoleCard role={role} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
