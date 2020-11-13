import { Character } from '../models/character';
import { CharacterCreatedPublisher } from '../events/publishers/characterCreatedPublisher';
import {natsWrapper} from '../natsWrapper';

export async function optoImport(input: string, userId: string, name: string, discordId?: string) {
    const newChar = JSON.parse(input);

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
        },
        race: newChar.r,
        culture: newChar.c,
        experienceLevel: newChar.el,
        profession: newChar.professionName,
        advantages: newChar.activatable,
        socialStatus: newChar.pers.socialstatus,
        gender: newChar.sex,
        personals: newChar.pers,
        exp: newChar.ap.total
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