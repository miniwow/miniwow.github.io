import { action, skill, spell, passive, item, createItem } from '../api/wow-data.js'

const ARM = 1, DEF = 2, BER = 3
action(11578, { forms: [DEF, BER, ARM] }) // Charge
action(21553, { forms: [DEF, BER, ARM] }) // Mortal Strike
action(12323, { forms: [DEF, BER, ARM] }) // Piercing Howl
action(3411,  { forms: [DEF, BER, ARM] }) // Intervene
action(20662, { forms: [BER, ARM] }); action(676, { forms: [DEF] }) // Execute / Disarm
action(11574, { forms: [DEF, ARM] }); action(6552, { forms: [BER] })// Rend / Pummel
action(7384,  { forms: [ARM] }) // Overpower

// Weapons
skill(44)  // Axes
skill(172) // Two-Handed Axes

// Stances
spell(71)  // Defensive Stance
spell(2457) // Battle Stance
spell(2458) // Berserker Stance

// Passives
passive(3127)  // Parry
passive(57499) // Warbringer (charge in combat)
passive(12677) // Tactical Mastery (15 rage left on switch stance)
passive(58097) // Glyph of Charge (better range on charge)
passive(58355) // Glyph of Rapid Charge (-1sec cd)
passive(12697) // Improved Charge (+10 rage)
passive(56638) // Taste for Blood (proc overpower)
passive(29724) // Sudden Death (proc execute)
passive(46855) // Trauma (crits improve bleed effect on target)
passive(16492) // Blood Craze (+6% life hot after crit)
passive(12753) // Anticipation (+5 % dodge)
passive(16466) // Deflection (+5 % parry)
passive(20121) // Conviction (+5 % crit)
passive(29859) // Blood Frenzy (10% haste + 4% damage to bleeding targets)
passive(37535) // Mortal Strike Discount (-5 cost)
passive(45471) // Defiance Expertise Passive (DND)
passive(12727) // Generate Rage on dodge & parry
// passive(29623) // Endless Rage (+25% rage)

// Starting Gear
item(createItem(10207, { // helm
  name: 'Starter Crown',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(24463, { // shoulders
  name: 'Starter Pauldrons',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(24456, { // legs
  name: 'Starter Greaves',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(24387, { // hands
  name: 'Starter Gauntlets',
  quality: 'uncommon',
  stats: { stam: 24, str: 16 },
}))

item(createItem(31136, { // chest
  name: 'Starter Breastplate',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(12784, { // weapon
  name: 'Starter Striker',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(24091, { // belt
  name: 'Starter Defender',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, crit: 16 },
}))

item(createItem(25956, { // wrist
  name: 'Starter Bracers',
  quality: 'uncommon',
  stats: { stam: 24, str: 16 },
}))

item(createItem(24064, { // feet
  name: 'Starter Sabatons',
  quality: 'uncommon',
  stats: { stam: 24, str: 16, hit: 80 },
}))


// Necklaces
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
    12296, // Anger Manadgement (gain rage in combat)
    20266, // Divine Strength (+ 15% strength)
  ]
}))
