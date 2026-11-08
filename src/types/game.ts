export type GameId = "elden-ring" | "hollow-knight" | "sekiro";

export interface Game {
  id: GameId;
  title: string;
  subtitle: string;
  /** Visual title treatment for the selector. */
  treatment: "wide" | "light" | "condensed";
  /** Planned weapon the skeleton's stick will become (future phase). */
  weapon: string;
}
