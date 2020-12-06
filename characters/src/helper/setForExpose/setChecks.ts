export async function setChecks(
    attributes: any, 
    toSet: any
    ){

    const shortAttributes = [
        { name: 'MU', value: attributes[0].value},
        { name: 'KL', value: attributes[1].value},
        { name: 'IN', value: attributes[2].value},
        { name: 'CH', value: attributes[3].value},
        { name: 'FF', value: attributes[4].value},
        { name: 'GE', value: attributes[5].value},
        { name: 'KO', value: attributes[6].value},
        { name: 'KK', value: attributes[7].value},
    ];


    for(let i = 0; i < toSet.length; i++){
        toSet[i].check = {
            check1: shortAttributes[parseInt(toSet[i].check.check1.slice(-1))-1],
            check2: shortAttributes[parseInt(toSet[i].check.check2.slice(-1))-1],
            check3: shortAttributes[parseInt(toSet[i].check.check3.slice(-1))-1],        
        };       
    }

    return toSet;
};