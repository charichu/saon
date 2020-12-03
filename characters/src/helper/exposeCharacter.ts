import { expLevelDE, raceBaseStats, socialStatus } from '../data/baseStats';
import { getCoreAttributes } from './getForExpose/getCoreAttributes';
import { getSkills } from './getForExpose/getSkills';
import { getCombatSkills } from './getForExpose/getCombatSkills';
import { getEquippedWeapons } from './getForExpose/getEquippedWeapons';
import { getEquippedArmor } from './getForExpose/getEquippedArmor';
import { setChecks } from './setForExpose/setChecks';
import { advantagesDE } from '../data/advantagesDE';
import { setEnergies } from './setForExpose/setEnergies';

export async function exposeCharacter(character: any) {

    let expLevel = expLevelDE[parseInt(character?.experienceLevel.slice(-1))];

    const coreAttributes = await getCoreAttributes(character);
    const combatSkills = await getCombatSkills(character);
    const weapons = await getEquippedWeapons(character);
    const armor = await getEquippedArmor(character);

    let skills = await getSkills(character);
    skills = await setChecks(coreAttributes, skills);

    const spells = await setChecks(coreAttributes, character.spells);
    const liturgies = await setChecks(coreAttributes, character.liturgies);

    const energy = await setEnergies(character?.energy, character?.advantages, character?.advantages);

    const output = {
        "id": character?.id,
        "discordId": character?.discordId,
        "userId": character?.userId,
        "name": character?.name,
        "race": character?.race.nameDE,
        "culture": character?.culture,
        "profession": character?.profession.name.m,
        "professionDetail": character?.profession.subname,
        "socialstatus": socialStatus[character?.socialStatus -1],
        "exp": character?.exp,
        "expLevel": expLevel,
        coreAttributes,
        skills,
        energy,
        combatSkills,
        "baseStats": [
            {name: 'Seelenkraft', short: 'SK', value: character?.race.spirit + Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.sagacity + character?.coreAttributes?.intuition )/6)},
            {name: 'Zähigkeit', short: 'ZK', value: character?.race.toughness + Math.round((character?.coreAttributes?.constitution + character?.coreAttributes?.constitution + character?.coreAttributes?.strength )/6)},
            {name: 'Ausweichen', short: 'AW.', value: Math.round(character?.coreAttributes?.agility /2)},
            {name: 'Initiative', short: 'INI', value: Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.agility) /2)},
            {name: 'Geschwindigkeit', short: 'GS', value: character?.race.speed},
            {name: 'Wundschwelle', short: 'WS', value: Math.round(character?.coreAttributes?.constitution/2)}
        ],
        weapons,
        armor,
        spells,
        liturgies,
        "advantages": character?.advantages,
        "disadvantages": character?.disadvantages,
        "specialAbilities": character?.specialAbilities,
    };

    return output;

}