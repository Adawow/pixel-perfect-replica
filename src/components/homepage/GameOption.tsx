import { forwardRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { selectorTitleTreatments as treatments } from "@/components/game/title-treatments";
import type { Game } from "@/types/game";

interface Props {
  game: Game;
  index: number;
  selected: boolean;
  tabbable: boolean;
  onSelect: () => void;
  onHover: (on: boolean) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export const GameOption = forwardRef<HTMLButtonElement, Props>(function GameOption(
  { game, index, selected, tabbable, onSelect, onHover, onKeyDown },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabbable ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className={cn(
        "group relative flex flex-col items-center gap-4 px-6 py-10 text-center transition-colors duration-500",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={cn(
          treatments[game.treatment],
          "transition-colors duration-500",
          selected && "text-firelight",
        )}
      >
        {game.title}
      </span>
      <span className="max-w-[16rem] text-sm text-faint transition-colors duration-500 group-hover:text-muted-foreground">
        {game.subtitle}
      </span>
      <span className="relative mt-2 h-px w-24 overflow-hidden bg-border">
        <span
          className={cn(
            "absolute inset-y-0 left-1/2 w-full -translate-x-1/2 origin-center scale-x-0 bg-ember transition-transform duration-500",
            "group-hover:scale-x-50",
            selected && "scale-x-100 group-hover:scale-x-100",
          )}
        />
      </span>
      {selected && (
        <motion.span
          layoutId="journey-marker"
          aria-hidden
          className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-firelight shadow-[0_0_12px_var(--ember)]"
        />
      )}
    </button>
  );
});
