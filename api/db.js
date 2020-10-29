import {
  MAGE, ROGUE, DRUID, HUNTER, PRIEST, SHAMAN, WARRIOR, PALADIN, WARLOCK,
  orc, troll, undead, tauren, bloodelf,
  human, dwarf, gnome, nightelf, draenei,
  tabards,
  classes,
  qualities,
  statTypes,
  startOutfit,
} from './wow-data.js'

const ARMOR = 188
const CLOTH = 1
const MAIL = 4.175
const PLATE = 7.45
const LEATHER = 1.875
const DPS = 143.5

let classMask = 0
const queries = []
const items = startOutfit.map(itemId => ({ itemId, count: -1 }))
const skills = []
const spells = []
const actions = []

const item = (itemId, count = 1) => items.push({classMask, itemId, count})
const skill = skillId => skills.push(`(0, ${classMask}, ${skillId})`)
const spell = spellId => spells.push(`(0, ${classMask}, ${spellId})`)
const action = (spellId) => {
  spell(spellId)
  const position = actions.filter(a => a.classMask === classMask && a.button < 72).length
  for (const offset of [0, 72, 84, 96]) {
    actions.push({ id: spellId, classMask, button: position + offset, type: 0 })
  }
}

const buildStat = ([k, v], i) => [
  `stat_type${i+1}=${statTypes[k].type}`,
  `stat_value${i+1}=${statTypes[k].rate*v}`,
]

const buildEffect = ([k, v], i) => [
  `spellid_${i+1}=${v}`,
  `spelltrigger_${i+1}=1`,
]

const createItem = (id, props) => {
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
  return id
}

action.item = (itemId, count = 1) => {
  const position = actions.filter(a => a.type === 128).length
  for (const { mask } of Object.values(classes)) {
    items.push({ classMask: mask, itemId, count })
    actions.push({ id: itemId, classMask: mask, button: 58 - position, type: 128 })
  }
}

const forEachRaces = data =>
  data.flatMap(d =>
    d.classMask
      ? classes[d.classMask].races.map(race => ({ race, ...d }))
      : Object.values(classes).flatMap(({ races, mask }) => races.map(race => ({ ...d, race, classMask: mask })))
  )

const tabardsQuery = Object.values(classes)
  .flatMap(({ races, mask }) => races.map(race => ({ itemId: tabards[race], count: 1, race, classMask: mask })))

const S = 1000
const M = 60*S
// common
skill(95)  // Defense
skill(98)  // Language: Common
skill(109) // Language: Orcish
skill(162) // Unarmed
skill(183) // GENERIC (DND)
skill(415) // Cloth
skill(777) // Mounts
skill(778) // Companion Pets
spell(81)    // Dodge
spell(58648) // refreshement (food & drink)
actions.push({ id: 58648, classMask, button: 59, type: 0 })
action.item(34722) // Bandage
action.item(createItem(34049, {
  name: 'Insignia of Freedom',
  use: 42292, // pvp trinket
  quality: 'rare',
  cooldown: 2*M,
}))
// action.item() // passive tanky trinket

classMask = HUNTER + PALADIN + SHAMAN + WARRIOR + ROGUE
skill(3127) // Parry

classMask = MAGE + DRUID + WARLOCK + PRIEST
skill(136) // Staves

classMask = DRUID + ROGUE
skill(414) // Leather

classMask = HUNTER + SHAMAN
skill(413) // Mail

classMask = PALADIN + WARRIOR
skill(293) // Plate

classMask = SHAMAN + PALADIN
skill(433) // Shield
skill(107) // Block

classMask = WARLOCK + MAGE + PRIEST
skill(228) // Wands

