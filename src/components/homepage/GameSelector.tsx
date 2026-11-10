import { useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
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

      <div className="mt-10 flex min-h-24 justify-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              <p className="text-center font-display text-lg italic text-muted-foreground">
                <span className="text-foreground not-italic tracking-[0.12em]">{selected.title}</span> chosen.
                The path is marked.
              </p>
              <Link
                to="/journey/$gameId"
                params={{ gameId: selected.id }}
                className="group inline-flex items-center gap-3 border border-ember/50 px-6 py-3 text-xs uppercase tracking-[0.25em] text-firelight transition-colors duration-500 hover:border-firelight hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Enter the {selected.title} companion
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
