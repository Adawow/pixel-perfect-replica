import type { Game } from "@/types/game";

export const GAMES: Game[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    subtitle: "A world of grace, struggle, and discovery.",
    treatment: "wide",
    weapon: "twin blades",
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    subtitle: "A quiet kingdom beneath the surface.",
    treatment: "light",
    weapon: "nail",
  },
  {
    id: "sekiro",
    title: "Sekiro",
    subtitle: "The path of the shinobi.",
    treatment: "condensed",
    weapon: "mortal blade",
  },
];

export const getGame = (id: string | null) => GAMES.find((g) => g.id === id) ?? null;
