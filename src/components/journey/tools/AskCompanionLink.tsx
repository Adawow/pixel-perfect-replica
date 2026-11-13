import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { getCompanion } from "@/data/companions";
import type { GameId } from "@/types/game";

/** Opens the AI Companion with a question ready to send (not sent automatically). */
export function AskCompanionLink({ gameId, question, label }: { gameId: GameId; question: string; label?: string }) {
  const companion = getCompanion(gameId);
  return (
    <Link
      to="/journey/$gameId"
      params={{ gameId }}
      search={{ section: "ai-companion", ask: question }}
      resetScroll={false}
      className="inline-flex items-center gap-2 border border-journey/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-journey transition-colors hover:bg-journey/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <MessageCircle className="h-3.5 w-3.5" aria-hidden />
      {label ?? `Ask ${companion.name}`}
    </Link>
  );
}
