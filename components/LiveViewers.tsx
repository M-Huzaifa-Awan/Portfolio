"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ha-presence-id";
const HEARTBEAT_MS = 20_000;

function sessionId() {
  const existing = sessionStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(STORAGE_KEY, id);
  return id;
}

type Listener = (count: number) => void;

let listeners = 0;
let latest: number | null = null;
const subs = new Set<Listener>();
let intervalId = 0;

function emit(count: number) {
  latest = count;
  subs.forEach((fn) => fn(count));
}

async function ping() {
  if (document.visibilityState === "hidden") return;
  try {
    const res = await fetch("/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sessionId() }),
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = (await res.json()) as { count?: number };
    if (typeof data.count === "number") emit(data.count);
  } catch {
    // Keep the last known count if the network blips.
  }
}

function onVisible() {
  if (document.visibilityState === "visible") void ping();
}

function subscribe(fn: Listener) {
  subs.add(fn);
  if (latest != null) fn(latest);
  listeners += 1;
  if (listeners === 1) {
    void ping();
    intervalId = window.setInterval(() => void ping(), HEARTBEAT_MS);
    document.addEventListener("visibilitychange", onVisible);
  }
  return () => {
    subs.delete(fn);
    listeners -= 1;
    if (listeners === 0) {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisible);
    }
  };
}

function useLiveCount() {
  const [count, setCount] = useState<number | null>(latest);
  useEffect(() => subscribe(setCount), []);
  return count;
}

export function LiveViewers({ className }: { className?: string }) {
  const count = useLiveCount();
  if (count == null) return null;

  const label = `${count} ${count === 1 ? "person" : "people"} currently on the site`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs text-muted",
        className,
      )}
      aria-live="polite"
      aria-label={label}
      title={label}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute hidden h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden sm:inline-flex" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span>
        <span className="font-medium tabular-nums text-ink">{count}</span>
        {" "}
        online
      </span>
    </span>
  );
}
