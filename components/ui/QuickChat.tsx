"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, PhoneCall, Ghost, Mail, ArrowUpRight } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { SITE } from "@/lib/data";

const ACTIONS = [
  {
    icon: PhoneCall,
    label: "Book a call",
    hint: "Jump to the contact form",
    href: "#contact",
  },
  {
    icon: Ghost,
    label: "Leave anonymous feedback",
    hint: "No name or email needed",
    href: "#feedback",
  },
  {
    icon: Mail,
    label: "Email directly",
    hint: SITE.email,
    href: SITE.socials.email,
  },
];

/** Floating chat-style launcher, bottom-right, with quick contact actions. */
export function QuickChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="card-surface absolute bottom-16 right-0 w-[calc(100vw-2.5rem)] max-w-[320px] overflow-hidden rounded-3xl shadow-card sm:bottom-[4.5rem]"
          >
            <div className="flex items-center gap-3 border-b border-line p-4">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                <LogoMark className="h-5 w-5" glow={false} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111] bg-emerald-400" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">Huzaifa Awan</p>
                <p className="text-xs text-muted">Usually replies within a day</p>
              </div>
            </div>

            <div className="p-4">
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-ink">
                Hey 👋 Have a project in mind, or just want to say hi? Pick one below.
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {ACTIONS.map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    onClick={() => setOpen(false)}
                    target={a.href.startsWith("http") ? "_blank" : undefined}
                    rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-3.5 py-3 text-left transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <a.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {a.label}
                      </span>
                      <span className="block truncate text-xs text-muted">{a.hint}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick contact" : "Open quick contact"}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent text-black shadow-glow transition-colors hover:bg-accent-hover"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
