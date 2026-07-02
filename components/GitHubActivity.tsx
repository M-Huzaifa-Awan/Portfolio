"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Github, Star, ArrowUpRight, BookMarked, Lock } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SITE, GITHUB_TOTALS } from "@/lib/data";

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
};

// Deterministic pseudo-random so SSR/CSR match and it doesn't reshuffle.
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Heatmap() {
  const weeks = 26;
  const days = 7;
  const cells = useMemo(
    () =>
      Array.from({ length: weeks * days }, (_, i) => {
        const r = seeded(i + 1);
        const level = r > 0.78 ? 4 : r > 0.62 ? 3 : r > 0.42 ? 2 : r > 0.2 ? 1 : 0;
        return level;
      }),
    [],
  );

  const shade = ["rgba(255,255,255,0.05)", "rgba(255,107,53,0.25)", "rgba(255,107,53,0.45)", "rgba(255,107,53,0.7)", "#ff6b35"];

  return (
    <div
      className="grid w-full gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="grid gap-[3px]">
          {Array.from({ length: days }).map((_, d) => {
            const i = w * days + d;
            return (
              <motion.span
                key={d}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 60) * 0.006, duration: 0.25 }}
                className="aspect-square w-full rounded-[2px]"
                style={{ backgroundColor: shade[cells[i]] }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${SITE.githubUser}/repos?sort=pushed&per_page=30`,
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        if (cancelled) return;
        const clean = data
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
          )
          .slice(0, 4);
        setRepos(clean);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title={
          <>
            Always <span className="text-gradient">building.</span>
          </>
        }
        description="Consistent, everyday commits. Most client work is private and under NDA, but here's a look at the public side."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* Heatmap card */}
        <Reveal>
          <div className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] text-ink ring-1 ring-line">
                  <Github className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-ink">
                    @{SITE.githubUser}
                  </p>
                  <p className="text-xs text-muted">Contribution activity</p>
                </div>
              </div>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
              >
                Follow <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-8">
              <Heatmap />
              <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
                Less
                {["rgba(255,255,255,0.05)", "rgba(255,107,53,0.25)", "rgba(255,107,53,0.45)", "rgba(255,107,53,0.7)", "#ff6b35"].map(
                  (c) => (
                    <span
                      key={c}
                      className="h-2.5 w-2.5 rounded-[2px]"
                      style={{ backgroundColor: c }}
                    />
                  ),
                )}
                More
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
              {[
                { label: "Total repositories", value: GITHUB_TOTALS.totalRepos },
                { label: "Visibility", value: GITHUB_TOTALS.visibility },
                { label: "Primary stack", value: GITHUB_TOTALS.stack },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-line bg-white/[0.02] p-4 text-center"
                >
                  <p className="font-heading text-lg font-bold text-accent sm:text-xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] leading-snug text-muted">
              <Lock className="h-3 w-3 shrink-0" />
              Most client work lives in private repos under NDA — only a slice is
              public.
            </p>
          </div>
        </Reveal>

        {/* Latest repos */}
        <Reveal delayIndex={1}>
          <div className="flex h-full flex-col gap-3">
            {!repos && !error &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[92px] animate-pulse rounded-2xl border border-line bg-white/[0.02]"
                />
              ))}

            {error && (
              <div className="glass flex h-full flex-col items-center justify-center gap-3 rounded-3xl p-8 text-center">
                <BookMarked className="h-6 w-6 text-muted" />
                <p className="text-sm text-muted">
                  Couldn&apos;t load live repos right now.
                </p>
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-accent-hover"
                >
                  Browse on GitHub →
                </a>
              </div>
            )}

            {repos?.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="group flex flex-col rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-accent/30"
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm font-semibold text-ink group-hover:text-accent">
                    {repo.name}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                {repo.description && (
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {repo.description}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            LANG_COLOR[repo.language] ?? "#8b8b8b",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
