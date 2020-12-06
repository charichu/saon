import { getInventory } from './getInventory';

export async function getEquippedArmor(items: any) {

    let equippedArmor = new Array();
    
    try{

    for (var key of Object.keys(items)) {
        if(items[key].pro){
            equippedArmor.push(items[key]);
        }
    }
    }catch(e){console.log(e)};

    let armor = new Array();

    for(let i = 0; i < equippedArmor.length; i++) {

        armor.push({
            armor: equippedArmor[i].name,
            protection: equippedArmor[i].pro,
            encumbrance: equippedArmor[i].enc
        })
    }
    
    return armor;
}