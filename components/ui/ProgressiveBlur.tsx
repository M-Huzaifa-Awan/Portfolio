/**
 * Progressive "gradual" blur pinned to the top of the viewport.
 *
 * Five stacked backdrop-filter layers, each gradient-masked to a band, so
 * content melts smoothly into the top edge as it scrolls under the navbar
 * instead of passing a hard line. Desktop only (backdrop-filter is too
 * expensive to composite on mobile, same rule as `.glass`), and it is
 * pure paint: nothing animates, so there is zero scroll-jank cost.
 */

const LAYERS: { blur: number; mask: string }[] = [
  { blur: 24, mask: "linear-gradient(to bottom, black 0%, black 8%, transparent 32%)" },
  { blur: 12, mask: "linear-gradient(to bottom, transparent 0%, black 14%, black 26%, transparent 50%)" },
  { blur: 6, mask: "linear-gradient(to bottom, transparent 18%, black 34%, black 46%, transparent 68%)" },
  { blur: 3, mask: "linear-gradient(to bottom, transparent 38%, black 54%, black 64%, transparent 84%)" },
  { blur: 1.5, mask: "linear-gradient(to bottom, transparent 58%, black 74%, transparent 100%)" },
];

export function ProgressiveBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-28 md:block"
    >
      {LAYERS.map((l) => (
        <div
          key={l.blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${l.blur}px)`,
            WebkitBackdropFilter: `blur(${l.blur}px)`,
            maskImage: l.mask,
            WebkitMaskImage: l.mask,
          }}
        />
      ))}
      {/* Faint tint so the melt blends into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.15) 45%, transparent)",
        }}
      />
    </div>
  );
}
