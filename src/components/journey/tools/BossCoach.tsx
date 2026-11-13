import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { getReference } from "@/data/reference";
import { useDeviceStorage } from "@/hooks/use-device-storage";
import { parseDefeated } from "@/lib/device-records";
import { cn } from "@/lib/utils";
import type { GameId } from "@/types/game";
import { AskCompanionLink } from "./AskCompanionLink";
import { choiceClass } from "./choice";

type Filter = "all" | "required" | "optional" | "remaining";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "required", label: "Required" },
  { id: "optional", label: "Optional" },
  { id: "remaining", label: "Not yet defeated" },
];
const EMPTY: string[] = [];

export function BossCoach({ gameId }: { gameId: GameId }) {
  const { bosses } = getReference(gameId);
  const ids = useMemo(() => bosses.map((b) => b.id), [bosses]);
  const [defeated, setDefeated] = useDeviceStorage(`bonfire.defeated.${gameId}`, (raw) => parseDefeated(raw, ids), EMPTY);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(bosses[0]?.id ?? "");

  const visible = bosses.filter((b) =>
    filter === "required" ? b.required : filter === "optional" ? !b.required : filter === "remaining" ? !defeated.includes(b.id) : true,
  );
  const boss = bosses.find((b) => b.id === selectedId) ?? bosses[0];
  if (!boss) return null;
  const isDefeated = defeated.includes(boss.id);
  const toggleDefeated = () =>
    setDefeated((prev) => (prev.includes(boss.id) ? prev.filter((id) => id !== boss.id) : [...prev, boss.id]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter bosses" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={choiceClass(filter === f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <span className="text-foreground">{defeated.length}</span> of {bosses.length} defeated on this device
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <ul aria-label="Bosses" className="space-y-2 md:col-span-2">
          {visible.length === 0 && <li className="text-sm text-muted-foreground">No bosses match this filter.</li>}
          {visible.map((b) => {
            const active = b.id === boss.id;
            return (
              <li key={b.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(b.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    active ? "border-journey/60 bg-secondary" : "border-border hover:border-journey/30 hover:bg-secondary/60",
                  )}
                >
                  <span>
                    <span className="block font-display text-lg text-foreground">{b.name}</span>
                    <span className="block text-xs text-faint">{b.location}</span>
                  </span>
                  {defeated.includes(b.id) && <Check className="h-4 w-4 shrink-0 text-journey" aria-label="Defeated" />}
                </button>
              </li>
            );
          })}
        </ul>

        <article aria-labelledby="boss-name" className="space-y-6 border border-border bg-secondary/40 p-6 md:col-span-3">
          <header className="space-y-2">
            <p className="eyebrow">{boss.required ? "Required" : "Optional"} · {boss.location}</p>
            <h3 id="boss-name" className="font-display text-3xl font-light text-foreground">{boss.name}</h3>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="uppercase tracking-[0.16em]">Difficulty</span>
              <span className="flex gap-1" role="img" aria-label={`${boss.difficulty} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={cn("h-1.5 w-4", n <= boss.difficulty ? "bg-journey" : "bg-border")} />
                ))}
              </span>
            </p>
          </header>

          <section>
            <h4 className="eyebrow">How the fight unfolds</h4>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {boss.phases.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="font-display text-journey">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h4 className="eyebrow">Plan for the next attempt</h4>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
              {boss.tips.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-journey" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="eyebrow">What works</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {boss.counters.map((c) => (
                <li key={c} className="border border-border px-3 py-1 text-xs text-muted-foreground">{c}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <button type="button" aria-pressed={isDefeated} onClick={toggleDefeated} className={choiceClass(isDefeated)}>
              {isDefeated ? "Defeated ✓" : "Mark as defeated"}
            </button>
            <AskCompanionLink gameId={gameId} question={`I'm stuck on ${boss.name}. What should I change for my next attempt?`} />
          </div>
        </article>
      </div>
    </div>
  );
}
