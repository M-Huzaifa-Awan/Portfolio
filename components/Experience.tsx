"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { EXPERIENCE, CERTS } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

      <div ref={ref} className="relative mt-14 pl-6 sm:pl-8">
        {/* Track */}
        <div className="absolute left-[9px] top-2 h-full w-px bg-line sm:left-[13px]" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[9px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent to-transparent sm:left-[13px]"
        />

        <div className="space-y-10">
          {EXPERIENCE.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <span className="absolute -left-6 top-1.5 grid h-[19px] w-[19px] place-items-center rounded-full border border-accent/40 bg-bg sm:-left-8 sm:h-[27px] sm:w-[27px]">
                <span className="h-2 w-2 rounded-full bg-accent shadow-glow-sm sm:h-2.5 sm:w-2.5" />
              </span>

              <div className="glass rounded-3xl p-6 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-ink">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      <span className="font-medium text-accent">
                        {role.company}
                      </span>
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education & certifications */}
      <Reveal className="mt-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTS.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-3xl border border-line bg-white/[0.02] p-6 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.03]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/25">
                {c.featured ? (
                  <GraduationCap className="h-5 w-5" />
                ) : (
                  <Award className="h-5 w-5" />
                )}
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {c.issuer}
                </p>
                <h4 className="mt-1 font-heading font-semibold text-ink">
                  {c.name}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {c.note}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
