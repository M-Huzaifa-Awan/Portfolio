"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

// No permanent `will-change`: it pins a compositor layer per button for the
// life of the page, which is wasted memory on phones where the magnetic
// effect never runs. Framer sets it while an animation is actually active.
const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 select-none";

const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-black hover:bg-accent-hover shadow-glow-sm hover:shadow-glow",
  secondary:
    "glass text-ink hover:border-accent/40 hover:text-white",
  ghost: "text-muted hover:text-ink",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 z-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </span>
      )}
    </>
  );

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick,
    style: { x: sx, y: sy },
    className: cn(base, variants[variant], className),
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...sharedProps} type="button">
      {content}
    </motion.button>
  );
}
