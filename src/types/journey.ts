import type { GameId } from "./game";

export type SectionId = "boss-coach" | "lore-explorer" | "build-creator" | "ai-companion";

/** Shared definition of a companion feature, identical for every game. */
export interface SectionDefinition {
  id: SectionId;
  title: string;
  description: string;
  /** What the feature will do once AI is connected. */
  capabilities: string[];
}

/** Hand-written reference item (not generated). */
export interface JourneyTopic {
  name: string;
  note?: string;
}

export interface JourneySectionContent {
  /** Game-specific one-liner shown on the feature card. */
  summary: string;
  topicsLabel: string;
  topics: JourneyTopic[];
}

export type JourneyAtmosphereVariant = "grace" | "spores" | "leaves";

export interface Journey {
  gameId: GameId;
  region: string;
  restingPlace: string;
  restingNote: string;
  tagline: string;
  intro: string;
  metaDescription: string;
  atmosphere: JourneyAtmosphereVariant;
  scene: { src: string; alt: string };
  sections: Record<SectionId, JourneySectionContent>;
}
