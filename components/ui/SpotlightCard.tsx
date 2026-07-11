"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the spotlight glow in px. */
  radius?: number;
  /** Iridescent conic "prism" ring that ignites and rotates on hover. */
  prism?: boolean;
  /** Subtle 3D perspective tilt following the cursor (fine pointers only). */
  tilt?: boolean;
};

const MAX_TILT = 3; // degrees

/** True only for mouse-like pointers; cached after first check. */
let finePointer: boolean | null = null;
function hasFinePointer() {
  if (finePointer === null) {
    finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }
  return finePointer;
}

/**
 * Glass card with a cursor-tracking radial spotlight and a subtle
 * border highlight that follows the mouse. Pure CSS variables — no re-render
 * on every mouse move beyond the hover flag. Optional prism ring and 3D tilt
 * (both transform/opacity only, desktop pointers only).
 */
export function SpotlightCard({
  children,
  className,
  radius = 350,
  prism = false,
  tilt = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (tilt && hasFinePointer()) {
      el.style.setProperty(
        "--ry",
        `${(x / rect.width - 0.5) * 2 * MAX_TILT}deg`,
      );
      el.style.setProperty(
        "--rx",
        `${(0.5 - y / rect.height) * 2 * MAX_TILT}deg`,
      );
    }
  };

  const handleLeave = () => {
    setHovered(false);
    const el = ref.current;
    if (el && tilt) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ "--spot": `${radius}px` } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300",
        "hover:border-accent/30",
        tilt && "card-tilt",
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
      {/* Prism ring: refracted spectrum tracing the card edge */}
      {prism && (
        <div
          aria-hidden
          className={cn(
            "prism-ring pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-500",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
