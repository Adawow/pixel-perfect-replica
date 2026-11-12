/** Hand-written, rule-based reference data for the non-AI tools. */
export interface BossGuide {
  id: string;
  name: string;
  location: string;
  required: boolean;
  /** 1 (gentle) to 5 (brutal). */
  difficulty: 1 | 2 | 3 | 4 | 5;
  phases: string[];
  tips: string[];
  counters: string[];
}

export interface LoreEntry {
  id: string;
  title: string;
  category: string;
  summary: string;
  /** Ids of other entries in the same game. */
  related: string[];
  /** Late-game or story-revealing entries stay hidden until the reader opts in. */
  spoiler?: boolean;
}

export type BuildStage = "early" | "mid" | "late";

export interface BuildSlot {
  label: string;
  items: string[];
}

export interface BuildArchetype {
  id: string;
  name: string;
  style: string;
  description: string;
  stages: Record<BuildStage, BuildSlot[]>;
}

export interface GameReference {
  bosses: BossGuide[];
  lore: LoreEntry[];
  builds: BuildArchetype[];
  stageLabels: Record<BuildStage, string>;
}
