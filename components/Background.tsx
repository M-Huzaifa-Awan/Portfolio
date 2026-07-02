/**
 * Ambient page background: deep black base, orange radial glows, blurred
 * circles, a faint dotted grid and a noise overlay. Fixed + non-interactive.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      {/* Base radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,53,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)]" />

      {/* Blurred ambient circles */}
      <div className="absolute -left-40 top-[10%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="absolute right-[-10%] top-[40%] h-[380px] w-[380px] rounded-full bg-accent/[0.07] blur-[140px]" />
      <div className="absolute bottom-[5%] left-[30%] h-[360px] w-[360px] rounded-full bg-orange-500/[0.05] blur-[150px]" />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Noise grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
