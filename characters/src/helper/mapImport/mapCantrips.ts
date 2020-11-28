import { cantripsDE } from "../../data/cantripsDE";

export async function mapCantrips(optoImport: any){
    
    let output = new Array();

    for(let i = 0; i < optoImport.length; i++){
        const cantrip = cantripsDE.find((item) => item.id === optoImport[i]);
        if(cantrip){
            const add = {
                id: optoImport[i],
                name: cantrip?.name
            }      

            output.push(add);
        }
    }
    
    return output;
};