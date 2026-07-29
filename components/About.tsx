"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ABOUT_CAPABILITIES, HERO_STATS } from "@/lib/data";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors duration-300 hover:border-accent/25">
      <p className="font-heading text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1.5 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [_, setSeen] = useState(false);
  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Senior engineer who owns problems{" "}
            <span className="text-gradient">end to end.</span>
          </>
        }
      />

      <div ref={ref} className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I&apos;m a Senior Full Stack Developer with{" "}
            <span className="text-ink">years of experience</span> architecting
            and shipping SaaS platforms, AI-driven applications and payment
            infrastructure alongside US-based product teams.
          </p>
          <p>
            I own complex problems end-to-end, from database design and API
            architecture to frontend performance and production monitoring.
            I&apos;ve built systems serving{" "}
            <span className="text-ink">100+ concurrent users</span> at sub-50ms
            response times with 95% Redis cache hit rates, integrated{" "}
            <span className="text-ink">Claude and OpenAI</span> with structured
            outputs, and rolled out multilingual experiences at scale.
          </p>
          <p>
            My day-to-day is .NET Core, React, Next.js, and TypeScript, but
            I&apos;ll reach for whatever the problem actually needs: WebSockets
            for live preview, iTextSharp for dynamic PDFs, Stripe for
            subscriptions, a custom MCP server for AI tooling.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
            {HERO_STATS.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </Reveal>

        <Reveal delayIndex={1}>
          <div className="glass h-full rounded-3xl p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">
              What I do
            </h3>
            <ul className="mt-5 space-y-3.5">
              {ABOUT_CAPABILITIES.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
