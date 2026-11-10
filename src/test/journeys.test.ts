import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { GAMES } from "@/data/games";
import { getJourney } from "@/data/journeys";
import { SECTIONS, parseSection } from "@/data/sections";
import { routeTree } from "@/routeTree.gen";

const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("Game companion dashboards", () => {
  it.each(["elden-ring", "hollow-knight", "sekiro"])("/journey/%s opens the journey dashboard", (id) => {
    const match = router().matchRoutes(`/journey/${id}`).at(-1);
    expect(match?.routeId).toBe("/journey/$gameId");
    expect(match?.params).toMatchObject({ gameId: id });
  });

  it("each game has its own region identity", () => {
    expect(getJourney("elden-ring")?.region).toBe("Limgrave");
    expect(getJourney("hollow-knight")?.region).toBe("Hallownest");
    expect(getJourney("sekiro")?.region).toBe("Ashina");
  });

  it("every game offers Boss Coach, Lore Explorer, Build Creator and AI Companion", () => {
    expect(SECTIONS.map((s) => s.title)).toEqual(["Boss Coach", "Lore Explorer", "Build Creator", "AI Companion"]);
    for (const game of GAMES) {
      const journey = getJourney(game.id);
      expect(journey?.gameId).toBe(game.id);
      for (const s of SECTIONS) expect(journey?.sections[s.id].topics.length).toBeGreaterThan(0);
    }
  });

  it("unknown games and sections are rejected", () => {
    expect(getJourney("dark-souls")).toBeNull();
    expect(getJourney("toString")).toBeNull();
    expect(parseSection("boss-coach")).toBe("boss-coach");
    expect(parseSection("weapon-forge")).toBeUndefined();
  });
});
