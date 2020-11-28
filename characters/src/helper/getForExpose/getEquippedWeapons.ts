import { getCombatSkills } from './getCombatSkills';
import { getInventory } from './getInventory';

export const allCombatSkillsDE = [
    'Armbrüste' ,
    'Bögen' ,
    'Dolche' ,
    'Fechtwaffen' ,
    'Hiebwaffen' ,
    'Kettenwaffen' ,
    'Lanzen' , '',
    'Raufen' ,
    'Schilde' ,
    'Schleudern' ,
    'Schwerter' ,
    'Stangenwaffen' ,
    'Wurfwaffen' ,
    'Zweihandhiebwaffen' ,
    'Zweihandschwerter' ,
    'SpittingFire' ,
    'Blasrohre' ,
    'Diskus' ,
    'Fächer',
    'Spiesswaffen' 
];

export async function getEquippedWeapons(character: any) {

    const combatSkills = await getCombatSkills(character);

    const items = await getInventory(character);

    let equippedWeapons = new Array();    

    for (var key of Object.keys(items)) {
        if(items[key].combatTechnique){
            
            const i = items[key].combatTechnique.length;
            let combatSkill = allCombatSkillsDE[parseInt(items[key].combatTechnique.slice(3, i))-1];
            let add = combatSkills.find((item) => item.name === combatSkill);

            items[key].combatTechnique = add;
            
            equippedWeapons.push(items[key]);
        }
    }

    let weapons = new Array();

    for(let i = 0; i < equippedWeapons.length; i++) {

        let threshold = 16;

        let checkBonusDamage = equippedWeapons[i].combatTechnique.valueLE - threshold;
        let bonusDamage = checkBonusDamage > 0 ? checkBonusDamage : 0;

        weapons.push({
            weapon: equippedWeapons[i].name,
            combatSkill: equippedWeapons[i].combatTechnique.name,
            bonusDamage: bonusDamage,
            damage: [
                {name: 'numberOfDice', value: equippedWeapons[i].damageDiceNumber}, 
                {name: 'kindOfDice', value: equippedWeapons[i].damageDiceSides}, 
                {name: 'flatDamage', value: equippedWeapons[i].damageFlat, bonusDamage},
                {name: 'bonusDamage', value: bonusDamage }
            ],
            bonusAT: equippedWeapons[i].at,
            bonusPA: equippedWeapons[i].pa,
            reach: equippedWeapons[i].reach,
            gr: equippedWeapons[i].gr,
            at: (equippedWeapons[i].at + equippedWeapons[i].combatTechnique.AT),
            pa: (equippedWeapons[i].pa + equippedWeapons[i].combatTechnique.PA),
            weight: equippedWeapons[i].weight,
            threshold: threshold,
        })
    }   

    return weapons;
}