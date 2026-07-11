"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  Expand,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { CERTS, type Cert } from "@/lib/data";

const ICONS: Record<Cert["icon"], LucideIcon> = {
  degree: GraduationCap,
  award: Award,
  badge: BadgeCheck,
};

export function Certifications() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close]);

  const current = active !== null ? CERTS[active] : null;

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Credentials"
        title={
          <>
            Education &amp; <span className="text-gradient">certifications.</span>
          </>
        }
        description="Verified academic honors and certifications. Click any card to view the full document."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => {
          const Icon = ICONS[c.icon];
          return (
            <motion.button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card text-left transition-colors duration-300 hover:border-accent/40"
              aria-label={`View ${c.name} certificate`}
            >
              {/* Thumbnail preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.02]">
                <Image
                  src={c.image}
                  alt={`${c.name} — ${c.issuer}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                {/* Hover affordance */}
                <div className="absolute inset-0 flex items-center justify-center bg-bg/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-bg/70 px-4 py-2 text-xs font-medium text-ink">
                    <Expand className="h-3.5 w-3.5 text-accent" />
                    View certificate
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    {c.issuer}
                  </p>
                  <h3 className="mt-0.5 font-heading font-semibold text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {c.note}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-semibold text-ink">
                    {current.name}
                  </p>
                  <p className="truncate text-xs text-muted">{current.issuer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={current.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    Open original <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative flex-1 overflow-auto bg-black/30 p-3">
                <img
                  src={current.image}
                  alt={`${current.name} — ${current.issuer}`}
                  className="mx-auto max-h-[74vh] w-auto rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
