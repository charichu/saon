import { specialAbilitiesDE } from "../../data/specialAbilitiesDE";


export async function mapspecialAbilitys(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {

        const specialAbility = specialAbilitiesDE.find((item) => item.id === key);
        
        if(specialAbility){
            const add = {
                id: key,
                name: specialAbility?.name,
                value: optoImport[key]
            }      

            output.push(add);
        }
    }
    
    return output;
};