// TODO: maybe do macros ?
classMask = WARRIOR
action(11578) // Charge
action(47486) // Mortal Strike
action(47471) // Execute
action(3411)  // Intervene
action(676)   // Disarm
action(47465) // Rend
action(7384)  // Overpower
action(12323) // Piercing Howl
action(6552)  // Pummel
skill(44)  // Axes
skill(172) // Two-Handed Axes
spell(71)  // Defensive Stance
spell(2457) // Battle Stance
spell(2458) // Berserker Stance
spell(57499) // Warbringer (charge in combat)
spell(12677) // Tactical Mastery (15 rage left on switch stance)
spell(58097) // Glyph of Charge (better range on charge)
spell(58355) // Glyph of Rapid Charge (-1sec cd)
spell(12697) // Improved Charge (+10 rage)
spell(56638) // Taste for Blood (proc overpower)
spell(29724) // Sudden Death (proc execute)
spell(46855) // Trauma (crits improve bleed effect on target)
spell(16492) // Blood Craze (+6% life hot after crit)
spell(12753) // Anticipation (+5 % dodge)
spell(16466) // Deflection (+5 % parry)
spell(20121) // Conviction (+5 % crit)
spell(29859) // Blood Frenzy (10% haste + 4% damage to bleeding targets)
spell(37535) // Mortal Strike Discount (-5 cost)
spell(45471) // Defiance Expertise Passive (DND)
item(createItem(10207, {  // helm
  name: 'Starter Crown',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(10120, { // cloak
  id: 'Starter Cloak',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 60 },
}))
item(createItem(24463, { // shoulders
  name: 'Starter Pauldrons',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(24456, { // legs
  name: 'Starter Greaves',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(24387, { // hands
  name: 'Starter Gauntlets',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(31136, { // chest
  name: 'Starter Breastplate',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(12784, { // weapon
  name: 'Starter Striker',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(24091, { // belt
  name: 'Starter Defender',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(25956, { // wrist
  name: 'Starter Bracers',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(24064, { // feet
  name: 'Starter Sabatons',
  gems: 0,
  quality: 'uncommon',
  stats: { stam: 60, str: 40, crit: 20 },
}))
item(createItem(50310, {
  name: 'Shell of Resillience',
  quality: 'legendary',
  effects: [
    29834, // Second Wind (29838 r2?)
    12804, // Improved Disarm
    31383, // Deadened Nerves (-6% damage taken)
    12764, // Toughness (10% armor, -30% snare duration)
  ],
}))
item(createItem(53499, {
  name: 'Cruel Amulet',
  quality: 'legendary',
  effects: [
    56614, // Wrecking Crew
    12963, // Improved Overpower
    12867, // Deep Wounds
    12856, // Cruelty (+ 5% crit)
  ],
}))
item(createItem(51805, {
  name: 'Charm of Endless Rage',
  quality: 'legendary',
  effects: [
    35449, // Improved Mortal Strike
    20503, // Improved Execute
    29792, // Focused Rage
    20266, // Divine Strength (+ 15% strength)
  ]
}))

classMask = PALADIN
// passives
// skill(184) // Retribution
// skill(267) // Protection
// skill(594) // Holy
skill(43)  // Swords
skill(55)  // Two-Handed Swords
spell(48942) // Devotion Aura
spell(54043) // Retribution Aura
spell(19746) // Concentration Aura
// TODO:
// make aura apply seal + make seal perma duration
// + make jugement change from aura:
// concentration = mana regen = mana jugement effect
  // skill(20166) // Sceal of Wisdom

// devotion = heal = jugement of light effect
  // skill(20140) // Improved Devotion Aura (+50% armor, +6% heal)
  // skill(20165) // Sceal of Light

// retribution = damage + jugement "slow" effect
  // skill(20375) // Sceal of Righteousness
  // skill(31869) // Sanctified Retribution (+50% damage, 3% damage bonus)

spell(20256) // Improved Concentration Aura (+15% effect & reduce silence & interupt duration)
spell(53648) // Swift Retribution (auras grant +3% haste)
spell(54943) // Glyph of Seal of Light (+5% heal)
spell(54940) // Glyph of seal of Wisdom (-5% heal cost)
spell(56414) // Glyph of Seal of Righteousness (+10% damage)
spell(20217) // Blessing of Kings
spell(58242) // Glyph of Blessing of Kings (-50% cost)
spell(26023) // Pursuit of justice (+15% mvnt speed & -50% disarm duration)
spell(53488) // The Art of War (crit hit = instant flash or exorcism)
spell(33776) // Spiritual Attunement (getting heals = regen mana)
spell(20105) // Benediction (-10% cost instant spells)
spell(55113) // Glyph of Crusader Strike (-20% mana cost)
spell(31826) // Purifying Power (reduce mana cost and cooldown of some spells)
spell(20261) // Divine Intellect (+10% intell)
spell(25829) // Conviction (+5% crit)
spell(25957) // Improved Judgements (-2sec CD)
spell(63650) // Divinity (+%5 heal done, +%5 heal taken)
spell(31881) // Fanaticism (+18% crit on judgement)
spell(20337) // Heart of the Crusader (+3% crit chance on jugement targets)
spell(60147) // Holy Shock Crit Chance (+10% crit on shock)
spell(31849) // Sacred Duty (-1m on shield CD, +4% stamina)

classMask = HUNTER
// passives
// skill(51)  // Survival
// skill(50)  // Beast Mastery
// skill(163) // Marksmanship
skill(46)  // Guns
skill(45)  // Bows
skill(226) // Crossbows
skill(229) // Polearms
spell(5118) // Aspect of the Cheetah
spell(61847) // Aspect of the Dragonhawk
spell(34074) // Aspect of the Viper
spell(34484) // Careful Aim (intel = AP)
spell(19420) // Efficiency (-15% cost on shots)
spell(34489) // Master Marksman (+5% crit)
spell(34839) // Master Tactician (10% crit proc)
spell(56344) // Lock and Load (explosive shot procs)
spell(19509) // Ranged Weapon Specialization (+5% ranged damage)
spell(34493) // Resourcefulness (cheap trap and +6sec over blackarrow)
spell(34496) // Survival Instincts (+4% crit on Explosive Shot, -4% damage taken)
spell(56337) // T.N.T (6% damage on black arrow + explosive shot)
spell(63458) // Trap Mastery (+30% damage on black arrow)

classMask = ROGUE
// passives
// skill(38) // Combat
// skill(39) // Subtlety
// skill(253) // Assassination
skill(118) // Dual Wield
skill(173) // Daggers

classMask = PRIEST
// passives
// skill(56) // Holy
// skill(78) // Shadow
// skill(613) // Discipline

classMask = SHAMAN
// passives
// skill(373) // Enhancement
// skill(374) // Restoration
// skill(375) // Elemental
skill(54) // Maces
skill(160) // Two-Handed Maces

classMask = MAGE
// passives
// skill(8) // Fire
// skill(6) // Frost
// skill(237) // Arcane

classMask = WARLOCK
// passives
// skill(354) // Demonology
// skill(355) // Affliction
// skill(593) // Destruction
spell(17792) // Bane (-0.5 cast time on imolate & chaos bolt)
spell(58435) // Pandemic (corruption can crit)
spell(18275) // Shadow Mastery (+15% damage on drain and shadow spells)
spell(18136) // Intensity (-70% pushback on immolate & shadow bolt)
spell(26117) // Reduced Shadow Bolt Cost (-15% mana cost)
spell(18095) // Nightfall (4% proc instant shadowbolt on corrupt)
spell(47197) // Eradication (20% speed cast proc on corrupt damage)
spell(47270) // Fire and Brimstone (+25% crit on Conflagrate)
spell(70948) // Quick Decay (haste work on corruption)
spell(18183) // Improved Life Tap (+20% mana on tap)
spell(17834) // Improved Immolate (+30% damage on Immolate)
spell(32484) // Malediction (+3% damage, 9% crit chance on corrupt)
spell(63245) // Pyroclasm (conflag crits procs +6% damage buff)
spell(18176) // Suppression (3% hit chance, reduce mana cost by 6%)
spell(17780) // Cataclysm (10% destruction mana reduction cost)
spell(17918) // Destructive Reach (+20 range on destruction spells)
spell(30296) // Soul Leech (30% chance to get 20% heals on Shadow bolt & Conflag)
spell(56296) // Glyph of Siphon Life (+25% healing)
spell(38394) // Dot Heals (70hp when dots tick)

classMask = DRUID
// passives
// skill(134) // Feral
// skill(574) // Balance
// skill(573) // Restoration
spell(768) // Cat Form
spell(783) // Travel Form
spell(9634) // Bear Form
spell(48495) // King of the Jungle (-60% cost of Cat and Bear form)
spell(34153) // Living Spirit (+15% spirit)
spell(17108) // Intensity (+50% mana regen while casting)
spell(16864) // Omen of Clarity (attacks proc clearcast)
spell(16847) // Moonglow (reduce Hot & Dot mana cost)
spell(33877) // Moonfire Mana Reduction (-10%)
spell(17115) // Improved Rejuvenation (+15% heal)
spell(21871) // Increased Rejuvenation Duration (+3sec)
spell(16820) // Nature's Reach (20% more range on balacne spells)
spell(54829) // Glyph of Moonfire (reduce initial damage but improve dot)
spell(16975) // Predatory Strikes (20% chance per combot of instant cast)
spell(16944) // Sharpen Claws (+6 crit in bear / cat)
spell(16999) // Savage Fury (+20% damage on Mangle)
spell(16938) // Ferocity (-5 enery on Mangle)
spell(54818) // Glyph of Rip (+4s)
spell(17061) // Furor (gain rage & keep energy uppon shapeshift)
spell(33867) // Predatory Instincts (+10% damage in catform)
spell(57877) // Protector of the Pack (+6% AP, 12% damage reduce in bear)
spell(48410) // Primal Precision (10 expertise, refund energy on fail finishing move)
spell(24866) // Feral Swiftness (30% speed in cat, +4% dodge)
spell(63503) // Primal Gore (Rip can crit)
spell(67128) // T9 4P Bonus (Rejuvenation can crit)
spell(67125) // T9 2P Bonus (Moonfire tick can crit)
spell(48491) // Improved Mangle (-1.5sec CD / -6 energy cost)
spell(48485) // Infected Wounds (-50% snare on mangle)
spell(33873) // Nurturing Instinct (agi = heal bonus)
spell(37117) // Primal Fury (gain combo uppon crits)
spell(33890) // Empowered Rejuv (+20% bonus heal on HoT)
spell(57865) // Nature's Splendor (increase Hot and Dot durations)
spell(57814) // Genesis (+5% power for hot & dot)
spell(24946) // Gift of Nature (+10% heal)
spell(16941) // Brutal Impact (+1s pounce, -30s bash CD)
spell(33883) // Natural Perfection (+3% crit, damage reduction)
spell(16835) // Natural Shapeshifter (-30% cost of shape shift)
spell(24894) // Heart of the wild (more AP in cat, more stam in bear, more intel)


// add hunter aspect + paladin aura in cast spell

// disable talents
// disable trainers
// add first aid buff ()
// make tank passive trinket (31850 - ardent defender R1)
// make tank active, short CD trinket (instant heal)         + stam
// make tank active, long CD trinket (AGM, 15min big absorb) + stam

// make melee burst active, short CD trinket  + crit (dynamite, 37666, 1min)
// make caster burst active, short CD trinket + spell (instant cast, 2min)
// make melee burst active, long CD trinket   + AP
// make caster burst active, long CD trinket  + spell 
// make healer burst passive trinket          + spell
// make healer burst active, long CD trinket  + spell
// remove miss and resists
// buff lower level enchants to give more choices
// remove vendors
// show extra bars on 1st char

// spell absorb: 70845 (10s)
// spell heal: 43821 (8s)
const dmg = (delay, dps) => {
  const base = dps*(delay/1000)
  return `dmg_min1=${Math.round(base*0.8)}, dmg_max1=${Math.round(base*1.2)}, delay=${delay}`
}

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
    queries.push(`UPDATE world.item_template SET armor=${ARMOR*typeMod*slotMod} WHERE InventoryType=${slot} AND subclass=${type}`)
  }
}

console.log(`
UPDATE world.item_template
SET
  -- entry=DEFAULT,
  -- class=DEFAULT,
  -- subclass=DEFAULT,
  -- SoundOverrideSubclass=DEFAULT,
  -- name=DEFAULT,
  -- displayid=DEFAULT,
  Quality=1,
  -- Flags=DEFAULT,
  -- FlagsExtra=DEFAULT,
  BuyCount=DEFAULT,
  BuyPrice=DEFAULT,
  SellPrice=DEFAULT,
  -- InventoryType=DEFAULT,
  AllowableClass=DEFAULT,
  AllowableRace=DEFAULT,
  ItemLevel=DEFAULT,
  RequiredLevel=DEFAULT,
  RequiredSkill=DEFAULT,
  RequiredSkillRank=DEFAULT,
  requiredspell=DEFAULT,
  requiredhonorrank=DEFAULT,
  RequiredCityRank=DEFAULT,
  RequiredReputationFaction=DEFAULT,
  RequiredReputationRank=DEFAULT,
  -- maxcount=DEFAULT,
  -- stackable=DEFAULT,
  -- ContainerSlots=DEFAULT,
  StatsCount=DEFAULT,
  stat_type1=DEFAULT,
  stat_value1=DEFAULT,
  stat_type2=DEFAULT,
  stat_value2=DEFAULT,
  stat_type3=DEFAULT,
  stat_value3=DEFAULT,
  stat_type4=DEFAULT,
  stat_value4=DEFAULT,
  stat_type5=DEFAULT,
  stat_value5=DEFAULT,
  stat_type6=DEFAULT,
  stat_value6=DEFAULT,
  stat_type7=DEFAULT,
  stat_value7=DEFAULT,
  stat_type8=DEFAULT,
  stat_value8=DEFAULT,
  stat_type9=DEFAULT,
  stat_value9=DEFAULT,
  stat_type10=DEFAULT,
  stat_value10=DEFAULT,
  ScalingStatDistribution=DEFAULT,
  ScalingStatValue=DEFAULT,
  dmg_min1=DEFAULT,
  dmg_max1=DEFAULT,
  dmg_type1=DEFAULT,
  dmg_min2=DEFAULT,
  dmg_max2=DEFAULT,
  dmg_type2=DEFAULT,
  armor=DEFAULT,
  holy_res=DEFAULT,
  fire_res=DEFAULT,
  nature_res=DEFAULT,
  frost_res=DEFAULT,
  shadow_res=DEFAULT,
  arcane_res=DEFAULT,
  -- delay=DEFAULT,
  -- ammo_type=DEFAULT,
  RangedModRange=DEFAULT,
  spellid_1=DEFAULT,
  spelltrigger_1=DEFAULT,
  spellcharges_1=DEFAULT,
  spellppmRate_1=DEFAULT,
  spellcooldown_1=DEFAULT,
  spellcategory_1=DEFAULT,
  spellcategorycooldown_1=DEFAULT,
  spellid_2=DEFAULT,
  spelltrigger_2=DEFAULT,
  spellcharges_2=DEFAULT,
  spellppmRate_2=DEFAULT,
  spellcooldown_2=DEFAULT,
  spellcategory_2=DEFAULT,
  spellcategorycooldown_2=DEFAULT,
  spellid_3=DEFAULT,
  spelltrigger_3=DEFAULT,
  spellcharges_3=DEFAULT,
  spellppmRate_3=DEFAULT,
  spellcooldown_3=DEFAULT,
  spellcategory_3=DEFAULT,
  spellcategorycooldown_3=DEFAULT,
  spellid_4=DEFAULT,
  spelltrigger_4=DEFAULT,
  spellcharges_4=DEFAULT,
  spellppmRate_4=DEFAULT,
  spellcooldown_4=DEFAULT,
  spellcategory_4=DEFAULT,
  spellcategorycooldown_4=DEFAULT,
  spellid_5=DEFAULT,
  spelltrigger_5=DEFAULT,
  spellcharges_5=DEFAULT,
  spellppmRate_5=DEFAULT,
  spellcooldown_5=DEFAULT,
  spellcategory_5=DEFAULT,
  spellcategorycooldown_5=DEFAULT,
  bonding=DEFAULT,
  description=DEFAULT,
  PageText=DEFAULT,
  LanguageID=DEFAULT,
  PageMaterial=DEFAULT,
  startquest=DEFAULT,
  lockid=DEFAULT,
  Material=DEFAULT,
  sheath=DEFAULT,
  RandomProperty=DEFAULT,
  RandomSuffix=DEFAULT,
  block=DEFAULT,
  itemset=DEFAULT,
  MaxDurability=DEFAULT,
  area=DEFAULT,
  Map=DEFAULT,
  BagFamily=DEFAULT,
  TotemCategory=DEFAULT,
  socketColor_1=DEFAULT,
  socketContent_1=DEFAULT,
  socketColor_2=DEFAULT,
  socketContent_2=DEFAULT,
  socketColor_3=DEFAULT,
  socketContent_3=DEFAULT,
  socketBonus=DEFAULT,
  GemProperties=DEFAULT,
  RequiredDisenchantSkill=DEFAULT,
  ArmorDamageModifier=DEFAULT,
  duration=DEFAULT,
  ItemLimitCategory=DEFAULT,
  HolidayId=DEFAULT,
  -- ScriptName=DEFAULT,
  DisenchantID=DEFAULT,
  FoodType=DEFAULT,
  minMoneyLoot=DEFAULT,
  maxMoneyLoot=DEFAULT,
  flagsCustom=DEFAULT;

${queries.join(';\n')};

UPDATE world.item_template
   SET ${dmg(1500, DPS)}
 WHERE class=2 AND subclass IN (0, 4, 7, 2, 15);

UPDATE world.item_template
   SET ${dmg(3000, DPS*1.3)}
 WHERE class=2 AND subclass IN (1, 5, 6, 8, 10, 17);

DELETE FROM world.playercreateinfo_skills;
INSERT INTO world.playercreateinfo_skills (raceMask, classMask, skill)
VALUES ${skills};

DELETE FROM world.playercreateinfo_action;
INSERT INTO world.playercreateinfo_action (race, class, button, action, type)
VALUES ${forEachRaces(actions).map(
  a => `(${a.race}, ${Math.log2(a.classMask) + 1}, ${a.button}, ${a.id}, ${a.type})`
)};

DELETE FROM world.playercreateinfo_spell_custom;
INSERT INTO world.playercreateinfo_spell_custom (racemask, classmask, Spell)
VALUES ${spells};

DELETE FROM world.playercreateinfo_item;
INSERT INTO world.playercreateinfo_item (race, class, itemid, amount)
VALUES ${[...forEachRaces(items), ...tabardsQuery].map(
  i => `(${i.race}, ${Math.log2(i.classMask) + 1}, ${i.itemId}, ${i.count})`
)};

UPDATE world.version SET cache_id=cache_id+1;
`)
