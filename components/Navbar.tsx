"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { LogoMark } from "./ui/LogoMark";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Desktop: floating pill bar (unchanged look, lg and up only) */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 lg:flex"
      >
        <nav
          className={cn(
            "flex w-full max-w-content items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300",
            scrolled
              ? "glass shadow-card"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-semibold tracking-tight">
              Huzaifa Awan
            </span>
          </a>

          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black shadow-glow-sm transition-all duration-300 hover:bg-accent-hover hover:shadow-glow"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </motion.header>

      {/* Mobile: the logo scrolls away with the page — nothing bar-like
          stays pinned over the content. */}
      <a
        href="#home"
        aria-label="Home"
        className="absolute left-5 top-5 z-40 lg:hidden"
      >
        <LogoMark className="h-10 w-10" />
      </a>

      {/* Mobile: floating menu button — the only fixed element. Sits above
          the drawer so it doubles as its close button. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-4 top-4 z-[85] grid h-11 w-11 place-items-center rounded-full border border-line bg-[#0d0d0d]/90 text-ink shadow-card backdrop-blur-md lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile: menu slides in from the right when the button is tapped */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[75] bg-black/60 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              className="fixed inset-y-0 right-0 z-[80] flex w-[290px] max-w-[85vw] flex-col border-l border-line bg-[#0b0b0b] p-5"
            >
              <a
                href="#home"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-2 py-1.5"
                aria-label="Home"
              >
                <LogoMark className="h-9 w-9" />
                <span className="text-sm font-semibold tracking-tight">
                  Huzaifa Awan
                </span>
              </a>

              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-[15px] transition-colors",
                        isActive
                          ? "bg-white/[0.06] font-medium text-ink"
                          : "text-muted hover:bg-white/[0.04] hover:text-ink",
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold text-black"
              >
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
