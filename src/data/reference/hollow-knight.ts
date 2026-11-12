import type { GameReference } from "@/types/reference";

/** Hand-written notes based on widely shared community strategy. Not AI-generated. */
export const HOLLOW_KNIGHT: GameReference = {
  stageLabels: { early: "3–5 notches", mid: "6–8 notches", late: "9–11 notches" },
  bosses: [
    {
      id: "false-knight",
      name: "False Knight",
      location: "Forgotten Crossroads",
      required: true,
      difficulty: 1,
      phases: [
        "Mace slams send shockwaves along the floor; he leaps across the arena.",
        "After enough damage his armour cracks open, exposing the creature inside.",
      ],
      tips: [
        "Jump over the shockwave from his mace slams.",
        "When the armour opens, strike the head inside as many times as you can — this is the real damage.",
        "Stay close to his back after a leap; he turns slowly.",
      ],
      counters: ["Hitting the exposed head", "Vengeful Spirit from range"],
    },
    {
      id: "hornet-greenpath",
      name: "Hornet (Protector)",
      location: "Greenpath",
      required: true,
      difficulty: 2,
      phases: [
        "Dashes, needle throws and a spinning thread attack.",
        "She grows faster as her health drops.",
      ],
      tips: [
        "Learn the tell before each attack and punish the recovery, not the windup.",
        "Heal only when she is far away or pinned after a dash.",
        "Defeating her rewards the Mothwing Cloak (dash).",
      ],
      counters: ["Patient punishes", "Downward nail strikes"],
    },
    {
      id: "mantis-lords",
      name: "Mantis Lords",
      location: "Mantis Village, Fungal Wastes",
      required: false,
      difficulty: 3,
      phases: [
        "One lord duels you with lunges, dives and boomerang blades.",
        "Then two lords attack at once while the third watches.",
      ],
      tips: [
        "Watch for the brief glint before each lunge or dive.",
        "In the two-lord phase, focus one at a time and keep moving.",
        "Winning earns the Mantis tribe's respect and opens the way toward Deepnest.",
      ],
      counters: ["Mantis Claw wall-jumps for repositioning", "Quick Slash", "Spells during pauses"],
    },
    {
      id: "soul-master",
      name: "Soul Master",
      location: "Soul Sanctum, City of Tears",
      required: true,
      difficulty: 3,
      phases: [
        "He teleports and fires homing soul orbs, then slams down from above.",
        "After a false defeat he returns faster, with more slams.",
      ],
      tips: [
        "Strike him during the moment he reappears from a teleport.",
        "Dash under his slam and counter while he recovers.",
        "Defeating him grants the Desolate Dive spell.",
      ],
      counters: ["Staying close", "Vengeful Spirit while he hovers"],
    },
    {
      id: "hornet-sentinel",
      name: "Hornet (Sentinel)",
      location: "Kingdom's Edge",
      required: false,
      difficulty: 4,
      phases: [
        "Hornet's moveset returns, faster and joined by spike traps.",
        "Spikes fill the arena as the fight progresses.",
      ],
      tips: [
        "Avoid fighting near spike clusters; break them with your nail.",
        "Use the same tells as in Greenpath, but punish more quickly.",
        "Defeating her gives the King's Brand.",
      ],
      counters: ["Clearing spikes early", "Dash-jumps over her lunges"],
    },
    {
      id: "hollow-knight",
      name: "The Hollow Knight",
      location: "Black Egg Temple, Forgotten Crossroads",
      required: true,
      difficulty: 4,
      phases: [
        "Sword combos, counters and dashing strikes.",
        "As health falls it becomes erratic, adding infection blasts and self-wounding strikes.",
      ],
      tips: [
        "Requires the three Dreamers to be dealt with first.",
        "Don't hit it while it's in its parry stance; wait for the counter-swing to finish.",
        "In the late phase, punish after its self-wounding strikes end.",
      ],
      counters: ["Patient spacing", "Shade Soul and Abyss Shriek", "Upgraded nail"],
    },
  ],
  lore: [
    {
      id: "hallownest",
      title: "Hallownest",
      category: "Places",
      summary: "A once-great underground kingdom of bugs, now ruined and silent beneath the town of Dirtmouth.",
      related: ["pale-king", "infection", "dirtmouth"],
    },
    {
      id: "dirtmouth",
      title: "Dirtmouth",
      category: "Places",
      summary: "A quiet, nearly empty town on the surface, where the journey into Hallownest begins.",
      related: ["hallownest"],
    },
    {
      id: "pale-king",
      title: "The Pale King",
      category: "Rulers",
      summary: "The ruler who founded Hallownest and promised its people an eternal kingdom.",
      related: ["hallownest", "dreamers", "vessels"],
    },
    {
      id: "infection",
      title: "The Infection",
      category: "The Infection",
      summary: "A glowing orange plague that clouds the minds of bugs and drove the kingdom to ruin.",
      related: ["radiance", "hallownest", "dreamers"],
    },
    {
      id: "dreamers",
      title: "The Dreamers",
      category: "People",
      summary: "Monomon the Teacher, Lurien the Watcher and Herrah the Beast, who sleep to keep the Black Egg sealed.",
      related: ["infection", "pale-king"],
    },
    {
      id: "knight",
      title: "The Knight",
      category: "People",
      summary: "The small, silent wanderer the player controls, drawn back to Hallownest for reasons the journey slowly reveals.",
      related: ["vessels", "hallownest"],
    },
    {
      id: "vessels",
      title: "Vessels",
      category: "People",
      summary: "Beings created to hold something within them. Their purpose is one of the game's central mysteries.",
      related: ["pale-king", "knight"],
      spoiler: true,
    },
    {
      id: "radiance",
      title: "The Radiance",
      category: "The Infection",
      summary: "A forgotten light, once worshipped by the moths, tied to the source of the Infection.",
      related: ["infection", "dreamers"],
      spoiler: true,
    },
  ],
  builds: [
    {
      id: "nail",
      name: "Nail Arts",
      style: "Fast, close-range nail damage",
      description: "Lean on your nail: more reach, more speed and more damage per swing.",
      stages: {
        early: [
          { label: "Charms", items: ["Longnail (2)", "Steady Body (1)", "Wayward Compass (1)"] },
          { label: "Nail", items: ["Sharpened Nail — Nailsmith, City of Tears"] },
          { label: "Spells", items: ["Vengeful Spirit"] },
        ],
        mid: [
          { label: "Charms", items: ["Quick Slash (3)", "Fragile Strength (3)", "Longnail (2)"] },
          { label: "Nail", items: ["Channelled Nail"] },
          { label: "Tip", items: ["Fragile charms break on death — Unbreakable versions are sold by Divine in the Grimm Troupe."] },
        ],
        late: [
          { label: "Charms", items: ["Unbreakable Strength (3)", "Quick Slash (3)", "Mark of Pride (3)", "Grubsong (1)"] },
          { label: "Nail", items: ["Pure Nail"] },
        ],
      },
    },
    {
      id: "spells",
      name: "Spellcaster",
      style: "Soul-powered spells",
      description: "Gather soul quickly and spend it on stronger spells.",
      stages: {
        early: [
          { label: "Charms", items: ["Shaman Stone (3)", "Soul Catcher (2)"] },
          { label: "Spells", items: ["Vengeful Spirit"] },
        ],
        mid: [
          { label: "Charms", items: ["Shaman Stone (3)", "Spell Twister (2)", "Soul Catcher (2)"] },
          { label: "Spells", items: ["Vengeful Spirit", "Desolate Dive", "Howling Wraiths"] },
        ],
        late: [
          { label: "Charms", items: ["Shaman Stone (3)", "Spell Twister (2)", "Soul Eater (4)", "Grubsong (1)"] },
          { label: "Spells", items: ["Shade Soul", "Descending Dark", "Abyss Shriek"] },
        ],
      },
    },
    {
      id: "survival",
      name: "Careful Explorer",
      style: "Healing and defence",
      description: "Heal faster, take hits more safely and explore without fear.",
      stages: {
        early: [
          { label: "Charms", items: ["Baldur Shell (2)", "Grubsong (1)", "Thorns of Agony (1)"] },
          { label: "Tip", items: ["Buy a map and Quill from Cornifer's wife in Dirtmouth."] },
        ],
        mid: [
          { label: "Charms", items: ["Quick Focus (3)", "Lifeblood Heart (2)", "Stalwart Shell (2)", "Grubsong (1)"] },
        ],
        late: [
          { label: "Charms", items: ["Quick Focus (3)", "Deep Focus (4)", "Stalwart Shell (2)", "Grubsong (1)"] },
        ],
      },
    },
  ],
};
