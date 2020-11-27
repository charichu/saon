import {Character} from '../models/character';
import { findBestMatch } from 'string-similarity';
import { expLevelDE, raceBaseStats, socialStatus } from '../data/baseStats';
import { getCoreAttributes } from './getCoreAttributes';
import { getSkills } from './getSkills';
import { getCombatSkills } from './getCombatSkills';
import { getEquippedWeapons } from './getEquippedWeapons';

export async function exposeCharacter(character: any) {

    let expLevel = expLevelDE[parseInt(character?.experienceLevel.slice(-1))];

    const coreAttributes = await getCoreAttributes(character);
    const skills = await getSkills(character);
    const combatSkills = await getCombatSkills(character);
    const weaponsAndArmor = await getEquippedWeapons(character);

    const output = {
        "id": character?.id,
        "discordId": character?.discordId,
        "userId": character?.userId,
        "name": character?.name,
        "race": character?.race.nameDE,
        "culture": character?.culture,
        "profession": character?.profession,
        "socialstatus": socialStatus[character?.socialStatus -1],
        "exp": character?.exp,
        "expLevel": expLevel,
        coreAttributes,
        skills,
        "energy": [
            {name: 'Lebenspunkte', value: character?.energy.LPMax || 0},
            {name: 'Astralpunkte', value: character?.energy.AEMax || 0},
            {name: 'Karmaenergie', value: character?.energy.KPMax || 0},
        ],
        combatSkills,
        "baseStats": [
            {name: 'Seelenkraft', value: character?.race.spirit + Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.sagacity + character?.coreAttributes?.intuition )/6)},
            {name: 'Zähigkeit', value: character?.race.toughness + Math.round((character?.coreAttributes?.constitution + character?.coreAttributes?.constitution + character?.coreAttributes?.strength )/6)},
            {name: 'Ausweichen', value: Math.round(character?.coreAttributes?.agility /2)},
            {name: 'Initiative', value: Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.agility) /2)},
            {name: 'Geschwindigkeit', value: character?.race.speed},
            {name: 'Wundschwelle', value: Math.round(character?.coreAttributes?.constitution/2)}
        ],
        weaponsAndArmor
    };

    return output;

}