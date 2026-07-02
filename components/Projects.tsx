"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Star,
  MonitorSmartphone,
} from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-glow-sm"
        >
          <Globe className="h-3.5 w-3.5" /> Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent/40"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      )}
      {project.pdf && (
        <a
          href={project.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent/40"
        >
          <FileText className="h-3.5 w-3.5" /> Case Study
        </a>
      )}
    </div>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-black/40">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className={cn(
            "transition-transform duration-700 ease-out group-hover:scale-[1.06]",
            project.orientation === "portrait"
              ? "object-contain p-3"
              : "object-cover object-top",
          )}
        />
      ) : (
        <ProjectPlaceholder project={project} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 100%, ${project.color}22, transparent 70%)`,
        }}
      />
    </div>
  );
}

/** Branded gradient panel used when a project has no screenshot to show. */
function ProjectPlaceholder({ project }: { project: Project }) {
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${project.color}26, transparent 60%), #0c0c0c`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <span
        className="relative grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold ring-1 transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundColor: `${project.color}1f`,
          color: project.color,
          boxShadow: `0 0 40px -8px ${project.color}55`,
        }}
      >
        {initials}
      </span>
      <span className="relative inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[11px] text-muted">
        <MonitorSmartphone className="h-3.5 w-3.5" /> Case study on request
      </span>
    </div>
  );
}

function TagRow({ project }: { project: Project }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {project.stack.map((s) => (
        <span
          key={s}
          className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-muted"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="lg:col-span-3">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-accent">
            <Star className="h-3 w-3 fill-accent" /> Featured Build
          </span>
          {project.headline && (
            <p className="mt-4 text-sm font-medium text-accent">
              {project.headline}
            </p>
          )}
          <h3 className="mt-1.5 font-heading text-2xl font-semibold text-ink sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          {project.metrics && (
            <div className="mt-6 flex flex-wrap gap-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-heading text-xl font-bold text-ink">
                    {m.value}
                  </p>
                  <p className="text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          <TagRow project={project} />
          <ProjectLinks project={project} />
        </div>

        <div className="order-1 lg:order-2">
          <ProjectImage project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}

function StandardCard({ project }: { project: Project }) {
  return (
    <SpotlightCard>
      <div className="flex h-full flex-col p-5">
        <ProjectImage project={project} />
        <div className="flex flex-1 flex-col p-1 pt-5">
          {project.headline && (
            <p className="text-xs font-medium text-accent">{project.headline}</p>
          )}
          <h3 className="mt-1 font-heading text-lg font-semibold text-ink">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
          <TagRow project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Production work shipped to{" "}
              <span className="text-gradient">real users.</span>
            </>
          }
          description="SaaS platforms, AI products, and payment systems. Not demos. Every project below is live or in active client delivery."
        />
        <a
          href="https://github.com/M-Huzaifa-Awan"
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink md:inline-flex"
        >
          More on GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <FeaturedCard project={p} />
          </motion.div>
        ))}

        {rest.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <StandardCard project={p} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
