import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { PostBody } from "@/components/blog/PostBody";
import { POSTS, POST_SLUGS, getPost, formatDate } from "@/lib/posts";

const SITE_URL = "https://huzaifaawan.com";

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ["Muhammad Huzaifa Awan"],
      images: [{ url: "/cover.png", width: 1600, height: 960, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/cover.png"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords.join(", "),
    image: `${SITE_URL}/cover.png`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Muhammad Huzaifa Awan",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Huzaifa Awan",
      url: SITE_URL,
    },
  };

  return (
    <article className="container-x py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-medium text-accent"
            >
              {t}
            </span>
          ))}
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 border-b border-line pb-8 text-lg leading-relaxed text-muted">
          {post.description}
        </p>

        <div className="mt-8">
          <PostBody body={post.body} />
        </div>

        {/* Author / CTA */}
        <div className="mt-14 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            Written by
          </p>
          <h3 className="mt-1 font-heading text-lg font-semibold text-ink">
            Muhammad Huzaifa Awan
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Senior Full Stack Developer building scalable web apps, AI-powered
            SaaS and enterprise systems. Available for senior roles and select
            remote contract roles.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-glow-sm"
          >
            Work with me <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading text-lg font-semibold text-ink">
              Keep reading
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <p className="font-heading text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                    {r.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
