import type { GameId } from "@/types/game";
import type { Journey } from "@/types/journey";
import limgraveScene from "@/assets/journeys/limgrave-grace.jpg";
import hallownestScene from "@/assets/journeys/hallownest-bench.jpg";
import ashinaScene from "@/assets/journeys/ashina-idol.jpg";

/**
 * Per-game dashboard content. Reference topics are hand-written facts, never
 * generated; companion answers arrive with a later AI phase.
 */
export const JOURNEYS: Record<GameId, Journey> = {
  "elden-ring": {
    gameId: "elden-ring",
    region: "Limgrave",
    restingPlace: "Site of Grace",
    restingNote:
      "Sites of Grace refill your flasks and point the way forward. Here, they mark a place to plan.",
    tagline: "Rest a while beneath the Erdtree's light.",
    intro:
      "The Lands Between are vast and unforgiving. Sit by the grace, gather your thoughts, and choose how to prepare for the road ahead.",
    metaDescription:
      "An Elden Ring companion beside the Site of Grace: boss coaching, lore and builds for the Lands Between.",
    atmosphere: "grace",
    scene: {
      src: limgraveScene,
      alt: "A misty meadow at dusk with ruined arches and a distant golden tree glowing on the horizon, a small light of grace resting in the grass.",
    },
    sections: {
      "boss-coach": {
        summary: "From Margit at Stormveil's gate to the demigods beyond.",
        topicsLabel: "Bosses the coach will cover",
        topics: [
          { name: "Margit, the Fell Omen", note: "Guards the way into Stormveil Castle." },
          { name: "Godrick the Grafted", note: "Lord of Stormveil; a two-phase duel." },
          { name: "Rennala, Queen of the Full Moon", note: "Academy of Raya Lucaria." },
          { name: "Starscourge Radahn", note: "The festival battle in Caelid." },
          { name: "Morgott, the Omen King", note: "Leyndell, Royal Capital." },
        ],
      },
      "lore-explorer": {
        summary: "The Shattering, the Erdtree and the Tarnished called back.",
        topicsLabel: "Threads to follow",
        topics: [
          { name: "The Shattering", note: "The war among the demigods after the Elden Ring was broken." },
          { name: "The Erdtree", note: "The golden tree at the heart of the Lands Between." },
          { name: "The Tarnished", note: "Those who lost grace, now called back." },
          { name: "Sites of Grace", note: "Resting places that guide the Tarnished onward." },
        ],
      },
      "build-creator": {
        summary: "Eight attributes, ten starting classes, countless paths.",
        topicsLabel: "What a build is made of",
        topics: [
          { name: "Attributes", note: "Vigor, Mind, Endurance, Strength, Dexterity, Intelligence, Faith, Arcane." },
          { name: "Starting class", note: "Ten classes, from Vagabond to Wretch." },
          { name: "Weapon scaling", note: "How each weapon grows with your attributes." },
          { name: "Ashes of War", note: "Skills and affinities you can set on weapons." },
          { name: "Talismans", note: "Passive effects that round out a build." },
        ],
      },
      "ai-companion": {
        summary: "Ask anything about the Lands Between.",
        topicsLabel: "Questions it will help with",
        topics: [
          { name: "Where should I go after Stormveil Castle?" },
          { name: "Am I ready to face this area yet?" },
          { name: "What did that character mean?" },
        ],
      },
    },
  },
  "hollow-knight": {
    gameId: "hollow-knight",
    region: "Hallownest",
    restingPlace: "Bench",
    restingNote:
      "Benches save your journey and let you change charms. Here, they are a place to think.",
    tagline: "A quiet bench in a kingdom fallen still.",
    intro:
      "Beneath Dirtmouth lies a ruined kingdom of winding paths and old secrets. Rest on the bench, listen to the dark, and decide where to wander next.",
    metaDescription:
      "A Hollow Knight companion at the bench: boss coaching, lore and charm builds for Hallownest.",
    atmosphere: "spores",
    scene: {
      src: hallownestScene,
      alt: "A dark blue-grey cavern of gothic arches and hanging roots, with a lone iron bench resting on a stone ledge in soft cold light.",
    },
    sections: {
      "boss-coach": {
        summary: "From the False Knight to the heart of the Black Egg.",
        topicsLabel: "Bosses the coach will cover",
        topics: [
          { name: "False Knight", note: "Forgotten Crossroads." },
          { name: "Hornet", note: "First met in Greenpath." },
          { name: "Mantis Lords", note: "Mantis Village." },
          { name: "Soul Master", note: "Soul Sanctum, City of Tears." },
          { name: "The Hollow Knight", note: "Black Egg Temple." },
        ],
      },
      "lore-explorer": {
        summary: "The Pale King, the Radiance and the sealed Infection.",
        topicsLabel: "Threads to follow",
        topics: [
          { name: "The Pale King", note: "The ruler who built Hallownest." },
          { name: "The Radiance", note: "A forgotten light behind the Infection." },
          { name: "The Infection", note: "The plague that swept the kingdom." },
          { name: "The Dreamers", note: "Monomon, Lurien and Herrah, who seal the Black Egg." },
        ],
      },
      "build-creator": {
        summary: "Charms, notches and the shape of your nail.",
        topicsLabel: "What a build is made of",
        topics: [
          { name: "Charms and notches", note: "Each charm costs notches; your notches set the limit." },
          { name: "Nail upgrades", note: "Forged by the Nailsmith in the City of Tears." },
          { name: "Spells", note: "Vengeful Spirit, Desolate Dive and Howling Wraiths." },
          { name: "Soul", note: "Spent on spells or on focusing to heal." },
        ],
      },
      "ai-companion": {
        summary: "Ask anything about the fallen kingdom.",
        topicsLabel: "Questions it will help with",
        topics: [
          { name: "Where haven't I explored yet?" },
          { name: "Which charms suit a careful playstyle?" },
          { name: "What happened to Hallownest?" },
        ],
      },
    },
  },
  sekiro: {
    gameId: "sekiro",
    region: "Ashina",
    restingPlace: "Sculptor's Idol",
    restingNote:
      "Sculptor's Idols restore your healing and let you learn new skills. Here, they are a place to prepare.",
    tagline: "Kneel at the idol. Steady the blade.",
    intro:
      "Ashina stands on the edge of ruin. Rest at the Sculptor's Idol, still your breathing, and choose how to prepare for the next duel.",
    metaDescription:
      "A Sekiro companion at the Sculptor's Idol: duel coaching, lore and loadouts for the land of Ashina.",
    atmosphere: "leaves",
    scene: {
      src: ashinaScene,
      alt: "A Japanese temple courtyard at dusk with a carved wooden idol shrine lit by a single candle, maple leaves falling through the mist.",
    },
    sections: {
      "boss-coach": {
        summary: "Deflect, read and break posture — duel by duel.",
        topicsLabel: "Duels the coach will cover",
        topics: [
          { name: "Gyoubu Masataka Oniwa", note: "Ashina Outskirts." },
          { name: "Lady Butterfly", note: "Hirata Estate." },
          { name: "Genichiro Ashina", note: "Ashina Castle." },
          { name: "Guardian Ape", note: "Sunken Valley." },
          { name: "Isshin, the Sword Saint", note: "A final duel." },
        ],
      },
      "lore-explorer": {
        summary: "The Dragon's Heritage and the fate of Ashina.",
        topicsLabel: "Threads to follow",
        topics: [
          { name: "The Dragon's Heritage", note: "The bloodline that grants Kuro's immortality." },
          { name: "The Divine Heir", note: "Kuro, the young lord Wolf has sworn to protect." },
          { name: "The Ashina Clan", note: "Isshin's clan, holding its land against invasion." },
          { name: "Resurrection", note: "Wolf's return from death, and the cost of Dragonrot." },
        ],
      },
      "build-creator": {
        summary: "No stats to spend — only tools, arts and skill.",
        topicsLabel: "What a loadout is made of",
        topics: [
          { name: "Prosthetic tools", note: "Such as the Loaded Shuriken, Firecracker and Loaded Umbrella." },
          { name: "Combat Arts", note: "Such as Whirlwind Slash and Ichimonji." },
          { name: "Skill trees", note: "Shinobi, Prosthetic, Ashina, Temple and Mushin Arts." },
          { name: "Prayer Beads and Gourd Seeds", note: "Raise vitality, posture and healing uses." },
        ],
      },
      "ai-companion": {
        summary: "Ask anything about the path of the shinobi.",
        topicsLabel: "Questions it will help with",
        topics: [
          { name: "Which prosthetic tool works against this enemy?" },
          { name: "How do I deflect more reliably?" },
          { name: "What is the Dragon's Heritage?" },
        ],
      },
    },
  },
};

export const getJourney = (id: string): Journey | null =>
  Object.prototype.hasOwnProperty.call(JOURNEYS, id) ? JOURNEYS[id as GameId] : null;
