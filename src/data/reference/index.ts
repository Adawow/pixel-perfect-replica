import type { GameId } from "@/types/game";
import type { GameReference } from "@/types/reference";
import { ELDEN_RING } from "./elden-ring";
import { HOLLOW_KNIGHT } from "./hollow-knight";
import { SEKIRO } from "./sekiro";

export const REFERENCE: Record<GameId, GameReference> = {
  "elden-ring": ELDEN_RING,
  "hollow-knight": HOLLOW_KNIGHT,
  sekiro: SEKIRO,
};

export const getReference = (id: GameId) => REFERENCE[id];
