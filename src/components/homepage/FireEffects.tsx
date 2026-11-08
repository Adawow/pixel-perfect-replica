const EMBERS = [
  { left: "0%", delay: "0s", dur: "4.2s", drift: "-8px" },
  { left: "30%", delay: "1.3s", dur: "5s", drift: "12px" },
  { left: "55%", delay: "2.4s", dur: "4.6s", drift: "-14px" },
  { left: "75%", delay: "0.7s", dur: "5.6s", drift: "6px" },
  { left: "45%", delay: "3.4s", dur: "4.8s", drift: "18px" },
  { left: "15%", delay: "2s", dur: "6s", drift: "-4px" },
];

/** Glow + drifting embers, positioned over the fire in the illustration. */
export function FireEffects() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-[57%] top-[42%] h-[40%] w-[20%]">
      <div className="fire-glow absolute -inset-[60%] rounded-full mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-1/3 h-1/2">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember-particle bottom-0"
            style={
              {
                left: e.left,
                animationDelay: e.delay,
                animationDuration: e.dur,
                "--drift": e.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
