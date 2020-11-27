import {Character} from '../models/character';
import { findBestMatch } from 'string-similarity';
import { expLevelDE, raceBaseStats, socialStatus } from '../data/baseStats';

export async function exposeCharacter(character: any) {

    let combatBonusGEKK = Math.max(Math.floor(((character?.coreAttributes?.agility - 8) / 3)), Math.floor(((character?.coreAttributes?.strength - 8) / 3)));
    let combatBonusFF = Math.floor(((character?.coreAttributes?.dexterity - 8) / 3));
    let combatBonusGE = Math.floor(((character?.coreAttributes?.agility - 8) / 3));
    let combatBonusKK = Math.floor(((character?.coreAttributes?.strength - 8) / 3));

    let expLevel = expLevelDE[parseInt(character?.experienceLevel.slice(-1))];

    const output = {
        "id": character?.id,
        "name": character?.name,
        "race": character?.race.nameDE,
        "culture": character?.culture,
        "profession": character?.profession,
        "socialstatus": socialStatus[character?.socialStatus -1],
        "exp": character?.exp,
        "expLevel": expLevel,
        "coreAttributes": [
            {name: 'Mut', value: character?.coreAttributes?.courage},
            {name: 'Klugheit', value: character?.coreAttributes?.sagacity},
            {name: 'Intuition', value: character?.coreAttributes?.intuition},
            {name: 'Charisma', value: character?.coreAttributes?.charisma},
            {name: 'Fingerfertigkeit', value: character?.coreAttributes?.dexterity},
            {name: 'Gewandheit', value: character?.coreAttributes?.agility},
            {name: 'Konstitution', value: character?.coreAttributes?.constitution},
            {name: 'Körperkraft', value: character?.coreAttributes?.strength}
        ],
        "skills": [            
            {name: 'Fliegen' , value: character?.skills?.Flying || 0 },
            {name: 'Gaukelei' , value: character?.skills?.Gaukelei || 0 },
            {name: 'Klettern' , value: character?.skills?.Climbing || 0 },
            {name: 'Körperbeherrschung' , value: character?.skills?.BodyControl || 0 },
            {name: 'Kraftakt' , value: character?.skills?.FeatOfStrength || 0 },
            {name: 'Reiten' , value: character?.skills?.Riding || 0 },
            {name: 'Schwimmen' , value: character?.skills?.Swimming || 0 },
            {name: 'Selbstbeherrschung' , value: character?.skills?.SelfControl || 0 },
            {name: 'Singen' , value: character?.skills?.Singing || 0 },
            {name: 'Sinnenschärfe' , value: character?.skills?.Perception || 0 },
            {name: 'Tanzen' , value: character?.skills?.Dancing || 0 },
            {name: 'Taschendiebstahl' , value: character?.skills?.Pickpocket || 0 },
            {name: 'Verbergen' , value: character?.skills?.Stealth || 0 },
            {name: 'Bekeheren' , value: character?.skills?.Carousing || 0 },
            {name: 'Überzeugen' , value: character?.skills?.Persuasion || 0 },
            {name: 'Betören' , value: character?.skills?.Seduction || 0 },
            {name: 'Einschüchtern' , value: character?.skills?.Intimidation || 0 },
            {name: 'Etikette' , value: character?.skills?.Etiquette || 0 },
            {name: 'Gassenwissen' , value: character?.skills?.Streetwise || 0 },
            {name: 'Menschenkenntnis' , value: character?.skills?.Empathy || 0 },
            {name: 'Überreden' , value: character?.skills?.FastTalk || 0 },
            {name: 'Sich verkleiden' , value: character?.skills?.Disguise || 0 },
            {name: 'Willenskraft' , value: character?.skills?.Willpower || 0 },
            {name: 'Fährtensuchen' , value: character?.skills?.Tracking || 0 },
            {name: 'Fesseln' , value: character?.skills?.Ropes || 0 },
            {name: 'Angeln/Fischen' , value: character?.skills?.Fishing || 0 },
            {name: 'Orientierung' , value: character?.skills?.Orienting || 0 },
            {name: 'Pflanzenkunde' , value: character?.skills?.PlantLore || 0 },
            {name: 'Tierkunde' , value: character?.skills?.AnimalLore || 0 },
            {name: 'Wildnisleben' , value: character?.skills?.Survival || 0 },
            {name: 'Brettspiel/Glücksspiel' , value: character?.skills?.Gambling || 0 },
            {name: 'Geographie' , value: character?.skills?.Geography || 0 },
            {name: 'Geschichtswissen' , value: character?.skills?.History || 0 },
            {name: 'Religion' , value: character?.skills?.Religions || 0 },
            {name: 'Kriegskunst' , value: character?.skills?.Warfare || 0 },
            {name: 'Magiekunde' , value: character?.skills?.MagicalLore || 0 },
            {name: 'Mechanik' , value: character?.skills?.Mechanics || 0 },
            {name: 'Rechnen' , value: character?.skills?.Math || 0 },
            {name: 'Rechtskunds' , value: character?.skills?.Law || 0 },
            {name: 'Sagen und Legenden' , value: character?.skills?.MythsAndLegends || 0 },
            {name: 'Spherenkunde' , value: character?.skills?.SphereLore || 0 },
            {name: 'Sternenkunde' , value: character?.skills?.Astronomy || 0 },
            {name: 'Alchemie' , value: character?.skills?.Alchemy || 0 },
            {name: 'Segeln' , value: character?.skills?.Sailing || 0 },
            {name: 'Fahrzeuge lenken' , value: character?.skills?.Driving || 0 },
            {name: 'Handel' , value: character?.skills?.Commerce || 0 },
            {name: 'Heilkunde Gift' , value: character?.skills?.TreatPoison || 0 },
            {name: 'Heilkunde Krankheiten' , value: character?.skills?.TreatDisease || 0 },
            {name: 'Heilkunde Seele' , value: character?.skills?.TreatSoul || 0 },
            {name: 'Heilkunde Wunden' , value: character?.skills?.TreatWounds || 0 },
            {name: 'Holzbearbeitung' , value: character?.skills?.Woodworking || 0 },
            {name: 'Lebensmittelbearbeitung' , value: character?.skills?.PrepareFood || 0 },
            {name: 'Lederbearbeitung' , value: character?.skills?.Leatherworking || 0 },
            {name: 'Malen/Zeichnen' , value: character?.skills?.ArtisticAbility || 0 },
            {name: 'Metallbearbeitung' , value: character?.skills?.Metalworking || 0 },
            {name: 'Musizieren' , value: character?.skills?.Music || 0 },
            {name: 'Schlösser knacken' , value: character?.skills?.PickLocks || 0 },
            {name: 'Bergbau' , value: character?.skills?.Earthencraft || 0 },
            {name: 'Stofbearbeitung' , value: character?.skills?.Clothworking || 0 },
        ],
        "energy": [
            {name: 'Lebenspunkte', value: character?.energy.LPMax || 0},
            {name: 'Astralpunkte', value: character?.energy.AEMax || 0},
            {name: 'Karmaenergie', value: character?.energy.KPMax || 0},
        ],
        "combatSkills": [
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
        ],
        "baseStats": [
            {name: 'Seelenkraft', value: character?.race.spirit + Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.sagacity + character?.coreAttributes?.intuition )/6)},
            {name: 'Zähigkeit', value: character?.race.toughness + Math.round((character?.coreAttributes?.constitution + character?.coreAttributes?.constitution + character?.coreAttributes?.strength )/6)},
            {name: 'Ausweichen', value: Math.round(character?.coreAttributes?.agility /2)},
            {name: 'Initiative', value: Math.round((character?.coreAttributes?.courage + character?.coreAttributes?.agility) /2)},
            {name: 'Geschwindigkeit', value: character?.race.speed},
        ]
    };

    return output;

}