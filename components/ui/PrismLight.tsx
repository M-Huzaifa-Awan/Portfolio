/**
 * Prism light: refracted spectral shafts falling diagonally across the hero,
 * like light dispersed through a prism. The spectrum is biased to the brand
 * (amber -> orange -> rose -> violet) and blended with `screen`, so it reads
 * as luminous streaks over the portrait rather than a rainbow sticker.
 *
 * Desktop only. Each shaft animates transform only (GPU-composited) with a
 * very slow drift; static blur is painted once, so scrolling stays smooth.
 */

type Shaft = {
  left: string;
  width: number;
  tilt: string;
  duration: string;
  delay: string;
  opacity: number;
};

const SHAFTS: Shaft[] = [
  { left: "40%", width: 210, tilt: "22deg", duration: "17s", delay: "0s", opacity: 0.9 },
  { left: "58%", width: 130, tilt: "25deg", duration: "23s", delay: "-6s", opacity: 0.7 },
  { left: "73%", width: 170, tilt: "19deg", duration: "20s", delay: "-12s", opacity: 0.55 },
];

export function PrismLight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden md:block"
      style={{ mixBlendMode: "screen" }}
    >
      {SHAFTS.map((s) => (
        <span
          key={s.left}
          className="prism-shaft"
          style={
            {
              left: s.left,
              width: `${s.width}px`,
              opacity: s.opacity,
              animationDuration: s.duration,
              animationDelay: s.delay,
              "--tilt": s.tilt,
            } as React.CSSProperties
          }
        />
      ))}

      <style>{`
        .prism-shaft {
          position: absolute;
          top: -25%;
          height: 150%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 176, 64, 0.09) 22%,
            rgba(255, 107, 53, 0.16) 42%,
            rgba(255, 96, 128, 0.10) 62%,
            rgba(150, 110, 255, 0.08) 80%,
            transparent 100%
          );
          filter: blur(18px);
          transform: rotate(var(--tilt)) translateX(0);
          animation-name: prism-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform;
        }
        /* Thin, sharper dispersion core inside each shaft for the "refracted
           edge" that sells the prism. */
        .prism-shaft::after {
          content: "";
          position: absolute;
          inset: 0 42% 0 40%;
          background: linear-gradient(
            90deg,
            rgba(255, 200, 120, 0.16),
            rgba(255, 107, 53, 0.22) 50%,
            rgba(168, 130, 255, 0.14)
          );
          filter: blur(4px);
        }
        @keyframes prism-drift {
          from { transform: rotate(var(--tilt)) translateX(-44px); }
          to { transform: rotate(var(--tilt)) translateX(44px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prism-shaft { animation: none; }
        }
      `}</style>
    </div>
  );
}
