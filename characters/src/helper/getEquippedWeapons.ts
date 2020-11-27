import e from 'express';
import { check } from 'express-validator';
import { getCombatSkills } from './getCombatSkills';
import { getInventory } from './getInventory';

export const allCombatSkillsDE = [
    'Armbrüste' ,
    'Bögen' ,
    'Dolche' ,
    'Fechtwaffen' ,
    'Hiebwaffen' ,
    'Kettenwaffen' ,
    'Lanzen' ,
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
    let equippedArmor = new Array();
    

    for (var key of Object.keys(items)) {
        if(items[key].combatTechnique){

            let combatSkill = allCombatSkillsDE[parseInt(items[key].combatTechnique.slice(-1))-1];
            
            let add = combatSkills.find((item) => item.name === combatSkill);

            items[key].combatTechnique = add;
            
            equippedWeapons.push(items[key]);
        } else if(items[key].pro){
            equippedArmor.push(items[key]);
        }
    }

    let output = new Array();

    try{for(let i = 0; i < equippedWeapons.length; i++) {

        let threshold = 16;

        let checkBonusDamage = equippedWeapons[i].combatTechnique.valueLE - threshold;
        let bonusDamage = checkBonusDamage > 0 ? checkBonusDamage : 0;

        output.push({
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

    for(let i = 0; i < equippedArmor.length; i++) {

        output.push({
            armor: equippedArmor[i].name,
            protection: equippedArmor[i].pro,
            encumbrance: equippedArmor[i].enc
        })
    }}catch(e){console.log(e)}

    return output;
}