import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — THE BONFIRE" },
      { name: "description", content: "What THE BONFIRE is: a companion for players facing difficult games." },
      { property: "og:title", content: "About — THE BONFIRE" },
      { property: "og:description", content: "What THE BONFIRE is: a companion for players facing difficult games." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 font-display text-5xl font-light leading-tight text-foreground md:text-6xl">
          A place to rest <span className="italic text-muted-foreground">between battles.</span>
        </h1>
        <div className="mt-10 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            THE BONFIRE is a companion for players who want to understand, explore and overcome
            difficult games — starting with Elden Ring, Hollow Knight and Sekiro.
          </p>
          <p>
            In time, the companion beside the fire will help you study bosses, uncover lore and shape
            your builds. For now, the fire is lit and the paths are marked.
          </p>
        </div>
        <Link
          to="/"
          className="mt-12 inline-block text-xs uppercase tracking-[0.25em] text-firelight transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          ← Return to the fire
        </Link>
      </main>
    </div>
  );
}
