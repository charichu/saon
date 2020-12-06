function calcAT(bonus: number, skill: number){
    const calc = bonus + skill;
    const base = bonus + 6
    return (calc > base) ? calc : base;
};

function calcPA(bonus: number, skill: number){
    const calc = bonus + Math.ceil(skill/2);
    const base = bonus + 3;
    return (calc > base) ? calc : base;
};

export async function getCombatSkills(
    coreAttributes: {
        name: string, 
        short: string, 
        value: number
    }[], 
    combatTechniques: {
        Crossbows : number,
        Bows : number,
        Daggers : number,
        FencingWeapons : number,
        ImpactWeapons : number,
        ChainWeapons : number,
        Lances : number,
        Brawling : number,
        Shields : number,
        Slings : number,
        Swords : number,
        Polearms : number,
        ThrownWeapons : number,
        TwoHandedImpactWeapons : number,
        TwoHandedSwords : number,
        SpittingFire : number,
        Blowguns : number,
        Discuses : number,
        Faecher : number,
        Spiesswaffen : number
      }) {
    
    let combatBonusFF = Math.floor((( coreAttributes[4].value - 8) / 3));
    let combatBonusGE = Math.floor((( coreAttributes[5].value - 8) / 3));
    let combatBonusKK = Math.floor((( coreAttributes[7].value - 8) / 3));
    let combatBonusAT = Math.floor((( coreAttributes[0].value - 8) / 3));
    let combatBonusGEKK = (combatBonusGE>combatBonusKK) ? combatBonusGE : combatBonusKK;

    const combatSkills = [
            {
                name: 'Armbrüste' , 
                value:  combatTechniques?.Crossbows || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.Crossbows),
                PA: 0,
            },
            {
                name: 'Blasrohre' , 
                value:  combatTechniques?.Blowguns || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.Blowguns),
                PA: 0,
            },
            {
                name: 'Bögen' , 
                value:  combatTechniques?.Bows || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.Bows),
                PA: 0
            },
            {
                name: 'Diskus' , 
                value:  combatTechniques?.Discuses || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.Discuses),
                PA: 0 
            },
            {
                name: 'Dolche' , 
                value:  combatTechniques?.Daggers || 6,
                nameLE: 'GE',
                valueLE:  coreAttributes[5].value,
                bonus: combatBonusGE,
                AT: calcAT(combatBonusAT,  combatTechniques.Daggers),
                PA: calcPA(combatBonusGE,  combatTechniques?.Daggers),
            },
            {
                name: 'Fächer' , 
                value:  combatTechniques?.Faecher  || 6,
                nameLE: 'GE',
                valueLE:  coreAttributes[5].value,
                bonus: combatBonusGE,
                AT: calcAT(combatBonusAT,  combatTechniques.Faecher),
                PA: calcPA(combatBonusGE,  combatTechniques?.Faecher),
            },
            {
                name: 'Fechtwaffen' , 
                value:  combatTechniques?.FencingWeapons  || 6,
                nameLE: 'GE',
                valueLE:  coreAttributes[5].value,
                bonus: combatBonusGE,
                AT: calcAT(combatBonusAT,  combatTechniques.FencingWeapons),
                PA: calcPA(combatBonusGE,  combatTechniques?.FencingWeapons),
            },
            {
                name: 'Hiebwaffen' , 
                value:  combatTechniques?.ImpactWeapons || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.ImpactWeapons),
                PA: calcPA(combatBonusKK,  combatTechniques?.ImpactWeapons),
            },
            {
                name: 'Kettenwaffen' , 
                value:  combatTechniques?.ChainWeapons || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.ChainWeapons),
                PA: calcPA(combatBonusKK,  combatTechniques?.ChainWeapons),
            },
            {
                name: 'Lanzen' , 
                value:  combatTechniques?.Lances || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Lances),
                PA: calcPA(combatBonusKK,  combatTechniques?.Lances),
            },
            {
                name: 'Raufen' , 
                value:  combatTechniques?.Brawling || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max( coreAttributes[7].value,  coreAttributes[5].value ),
                bonus: combatBonusGEKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Brawling),
                PA: calcPA(combatBonusGEKK,  combatTechniques?.Brawling),
            },
            {
                name: 'Schilde' , 
                value:  combatTechniques?.Shields || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Shields),
                PA: calcPA(combatBonusKK,  combatTechniques?.Shields),
            },
            {
                name: 'Schleudern' , 
                value:  combatTechniques?.Slings || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.Crossbows),
                PA: 0
            },
            {
                name: 'Schwerter' , 
                value:  combatTechniques?.Swords || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max( coreAttributes[7].value,  coreAttributes[5].value ),
                bonus: combatBonusGEKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Swords),
                PA: calcPA(combatBonusGEKK,  combatTechniques?.Swords),
            },
            {
                name: 'Spiesswaffen' , 
                value:  combatTechniques?.Spiesswaffen || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Spiesswaffen),
                PA: calcPA(combatBonusKK,  combatTechniques?.Spiesswaffen),
            },
            {
                name: 'Stangenwaffen' , 
                value:  combatTechniques?.Polearms || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max( coreAttributes[7].value,  coreAttributes[5].value ),
                bonus: combatBonusGEKK,
                AT: calcAT(combatBonusAT,  combatTechniques.Polearms),
                PA: calcPA(combatBonusGEKK,  combatTechniques?.Polearms),
            },
            {
                name: 'Wurfwaffen' , 
                value:  combatTechniques?.ThrownWeapons || 6,
                nameLE: 'FF',
                valueLE:  coreAttributes[4].value,
                bonus: combatBonusFF,
                AT: calcAT(combatBonusFF,  combatTechniques.ThrownWeapons),
                PA: 0
            },
            {
                name: 'Zweihandhiebwaffen' , 
                value:  combatTechniques?.TwoHandedImpactWeapons || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.TwoHandedImpactWeapons),
                PA: calcPA(combatBonusKK,  combatTechniques?.TwoHandedImpactWeapons),
            },
            {
                name: 'Zweihandschwerter' , 
                value:  combatTechniques?.TwoHandedSwords || 6,
                nameLE: 'KK',
                valueLE:  coreAttributes[7].value,
                bonus: combatBonusKK,
                AT: calcAT(combatBonusAT,  combatTechniques.TwoHandedSwords),
                PA: calcPA(combatBonusKK,  combatTechniques?.TwoHandedSwords),
            },
            
        ];

    return combatSkills;

}