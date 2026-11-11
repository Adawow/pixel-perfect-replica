import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { BackToFire } from "@/components/journey/BackToFire";
import { JourneyLayout } from "@/components/journey/JourneyLayout";
import { JourneyOverview } from "@/components/journey/JourneyOverview";
import { SectionPanel } from "@/components/journey/SectionPanel";
import { getGame } from "@/data/games";
import { getJourney } from "@/data/journeys";
import { getSection, parseSection } from "@/data/sections";
import type { SectionId } from "@/types/journey";

export const Route = createFileRoute("/journey/$gameId")({
  validateSearch: (search: Record<string, unknown>): { section?: SectionId | undefined } => ({
    section: parseSection(search["section"]),
  }),
  loader: ({ params }) => {
    const game = getGame(params.gameId);
    if (!game || !getJourney(params.gameId)) throw notFound();
    return { gameId: game.id };
  },
  head: ({ loaderData }) => {
    const game = loaderData ? getGame(loaderData.gameId) : null;
    const journey = loaderData ? getJourney(loaderData.gameId) : null;
    if (!game || !journey) {
      return { meta: [{ title: "Journey unavailable — THE BONFIRE" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${game.title} Companion — THE BONFIRE`;
    return {
      meta: [
        { title },
        { name: "description", content: journey.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: journey.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: JourneyNotFound,
  component: JourneyPage,
});

function JourneyPage() {
  const { gameId } = Route.useLoaderData();
  const { section: sectionId } = Route.useSearch();
  const game = getGame(gameId);
  const journey = getJourney(gameId);
  if (!game || !journey) return null;
  const section = sectionId ? getSection(sectionId) : null;

  return (
    <JourneyLayout game={game} journey={journey} section={section?.id}>
      {section ? (
        <SectionPanel key={section.id} game={game} journey={journey} section={section} />
      ) : (
        <JourneyOverview game={game} journey={journey} />
      )}
    </JourneyLayout>
  );
}

function JourneyNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow">Unmarked path</p>
        <h1 className="mt-4 font-display text-5xl font-light text-foreground">This journey isn't here yet.</h1>
        <p className="mt-4 text-muted-foreground">Only the paths shown beside the fire are open for now.</p>
        <BackToFire className="mt-10" />
      </main>
    </div>
  );
}
