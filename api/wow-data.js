export const startOutfit = [35,36,38,39,40,43,44,45,47,48,49,51,52,53,55,56,57,59,120,121,127,129,139,140,147,148,153,154,159,1395,1396,2092,2101,2102,2105,2361,2362,2504,2508,2512,2516,3661,4540,6096,6097,6098,6116,6117,6118,6119,6120,6121,6122,6123,6124,6125,6126,6127,6129,6134,6135,6136,6137,6138,6139,6140,6144,6948,12282,20891,20892,20893,20894,20895,20896,20897,20898,20899,20900,20901,20978,20980,20982,23322,23344,23345,23346,23347,23348,23473,23474,23475,23476,23477,23478,23479,24143,24145,24146,25861,28979,34648,34649,34650,34651,34652,34653,34655,34656,34657,34658,34659,38145,38147,40582,41751,49778,50055,50057]
export const
  mage = 8, MAGE = 2 ** (mage - 1),
  rogue = 4, ROGUE = 2 ** (rogue - 1),
  druid = 11, DRUID = 2 ** (druid - 1),
  hunter = 3, HUNTER = 2 ** (hunter - 1),
  priest = 5, PRIEST = 2 ** (priest - 1),
  shaman = 7, SHAMAN = 2 ** (shaman - 1),
  warrior = 1, WARRIOR = 2 ** (warrior - 1),
  paladin = 2, PALADIN = 2 ** (paladin - 1),
  warlock = 9, WARLOCK = 2 ** (warlock - 1),
  human = 1, dwarf = 3, gnome = 7, nightelf = 4, draenei = 11,
  orc = 2, troll = 8, undead = 5, tauren = 6, bloodelf = 10,
  tabards = {
    [orc]: 45581,
    [human]: 45574,
    [troll]: 45582,
    [gnome]: 45578,
    [dwarf]: 45577,
    [undead]: 45583,
    [tauren]: 45584,
    [draenei]: 45580,
    [bloodelf]: 45585,
    [nightelf]: 45579,
  },
  classes = {
  [WARRIOR]: {
    mask: WARRIOR,
    id: warrior,
    name: 'warrior',
    races: [human, orc, dwarf, nightelf, undead, tauren, gnome, troll, draenei],
  },
  [PALADIN]: {
    mask: PALADIN,
    id: paladin,
    name: 'paladin',
    races: [human, dwarf, bloodelf, draenei],
  },
  [HUNTER]: {
    mask: HUNTER,
    id: hunter,
    name: 'hunter',
    races: [orc, dwarf, nightelf, tauren, troll, bloodelf, draenei],
  },
  [ROGUE]: {
    mask: ROGUE,
    id: rogue,
    name: 'rogue',
    races: [human, orc, dwarf, nightelf, undead, gnome, troll, bloodelf],
  },
  [PRIEST]: {
    mask: PRIEST,
    id: priest,
    name: 'priest',
    races: [human, dwarf, nightelf, undead, troll, bloodelf, draenei],
  },
  [SHAMAN]: {
    mask: SHAMAN,
    id: shaman,
    name: 'shaman',
    races: [orc, tauren, troll, draenei],
  },
  [MAGE]: {
    mask: MAGE,
    id: mage,
    name: 'mage',
    races: [human, undead, gnome, troll, bloodelf, draenei],
  },
  [WARLOCK]: {
    mask: WARLOCK,
    id: warlock,
    name: 'warlock',
    races: [human, orc, undead, gnome, troll, bloodelf],
  },
  [DRUID]: {
    mask: DRUID,
    id: druid,
    name: 'druid',
    races: [nightelf, tauren],
  },
}

export const statTypes = {
  int: { type: 5, rate: 1 },
  str: { type: 4, rate: 1 },
  agi: { type: 3, rate: 1 },
  stam: { type: 7, rate: 1.5 },
  spi: { type: 6, rate: 1 },
  hast: { type: 36, rate: 1 },
  crit: { type: 32, rate: 1 },
  AP: { type: 38, rate: 2 },
  SP: { type: 45, rate: 1 },
  MP5: { type: 43, rate: 0.5 },
  // 37 ITEM_MOD_EXPERTISE_RATING
  // 44 ITEM_MOD_ARMOR_PENETRATION_RATING
  // 31 ITEM_MOD_HIT_RATING
  // 12 ITEM_MOD_DEFENSE_SKILL_RATING
  // 13 ITEM_MOD_DODGE_RATING
  // 14 ITEM_MOD_PARRY_RATING
  // 15 ITEM_MOD_BLOCK_RATING
}


export const qualities = { junk: 0, common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 }
