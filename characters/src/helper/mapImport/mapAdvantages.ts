import { advantagesDE } from "../../data/advantagesDE";

export async function mapAdvantages(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {

        const advantage = advantagesDE.find((item) => item.id === key);
        
        if(advantage){
            const add = {
                id: key,
                name: advantage?.name,
                value: optoImport[key]
            }      

            output.push(add);
        }
    }
    
    return output;
};