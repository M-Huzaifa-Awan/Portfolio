"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { SERVICES } from "@/lib/data";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Everything you need to ship a{" "}
            <span className="text-gradient">serious product.</span>
          </>
        }
        description="From zero-to-one SaaS builds to modernizing legacy systems and wiring AI into your stack. One senior engineer, full ownership."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <SpotlightCard className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col p-6 sm:p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/25 transition-all duration-300 group-hover:shadow-glow-sm">
                  <service.icon className="h-6 w-6" />
                </span>

                <h3 className="mt-6 font-heading text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
