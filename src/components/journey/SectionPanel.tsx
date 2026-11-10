import { Link } from "@tanstack/react-router";
import { SECTIONS } from "@/data/sections";
import type { Game } from "@/types/game";
import type { Journey, SectionDefinition } from "@/types/journey";
import { AwaitingAiNotice } from "./AwaitingAiBadge";
import { SECTION_ICONS } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";

interface Props {
  game: Game;
  journey: Journey;
  section: SectionDefinition;
}

const linkClass =
  "text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function SectionPanel({ game, journey, section }: Props) {
  const content = journey.sections[section.id];
  const index = SECTIONS.findIndex((s) => s.id === section.id);
  const prev = SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(index + 1) % SECTIONS.length];
  const Icon = SECTION_ICONS[section.id];

  return (
    <article aria-labelledby="section-title" className="space-y-12">
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

      <AwaitingAiNotice feature={section.title} />

      <div className="grid gap-10 md:grid-cols-5">
        <section aria-labelledby="capabilities-heading" className="md:col-span-2">
          <h3 id="capabilities-heading" className="eyebrow">
            What it will do
          </h3>
          <ul className="mt-5 space-y-4">
            {section.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-journey" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="topics-heading" className="md:col-span-3">
          <h3 id="topics-heading" className="eyebrow">
            {content.topicsLabel}
          </h3>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {content.topics.map((t) => (
              <li key={t.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-display text-xl text-foreground">{t.name}</span>
                {t.note && <span className="text-sm text-faint sm:text-right">{t.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>

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
