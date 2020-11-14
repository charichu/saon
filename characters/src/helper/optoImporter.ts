import { Character } from '../models/character';
import { CharacterCreatedPublisher } from '../events/publishers/characterCreatedPublisher';
import {natsWrapper} from '../natsWrapper';

export async function optoImport(input: string, userId: string, name: string, discordId?: string) {
    const newChar = JSON.parse(input);

    let advantages = [{}];
    let disadvantages = [{}];
    let specialAbilities = [{}];

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

    const character = Character.build({
        name,
        stats: input,
        userId,
        discordId,
        coreAttributes: {
            courage : newChar.attr.values[0].value,
            sagacity : newChar.attr.values[1].value,
            intuition : newChar.attr.values[2].value,
            charisma : newChar.attr.values[3].value,
            dexterity : newChar.attr.values[4].value,
            agility : newChar.attr.values[5].value,
            constitution : newChar.attr.values[6].value,
            strength : newChar.attr.values[7].value,
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
            LPMax : newChar.attr.lp,
            AEMax : newChar.attr.ae,
            KPMax : newChar.attr.kp,
            LPLost : newChar.attr.permanentAE,
            AELost : newChar.attr.permanentLP,
            KPLost : newChar.attr.permanentKP,
            LPCurrent : newChar.attr.lp,
            AECurrent : newChar.attr.ae,
            KPCurrent : newChar.attr.kp,
        },
        race: newChar.r,
        culture: newChar.c,
        experienceLevel: newChar.el,
        profession: newChar.professionName,
        advantages: advantages,
        disadvantages: disadvantages,
        specialAbilities: specialAbilities,
        socialStatus: newChar.pers.socialstatus,
        gender: newChar.sex,
        personals: newChar.pers,
        exp: newChar.ap.total, 
        spells: newChar.spells,    
        cantrips: newChar.cantrips,
        blessings: newChar.blessings,
        liturgies: newChar.liturgies,
        belongings: newChar.belongings,
        rules: newChar.rules,
    });
    
    await character.save();   

    new CharacterCreatedPublisher(natsWrapper.client).publish({
        id: character.id,
        version: character.version,
        name: character.name,
        stats: character.stats,
        userId: character.userId
    });

    return character.id;

}