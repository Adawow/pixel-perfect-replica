/** Shared look for toggle-style choices in the reference tools. */
export const choiceClass = (active: boolean) =>
  [
    "border px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    active
      ? "border-journey bg-journey/15 text-foreground"
      : "border-border text-muted-foreground hover:border-journey/40 hover:text-foreground",
  ].join(" ");
