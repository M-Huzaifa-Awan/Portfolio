"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  CheckCircle2,
  Loader2,
  Briefcase,
} from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SITE } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: SITE.socials.github },
  { icon: Linkedin, label: "LinkedIn", href: SITE.socials.linkedin },
  { icon: Briefcase, label: "Upwork", href: SITE.socials.upwork },
  { icon: Mail, label: "Email", href: SITE.socials.email },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio enquiry from ${form.name}`,
          from_name: "Portfolio",
          ...form,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Section id="contact">
      <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-[120px]"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: pitch */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="text-gradient">worth shipping.</span>
                </>
              }
              description="Have a product in mind, a system to modernize, or AI to integrate? Reach me by email or LinkedIn, I reply within a day."
            />

            <div className="mt-8 space-y-3">
              <a
                href={SITE.socials.email}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-accent/30"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted">Email</p>
                  <p className="text-sm font-medium text-ink group-hover:text-accent">
                    {SITE.email}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted">Location</p>
                  <p className="text-sm font-medium text-ink">{SITE.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4 }}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.02] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <s.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <a
              href={SITE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4 text-accent" />
              Prefer LinkedIn? Message me there →
            </a>
          </div>

          {/* Right: form */}
          <Reveal delayIndex={1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-wider text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project…"
                  className="resize-none rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:bg-white/[0.04]"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-accent px-6 py-3.5 text-sm font-semibold text-black shadow-glow-sm transition-all duration-300 hover:bg-accent-hover hover:shadow-glow disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Message sent
                  </>
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-emerald-400"
                  >
                    {accessKey
                      ? "Thanks, I'll get back to you shortly."
                      : "Opening your email client…"}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-400"
                  >
                    Something went wrong. Email {SITE.email} directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:bg-white/[0.04]"
      />
    </div>
  );
}
