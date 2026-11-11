import { Link } from "@tanstack/react-router";
import { GAMES } from "@/data/games";
import { cn } from "@/lib/utils";
import type { GameId } from "@/types/game";
import type { SectionId } from "@/types/journey";

interface Props {
  current: GameId;
  /** Kept when switching so the visitor stays on the same feature. */
  section?: SectionId | undefined;
}

export function GameNav({ current, section }: Props) {
  return (
    <nav aria-label="Switch journey">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {GAMES.map((game) => {
          const active = game.id === current;
          return (
            <li key={game.id}>
              <Link
                to="/journey/$gameId"
                params={{ gameId: game.id }}
                search={{ section }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-xs uppercase tracking-[0.25em] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  active ? "text-journey" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {game.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
