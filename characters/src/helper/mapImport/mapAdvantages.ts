import { advantagesDE } from "../../data/advantagesDE";

export async function mapAdvantages(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {
        let deepOpto = optoImport[key];
        for (var key1 of Object.keys(deepOpto)) {           

            const advantage = advantagesDE.find((item) => item.id === key1);

            try{

            if(deepOpto[key1][0]?.tier){
                const add = {
                    id: key1,
                    name: advantage?.name,
                    //text: advantage?.rules,
                    tier: deepOpto[key1][0].tier
                }
                output.push(add);
            }else if(deepOpto[key1][0]?.sid){
                const selectOptions: any = advantage?.selectOptions;
                
                const add = {
                    id: key1,
                    name: advantage?.name,
                    //text: advantage?.rules,
                    sid: deepOpto[key1][0].sid,
                    sname: selectOptions[(deepOpto[key1][0].sid-1)].name
                }
                output.push(add);
            } else {
                const add = {
                    id: key1,
                    name: advantage?.name,
                    //text: advantage?.rules,
                    tier: deepOpto[key1][0].tier
                }
                output.push(add);
            }  
        }catch(e){}          
        }
    }    
    return output;
};