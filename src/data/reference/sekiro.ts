import type { GameReference } from "@/types/reference";

/** Hand-written notes based on widely shared community strategy. Not AI-generated. */
export const SEKIRO: GameReference = {
  stageLabels: { early: "Ashina Outskirts", mid: "Ashina Castle & Senpou Temple", late: "Endgame" },
  bosses: [
    {
      id: "chained-ogre",
      name: "Chained Ogre",
      location: "Ashina Outskirts",
      required: true,
      difficulty: 2,
      phases: ["Grabs, charges and wide swings. One health bar, two deathblows."],
      tips: [
        "It is weak to fire — the Flame Vent prosthetic sets it ablaze.",
        "Never stand directly in front of it for long; its grab is deadly.",
        "Circle to its side and strike after each charge.",
      ],
      counters: ["Flame Vent", "Staying behind it"],
    },
    {
      id: "gyoubu",
      name: "Gyoubu Masataka Oniwa",
      location: "Ashina Outskirts, Ashina Castle Gate",
      required: true,
      difficulty: 2,
      phases: ["Mounted spear charges and sweeps across a wide field. Two deathblows."],
      tips: [
        "Use the grappling hook on him whenever the grapple prompt appears for a free strike.",
        "The Shinobi Firecracker startles his horse.",
        "Don't run from him — he outpaces you on horseback.",
      ],
      counters: ["Grappling hook", "Shinobi Firecracker", "Jumping his sweeps"],
    },
    {
      id: "lady-butterfly",
      name: "Lady Butterfly",
      location: "Hirata Estate",
      required: true,
      difficulty: 3,
      phases: [
        "Aerial kicks from threads and volleys of kunai.",
        "In the second phase she conjures illusory spirits.",
      ],
      tips: [
        "Throw the Loaded Shuriken when she leaps onto her threads.",
        "Stay aggressive so she spends less time in the air.",
        "Jump over her low sweeping kicks.",
      ],
      counters: ["Loaded Shuriken", "Constant pressure"],
    },
    {
      id: "genichiro",
      name: "Genichiro Ashina",
      location: "Ashina Castle, Top of Ashina Castle",
      required: true,
      difficulty: 4,
      phases: [
        "Sword combos, arrow volleys and perilous thrusts.",
        "In the second phase he begins calling lightning.",
      ],
      tips: [
        "Mikiri Counter his perilous thrusts to deal heavy posture damage.",
        "Jump over his perilous sweeps — and kick off him if you can.",
        "When he casts lightning, jump; if it hits you in the air, attack before landing to send it back.",
      ],
      counters: ["Mikiri Counter", "Lightning Reversal", "Steady deflects"],
    },
    {
      id: "guardian-ape",
      name: "Guardian Ape",
      location: "Sunken Valley, Guardian Ape's Watering Hole",
      required: false,
      difficulty: 3,
      phases: [
        "Wild swings, leaps and grabs.",
        "After it seems to die, it returns headless with a sword and terror-inducing screams.",
      ],
      tips: [
        "The Shinobi Firecracker staggers it — follow up immediately.",
        "Strike its legs and stay near its sides.",
        "In the second phase, keep your distance when it screams to avoid terror build-up.",
      ],
      counters: ["Shinobi Firecracker", "Staying near its legs"],
    },
    {
      id: "isshin-sword-saint",
      name: "Isshin, the Sword Saint",
      location: "Ashina Reservoir (final duel)",
      required: true,
      difficulty: 5,
      phases: [
        "Swordplay with the deadly Ashina Cross.",
        "He adds a spear and a firearm.",
        "Finally, lightning joins his attacks.",
      ],
      tips: [
        "Mikiri Counter his spear thrusts.",
        "Back away from Ashina Cross rather than trying to deflect it late.",
        "Use Lightning Reversal in the final phase.",
      ],
      counters: ["Mikiri Counter", "Lightning Reversal", "Patience"],
    },
  ],
  lore: [
    {
      id: "ashina",
      title: "Ashina",
      category: "Places",
      summary: "A mountain land in late Sengoku Japan, carved out by the Ashina clan and now under threat from the Interior Ministry.",
      related: ["ashina-clan", "isshin"],
    },
    {
      id: "ashina-clan",
      title: "The Ashina Clan",
      category: "Factions",
      summary: "The clan founded by Isshin Ashina's rebellion, determined to hold its land at any cost.",
      related: ["isshin", "genichiro", "ashina"],
    },
    {
      id: "isshin",
      title: "Isshin Ashina",
      category: "People",
      summary: "The aged Sword Saint who took Ashina by force decades ago. Now ill, but still formidable in mind.",
      related: ["ashina-clan", "genichiro"],
    },
    {
      id: "genichiro",
      title: "Genichiro Ashina",
      category: "People",
      summary: "Isshin's grandson, who will do anything — even seek forbidden power — to save the clan.",
      related: ["isshin", "dragons-heritage"],
    },
    {
      id: "wolf",
      title: "Wolf",
      category: "People",
      summary: "The one-armed shinobi the player controls, bound by oath to protect the young lord Kuro.",
      related: ["kuro", "resurrection"],
    },
    {
      id: "kuro",
      title: "Kuro, the Divine Heir",
      category: "People",
      summary: "A young lord who carries the Dragon's Heritage, sought by those who want its power.",
      related: ["dragons-heritage", "wolf"],
    },
    {
      id: "dragons-heritage",
      title: "The Dragon's Heritage",
      category: "Powers",
      summary: "An ancient bloodline that grants immortality to the one bound to its heir.",
      related: ["kuro", "resurrection", "dragonrot"],
    },
    {
      id: "resurrection",
      title: "Resurrection",
      category: "Powers",
      summary: "Wolf's ability to rise again after death, drawn from his bond with Kuro.",
      related: ["dragons-heritage", "dragonrot"],
    },
    {
      id: "dragonrot",
      title: "Dragonrot",
      category: "Powers",
      summary: "A sickness that spreads to those around Wolf as he keeps returning from death.",
      related: ["resurrection", "dragons-heritage"],
      spoiler: true,
    },
  ],
  builds: [
    {
      id: "duelist",
      name: "Deflect Duelist",
      style: "Posture pressure through deflection",
      description: "Win by breaking posture: deflect, counter perilous attacks and never stop pressing.",
      stages: {
        early: [
          { label: "Prosthetic tools", items: ["Shinobi Firecracker", "Loaded Shuriken", "Loaded Axe"] },
          { label: "Combat Art", items: ["Whirlwind Slash"] },
          { label: "Skills", items: ["Mikiri Counter", "Breath of Life: Light"] },
          { label: "Priorities", items: ["Prayer Beads for posture", "Gourd Seeds for healing"] },
        ],
        mid: [
          { label: "Prosthetic tools", items: ["Shinobi Firecracker", "Loaded Umbrella", "Loaded Spear"] },
          { label: "Combat Art", items: ["Ichimonji"] },
          { label: "Skills", items: ["Mikiri Counter", "Mid-air Deflection", "Breath of Life: Light"] },
        ],
        late: [
          { label: "Prosthetic tools", items: ["Spring-load Axe", "Loaded Umbrella", "Shinobi Firecracker"] },
          { label: "Combat Art", items: ["Ichimonji: Double"] },
          { label: "Skills", items: ["Mikiri Counter", "Mid-air Deflection", "Breath of Life: Shadow"] },
        ],
      },
    },
    {
      id: "tools",
      name: "Shinobi Tools",
      style: "Prosthetic-led fighting",
      description: "Open every fight with the right tool. Spirit Emblems are your main resource.",
      stages: {
        early: [
          { label: "Prosthetic tools", items: ["Loaded Shuriken", "Flame Vent", "Shinobi Firecracker"] },
          { label: "Skills", items: ["Mid-air Prosthetic Tool", "Arched Prosthetic"] },
          { label: "Priorities", items: ["Carry plenty of Spirit Emblems"] },
        ],
        mid: [
          { label: "Prosthetic tools", items: ["Spinning Shuriken", "Mist Raven", "Spring-load Flame Vent"] },
          { label: "Skills", items: ["Mid-air Prosthetic Tool", "Arched Prosthetic"] },
        ],
        late: [
          { label: "Prosthetic tools", items: ["Lazulite Shuriken", "Lazulite Axe", "Suzaku's Lotus Umbrella"] },
          { label: "Skills", items: ["Mid-air Prosthetic Tool", "Arched Prosthetic"] },
        ],
      },
    },
    {
      id: "ashina-arts",
      name: "Ashina Style",
      style: "Combat Arts and swordsmanship",
      description: "Lean on the Ashina school's Combat Arts to break posture in bursts.",
      stages: {
        early: [
          { label: "Combat Art", items: ["Whirlwind Slash", "Ichimonji"] },
          { label: "Prosthetic tools", items: ["Shinobi Firecracker", "Loaded Shuriken"] },
          { label: "Priorities", items: ["Prayer Beads for posture"] },
        ],
        mid: [
          { label: "Combat Art", items: ["Ichimonji", "Nightjar Slash"] },
          { label: "Prosthetic tools", items: ["Loaded Umbrella", "Loaded Spear"] },
        ],
        late: [
          { label: "Combat Art", items: ["Ashina Cross", "Ichimonji: Double"] },
          { label: "Skills", items: ["Mikiri Counter", "Breath of Nature: Shadow"] },
        ],
      },
    },
  ],
};
