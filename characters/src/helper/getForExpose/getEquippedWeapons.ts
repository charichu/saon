import { allCombatSkillsDE } from "../../data/combatSkills";

export async function getEquippedWeapons(items: any, combatSkills: any) {

    let equippedWeapons = new Array();  
    
    try{

    for (var key of Object.keys(items)) {
        if(items[key].combatTechnique){
            
            const i = items[key].combatTechnique.length;
            let combatSkill = allCombatSkillsDE[parseInt(items[key].combatTechnique.slice(3, i))-1];
            let add = combatSkills.find((item: { name: string; }) => item.name === combatSkill);
            items[key].combatTechnique = add;
            equippedWeapons.push(items[key]);
        }
    }

    let weapons = new Array();

    for(let i = 0; i < equippedWeapons.length; i++) {

        const threshold = equippedWeapons[i].primaryThreshold.threshold;

        const checkBonusDamage = equippedWeapons[i].combatTechnique.valueLE - threshold;
        const bonusDamage = (checkBonusDamage > 0) ? checkBonusDamage : 0;

        const numberOfDice = equippedWeapons[i].damageDiceNumber;
        const kindOfDice = equippedWeapons[i].damageDiceSides;
        const flatDamage = equippedWeapons[i].damageFlat || 0;

        weapons.push({
            weapon: equippedWeapons[i].name,
            combatSkill: equippedWeapons[i].combatTechnique.name,
            bonusDamage: bonusDamage,
            damageNew: { 
                numberOfDice, 
                kindOfDice, 
                flatDamage, 
                bonusDamage},
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

    }catch(e){console.log(e)};
}