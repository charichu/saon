import { disadvantagesDE } from "../../data/disadvantagesDE";

export async function mapDisadvantages(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {

        const disadvantage = disadvantagesDE.find((item) => item.id === key);
        
        if(disadvantage){
            const add = {
                id: key,
                name: disadvantage?.name,
                value: optoImport[key]
            }      

            output.push(add);
        }
    }
    
    return output;
};