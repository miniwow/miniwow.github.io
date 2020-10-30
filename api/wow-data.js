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
  MP5: 43,  // 0.5
  SP: 45,   // 1
  int: 5,   // 1
  str: 4,   // 1
  agi: 3,   // 1
  spi: 6,   // 1
  hast: 36, // 1
  crit: 32, // 1
  stam: 7,  // 1.5
  AP: 38,   // 2
  // 37 ITEM_MOD_EXPERTISE_RATING
  // 44 ITEM_MOD_ARMOR_PENETRATION_RATING
  // 31 ITEM_MOD_HIT_RATING
  // 12 ITEM_MOD_DEFENSE_SKILL_RATING
  // 13 ITEM_MOD_DODGE_RATING
  // 14 ITEM_MOD_PARRY_RATING
  // 15 ITEM_MOD_BLOCK_RATING
}


export const qualities = { junk: 0, common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 }

export const ARMOR = 65.55
export const CLOTH = 1
export const MAIL = 4.175
export const PLATE = 7.45
export const LEATHER = 1.875
export const DPS = 43.5
export const S = 1000
export const M = 60*S

let classMask = 0
export const use = mask => classMask = mask
export const queries = []
export const items = startOutfit.map(itemId => ({ itemId, count: -1 }))
export const skills = []
export const actions = []
export const passives = []

export const formOffset = [0, 72, 84, 96]
export const item = (itemId, count = 1) => items.push({classMask, itemId, count})
export const skill = skillId => skills.push(`(0, ${classMask}, ${skillId})`)
export const passive = spellId => passives.push(`(0, ${classMask}, ${spellId})`)
export const spell = passive
export const action = (spellId, { forms = [0], ...overrides } = {}) => {
  passive(spellId)
  for (const offsetId of forms) {
    const offset = formOffset[offsetId]
    const position = actions.filter(a =>
      a.classMask === classMask &&
      a.button >= offset &&
      a.button < (offset + 12)
    ).length

    if (position >= 12) throw Error(`bar ${offsetId} full`)
    actions.push({ id: spellId, classMask, button: offset + position, type: 0, ...overrides })
  }
}

action.item = (itemId, count = 1) => {
  const position = actions.filter(a => a.type === 128).length
  for (const { mask } of Object.values(classes)) {
    items.push({ classMask: mask, itemId, count })
    actions.push({ id: itemId, classMask: mask, button: 58 - position, type: 128 })
  }
}

export const buildStat = ([k, v], i) => [
  `stat_type${i+1}=${statTypes[k]}`,
  `stat_value${i+1}=${v}`,
]

export const buildEffect = ([k, v], i) => [
  `spellid_${i+1}=${v}`,
  `spelltrigger_${i+1}=1`,
]

export const editedItems = []
export const createItem = (id, props) => {
  const {
    use,
    name,
    gems,
    armor,
    quality,
    category,
    description,
    cooldown = -1,
  } = props

  const effects = Object.entries(props.effects||{})
  const stats = Object.entries(props.stats||{})
  const n = effects.length+1
  queries.push(`UPDATE world.item_template SET ${[
    name == null || `name='${name}'`,
    armor == null || `armor=${armor}`,
    quality == null || `quality=${qualities[quality]}`,
    description == null || `description='${description}'`,
    ...stats.map(buildStat),
    `StatsCount=${stats.length}`,
    ...effects.map(buildEffect),
    gems == null || [...Array(gems).keys()].flatMap(i => [
      `socketColor_${i}=4`,
      `socketContent_${i}=1`,
    ]),
    use == null || [
      `spellid_${n}=${use}`,
      `spelltrigger_${n}=0`,
      `spellcharges_${n}=0`,
      category == null || `spellcategory_${n}=${category}`,
      category == null || `spellcategorycooldown_${n}=${cooldown}`,
      `spellcooldown_${n}=${cooldown}`,
    ],
  ].flat().filter(s => typeof s === 'string').join(', ')} WHERE entry=${id}`)
  if (editedItems.includes(id)) throw Error(`item ${id} already edited`)
  editedItems.push(id)
  return id
}

export const forEachRaces = data =>
  data.flatMap(d =>
    d.classMask
      ? classes[d.classMask].races.map(race => ({ race, ...d }))
      : Object.values(classes).flatMap(({ races, mask }) => races.map(race => ({ ...d, race, classMask: mask })))
  )


const slotArmor = Object.entries({
  1: 1.3, // Head
  3: 1.2, // Shoulder
  5: 1.6, // Chest
  6: 0.9, // Waist
  7: 1.4, // Legs
  8: 1.1, // Feet
  9: 0.7, // Wrists
  10: 1.0, // Hands
  20: 1.6, // Robe
})

// normalize armor
for (const [type, typeMod] of Object.entries({ 1: CLOTH, 2: LEATHER, 3: MAIL, 4: PLATE })) {
  for (const [slot, slotMod] of slotArmor) {
    queries.push(`UPDATE world.item_template SET armor=${Math.round(ARMOR*typeMod*slotMod)} WHERE InventoryType=${slot} AND subclass=${type}`)
  }
}

export const dmg = (delay, mod) => {
  const base = (DPS*mod)*(delay/1000)
  return `dmg_min1=${Math.round(base*0.8)}, dmg_max1=${Math.round(base*1.2)}, delay=${delay}`
}

export const tabardEntries = Object.values(classes)
  .flatMap(({ races, mask }) => races.map(race => ({ itemId: tabards[race], count: 1, race, classMask: mask })))
