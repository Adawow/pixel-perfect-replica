import type { CSSProperties } from "react";
import type { JourneyAtmosphereVariant } from "@/types/journey";

// Deterministic pseudo-random spread so server and client markup match.
const spread = (i: number, seed: number) => ((i * 9301 + seed * 49297) % 233280) / 233280;

const COUNT: Record<JourneyAtmosphereVariant, number> = { grace: 14, spores: 18, leaves: 12 };

export function JourneyAtmosphere({ variant }: { variant: JourneyAtmosphereVariant }) {
  const particles = Array.from({ length: COUNT[variant] }, (_, i) => {
    const style = {
      left: `${(spread(i, 1) * 100).toFixed(2)}%`,
      animationDelay: `${(spread(i, 2) * 12).toFixed(2)}s`,
      animationDuration: `${(variant === "leaves" ? 11 : 9) + spread(i, 3) * 8}s`,
      "--drift": `${Math.round((spread(i, 4) - 0.5) * 120)}px`,
      "--size": `${(variant === "leaves" ? 6 : 2) + Math.round(spread(i, 5) * 4)}px`,
    } as CSSProperties;
    return { key: i, style };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="journey-mist absolute inset-x-[-10%] bottom-[12%] h-1/3" />
      {particles.map((p) => (
        <span
          key={p.key}
          className={variant === "leaves" ? "journey-leaf" : variant === "grace" ? "journey-mote bottom-[18%]" : "journey-spore bottom-[10%]"}
          style={p.style}
        />
      ))}
    </div>
  );
}
