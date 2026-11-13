/** Labels whether a feature is live AI or a hand-written reference tool. */
export function FeatureModeBadge({ mode }: { mode: "ai" | "reference" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-border px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-faint">
      <span className={mode === "ai" ? "h-1.5 w-1.5 rounded-full bg-ember fire-glow" : "h-1.5 w-1.5 rounded-full bg-journey/70"} aria-hidden />
      {mode === "ai" ? "Live AI" : "Reference tool"}
    </span>
  );
}
