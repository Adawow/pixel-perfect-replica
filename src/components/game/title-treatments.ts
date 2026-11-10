import type { Game } from "@/types/game";

/** Each game keeps the same title voice on the homepage and on its dashboard. */
export const selectorTitleTreatments: Record<Game["treatment"], string> = {
  wide: "font-display text-3xl uppercase tracking-[0.22em] lg:text-4xl",
  light: "font-display text-3xl italic font-light tracking-[0.06em] lg:text-4xl",
  condensed: "font-sans text-2xl font-semibold uppercase tracking-[0.5em] lg:text-3xl",
};

export const heroTitleTreatments: Record<Game["treatment"], string> = {
  wide: "font-display text-5xl uppercase tracking-[0.18em] md:text-7xl",
  light: "font-display text-6xl italic font-light tracking-[0.04em] md:text-8xl",
  condensed: "font-sans text-3xl font-semibold uppercase tracking-[0.45em] md:text-5xl",
};
