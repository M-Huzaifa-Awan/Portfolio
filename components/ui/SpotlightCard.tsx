"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the spotlight glow in px. */
  radius?: number;
};

/**
 * Glass card with a cursor-tracking radial spotlight and a subtle
 * border highlight that follows the mouse. Pure CSS variables — no re-render
 * on every mouse move beyond the hover flag.
 */
export function SpotlightCard({
  children,
  className,
  radius = 350,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--spot": `${radius}px` } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300",
        "hover:border-accent/30",
        className,
      )}
    >
      {/* Spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot) circle at var(--x) var(--y), rgba(255,107,53,0.14), transparent 60%)",
        }}
      />
      {/* Border highlight */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0",
        )}
        style={{
          background:
            "radial-gradient(200px circle at var(--x) var(--y), rgba(255,138,76,0.35), transparent 65%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
