import { useId, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { getReference } from "@/data/reference";
import { useDeviceStorage } from "@/hooks/use-device-storage";
import { addSavedBuild, MAX_BUILD_NAME, parseSavedBuilds, type SavedBuild } from "@/lib/device-records";
import { cn } from "@/lib/utils";
import type { GameId } from "@/types/game";
import type { BuildStage } from "@/types/reference";
import { AskCompanionLink } from "./AskCompanionLink";
import { choiceClass } from "./choice";

const STAGES: BuildStage[] = ["early", "mid", "late"];
const EMPTY: SavedBuild[] = [];

export function BuildCreator({ gameId }: { gameId: GameId }) {
  const { builds, stageLabels } = getReference(gameId);
  const ids = useMemo(() => builds.map((b) => b.id), [builds]);
  const [saved, setSaved] = useDeviceStorage(`bonfire.builds.${gameId}`, (raw) => parseSavedBuilds(raw, ids), EMPTY);
  const [archetypeId, setArchetypeId] = useState(builds[0]?.id ?? "");
  const [stage, setStage] = useState<BuildStage>("early");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const nameId = useId();

  const archetype = builds.find((b) => b.id === archetypeId) ?? builds[0];
  if (!archetype) return null;
  const slots = archetype.stages[stage];

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaved((prev) => addSavedBuild(prev, { name: trimmed, archetypeId: archetype.id, stage }));
    setMessage(`Saved “${trimmed}” on this device.`);
    setName("");
  };

  const load = (b: SavedBuild) => {
    setArchetypeId(b.archetypeId);
    setStage(b.stage);
    setMessage(`Loaded “${b.name}”.`);
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="style-heading">
        <h3 id="style-heading" className="eyebrow">1 · Choose a playstyle</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={b.id === archetype.id}
              onClick={() => setArchetypeId(b.id)}
              className={cn(
                "flex flex-col gap-1 border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                b.id === archetype.id ? "border-journey/60 bg-secondary" : "border-border hover:border-journey/30 hover:bg-secondary/60",
              )}
            >
              <span className="font-display text-xl text-foreground">{b.name}</span>
              <span className="text-xs text-faint">{b.style}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="stage-heading">
        <h3 id="stage-heading" className="eyebrow">2 · Where are you in the journey?</h3>
        <div role="group" aria-labelledby="stage-heading" className="mt-4 flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button key={s} type="button" aria-pressed={stage === s} onClick={() => setStage(s)} className={choiceClass(stage === s)}>
              {s} · {stageLabels[s]}
            </button>
          ))}
        </div>
      </section>

      <article aria-labelledby="recipe-heading" className="space-y-5 border border-border bg-secondary/40 p-6">
        <header>
          <p className="eyebrow">3 · Your build</p>
          <h3 id="recipe-heading" className="mt-2 font-display text-3xl font-light text-foreground">
            {archetype.name} <span className="italic text-muted-foreground">— {stageLabels[stage]}</span>
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{archetype.description}</p>
        </header>
        <dl className="grid gap-5 sm:grid-cols-2">
          {slots.map((slot) => (
            <div key={slot.label}>
              <dt className="eyebrow">{slot.label}</dt>
              <dd>
                <ul className="mt-2 space-y-1 text-sm text-foreground/90">
                  {slot.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-journey" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-4 border-t border-border pt-5 md:flex-row md:items-end md:justify-between">
          <form onSubmit={save} className="flex flex-1 flex-wrap items-end gap-3">
            <label htmlFor={nameId} className="flex min-w-48 flex-1 flex-col gap-2 text-xs uppercase tracking-[0.16em] text-faint">
              Name this build
              <input
                id={nameId}
                value={name}
                maxLength={MAX_BUILD_NAME}
                onChange={(e) => setName(e.target.value)}
                placeholder={`My ${archetype.name} build`}
                className="border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal text-foreground placeholder:text-faint focus-visible:border-journey/60 focus-visible:outline-none"
              />
            </label>
            <button type="submit" disabled={!name.trim()} className={cn(choiceClass(true), "disabled:cursor-not-allowed disabled:opacity-40")}>
              Save build
            </button>
          </form>
          <AskCompanionLink
            gameId={gameId}
            label="Refine with AI"
            question={`I'm playing a ${archetype.name} build (${stageLabels[stage]}). How should I refine it, and what should I upgrade next?`}
          />
        </div>
        <p className="min-h-5 text-sm text-journey" aria-live="polite">{message}</p>
      </article>

      <section aria-labelledby="saved-heading">
        <h3 id="saved-heading" className="eyebrow">Saved on this device ({saved.length})</h3>
        {saved.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No saved builds yet. Name one above to keep it.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {saved.map((b) => {
              const a = builds.find((x) => x.id === b.archetypeId);
              return (
                <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <span>
                    <span className="block font-display text-lg text-foreground">{b.name}</span>
                    <span className="block text-xs text-faint">
                      {a?.name} · {stageLabels[b.stage]}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <button type="button" onClick={() => load(b)} className={choiceClass(false)}>
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => setSaved((prev) => prev.filter((x) => x.id !== b.id))}
                      className={choiceClass(false)}
                      aria-label={`Delete ${b.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
