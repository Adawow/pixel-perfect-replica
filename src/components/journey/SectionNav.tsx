import { Link } from "@tanstack/react-router";
import { SECTIONS } from "@/data/sections";
import { cn } from "@/lib/utils";
import type { GameId } from "@/types/game";
import type { SectionId } from "@/types/journey";

interface Props {
  gameId: GameId;
  active?: SectionId;
}

const items: { id: SectionId | undefined; title: string }[] = [
  { id: undefined, title: "Overview" },
  ...SECTIONS.map((s) => ({ id: s.id, title: s.title })),
];

export function SectionNav({ gameId, active }: Props) {
  return (
    <nav aria-label="Companion sections" className="sticky top-0 z-30 border-y border-border bg-background">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-8">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.title} className="shrink-0">
              <Link
                to="/journey/$gameId"
                params={{ gameId }}
                search={{ section: item.id }}
                resetScroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative block px-3 py-4 text-xs uppercase tracking-[0.2em] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-px origin-center bg-journey transition-transform duration-500",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
