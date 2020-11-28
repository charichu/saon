export async function getCombatSkills(character: any) {
    
    let combatBonusGEKK = Math.max(Math.floor(((character?.coreAttributes?.agility - 8) / 3)), Math.floor(((character?.coreAttributes?.strength - 8) / 3)));
    let combatBonusFF = Math.floor(((character?.coreAttributes?.dexterity - 8) / 3));
    let combatBonusGE = Math.floor(((character?.coreAttributes?.agility - 8) / 3));
    let combatBonusKK = Math.floor(((character?.coreAttributes?.strength - 8) / 3));

    const combatSkills = [
            {
                name: 'Armbrüste' , 
                value: character?.combatTechniques?.Crossbows || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.Crossbows) || 6,
                PA: 0,
            },
            {
                name: 'Blasrohre' , 
                value: character?.combatTechniques?.Blowguns || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.Blowguns) || 6,
                PA: 0,
            },
            {
                name: 'Bögen' , 
                value: character?.combatTechniques?.Bows || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.Bows) || 6,
                PA: 0
            },
            {
                name: 'Diskus' , 
                value: character?.combatTechniques?.Discuses || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.Discuses) || 6,
                PA: 0 
            },
            {
                name: 'Dolche' , 
                value: character?.combatTechniques?.Daggers || 6,
                nameLE: 'GE',
                valueLE: character?.coreAttributes?.agility,
                bonus: combatBonusGE,
                AT: (combatBonusGE +  character?.combatTechniques?.Daggers) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Daggers/2)) || 3,
            },
            {
                name: 'Fächer' , 
                value: character?.combatTechniques?.Faecher  || 6,
                nameLE: 'GE',
                valueLE: character?.coreAttributes?.agility,
                bonus: combatBonusGE,
                AT: (combatBonusGE +  character?.combatTechniques?.Faecher) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Faecher/2)) || 3,
            },
            {
                name: 'Fechtwaffen' , 
                value: character?.combatTechniques?.FencingWeapons  || 6,
                nameLE: 'GE',
                valueLE: character?.coreAttributes?.agility,
                bonus: combatBonusGE,
                AT: (combatBonusGE +  character?.combatTechniques?.FencingWeapons) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.FencingWeapons/2)) || 3,
            },
            {
                name: 'Hiebwaffen' , 
                value: character?.combatTechniques?.ImpactWeapons || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.ImpactWeapons) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.ImpactWeapons/2)) || 3
            },
            {
                name: 'Kettenwaffen' , 
                value: character?.combatTechniques?.ChainWeapons || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.ChainWeapons) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.ChainWeapons/2)) || 3
            },
            {
                name: 'Lanzen' , 
                value: character?.combatTechniques?.Lances || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Lances) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Lances/2)) || 3
            },
            {
                name: 'Raufen' , 
                value: character?.combatTechniques?.Brawling || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max(character?.coreAttributes?.strength, character?.coreAttributes?.agility ),
                bonus: combatBonusGEKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Brawling) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Brawling/2)) || 3
            },
            {
                name: 'Schilde' , 
                value: character?.combatTechniques?.Shields || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Shields) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Shields/2)) || 3
            },
            {
                name: 'Schleudern' , 
                value: character?.combatTechniques?.Slings || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.Slings) || 6,
                PA: 0
            },
            {
                name: 'Schwerter' , 
                value: character?.combatTechniques?.Swords || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max(character?.coreAttributes?.strength, character?.coreAttributes?.agility ),
                bonus: combatBonusGEKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Swords) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Swords/2)) || 3
            },
            {
                name: 'Spiesswaffen' , 
                value: character?.combatTechniques?.Spiesswaffen || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Spiesswaffen) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Spiesswaffen/2)) || 3
            },
            {
                name: 'Stangenwaffen' , 
                value: character?.combatTechniques?.Polearms || 6,
                nameLE: 'GE/KK',
                valueLE: Math.max(character?.coreAttributes?.strength, character?.coreAttributes?.agility ),
                bonus: combatBonusGEKK,
                AT: (combatBonusGE +  character?.combatTechniques?.Polearms) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.Polearms/2)) || 3
            },
            {
                name: 'Wurfwaffen' , 
                value: character?.combatTechniques?.ThrownWeapons || 6,
                nameLE: 'FF',
                valueLE: character?.coreAttributes?.dexterity,
                bonus: combatBonusFF,
                AT: (combatBonusFF +  character?.combatTechniques?.ThrownWeapons) || 6,
                PA: 0
            },
            {
                name: 'Zweihandhiebwaffen' , 
                value: character?.combatTechniques?.TwoHandedImpactWeapons || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.TwoHandedImpactWeapons) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.TwoHandedImpactWeapons/2)) || 3
            },
            {
                name: 'Zweihandschwerter' , 
                value: character?.combatTechniques?.TwoHandedSwords || 6,
                nameLE: 'KK',
                valueLE: character?.coreAttributes?.strength,
                bonus: combatBonusKK,
                AT: (combatBonusGE +  character?.combatTechniques?.TwoHandedSwords) || 6,
                PA: (combatBonusGE +  Math.ceil(character?.combatTechniques?.TwoHandedSwords/2)) || 3
            },
            
        ];

    return combatSkills;

}