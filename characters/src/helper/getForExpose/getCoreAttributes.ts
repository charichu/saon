export async function getCoreAttributes(character: any) {

    const coreAttributes = [
            {name: 'Mut', value: character?.coreAttributes?.courage},
            {name: 'Klugheit', value: character?.coreAttributes?.sagacity},
            {name: 'Intuition', value: character?.coreAttributes?.intuition},
            {name: 'Charisma', value: character?.coreAttributes?.charisma},
            {name: 'Fingerfertigkeit', value: character?.coreAttributes?.dexterity},
            {name: 'Gewandheit', value: character?.coreAttributes?.agility},
            {name: 'Konstitution', value: character?.coreAttributes?.constitution},
            {name: 'Körperkraft', value: character?.coreAttributes?.strength}
        ];

    return coreAttributes;

}