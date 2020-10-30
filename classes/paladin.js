import { action, skill, passive, spell, item, createItem } from './wow-data.js'

// Weapons
skill(43)  // Swords
skill(55)  // Two-Handed Swords

// Auras
spell(48942) // Devotion Aura
spell(54043) // Retribution Aura
spell(19746) // Concentration Aura

// Passives
// skill(184) // Retribution
// skill(267) // Protection
// skill(594) // Holy
passive(20256) // Improved Concentration Aura (+15% effect & reduce silence & interupt duration)
passive(53648) // Swift Retribution (auras grant +3% haste)
passive(54943) // Glyph of Seal of Light (+5% heal)
passive(54940) // Glyph of seal of Wisdom (-5% heal cost)
passive(56414) // Glyph of Seal of Righteousness (+10% damage)
passive(20217) // Blessing of Kings
passive(58242) // Glyph of Blessing of Kings (-50% cost)
passive(26023) // Pursuit of justice (+15% mvnt speed & -50% disarm duration)
passive(53488) // The Art of War (crit hit = instant flash or exorcism)
passive(33776) // Spiritual Attunement (getting heals = regen mana)
passive(20105) // Benediction (-10% cost instant spells)
passive(55113) // Glyph of Crusader Strike (-20% mana cost)
passive(31826) // Purifying Power (reduce mana cost and cooldown of some spells)
passive(25829) // Conviction (+5% crit)
passive(25957) // Improved Judgements (-2sec CD)
passive(63650) // Divinity (+%5 heal done, +%5 heal taken)
passive(31881) // Fanaticism (+18% crit on judgement)
passive(20337) // Heart of the Crusader (+3% crit chance on jugement targets)
passive(60147) // Holy Shock Crit Chance (+10% crit on shock)
passive(31849) // Sacred Duty (-1m on shield CD, +4% stamina)

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

/*

-- full ret
53382 Righteous Vengeance (dot on crit)
35397 Sanctity of Battle (+3% crit & 15% damage on exorcism & crusader strike)
20057 Vengeance (3% damage uppon crit, stack 3 times)
31860 Combat Expertise (6% more crit, 6% more stamina and 6 expertise)

-- full heal
20239 Healing Light (+12% heal)
20215 Illumination (mana regen on spell crit)
20208 Spiritual Focus (no pushback)
31841 Holy Guidance (intel = spell)

-- mix, tanky
63224 Glyph of holy shock (-1 sec on Shock CD)
20135 Redoubt (block proc + more block value)
53592 Touched by the Light (strength = spell power + more heal uppon crit)
31383 Deadened Nerves (-6% damage taken)

*/
