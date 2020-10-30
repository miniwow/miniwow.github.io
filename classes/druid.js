import { action, skill, spell, passive, item, createItem } from './wow-data.js'

const CAT = 1, BEAR = 3
action(5215,  { forms: [CAT] }) // Prowl
action(9827,  { forms: [CAT] }) // Pounce
action(33982, { forms: [CAT] }) // Mangle
action(9896,  { forms: [CAT] }) // Rip
action(8983,  { forms: [BEAR] }) // Bash
action(33986, { forms: [BEAR] }) // Mangle
action(16979, { forms: [BEAR] }) // Feral Charge
action(9858)  // Regrowth
action(25299) // Rejuvenation
action(18562) // Swiftmend
action(9853,  { forms: [0, BEAR] }) // Entangling Roots
action(9835,  { forms: [0, BEAR, CAT] }) // Moonfire
action(33786, { forms: [0, BEAR, CAT] }) // Cyclone

// Forms
spell(768) // Cat Form
spell(783) // Travel Form
spell(9634) // Bear Form

// Passives
passive(66530) // Improved Barkskin (DND)
passive(48495) // King of the Jungle (-60% cost of Cat and Bear form)
passive(34153) // Living Spirit (+15% spirit)
passive(16864) // Omen of Clarity (attacks proc clearcast)
passive(16847) // Moonglow (reduce Hot & Dot mana cost)
passive(33877) // Moonfire Mana Reduction (-10%)
passive(17115) // Improved Rejuvenation (+15% heal)
passive(21871) // Increased Rejuvenation Duration (+3sec)
passive(16820) // Nature's Reach (20% more range on balacne spells)
passive(54829) // Glyph of Moonfire (reduce initial damage but improve dot)
passive(16975) // Predatory Strikes (20% chance per combot of instant cast)
passive(16944) // Sharpen Claws (+6 crit in bear / cat)
passive(37117) // Primal Fury (gain combo uppon crits)
passive(16938) // Ferocity (-5 enery on Mangle)
passive(54818) // Glyph of Rip (+4s)
passive(17061) // Furor (gain rage & keep energy uppon shapeshift)
passive(33867) // Predatory Instincts (+10% damage in catform)
passive(57877) // Protector of the Pack (+6% AP, 12% damage reduce in bear)
passive(48410) // Primal Precision (10 expertise, refund energy on fail finishing move)
passive(24866) // Feral Swiftness (30% speed in cat, +4% dodge)
passive(63503) // Primal Gore (Rip can crit)
passive(67128) // T9 4P Bonus (Rejuvenation can crit)
passive(67125) // T9 2P Bonus (Moonfire tick can crit)

// Starting Gear
item(createItem(22109, {  // helm
  name: 'Starter Cowl',
  quality: 'uncommon',
  stats: { stam: 24, int: 16, SP: 16 },
}))

item(createItem(22112, { // shoulders
  name: 'Starter Spaulders',
  quality: 'uncommon',
  stats: { stam: 24, int: 16, SP: 16 },
}))

item(createItem(22111, { // legs
  name: 'Starter Kilt',
  quality: 'uncommon',
  stats: { stam: 24, int: 16, SP: 16 },
}))

item(createItem(22110, { // hands
  name: 'Starter Gloves',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))

item(createItem(22113, { // chest
  name: 'Starter Vest',
  quality: 'uncommon',
  stats: { stam: 24, int: 16, SP: 16 },
}))

item(createItem(27877, { // weapon
  name: 'Starter ',
  quality: 'uncommon',
  stats: { stam: 24, crit: 16, SP: 16 },
}))

item(createItem(22106, { // belt
  name: 'Starter Belt',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16, crit: 16 },
}))

item(createItem(22108, { // wrist
  name: 'Starter Bracers',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))

item(createItem(22107, { // feet
  name: 'Starter Boots',
  quality: 'uncommon',
  stats: { stam: 24, agi: 16 },
}))


// Neckless
item(createItem(25071, {
  name: 'Pendant of the Shapeshifter',
  quality: 'legendary',
  effects: [
    16941, // Brutal Impact (+1s pounce, -30s bash CD)
    33883, // Natural Perfection (+3% crit, damage reduction)
    16835, // Natural Shapeshifter (-30% cost of shape shift)
    24894, // Heart of the wild (more AP in cat, more stam in bear, more intel)
  ],
}))

item(createItem(12026, {
  name: 'Amulet of the Gifted',
  quality: 'legendary',
  effects: [
    33890, // Empowered Rejuv (+20% bonus heal on HoT)
    57865, // Nature's Splendor (increase Hot and Dot durations)
    54824, // Glyph of Swiftmend (do not consume HoT anymore)
    38417, // Reduced Swiftmend Cooldown (-2s)
    24946, // Gift of Nature (+10% heal)
  ],
}))

item(createItem(28822, {
  name: 'Infected Teeth',
  quality: 'legendary',
  effects: [
    48491, // Improved Mangle (-1.5sec CD / -6 energy cost)
    48485, // Infected Wounds (-50% snare on mangle)
    16999, // Savage Fury (+20% damage on Mangle)
    33873, // Nurturing Instinct (agi = heal bonus)
  ]
}))
