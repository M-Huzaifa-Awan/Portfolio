"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  MonitorSmartphone,
  Info,
  X,
} from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { SnapCarousel } from "./ui/SnapCarousel";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl && !project.pdf) return null;
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

/** Client-confidentiality note shown under mockup projects. */
function MockupNote() {
  return (
    <p className="mt-3 text-[11px] italic leading-snug text-muted/70">
      Visuals are a representative mockup. The production UI, screenshots, and
      links are the client&apos;s property and can&apos;t be shared publicly.
    </p>
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
        className="relative grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold ring-1"
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

/* ------------------------------------------------------------------ */
/* Desktop: slit gallery — narrow strips that expand on hover/click.   */
/* ------------------------------------------------------------------ */

function SlitGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-14 hidden h-[540px] gap-3 lg:flex">
      {projects.map((p, i) => {
        const isActive = i === active;
        const portrait = p.orientation === "portrait";
        return (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`Show ${p.title}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            style={{ flexBasis: 0, flexGrow: isActive ? 7 : 1 }}
            className={cn(
              "relative min-w-0 cursor-pointer overflow-hidden rounded-3xl border bg-card transition-[flex-grow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isActive
                ? "border-accent/30"
                : "border-line hover:border-white/20",
            )}
          >
            {/* Backdrop. Portrait shots fill the tall panel perfectly with a
                cover crop. Landscape shots would over-zoom, so when expanded
                they get an ambient treatment instead: a blurred cover fill
                behind a sharp, contained screenshot framed above the text. */}
            <div className="absolute inset-0">
              {p.image ? (
                <>
                  <Image
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 700px, 1px"
                    loading="eager"
                    className={cn(
                      "object-cover object-top transition-all duration-500",
                      isActive
                        ? portrait
                          ? "opacity-100"
                          : "scale-110 opacity-30 blur-xl"
                        : "opacity-50 grayscale-[0.4]",
                    )}
                  />
                  {!portrait && (
                    <div
                      className={cn(
                        "absolute inset-x-8 bottom-[46%] top-7 transition-opacity duration-500",
                        isActive ? "opacity-100 delay-150" : "opacity-0",
                      )}
                    >
                      <Image
                        src={p.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 1024px) 620px, 1px"
                        loading="eager"
                        className="rounded-xl object-contain object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(120% 100% at 50% 0%, ${p.color}26, transparent 60%), #0c0c0c`,
                  }}
                />
              )}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  isActive
                    ? "bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                    : "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
                )}
              />
            </div>

            {/* Collapsed: vertical title on the slit */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex justify-center pb-6 transition-opacity duration-300",
                isActive ? "opacity-0" : "opacity-100",
              )}
            >
              <span
                className="whitespace-nowrap text-sm font-medium text-white/90"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {p.title}
              </span>
            </div>

            {/* Expanded: full card content. Fixed width so the text doesn't
                reflow while the panel animates open. */}
            <div
              className={cn(
                "absolute bottom-0 left-0 w-[560px] p-7 transition-opacity duration-300",
                isActive
                  ? "opacity-100 delay-150"
                  : "pointer-events-none opacity-0",
              )}
            >
              {p.headline && (
                <p className="text-xs font-medium text-accent">{p.headline}</p>
              )}
              <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/85">
                {p.description}
              </p>
              <TagRow project={p} />
              <ProjectLinks project={p} />
              {p.mockup && <MockupNote />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone/tablet: 3D ring carousel — cards wrap a full circle, compact  */
/* faces (image + title), details open in a bottom sheet.              */
/* ------------------------------------------------------------------ */

function ProjectSlider({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (p: Project) => void;
}) {
  return (
    <div className="lg:hidden">
      <SnapCarousel
        coverflow
        trackClassName="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-6 -mx-6 px-6 pb-2 scrollbar-none sm:-mx-8 sm:scroll-px-8 sm:px-8"
        slideClassName="w-full shrink-0 snap-center md:w-[55vw]"
        slides={projects.map((p) => {
          const portrait = p.orientation === "portrait";
          return {
            key: p.id,
            content: (
              <button
                type="button"
                onClick={() => onOpen(p)}
                aria-label={`Show details for ${p.title}`}
                className="h-full w-full text-left"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card">
                  <div className="relative aspect-[16/11] w-full shrink-0 bg-black/40">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 92vw, 55vw"
                        quality={90}
                        // Fetch during the intro loader so cards are ready
                        // the moment the page is revealed.
                        loading="eager"
                        className={
                          portrait
                            ? "object-contain p-2"
                            : "object-cover object-top"
                        }
                      />
                    ) : (
                      <ProjectPlaceholder project={p} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-3.5">
                    <h3 className="truncate text-sm font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 truncate text-[11px] text-muted">
                      {p.tags.join(" · ")}
                    </p>
                    <span className="mt-3 flex w-full items-center justify-center gap-1 rounded-full bg-accent py-2 text-xs font-semibold text-black">
                      Show details <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ),
          };
        })}
      />
    </div>
  );
}

/** Bottom-sheet popup with the full project details. */
function ProjectSheet({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[92] bg-black/70 lg:hidden"
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-[95] max-h-[86vh] overflow-y-auto rounded-t-3xl border-t border-line bg-[#0d0d0d] p-5 pb-14 lg:hidden"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.04] text-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-black/40">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="100vw"
                  className={
                    project.orientation === "portrait"
                      ? "object-contain p-3"
                      : "object-cover object-top"
                  }
                />
              ) : (
                <ProjectPlaceholder project={project} />
              )}
              {project.mockup && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur-sm">
                  <Info className="h-3 w-3" /> Representative mockup
                </span>
              )}
            </div>

            {project.headline && (
              <p className="mt-5 text-xs font-medium text-accent">
                {project.headline}
              </p>
            )}
            <h3 className="mt-1 font-heading text-xl font-semibold text-ink">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {project.metrics && (
              <div className="mt-5 flex flex-wrap gap-6">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-heading text-lg font-bold text-ink">
                      {m.value}
                    </p>
                    <p className="text-xs text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            )}

            <TagRow project={project} />
            <ProjectLinks project={project} />
            {project.mockup && <MockupNote />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const ordered = [...featured, ...rest];
  const [detail, setDetail] = useState<Project | null>(null);

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

      {/* Phone / tablet: compact card slider + details bottom sheet */}
      <ProjectSlider projects={ordered} onOpen={setDetail} />
      <ProjectSheet project={detail} onClose={() => setDetail(null)} />

      {/* Desktop: slit gallery that expands on hover/click */}
      <SlitGallery projects={ordered} />
    </Section>
  );
}
