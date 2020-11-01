import { action, skill, spell, passive, item, createItem } from '../api/wow-data.js'

// action() // Ambush
// action() // Sprint
// action() // Backstab
// action() // Kidney Shot
// action() // Eviscerate
// action() // Kick
// action() // Vanish
// action() // Gouge
action(36554) // Shadowstep

// Weapons
skill(118) // Dual Wield
skill(173) // Daggers

// Passives
// skill(38) // Combat
// skill(39) // Subtlety
// skill(253) // Assassination
passive(58415) // Filthy Tricks (Shadowstep cost no energy and -10s CD)

// Stealth
// spell()

// Starting Gear
item(createItem(22718, { // Head
  name: 'Starter Mask',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(13358, { // Shoulders
  name: 'Starter Shoulders',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(13944, { // Chest
  name: 'Starter Breastplate',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(12966, { // Wrist
  name: 'Starter Armguards',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))

item(createItem(13395, { // Hands
  name: 'Starter Claw',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))

item(createItem(14502, { // Belt
  name: 'Starter Girdle',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(15057, { // Legs
  name: 'Starter Pants',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(23073, { // Feets
  name: 'Starter Boots',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, hit: 80 },
}))

item(createItem(31758, { // Main Hand
  name: 'Starter Dagger',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))

item(createItem(5267, { // Off Hand
  name: 'Starter Kriss',
  stats: { crit: 16 },
}))

// Necklaces

/*
fufu | ambush master
full backstab elite
cc | tanky
*/