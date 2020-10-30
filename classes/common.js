import {
  MAGE, ROGUE, DRUID, HUNTER, PRIEST, SHAMAN, WARRIOR, PALADIN, WARLOCK,
  action, createItem, item, passive, spell, use, skill,
  M, S,
} from './wow-data.js'

// For everyone
skill(95)  // Defense
skill(98)  // Language: Common
skill(109) // Language: Orcish
skill(162) // Unarmed
skill(183) // GENERIC (DND)
skill(415) // Cloth
skill(777) // Mounts
skill(778) // Companion Pets

passive(81)    // Dodge
passive(14777) // Meditation (+50% mana regen while casting)
passive(18464) // Arcane Meditation (+50% mana regen while casting)

action(58648, { button: 59 }) // refreshement (food & drink)

action.item(createItem(34722, { // Bandage
  name: 'Never-ending Bandage',
  use: 45544,
  quality: 'uncommon',
}))

action.item(createItem(34049, {
  name: 'Insignia of Freedom',
  use: 42292, // pvp trinket
  quality: 'rare',
  cooldown: 2*M,
}))

item(createItem(37559, { // passive tanky trinket
  name: 'Mark of the Ardent Defender',
  quality: 'rare',
  effects: [31852],
}))

item(createItem(10120, {
  id: 'Starter Cloak',
  quality: 'uncommon',
  stats: { stam: 24, hast: 16, crit: 16 },
}))

// ring melee
// ring caster

use(HUNTER + PALADIN + SHAMAN + WARRIOR + ROGUE)
skill(3127) // Parry

use(MAGE + DRUID + WARLOCK + PRIEST)
skill(136) // Staves

use(DRUID + ROGUE)
skill(414) // Leather

use(HUNTER + SHAMAN)
skill(413) // Mail

use(PALADIN + WARRIOR)
skill(293) // Plate

use(SHAMAN + PALADIN)
skill(433) // Shield
skill(107) // Block

use(WARLOCK + MAGE + PRIEST)
skill(228) // Wands
