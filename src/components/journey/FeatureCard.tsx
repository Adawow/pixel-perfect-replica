import { Link } from "@tanstack/react-router";
import { BookOpen, Flame, Hammer, Swords, type LucideIcon } from "lucide-react";
import type { GameId } from "@/types/game";
import type { SectionDefinition, SectionId } from "@/types/journey";
import { AwaitingAiBadge } from "./AwaitingAiBadge";

export const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  "boss-coach": Swords,
  "lore-explorer": BookOpen,
  "build-creator": Hammer,
  "ai-companion": Flame,
};

interface Props {
  gameId: GameId;
  section: SectionDefinition;
  index: number;
  summary: string;
}

export function FeatureCard({ gameId, section, index, summary }: Props) {
  const Icon = SECTION_ICONS[section.id];
  return (
    <Link
      to="/journey/$gameId"
      params={{ gameId }}
      search={{ section: section.id }}
      resetScroll={false}
      className="group relative flex h-full flex-col gap-6 border border-border bg-secondary/60 p-6 transition-colors duration-500 hover:border-journey/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center border border-border text-journey transition-colors duration-500 group-hover:border-journey/50">
          <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
        </span>
        <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-display text-3xl font-light text-foreground">{section.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AwaitingAiBadge />
        <span className="text-xs uppercase tracking-[0.2em] text-firelight transition-transform duration-500 group-hover:translate-x-1">
          Open <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
