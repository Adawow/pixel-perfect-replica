import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/homepage/HeroSection";
import { BonfireScene } from "@/components/homepage/BonfireScene";
import { GameSelector } from "@/components/homepage/GameSelector";
import { JourneyProvider } from "@/context/journey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE BONFIRE — Every journey needs a light" },
      { name: "description", content: "A quiet companion beside the fire for Elden Ring, Hollow Knight and Sekiro players." },
      { property: "og:title", content: "THE BONFIRE — Every journey needs a light" },
      { property: "og:description", content: "A quiet companion beside the fire for Elden Ring, Hollow Knight and Sekiro players." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <JourneyProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <BonfireScene />
          <GameSelector />
        </main>
      </div>
    </JourneyProvider>
  );
}
