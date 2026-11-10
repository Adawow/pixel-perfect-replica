import { SECTIONS } from "@/data/sections";
import type { Game } from "@/types/game";
import type { Journey } from "@/types/journey";
import { FeatureCard } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";

export function JourneyOverview({ game, journey }: { game: Game; journey: Journey }) {
  return (
    <div className="space-y-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="The companion"
          title={
            <>
              Four ways to prepare <span className="italic text-muted-foreground">for {game.title}.</span>
            </>
          }
          description="Choose a section to see what it will offer. Each one is awaiting AI integration; the reference notes inside are written by hand."
        />
        <aside className="max-w-xs border-l border-journey/40 pl-5 text-sm leading-relaxed text-muted-foreground">
          <p className="eyebrow mb-2 text-journey">The {journey.restingPlace}</p>
          {journey.restingNote}
        </aside>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section, i) => (
          <FeatureCard
            key={section.id}
            gameId={game.id}
            section={section}
            index={i}
            summary={journey.sections[section.id].summary}
          />
        ))}
      </div>
    </div>
  );
}
