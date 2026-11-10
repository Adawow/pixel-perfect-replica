import type { SectionDefinition, SectionId } from "@/types/journey";

export const SECTIONS: SectionDefinition[] = [
  {
    id: "boss-coach",
    title: "Boss Coach",
    description:
      "Study a fight before you face it — its phases, its openings and a calm plan for the next attempt.",
    capabilities: [
      "Break a boss into its phases and tells",
      "Suggest openings that suit the way you play",
      "Turn a failed attempt into one thing to try next",
    ],
  },
  {
    id: "lore-explorer",
    title: "Lore Explorer",
    description:
      "Follow the threads of the world — its people, its places and the questions it leaves open.",
    capabilities: [
      "Explain characters, places and events in plain words",
      "Keep spoilers behind your own progress",
      "Connect related stories to one another",
    ],
  },
  {
    id: "build-creator",
    title: "Build Creator",
    description:
      "Shape a build around how you like to play, then refine it as the journey changes.",
    capabilities: [
      "Recommend a direction from your playstyle",
      "Plan upgrades and priorities step by step",
      "Explain why each choice matters",
    ],
  },
  {
    id: "ai-companion",
    title: "AI Companion",
    description:
      "A patient voice beside the fire for anything the other sections don't cover.",
    capabilities: [
      "Answer questions about where to go next",
      "Keep track of where you are in your journey",
      "Offer a steady word after a hard loss",
    ],
  },
];

const SECTION_IDS = new Set<string>(SECTIONS.map((s) => s.id));

export const isSectionId = (value: unknown): value is SectionId =>
  typeof value === "string" && SECTION_IDS.has(value);

/** Unknown or missing values fall back to the overview (undefined). */
export const parseSection = (value: unknown): SectionId | undefined =>
  isSectionId(value) ? value : undefined;

export const getSection = (id: SectionId) => SECTIONS.find((s) => s.id === id) ?? null;
