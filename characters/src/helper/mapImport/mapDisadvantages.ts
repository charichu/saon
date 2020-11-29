import { disadvantagesDE } from "../../data/disadvantagesDE";

export async function mapDisadvantages(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {
        let deepOpto = optoImport[key];
        for (var key1 of Object.keys(deepOpto)) {           

            const disadvantage = disadvantagesDE.find((item) => item.id === key1);
            try{

            if(deepOpto[key1][0]?.tier){
                if(deepOpto[key1][0]?.sid){
                    const add = {
                        id: key1,
                        name: disadvantage?.name,
                        //text: disadvantage?.rules,
                        tier: deepOpto[key1][0].tier,
                        text: deepOpto[key1][0]?.sid
                    }
                    output.push(add);

                }else {
                    const add = {
                        id: key1,
                        name: disadvantage?.name,
                        //text: disadvantage?.rules,
                        tier: deepOpto[key1][0].tier
                    }
                    output.push(add);
                }
            }else if(deepOpto[key1][0]?.sid){
                const selectOptions: any = disadvantage?.selectOptions;
                
                const add = {
                    id: key1,
                    name: disadvantage?.name,
                    //text: disadvantage?.rules,
                    sid: deepOpto[key1][0].sid,
                    sname: selectOptions[(deepOpto[key1][0].sid-1)].name
                }
                output.push(add);
            } else {
                const add = {
                    id: key1,
                    name: disadvantage?.name,
                    //text: disadvantage?.rules,
                    tier: deepOpto[key1][0].tier
                }
                output.push(add);
            }  
        }catch(e){}          
        }
    }    
    return output;
};