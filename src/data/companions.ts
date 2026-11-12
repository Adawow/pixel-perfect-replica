import type { GameId } from "@/types/game";
import wayfarer from "@/assets/companions/limgrave-wayfarer.webp";
import moth from "@/assets/companions/cavern-moth-wanderer.webp";
import apprentice from "@/assets/companions/temple-shinobi-apprentice.webp";

/** Original companion characters (not game characters); one per world. */
export interface Companion {
  gameId: GameId;
  name: string;
  title: string;
  portrait: { src: string; alt: string; width: number; height: number };
  intro: string;
  welcome: string;
  placeholder: string;
  suggestions: string[];
}

export const COMPANIONS: Record<GameId, Companion> = {
  "elden-ring": {
    gameId: "elden-ring",
    name: "Ilse",
    title: "the Lantern Wayfarer",
    portrait: {
      src: wayfarer,
      alt: "Ilse, a small hooded wayfarer in a moss-green cloak, kneeling with a glowing brass lantern.",
      width: 482,
      height: 560,
    },
    intro: "A wandering lantern-bearer who has walked the Lands Between longer than she admits. Calm, thoughtful and a little mysterious.",
    welcome: "The grace is warm tonight. Sit a while, Tarnished — ask me about a foe, a road, or an old story.",
    placeholder: "Ask Ilse about bosses, builds, quests or lore…",
    suggestions: [
      "How do I beat Margit, the Fell Omen?",
      "Where should I go after Stormveil Castle?",
      "Suggest a beginner-friendly Strength build",
      "Who is Melina, without major spoilers?",
    ],
  },
  "hollow-knight": {
    gameId: "hollow-knight",
    name: "Mote",
    title: "the Moth Wanderer",
    portrait: {
      src: moth,
      alt: "Mote, a small fuzzy moth in a patched blue scarf, holding a pale blue lantern and a twig staff.",
      width: 457,
      height: 560,
    },
    intro: "A small moth who maps the dark by lantern-light. Quiet and gentle; speaks in few words.",
    welcome: "…You found the bench. Rest. Ask, and I'll light what I can.",
    placeholder: "Ask Mote about charms, bosses, secrets or lore…",
    suggestions: [
      "Which charms are best early on?",
      "Tips for the Mantis Lords?",
      "Where do I find the Mothwing Cloak?",
      "What happened to Hallownest?",
    ],
  },
  sekiro: {
    gameId: "sekiro",
    name: "Kaede",
    title: "the Shinobi Apprentice",
    portrait: {
      src: apprentice,
      alt: "Kaede, a young shinobi apprentice with a fox mask on his head and a wooden sword, holding a maple leaf.",
      width: 294,
      height: 560,
    },
    intro: "A disciplined apprentice who trains in Ashina's temple courtyard. Direct, focused and quietly encouraging.",
    welcome: "Steady your breathing. Tell me which duel troubles you, and we'll find the opening.",
    placeholder: "Ask Kaede about duels, deflection, tools or lore…",
    suggestions: [
      "How do I deflect more reliably?",
      "How do I beat Genichiro Ashina?",
      "When should I use the Mikiri Counter?",
      "Which prosthetic tools should I upgrade first?",
    ],
  },
};

export const getCompanion = (id: GameId) => COMPANIONS[id];
