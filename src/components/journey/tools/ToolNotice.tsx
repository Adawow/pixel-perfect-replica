import { getCompanion } from "@/data/companions";
import type { GameId } from "@/types/game";

/** Tells the reader whether a feature is rule-based or genuinely AI-generated. */
export function ToolNotice({ mode, gameId }: { mode: "reference" | "ai"; gameId: GameId }) {
  const companion = getCompanion(gameId);
  return (
    <div role="note" className="flex gap-4 border-l-2 border-journey/60 bg-secondary/70 px-5 py-4">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-journey" aria-hidden />
      <div className="text-sm leading-relaxed">
        {mode === "reference" ? (
          <>
            <p className="font-medium text-foreground">Reference tool: written by hand, not by AI.</p>
            <p className="mt-1 text-muted-foreground">
              Everything here comes from notes written by hand, and your progress is saved on this device. For anything these notes don't cover, ask {companion.name} in AI Companion.
            </p>
          </>
        ) : (
          <>
            <p className="font-medium text-foreground">Live AI: answers are generated as you ask.</p>
            <p className="mt-1 text-muted-foreground">
              {companion.name} is an original companion, not a character from the game. AI answers can be wrong, so check important details in the game. Your conversation is saved only on this device.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
