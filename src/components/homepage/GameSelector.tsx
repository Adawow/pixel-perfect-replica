import { useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GAMES, getGame } from "@/data/games";
import { useJourney } from "@/context/journey";
import { GameOption } from "./GameOption";

export function GameSelector() {
  const { selectedGame, selectGame, setHoveredGame } = useJourney();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = getGame(selectedGame);
  const activeIndex = Math.max(0, GAMES.findIndex((g) => g.id === selectedGame));

  const handleKey = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + GAMES.length) % GAMES.length;
    const nextGame = GAMES[next];
    if (nextGame) selectGame(nextGame.id);
    refs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="journey-heading" className="relative z-10 mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-border" />
        <h2 id="journey-heading" className="eyebrow text-muted-foreground">
          Choose your journey
        </h2>
        <span className="h-px w-12 bg-border" />
      </div>

      <div
        role="radiogroup"
        aria-labelledby="journey-heading"
        className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {GAMES.map((game, i) => (
          <GameOption
            key={game.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            game={game}
            index={i}
            selected={game.id === selectedGame}
            tabbable={i === activeIndex}
            onSelect={() => selectGame(game.id)}
            onHover={(on) => setHoveredGame(on ? game.id : null)}
            onKeyDown={handleKey(i)}
          />
        ))}
      </div>

      <div className="mt-10 flex min-h-12 justify-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.p
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="text-center font-display text-lg italic text-muted-foreground"
            >
              <span className="text-foreground not-italic tracking-[0.12em]">{selected.title}</span> chosen.
              Its path opens in a later chapter.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
