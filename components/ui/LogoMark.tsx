import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Adds a soft orange glow behind the mark. */
  glow?: boolean;
};

/** Hexagon "A" monogram used across the nav, footer and favicon. */
export function LogoMark({ className, glow = true }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      role="img"
      aria-label="Huzaifa Awan logo"
      className={cn("h-9 w-9", className)}
      style={glow ? { filter: "drop-shadow(0 0 6px rgba(255,107,53,0.45))" } : undefined}
    >
      <path
        d="M100 26 L164 63 L164 137 L100 174 L36 137 L36 63 Z"
        stroke="url(#logo-grad)"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M70 134 L100 58 L130 134"
        stroke="url(#logo-grad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M83 107 L117 107"
        stroke="url(#logo-grad)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#ff8a4c" />
        </linearGradient>
      </defs>
    </svg>
  );
}
