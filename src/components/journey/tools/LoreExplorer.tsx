import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getReference } from "@/data/reference";
import { cn } from "@/lib/utils";
import type { GameId } from "@/types/game";
import { AskCompanionLink } from "./AskCompanionLink";
import { choiceClass } from "./choice";

export function LoreExplorer({ gameId }: { gameId: GameId }) {
  const { lore } = getReference(gameId);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [selectedId, setSelectedId] = useState(lore[0]?.id ?? "");
  const searchId = useId();
  const spoilerId = useId();

  const categories = useMemo(() => [...new Set(lore.map((e) => e.category))], [lore]);
  const hiddenCount = lore.filter((e) => e.spoiler).length;
  const q = query.trim().toLowerCase();
  const visible = lore.filter(
    (e) =>
      (showSpoilers || !e.spoiler) &&
      (!category || e.category === category) &&
      (!q || e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)),
  );
  const entry = visible.find((e) => e.id === selectedId) ?? visible[0] ?? null;
  const related = entry
    ? entry.related.flatMap((id) => lore.filter((e) => e.id === id && (showSpoilers || !e.spoiler)))
    : [];

  const open = (id: string) => {
    setSelectedId(id);
    setCategory(null);
    setQuery("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label htmlFor={searchId} className="relative block md:w-80">
          <span className="sr-only">Search the lore</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, places, powers…"
            className="w-full border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus-visible:border-journey/60 focus-visible:outline-none"
          />
        </label>
        <label htmlFor={spoilerId} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <input
            id={spoilerId}
            type="checkbox"
            checked={showSpoilers}
            onChange={(e) => setShowSpoilers(e.target.checked)}
            className="h-4 w-4 accent-[var(--journey-accent)]"
          />
          Show late-game entries ({hiddenCount})
        </label>
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={category === null} onClick={() => setCategory(null)} className={choiceClass(category === null)}>
          All
        </button>
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={choiceClass(category === c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <ul aria-label="Lore entries" className="space-y-2 md:col-span-2">
          {visible.length === 0 && (
            <li className="border border-dashed border-border p-4 text-sm text-muted-foreground">
              Nothing matches yet. Try another word{!showSpoilers && hiddenCount > 0 ? ", or show late-game entries" : ""}.
            </li>
          )}
          {visible.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                aria-pressed={entry?.id === e.id}
                onClick={() => setSelectedId(e.id)}
                className={cn(
                  "w-full border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  entry?.id === e.id ? "border-journey/60 bg-secondary" : "border-border hover:border-journey/30 hover:bg-secondary/60",
                )}
              >
                <span className="block font-display text-lg text-foreground">{e.title}</span>
                <span className="block text-xs text-faint">
                  {e.category}
                  {e.spoiler ? " · late game" : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {entry && (
          <article aria-labelledby="lore-title" className="space-y-5 border border-border bg-secondary/40 p-6 md:col-span-3">
            <p className="eyebrow">
              {entry.category}
              {entry.spoiler ? " · late game" : ""}
            </p>
            <h3 id="lore-title" className="font-display text-3xl font-light text-foreground">{entry.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{entry.summary}</p>
            {related.length > 0 && (
              <section>
                <h4 className="eyebrow">Connected threads</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <button type="button" onClick={() => open(r.id)} className={choiceClass(false)}>
                        {r.title} <span aria-hidden>→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="border-t border-border pt-5">
              <AskCompanionLink gameId={gameId} question={`Tell me more about ${entry.title}. Please avoid major spoilers.`} />
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
