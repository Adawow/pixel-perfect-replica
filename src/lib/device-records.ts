import { z } from "zod";
import type { BuildStage } from "@/types/reference";

export interface SavedBuild {
  id: string;
  name: string;
  archetypeId: string;
  stage: BuildStage;
  savedAt: number;
}

export const MAX_SAVED_BUILDS = 12;
export const MAX_BUILD_NAME = 40;

const savedBuildSchema = z.object({
  id: z.string(),
  name: z.string().max(MAX_BUILD_NAME),
  archetypeId: z.string(),
  stage: z.enum(["early", "mid", "late"]),
  savedAt: z.number(),
});

/** Keeps only valid saved builds whose archetype still exists. */
export function parseSavedBuilds(raw: unknown, archetypeIds: string[]): SavedBuild[] {
  if (!Array.isArray(raw)) return [];
  const valid = new Set(archetypeIds);
  return raw
    .map((item) => savedBuildSchema.safeParse(item))
    .flatMap((r) => (r.success && valid.has(r.data.archetypeId) ? [r.data] : []))
    .slice(0, MAX_SAVED_BUILDS);
}

/** Adds a build at the top, replacing one with the same name and capping the list. */
export function addSavedBuild(list: SavedBuild[], build: Omit<SavedBuild, "id" | "savedAt">, now = Date.now()): SavedBuild[] {
  const name = build.name.trim().slice(0, MAX_BUILD_NAME);
  if (!name) return list;
  const entry: SavedBuild = { ...build, name, id: `${now}-${Math.random().toString(36).slice(2, 8)}`, savedAt: now };
  return [entry, ...list.filter((b) => b.name.toLowerCase() !== name.toLowerCase())].slice(0, MAX_SAVED_BUILDS);
}

/** Boss ids marked defeated on this device. */
export function parseDefeated(raw: unknown, bossIds: string[]): string[] {
  if (!Array.isArray(raw)) return [];
  const valid = new Set(bossIds);
  return [...new Set(raw.filter((v): v is string => typeof v === "string" && valid.has(v)))];
}
