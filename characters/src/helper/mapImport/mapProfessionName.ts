import { professionsDE } from "../../data/professionsDE";

   
export function mapProfessionName(importProfession: String, importCustomProfession: String, sex: String){
    
    // Get name from data to be localized
    const professionName = professionsDE.find((item) => item.id === importProfession);

    // @ts-ignores-ignore
    const genderProfession = (sex == "m") ? professionName?.name.m : professionName?.name.f;

    return (professionName) ? 
                { name: genderProfession, subname: professionName?.subname} : 
                { name: importCustomProfession, subname: 'Eigene Profession'};
}