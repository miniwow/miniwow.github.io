import {
  MAGE, ROGUE, DRUID, HUNTER, PRIEST, SHAMAN, WARRIOR, PALADIN, WARLOCK,
  actions,
  items,
  passives,
  queries,
  use,
  skills,
  tabardEntries,
  editedItems,
  dmg,
  forEachRaces,
} from './wow-data.js'

// TODO:
// maybe do macros & keybinds
// add hunter aspect + paladin aura in cast spell

// disable talents
// disable trainers
// make tank active, short CD trinket (instant heal)         + stam
// make tank active, long CD trinket (AGM, 15min big absorb) + stam

// make melee burst active, short CD trinket  + crit (dynamite, 37666, 1min)
// make caster burst active, short CD trinket + spell (instant cast, 2min)
// make melee burst active, long CD trinket   + AP
// make caster burst active, long CD trinket  + spell
// make healer burst passive trinket          + spell
// make healer burst active, long CD trinket  + spell
// remove miss and resists
// remove vendors
// show extra bars on 1st char
// disable auto learning previous ranks
// remove wierd added spells from nowhere
// normalize race base stats

// ? buff lower level enchants to give more choices
// spell absorb: 70845 (10s)
// spell absorb: 71586 (10s, 6400 dmg)
// spell heal: 43821 (8s)

await import('../classes/common.js')

use(WARRIOR)
await import('../classes/warrior.js')

use(PALADIN)
await import('../classes/paladin.js')

use(HUNTER)
await import('../classes/hunter.js')

use(ROGUE)
await import('../classes/rogue.js')

use(PRIEST)
await import('../classes/priest.js')

use(SHAMAN)
await import('../classes/shaman.js')

use(MAGE)
await import('../classes/mage.js')

use(WARLOCK)
await import('../classes/warlock.js')

use(DRUID)
await import ('../classes/druid.js')

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
  flagsCustom=DEFAULT
WHERE entry IN (${editedItems});

${queries.join(';\n')};

UPDATE world.item_template
   SET ${dmg(1500, 1)}
 WHERE class=2 AND subclass IN (0, 4, 7, 2, 15);

UPDATE world.item_template
   SET ${dmg(3000, 1.3)}
 WHERE class=2 AND subclass IN (1, 5, 6, 8, 10, 17);

DELETE FROM world.playercreateinfo_skills;
INSERT INTO world.playercreateinfo_skills (raceMask, classMask, skill)
VALUES ${skills.join(',\n       ')};

DELETE FROM world.playercreateinfo_action;
INSERT INTO world.playercreateinfo_action (race, class, button, action, type)
VALUES ${forEachRaces(actions).map(
  a => `(${a.race}, ${Math.log2(a.classMask) + 1}, ${a.button}, ${a.id}, ${a.type})`
).join(',\n       ')};

DELETE FROM world.playercreateinfo_spell_custom;
INSERT INTO world.playercreateinfo_spell_custom (racemask, classmask, Spell)
VALUES ${passives.join(',\n       ')};

DELETE FROM world.playercreateinfo_item;
INSERT INTO world.playercreateinfo_item (race, class, itemid, amount)
VALUES ${[...forEachRaces(items), ...tabardEntries].map(
  i => `(${i.race}, ${Math.log2(i.classMask) + 1}, ${i.itemId}, ${i.count})`
).join(',\n       ')};

UPDATE world.version SET cache_id=cache_id+1;
UPDATE auth.realmlist SET address='logon.oct.ovh';
`)
