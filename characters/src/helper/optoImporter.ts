import { Character } from '../models/character';
import { CharacterCreatedPublisher } from '../events/publishers/characterCreatedPublisher';
import {natsWrapper} from '../natsWrapper';
import { raceBaseStats } from '../data/baseStats';
import { defaultAvatar } from '../data/defaultAvatar';
import { mapSpells } from './mapImport/mapSpells';
import { mapBlessings } from './mapImport/mapBlessings';
import { mapCantrips } from './mapImport/mapCantrips';
import { mapLiturgies } from './mapImport/mapLiturgies';
import { mapAdvantages } from './mapImport/mapAdvantages';
import { mapDisadvantages } from './mapImport/mapDisadvantages';
import { sortCoreAttributes } from './mapImport/sortCoreAttributes';
import { culturesDE } from '../data/culturesDE';
import { mapspecialAbilities } from './mapImport/mapSpecialAbilities';
import { mapProfessionName } from './mapImport/mapProfessionName';

export async function optoImport(input: string, userId: string, name: string, discordId?: string) {
    
        //Parsing the input to JSON 
        const newChar = JSON.parse(input);

        //Sort Attributes, since minimal Attributes dont show in Optolith Export, and they can be out of order as well
        //Sorts them by ATTR_1, ATTR_2 ... etc
        const sortedAttribues = await sortCoreAttributes(newChar.attr.values);

        // Set Arrays to split so called activatable object into specficis
        let advantages = [{}];
        let disadvantages = [{}];
        let specialAbilities = [{}];

        // Set basic information like race, culture, profession and energy 
        const race = raceBaseStats.find((item) => item.id === newChar.r);
        const culture = culturesDE.find((item) => item.id === newChar.c)?.name;
        const profession = mapProfessionName(newChar.p, newChar.professionName, newChar.sex);

        let LPMax = (race!.health + 2 * sortedAttribues[6].value) - newChar.attr.permanentLP.lost;
        let AEMax: number = 0;
        let KPMax: number = 0;

        // Using the speaking ID Names to split the activatable by type
        for (let prop in newChar.activatable){
            const add = {
                [prop]: newChar.activatable[prop]
            }

            switch(String(prop).charAt(0)){
                //Advantages start with A like ADV_1
                case 'A':                
                advantages.push(add);
                break;
                // Disadvantages start with D like DISADV_1
                case 'D':                
                disadvantages.push(add);
                break;
                //Special Abilities start with S like SA_1
                case 'S':                
                specialAbilities.push(add);
                break;
            }
        }

        advantages = await mapAdvantages(advantages);
        disadvantages = await mapDisadvantages(disadvantages);
        const specials = await mapspecialAbilities(specialAbilities);

        let spells: any = new Array();
        if(newChar.spells){
            spells = await mapSpells(newChar.spells);
        }

        let cantrips: any = new Array();
        if(newChar.cantrips){
            cantrips = await mapCantrips(newChar.cantrips);
        }

        let blessings: any = new Array();
        if(newChar.blessings){
            blessings = await mapBlessings(newChar.blessings);
        }

        let liturgies: any = new Array();
        if(newChar.liturgies){
            liturgies = await mapLiturgies(newChar.liturgies);
        }

        if(Object.keys(newChar.blessings!).length !== 0){
            KPMax = 34 - newChar.attr.permanentKP.lost;
        }
        if(Object.keys(newChar.spells!).length !== 0){
            AEMax = 34 - newChar.attr.permanentAE.lost;
        }

        let avatar = newChar.avatar;
        if(!newChar.avatar){
            avatar = defaultAvatar;
        }

        const character = Character.build({
            name,
            stats: input,
            userId,
            discordId,
            avatar: avatar,
            coreAttributes: {
                courage : sortedAttribues[0].value ,
                sagacity : sortedAttribues[1].value,
                intuition : sortedAttribues[2].value ,
                charisma : sortedAttribues[3].value ,
                dexterity : sortedAttribues[4].value ,
                agility : sortedAttribues[5].value ,
                constitution : sortedAttribues[6].value ,
                strength : sortedAttribues[7].value ,
            },
            skills: {
                Flying : newChar.talents.TAL_1,
                Gaukelei : newChar.talents.TAL_2,
                Climbing : newChar.talents.TAL_3,
                BodyControl : newChar.talents.TAL_4,
                FeatOfStrength : newChar.talents.TAL_5,
                Riding : newChar.talents.TAL_6,
                Swimming : newChar.talents.TAL_7,
                SelfControl : newChar.talents.TAL_8,
                Singing : newChar.talents.TAL_9,
                Perception : newChar.talents.TAL_10,
                Dancing : newChar.talents.TAL_11,
                Pickpocket : newChar.talents.TAL_12,
                Stealth : newChar.talents.TAL_13,
                Carousing : newChar.talents.TAL_14,
                Persuasion : newChar.talents.TAL_15,
                Seduction : newChar.talents.TAL_16,
                Intimidation : newChar.talents.TAL_17,
                Etiquette : newChar.talents.TAL_18,
                Streetwise : newChar.talents.TAL_19,
                Empathy : newChar.talents.TAL_20,
                FastTalk : newChar.talents.TAL_21,
                Disguise : newChar.talents.TAL_22,
                Willpower : newChar.talents.TAL_23,
                Tracking : newChar.talents.TAL_24,
                Ropes : newChar.talents.TAL_25,
                Fishing : newChar.talents.TAL_26,
                Orienting : newChar.talents.TAL_27,
                PlantLore : newChar.talents.TAL_28,
                AnimalLore : newChar.talents.TAL_29,
                Survival : newChar.talents.TAL_30,
                Gambling : newChar.talents.TAL_31,
                Geography : newChar.talents.TAL_32,
                History : newChar.talents.TAL_33,
                Religions : newChar.talents.TAL_34,
                Warfare : newChar.talents.TAL_35,
                MagicalLore : newChar.talents.TAL_36,
                Mechanics : newChar.talents.TAL_37,
                Math : newChar.talents.TAL_38,
                Law : newChar.talents.TAL_39,
                MythsAndLegends : newChar.talents.TAL_40,
                SphereLore : newChar.talents.TAL_41,
                Astronomy : newChar.talents.TAL_42,
                Alchemy : newChar.talents.TAL_43,
                Sailing : newChar.talents.TAL_44,
                Driving : newChar.talents.TAL_45,
                Commerce : newChar.talents.TAL_46,
                TreatPoison : newChar.talents.TAL_47,
                TreatDisease : newChar.talents.TAL_48,
                TreatSoul : newChar.talents.TAL_49,
                TreatWounds : newChar.talents.TAL_50,
                Woodworking : newChar.talents.TAL_51,
                PrepareFood : newChar.talents.TAL_52,
                Leatherworking : newChar.talents.TAL_53,
                ArtisticAbility : newChar.talents.TAL_54,
                Metalworking : newChar.talents.TAL_55,
                Music : newChar.talents.TAL_56,
                PickLocks : newChar.talents.TAL_57,
                Earthencraft : newChar.talents.TAL_58,
                Clothworking : newChar.talents.TAL_59,
            }, combatTechniques: {
                Crossbows : newChar.ct.CT_1,
                Bows : newChar.ct.CT_2,
                Daggers : newChar.ct.CT_3,
                FencingWeapons : newChar.ct.CT_4,
                ImpactWeapons : newChar.ct.CT_5,
                ChainWeapons : newChar.ct.CT_6,
                Lances : newChar.ct.CT_7,
                Whips : newChar.ct.CT_8,
                Brawling : newChar.ct.CT_9,
                Shields : newChar.ct.CT_10,
                Slings : newChar.ct.CT_11,
                Swords : newChar.ct.CT_12,
                Polearms : newChar.ct.CT_13,
                ThrownWeapons : newChar.ct.CT_14,
                TwoHandedImpactWeapons : newChar.ct.CT_15,
                TwoHandedSwords : newChar.ct.CT_16,
                SpittingFire : newChar.ct.CT_17,
                Blowguns : newChar.ct.CT_18,
                Discuses : newChar.ct.CT_19,
                Faecher : newChar.ct.CT_20,
                Spiesswaffen : newChar.ct.CT_21,
            },
            energy: {
                LPMax : LPMax,
                AEMax : AEMax,
                KPMax : KPMax,
                LPLost : newChar.attr.permanentLP,
                AELost : newChar.attr.permanentAE,
                KPLost : newChar.attr.permanentKP,
                LPCurrent : newChar.attr.lp,
                AECurrent : newChar.attr.ae,
                KPCurrent : newChar.attr.kp,
            },
            race: race,
            culture: culture,
            experienceLevel: newChar.el,
            profession: profession,
            advantages: advantages,
            disadvantages: disadvantages,
            specialAbilities: specials,
            socialStatus: newChar.pers.socialstatus,
            gender: newChar.sex,
            personals: newChar.pers,
            exp: newChar.ap.total, 
            spells: spells,    
            cantrips: cantrips,
            blessings: blessings,
            liturgies: liturgies,
            belongings: newChar.belongings,
            rules: newChar.rules,
            language: newChar.locale,
        });
        
        await character.save(); 

        new CharacterCreatedPublisher(natsWrapper.client).publish({
            id: character.id,
            version: character.version,
            name: character.name,
            stats: character.stats,
            userId: character.userId
        });

        return character;
}