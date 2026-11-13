import type { SectionDefinition, SectionId } from "@/types/journey";

export const SECTIONS: SectionDefinition[] = [
  {
    id: "boss-coach",
    title: "Boss Coach",
    description:
      "Study a fight before you face it — its phases, its openings and a calm plan for the next attempt.",
    mode: "reference",
    capabilities: [
      "See each boss's phases, tips and counters",
      "Filter by required, optional or not yet defeated",
      "Track the bosses you've beaten on this device",
    ],
  },
  {
    id: "lore-explorer",
    title: "Lore Explorer",
    description:
      "Follow the threads of the world — its people, its places and the questions it leaves open.",
    mode: "reference",
    capabilities: [
      "Search characters, places and powers",
      "Keep late-game entries hidden until you choose",
      "Jump between connected threads",
    ],
  },
  {
    id: "build-creator",
    title: "Build Creator",
    description:
      "Shape a build around how you like to play, then refine it as the journey changes.",
    mode: "reference",
    capabilities: [
      "Pick a playstyle and a stage of the journey",
      "See the gear, skills and priorities that fit",
      "Save builds on this device and reload them",
    ],
  },
  {
    id: "ai-companion",
    title: "AI Companion",
    description:
      "A patient voice beside the fire for anything the other sections don't cover.",
    mode: "ai",
    capabilities: [
      "Answer any question about the game with live AI",
      "Remember the conversation on this device",
      "Start fresh whenever you like",
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
