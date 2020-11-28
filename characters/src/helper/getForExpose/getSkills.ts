export async function getSkills(character: any) {

    const skills = [
            {name: 'Fliegen' , value: character?.skills?.Flying || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: 'Gaukelei' , value: character?.skills?.Gaukelei || 0, check: {check1: 'ATTR_1', check2: 'ATTR_4', check3: 'ATTR_5'}},
            {name: 'Klettern' , value: character?.skills?.Climbing || 0, check: {check1: 'ATTR_1', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: 'Körperbeherrschung' , value: character?.skills?.BodyControl || 0, check: {check1: 'ATTR_6', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: 'Kraftakt' , value: character?.skills?.FeatOfStrength || 0, check: {check1: 'ATTR_7', check2: 'ATTR_8', check3: 'ATTR_8'} },
            {name: 'Reiten' , value: character?.skills?.Riding || 0, check: {check1: 'ATTR_4', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: 'Schwimmen' , value: character?.skills?.Swimming || 0, check: {check1: 'ATTR_6', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: 'Selbstbeherrschung' , value: character?.skills?.SelfControl || 0, check: {check1: 'ATTR_1', check2: 'ATTR_1', check3: 'ATTR_7'} },
            {name: 'Singen' , value: character?.skills?.Singing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_4', check3: 'ATTR_7'} },
            {name: 'Sinnenschärfe' , value: character?.skills?.Perception || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_3'} },
            {name: 'Tanzen' , value: character?.skills?.Dancing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_4', check3: 'ATTR_6'} },
            {name: 'Taschendiebstahl' , value: character?.skills?.Pickpocket || 0, check: {check1: 'ATTR_1', check2: 'ATTR_5', check3: 'ATTR_6'} },
            {name: 'Verbergen' , value: character?.skills?.Stealth || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: 'Zechen' , value: character?.skills?.Carousing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: 'Bekeheren' , value: character?.skills?.Persuasion || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_4'} },
            {name: 'Betören' , value: character?.skills?.Seduction || 0, check: {check1: 'ATTR_1', check2: 'ATTR_4', check3: 'ATTR_4'} },
            {name: 'Einschüchtern' , value: character?.skills?.Intimidation || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Etikette' , value: character?.skills?.Etiquette || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Gassenwissen' , value: character?.skills?.Streetwise || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Menschenkenntnis' , value: character?.skills?.Empathy || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Überreden' , value: character?.skills?.FastTalk || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Sich verkleiden' , value: character?.skills?.Disguise || 0, check: {check1: 'ATTR_3', check2: 'ATTR_4', check3: 'ATTR_6'} },
            {name: 'Willenskraft' , value: character?.skills?.Willpower || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Fährtensuchen' , value: character?.skills?.Tracking || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: 'Fesseln' , value: character?.skills?.Ropes || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_8'} },
            {name: 'Angeln/Fischen' , value: character?.skills?.Fishing || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: 'Orientierung' , value: character?.skills?.Orienting || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_3'} },
            {name: 'Pflanzenkunde' , value: character?.skills?.PlantLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: 'Tierkunde' , value: character?.skills?.AnimalLore || 0, check: {check1: 'ATTR_1', check2: 'ATTR_1', check3: 'ATTR_4'} },
            {name: 'Wildnisleben' , value: character?.skills?.Survival || 0, check: {check1: 'ATTR_1', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: 'Brettspiel/Glücksspiel' , value: character?.skills?.Gambling || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Geographie' , value: character?.skills?.Geography || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Geschichtswissen' , value: character?.skills?.History || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Religion' , value: character?.skills?.Religions || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Kriegskunst' , value: character?.skills?.Warfare || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Magiekunde' , value: character?.skills?.MagicalLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Mechanik' , value: character?.skills?.Mechanics || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_5'} },
            {name: 'Rechnen' , value: character?.skills?.Math || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Rechtskunds' , value: character?.skills?.Law || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_2'} },
            {name: 'Sagen und Legenden' , value: character?.skills?.MythsAndLegends || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Spherenkunde' , value: character?.skills?.SphereLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Sternenkunde' , value: character?.skills?.Astronomy || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Alchemie' , value: character?.skills?.Alchemy || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_5'} },
            {name: 'Segeln' , value: character?.skills?.Sailing || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: 'Fahrzeuge lenken' , value: character?.skills?.Driving || 0, check: {check1: 'ATTR_4', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: 'Handel' , value: character?.skills?.Commerce || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: 'Heilkunde Gift' , value: character?.skills?.TreatPoison || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: 'Heilkunde Krankheiten' , value: character?.skills?.TreatDisease || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_7'} },
            {name: 'Heilkunde Seele' , value: character?.skills?.TreatSoul || 0, check: {check1: 'ATTR_3', check2: 'ATTR_4', check3: 'ATTR_7'} },
            {name: 'Heilkunde Wunden' , value: character?.skills?.TreatWounds || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: 'Holzbearbeitung' , value: character?.skills?.Woodworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: 'Lebensmittelbearbeitung' , value: character?.skills?.PrepareFood || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: 'Lederbearbeitung' , value: character?.skills?.Leatherworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: 'Malen/Zeichnen' , value: character?.skills?.ArtisticAbility || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: 'Metallbearbeitung' , value: character?.skills?.Metalworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: 'Musizieren' , value: character?.skills?.Music || 0, check: {check1: 'ATTR_4', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: 'Schlösser knacken' , value: character?.skills?.PickLocks || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: 'Bergbau' , value: character?.skills?.Earthencraft || 0, check: {check1: 'ATTR_5', check2: 'ATTR_5', check3: 'ATTR_8'} },
            {name: 'Stofbearbeitung' , value: character?.skills?.Clothworking || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_5'} },
        ];

    return skills;

}