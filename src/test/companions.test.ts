import { describe, expect, it } from "vitest";
import { GAMES } from "@/data/games";
import { COMPANIONS } from "@/data/companions";
import { REFERENCE } from "@/data/reference";
import { SECTIONS } from "@/data/sections";
import { CHAT_LIMITS, chatRequestSchema, contextWindow, parseChatHistory } from "@/lib/companion-chat";
import { companionInstructions } from "@/lib/companion-instructions.server";
import { addSavedBuild, parseDefeated, parseSavedBuilds } from "@/lib/device-records";

describe("AI companions", () => {
  it("each game has its own companion and its own instructions", () => {
    const prompts = GAMES.map((g) => companionInstructions(g.id));
    expect(new Set(prompts).size).toBe(3);
    expect(prompts[0]).toContain("Elden Ring");
    expect(prompts[1]).toContain("Hollow Knight");
    expect(prompts[2]).toContain("Sekiro");
    for (const g of GAMES) {
      expect(companionInstructions(g.id)).toContain(COMPANIONS[g.id].name);
      expect(companionInstructions(g.id)).toMatch(/never present your words as official game dialogue/i);
    }
  });

  it("only AI Companion is live AI; the other three are reference tools", () => {
    expect(SECTIONS.filter((s) => s.mode === "ai").map((s) => s.id)).toEqual(["ai-companion"]);
  });

  it("rejects unknown games, over-long messages and replies without a player question", () => {
    const ok = { gameId: "sekiro", messages: [{ role: "user", content: "How do I deflect?" }] };
    expect(chatRequestSchema.safeParse(ok).success).toBe(true);
    expect(chatRequestSchema.safeParse({ ...ok, gameId: "dark-souls" }).success).toBe(false);
    expect(chatRequestSchema.safeParse({ ...ok, messages: [{ role: "user", content: "x".repeat(2001) }] }).success).toBe(false);
    expect(chatRequestSchema.safeParse({ ...ok, messages: [{ role: "assistant", content: "Hi" }] }).success).toBe(false);
  });

  it("sends at most 16 recent messages, starting on a player message", () => {
    const history = Array.from({ length: 21 }, (_, i) => ({ id: String(i), role: i % 2 ? ("assistant" as const) : ("user" as const), text: `m${i}` }));
    const ctx = contextWindow(history);
    expect(ctx.length).toBeLessThanOrEqual(CHAT_LIMITS.maxContextMessages);
    expect(ctx[0]?.role).toBe("user");
    expect(ctx.at(-1)?.content).toBe("m20");
  });

  it("ignores corrupted chat history on the device", () => {
    expect(parseChatHistory("nonsense")).toEqual([]);
    expect(parseChatHistory([{ id: "1", role: "user", text: "hi" }])).toHaveLength(1);
  });
});

describe("Reference tools", () => {
  it("every game has bosses, lore and builds with all three stages", () => {
    for (const g of GAMES) {
      const ref = REFERENCE[g.id];
      expect(ref.bosses.length).toBeGreaterThanOrEqual(6);
      expect(ref.lore.length).toBeGreaterThanOrEqual(8);
      expect(ref.builds.length).toBeGreaterThanOrEqual(3);
      for (const b of ref.builds) for (const s of ["early", "mid", "late"] as const) expect(b.stages[s].length).toBeGreaterThan(0);
      const loreIds = new Set(ref.lore.map((l) => l.id));
      for (const l of ref.lore) for (const r of l.related) expect(loreIds.has(r)).toBe(true);
    }
  });

  it("saved builds replace same-named builds and cap at 12", () => {
    let list = parseSavedBuilds([], ["strength"]);
    for (let i = 0; i < 14; i++) list = addSavedBuild(list, { name: `Build ${i}`, archetypeId: "strength", stage: "early" }, i);
    expect(list).toHaveLength(12);
    list = addSavedBuild(list, { name: "build 13", archetypeId: "strength", stage: "late" }, 99);
    expect(list.filter((b) => b.name.toLowerCase() === "build 13")).toHaveLength(1);
    expect(addSavedBuild([], { name: "   ", archetypeId: "strength", stage: "early" })).toEqual([]);
  });

  it("drops saved data that no longer matches the game", () => {
    expect(parseSavedBuilds([{ id: "a", name: "x", archetypeId: "gone", stage: "mid", savedAt: 1 }], ["strength"])).toEqual([]);
    expect(parseDefeated(["margit", "margit", "unknown", 4], ["margit"])).toEqual(["margit"]);
  });
});
