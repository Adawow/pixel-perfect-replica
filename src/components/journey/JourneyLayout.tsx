import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { heroTitleTreatments } from "@/components/game/title-treatments";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";
import type { Journey, SectionId } from "@/types/journey";
import { BackToFire } from "./BackToFire";
import { GameNav } from "./GameNav";
import { JourneyAtmosphere } from "./JourneyAtmosphere";
import { SectionNav } from "./SectionNav";

interface Props {
  game: Game;
  journey: Journey;
  section?: SectionId | undefined;
  children: ReactNode;
}

/** Shared dashboard frame; each game supplies its scene, atmosphere and accent tokens. */
export function JourneyLayout({ game, journey, section, children }: Props) {
  return (
    <div data-journey={game.id} className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden" aria-labelledby="journey-title">
        <img
          src={journey.scene.src}
          alt={journey.scene.alt}
          width={1920}
          height={1088}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-top opacity-80"
        />
        <div aria-hidden className="journey-scene-shade absolute inset-0 -z-10" />
        <JourneyAtmosphere variant={journey.atmosphere} />

        <Header />

        <div className="relative mx-auto flex min-h-[min(62vh,620px)] max-w-6xl flex-col px-6 pb-14 md:min-h-[min(72vh,760px)] md:px-10 md:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BackToFire />
            <GameNav current={game.id} section={section} />
          </div>

          <div className="mt-auto max-w-2xl pt-24">
            <p className="eyebrow text-journey">
              {journey.region} · Rest at the {journey.restingPlace}
            </p>
            <h1 id="journey-title" className={cn(heroTitleTreatments[game.treatment], "mt-5 text-foreground")}>
              {game.title}
            </h1>
            <p className="mt-6 font-display text-2xl italic text-foreground/90 md:text-3xl">{journey.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{journey.intro}</p>
          </div>
        </div>
      </section>

      <SectionNav gameId={game.id} active={section} />

      <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">{children}</main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-10 md:px-10">
        <BackToFire />
        <p className="eyebrow">THE BONFIRE · {game.title} companion</p>
      </footer>
    </div>
  );
}
