import { action, skill, spell, passive, item, createItem } from '../api/wow-data.js'



// spell
action(27441, { forms: [1] }) // Ambush r7
action(51724, { forms: [1] }) // sap

action(25300) // Backstab r9
action(11286) // Gouge r5
action(31016) // Eviscerate r9
action(8643) // Kidney Shot r2
action(1766) // Kick
action(36554) // Shadowstep
action(26889) // Vanish
action(11305) // sprint r3 (70% speed)

// Weapons
skill(118) // Dual Wield
skill(173) // Daggers


// Passives
// skill(38) // Combat
// skill(39) // Subtlety
// skill(253) // Assassination

passive(58415) // Filthy Tricks (Shadowstep cost no energy and -10s CD)
passive(14161) // Ruthlessness (Gives your melee finishing moves a 60% chance to add a combo point to your target.)
passive(13866) // Puncturing Wounds	(Increases the critical strike chance of your Backstab ability by 30%, and the critical strike chance of your Mutilate ability by 15%.)

// Subtlety
passive(58425) // Relentless Strikes (Your finishing moves have a 20% chance per combo point to restore 25 energy.)
passive(13971) // Master of Deception	(Reduces the chance enemies have to detect you while in Stealth mode. More effective than Master of Deception (Rank 2).)
passive(14072) // Opportunity (Increases the damage dealt with your Backstab, Mutilate, Garrote and Ambush abilities by 20%.)
passive(14094) // Dirty Tricks (Increases the range of your Blind and Sap abilities by 5 yards and reduces the energy cost of your Blind and Sap abilities by 50%.)
passive(14063) // Camouflage (Increases your speed while stealthed by 15% and reduces the cooldown of your Stealth ability by 6 sec.)
passive(14066) // Elusiveness (Reduces the cooldown of your Vanish and Blind abilities by 60 sec and your Cloak of Shadows ability by 30 sec.)
passive(13980) // Initiative (Gives you a 100% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.)
  passive(14080) // Improve Ambush (Increases the critical strike chance of your Ambush ability by 50%.)
  passive(31228) // Cheat Death	(You have a 33% chance that an attack which would otherwise kill you will instead reduce you to 10% of your maximum health. In addition, all damage taken will be reduced by up to 90% for 3 sec (modified by resilience). This effect cannot occur more than once per minute.)
passive(51696) // Waylay (Your Ambush and Backstab hits have a 100% chance to unbalance a target, increasing the time between their melee and ranged attacks by 20%, and reducing movement speed by 50% for 8 sec.)
passive(51712) // Slaughter from the Shadows (Reduces the energy cost of your Backstab and Ambush abilities by 20 and the energy cost of your Hemorrhage by 5, and increases all damage done by 5%.)
passive(27099) // Intuition ???????????????????????????????????????????????????????


// Stealth
spell(1784)

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
  quality: 'uncommon',
  stats: { crit: 16, AP: 224 },
}))

// Necklaces

/*
fufu | ambush master
full backstab elite
cc | tanky
*/