import { spellsDE } from '../../data/spellsDE';

export async function mapSpells(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {

        const spell = spellsDE.find((item) => item.id === key);
        
        if(spell){
            const add = {
                id: key,
                name: spell?.name,
                value: optoImport[key],
                check: {check1: spell?.check1, check2: spell?.check1, check3: spell?.check1}
            }      

            output.push(add);
        }
    }
    
    return output;
};