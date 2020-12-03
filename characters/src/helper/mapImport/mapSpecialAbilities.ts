import { specialAbilitiesDE } from "../../data/specialAbilitiesDE";
import { specialAbilities } from "../../data/specialAbilities";


const merge = (specialAbilitiesDE: any[], specialAbilities: any[]) => {
    const temp = new Array;
  
    specialAbilitiesDE.forEach(x => {
        specialAbilities.forEach(y => {
        if (x.id === y.id) {
          temp.push({ ...x, ...y })
        }
      })
    })
  
    return temp;
};

export async function mapspecialAbilities(optoImport: any){
    
    let output = new Array();

    let merge1 = merge(specialAbilitiesDE, specialAbilities);

    try{
    for (var key of Object.keys(optoImport)) {
        let deepOpto = optoImport[key];
        for (var key1 of Object.keys(deepOpto)) {           

            const specialAbility = merge1.find((item) => item.id === key1);

                let add = {
                    id: key1,
                    name: specialAbility?.name,
                    //text: specialAbility?.rules,
                    tier: deepOpto[key1][0].tier,
                    //selectOptions: specialAbility?.selectOptions,
                    gr: specialAbility?.gr,
                    //subgr: specialAbility?.gr,
                    max: specialAbility?.max,
                    levels: specialAbility?.levels,       
                }

                switch (specialAbility?.gr) {
                    case 1:                      
                        break;
                    case 2:
                        break;
                    case 2:
                        break;
                    case 3:                        
                        (add as any).combatTecniques = specialAbility?.combatTecniques;
                        (add as any).penality = specialAbility?.penalty;   
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:                    
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                    case 9:
                        break;
                    case 10:
                        break;
                    case 11:
                        break;
                    case 12:
                        break;
                    case 13:
                        break;
                    case 14:
                        break;
                    case 15:
                        break;
                    case 16:
                        break;
                    case 17:                    
                        break;
                    case 18:
                        break;
                    case 19:
                        break;
                    case 20:
                        break;
                    case 21:
                        break;
                    case 22:
                        break;
                    case 23:
                        break;
                    case 24:
                        break;
                    case 25:
                        break;
                    case 26:
                        break;
                    case 27:
                        break;
                    case 28:                    
                        break;
                    case 29:
                        break;
                    case 30:
                        break;
                    case 31:
                        break;
                    case 32:
                        break;
                    case 33:
                        break;
                    case 34:
                        break;
                    case 35:
                        break;
                    case 36:
                        break;
                    case 37:
                        break;
                    case 38:
                        break;
                    case 39:
                        break;
                    case 40:
                        break;
                    case 41:
                        break;
                    case 42:
                        break;
                    case 43:
                        break;
                    case 44:
                        break;
                    case 45:
                };
                  
                output.push(add);
                     
        }
    }
    }catch(e){console.log(e)}      
    return output;
};