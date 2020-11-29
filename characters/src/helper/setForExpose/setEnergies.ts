export async function setEnergies(toSet: any, advantages: any, disadvantages: any){

    let output = new Array;
    for(let i = 0; i > advantages.length; i++){
        if(advantages[i].id == 'ADV_25'){

            toSet.LPMax += advantages[i].tier;

        } else if(advantages[i].id == 'ADV_24'){

            toSet.AEMax += advantages[i].tier;

        } else if(advantages[i].id == 'ADV_23'){

            toSet.KPMax += advantages[i].tier;

        } 
    }
    
    if(toSet.KEMax){
        output.push({name: 'Karmalenergie', short: 'LE', value: toSet.KEMax});
    }
    if(toSet.AEMax){
        output.push({name: 'Astralenergie', short: 'AE', value: toSet.AEMax});
    }
    output.push({name: 'Lebenspunkte', short: 'LE', value: toSet.LPMax});

    return output;
};