export async function getCoreAttributes(character: any) {

    const coreAttributes = [
            {name: 'Mut', short: 'MU',value: character?.coreAttributes?.courage},
            {name: 'Klugheit', short: 'KL',value: character?.coreAttributes?.sagacity},
            {name: 'Intuition', short: 'IN',value: character?.coreAttributes?.intuition},
            {name: 'Charisma', short: 'CH',value: character?.coreAttributes?.charisma},
            {name: 'Fingerfertigkeit', short: 'FF',value: character?.coreAttributes?.dexterity},
            {name: 'Gewandheit', short: 'GE',value: character?.coreAttributes?.agility},
            {name: 'Konstitution', short: 'KO',value: character?.coreAttributes?.constitution},
            {name: 'Körperkraft', short: 'KK',value: character?.coreAttributes?.strength}
        ];

    return coreAttributes;

}