import { liturgiesDE } from "../../data/liturgiesDE";

export async function mapLiturgies(optoImport: any){
    
    let output = new Array();

    for (var key of Object.keys(optoImport)) {

        const liturgy = liturgiesDE.find((item) => item.id === key);
        
        if(liturgy){
            const add = {
                id: key,
                name: liturgy?.name,
                value: optoImport[key],
                check: {check1: liturgy?.check1, check2: liturgy?.check2, check3: liturgy?.check3}
            }      

            output.push(add);
        }
    }
    
    return output;
};