import { Github, Linkedin, Mail, Briefcase, ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";

const SOCIALS = [
  { icon: Github, href: SITE.socials.github, label: "GitHub" },
  { icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { icon: Briefcase, href: SITE.socials.upwork, label: "Upwork" },
  { icon: Mail, href: SITE.socials.email, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-sm font-bold text-accent ring-1 ring-accent/30">
                HA
              </span>
              <span className="font-heading text-lg font-semibold">
                Huzaifa Awan
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Senior Full Stack Developer building scalable web apps, AI-powered
              SaaS and enterprise systems. Open to senior roles and select
              freelance work.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.02] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Navigate
              </h4>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="link-underline text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Get in touch
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={SITE.socials.email}
                    className="link-underline text-muted transition-colors hover:text-ink"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-muted transition-colors hover:text-ink"
                  >
                    Download CV
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {SITE.name}. Designed &amp; built from scratch.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
