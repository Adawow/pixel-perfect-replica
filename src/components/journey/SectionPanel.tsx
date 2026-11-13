import { Link } from "@tanstack/react-router";
import { SECTIONS } from "@/data/sections";
import type { Game } from "@/types/game";
import type { SectionDefinition, SectionId } from "@/types/journey";
import { SECTION_ICONS } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";
import { BossCoach } from "./tools/BossCoach";
import { BuildCreator } from "./tools/BuildCreator";
import { CompanionChat } from "./tools/CompanionChat";
import { LoreExplorer } from "./tools/LoreExplorer";
import { ToolNotice } from "./tools/ToolNotice";

interface Props {
  game: Game;
  section: SectionDefinition;
}

const TOOLS: Record<SectionId, (props: { gameId: Game["id"] }) => React.ReactNode> = {
  "boss-coach": BossCoach,
  "lore-explorer": LoreExplorer,
  "build-creator": BuildCreator,
  "ai-companion": CompanionChat,
};

const linkClass =
  "text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function SectionPanel({ game, section }: Props) {
  const index = SECTIONS.findIndex((s) => s.id === section.id);
  const prev = SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(index + 1) % SECTIONS.length];
  const Icon = SECTION_ICONS[section.id];
  const Tool = TOOLS[section.id];

  return (
    <article aria-labelledby="section-title" className="space-y-10">
      <div className="flex items-start gap-6">
        <span className="hidden h-14 w-14 shrink-0 items-center justify-center border border-journey/40 text-journey md:flex">
          <Icon className="h-6 w-6" strokeWidth={1.3} aria-hidden />
        </span>
        <SectionHeading
          id="section-title"
          eyebrow={`${String(index + 1).padStart(2, "0")} · ${game.title}`}
          title={section.title}
          description={section.description}
        />
      </div>

      <ToolNotice mode={section.mode} gameId={game.id} />

      <Tool gameId={game.id} />

      <nav aria-label="More sections" className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        {prev && (
          <Link to="/journey/$gameId" params={{ gameId: game.id }} search={{ section: prev.id }} resetScroll={false} className={linkClass}>
            <span aria-hidden>←</span> {prev.title}
          </Link>
        )}
        <Link to="/journey/$gameId" params={{ gameId: game.id }} search={{ section: undefined }} resetScroll={false} className={linkClass}>
          All sections
        </Link>
        {next && (
          <Link to="/journey/$gameId" params={{ gameId: game.id }} search={{ section: next.id }} resetScroll={false} className={linkClass}>
            {next.title} <span aria-hidden>→</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
