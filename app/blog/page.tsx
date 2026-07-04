import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { POSTS, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing — Engineering, AI & Full-Stack Development",
  description:
    "Deep dives on the systems I ship — MCP servers and AI integration, .NET performance, and what actually matters when hiring a senior full-stack developer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://huzaifaawan.com/blog",
    title: "Writing — Muhammad Huzaifa Awan",
    description:
      "Deep dives on MCP servers, AI integration, .NET performance, and senior full-stack engineering.",
  },
};

export default function BlogIndex() {
  const posts = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="container-x py-8">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">Writing</span>
        <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Notes on shipping{" "}
          <span className="text-gradient">real software.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Practical deep dives on the systems I build — AI and MCP servers,
          performance engineering, and lessons from shipping to production.
        </p>

        <div className="mt-12 space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-medium text-accent">
                  {post.tags[0]}
                </span>
                <span>{formatDate(post.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>
              <h2 className="mt-4 font-heading text-xl font-semibold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
