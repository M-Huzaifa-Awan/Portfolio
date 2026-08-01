"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Send, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Reveal } from "./ui/Reveal";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Anonymous "leave your thoughts" box. No name or email is collected.
 * `place` is a coarse location string (e.g. "Lahore, Pakistan") fetched
 * from /api/geo, which reads Vercel's edge geolocation headers, never a
 * raw IP address, and it's disclosed in the UI so nothing here is covert.
 */
export function Feedback() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [place, setPlace] = useState<string | null>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => setPlace(d.place ?? null))
      .catch(() => setPlace(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: real users never fill this in.
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.value;
    if (botcheck) return;

    if (!message.trim() || !accessKey) return;
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Anonymous feedback${place ? ` — ${place}` : ""}`,
          from_name: "Anonymous (Portfolio)",
          message,
          approx_location: place ?? "Unknown",
          page: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setMessage("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div id="feedback" className="container-x scroll-mt-24 pb-20 sm:pb-24">
      <Reveal>
        <div className="glass mx-auto max-w-2xl rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25">
              <Ghost className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-ink">
                Leave your thoughts
              </h3>
              <p className="text-xs text-muted">
                Fully anonymous. No name or email, ever.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Honest feedback on the site, an idea, or just a hello…"
              className="resize-none rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:bg-white/[0.04]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-1.5 text-[11px] leading-snug text-muted/70">
                <MapPin className="h-3 w-3 shrink-0" />
                {place
                  ? `Sent as someone from ${place}. That's all we see.`
                  : "We only see your approximate country. Never your name, email, or exact location."}
              </p>

              <motion.button
                type="submit"
                disabled={status === "sending" || !message.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Sent
                  </>
                ) : (
                  <>
                    Send <Send className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400"
                >
                  Something went wrong, mind trying again?
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
