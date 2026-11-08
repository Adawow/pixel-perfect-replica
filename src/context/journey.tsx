import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { GameId } from "@/types/game";

interface JourneyState {
  selectedGame: GameId | null;
  /** Hovered/focused game — drives the future weapon swap on the skeleton. */
  hoveredGame: GameId | null;
  selectGame: (id: GameId) => void;
  setHoveredGame: (id: GameId | null) => void;
}

const JourneyContext = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelected] = useState<GameId | null>(null);
  const [hoveredGame, setHoveredGame] = useState<GameId | null>(null);

  // Re-selecting the same game is a no-op, preventing duplicate transitions.
  const selectGame = useCallback((id: GameId) => {
    setSelected((cur) => (cur === id ? cur : id));
  }, []);

  const value = useMemo(
    () => ({ selectedGame, hoveredGame, selectGame, setHoveredGame }),
    [selectedGame, hoveredGame, selectGame],
  );
  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}
