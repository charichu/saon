import { blessingsDE } from "../../data/blessingsDE";

export async function mapBlessings(optoImport: any){
    
    let output = new Array();

    for(let i = 0; i < optoImport.length; i++){
        const blessing = blessingsDE.find((item) => item.id === optoImport[i]);
        if(blessing){
            const add = {
                id: optoImport[i],
                name: blessing?.name
            }      

            output.push(add);
        }
    }
    
    return output;
};