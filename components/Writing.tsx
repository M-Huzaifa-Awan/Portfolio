"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Tilt } from "./ui/Tilt";
import { SnapCarousel } from "./ui/SnapCarousel";
import { POSTS, formatDate } from "@/lib/posts";

export function Writing() {
  const posts = [...POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Section id="writing">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          className="mb-0"
          eyebrow="Writing"
          title={
            <>
              Notes on <span className="text-gradient">real software.</span>
            </>
          }
          description="Deep dives on AI and MCP servers, performance, and shipping to production."
        />
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-ink"
        >
          All writing
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Below md the post cards become a snap slider with arrow/dot
          controls; uniform slide sizes with the next card peeking in. */}
      <SnapCarousel
        trackClassName="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-6 -mx-6 px-6 pb-2 scrollbar-none sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:scroll-px-0 md:px-0 md:pb-0"
        slideClassName="w-[78vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
        controlsClassName="md:hidden"
        slides={posts.map((post, i) => ({
          key: post.slug,
          content: (
          <Reveal delayIndex={i} className="h-full">
            <Tilt className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-medium text-accent">
                  {post.tags[0]}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted">
                <span>{formatDate(post.date)}</span>
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
            </Tilt>
          </Reveal>
          ),
        }))}
      />
    </Section>
  );
}
