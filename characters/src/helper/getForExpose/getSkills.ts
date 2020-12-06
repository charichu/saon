//import { skillCheckAttr } from "../../data/skillChecks";
import { allSkillsDE } from "../../data/skillNames";


export async function getSkills(character: any) {

    const allSkills = allSkillsDE;
    //const checks = skillCheckAttr;

    const skills = [
            {name: allSkills[0] , value: character?.skills?.Flying || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: allSkills[1] , value: character?.skills?.Gaukelei || 0, check: {check1: 'ATTR_1', check2: 'ATTR_4', check3: 'ATTR_5'}},
            {name: allSkills[2] , value: character?.skills?.Climbing || 0, check: {check1: 'ATTR_1', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: allSkills[3] , value: character?.skills?.BodyControl || 0, check: {check1: 'ATTR_6', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: allSkills[4] , value: character?.skills?.FeatOfStrength || 0, check: {check1: 'ATTR_7', check2: 'ATTR_8', check3: 'ATTR_8'} },
            {name: allSkills[5], value: character?.skills?.Riding || 0, check: {check1: 'ATTR_4', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: allSkills[6] , value: character?.skills?.Swimming || 0, check: {check1: 'ATTR_6', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: allSkills[7] , value: character?.skills?.SelfControl || 0, check: {check1: 'ATTR_1', check2: 'ATTR_1', check3: 'ATTR_7'} },
            {name: allSkills[8], value: character?.skills?.Singing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_4', check3: 'ATTR_7'} },
            {name: allSkills[9], value: character?.skills?.Perception || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_3'} },
            {name: allSkills[10], value: character?.skills?.Dancing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_4', check3: 'ATTR_6'} },
            {name: allSkills[11] , value: character?.skills?.Pickpocket || 0, check: {check1: 'ATTR_1', check2: 'ATTR_5', check3: 'ATTR_6'} },
            {name: allSkills[12] , value: character?.skills?.Stealth || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: allSkills[13] , value: character?.skills?.Carousing || 0, check: {check1: 'ATTR_2', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: allSkills[14] , value: character?.skills?.Persuasion || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_4'} },
            {name: allSkills[15] , value: character?.skills?.Seduction || 0, check: {check1: 'ATTR_1', check2: 'ATTR_4', check3: 'ATTR_4'} },
            {name: allSkills[16] , value: character?.skills?.Intimidation || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[17] , value: character?.skills?.Etiquette || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[18] , value: character?.skills?.Streetwise || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[19] , value: character?.skills?.Empathy || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[20], value: character?.skills?.FastTalk || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[21] , value: character?.skills?.Disguise || 0, check: {check1: 'ATTR_3', check2: 'ATTR_4', check3: 'ATTR_6'} },
            {name: allSkills[22], value: character?.skills?.Willpower || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[23], value: character?.skills?.Tracking || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_6'} },
            {name: allSkills[24], value: character?.skills?.Ropes || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_8'} },
            {name: allSkills[25] , value: character?.skills?.Fishing || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: allSkills[26] , value: character?.skills?.Orienting || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_3'} },
            {name: allSkills[27] , value: character?.skills?.PlantLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: allSkills[28] , value: character?.skills?.AnimalLore || 0, check: {check1: 'ATTR_1', check2: 'ATTR_1', check3: 'ATTR_4'} },
            {name: allSkills[29] , value: character?.skills?.Survival || 0, check: {check1: 'ATTR_1', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: allSkills[30] , value: character?.skills?.Gambling || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[31] , value: character?.skills?.Geography || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[32] , value: character?.skills?.History || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[33] , value: character?.skills?.Religions || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[34] , value: character?.skills?.Warfare || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[35] , value: character?.skills?.MagicalLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[36] , value: character?.skills?.Mechanics || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_5'} },
            {name: allSkills[37] , value: character?.skills?.Math || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[38] , value: character?.skills?.Law || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_2'} },
            {name: allSkills[39] , value: character?.skills?.MythsAndLegends || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[40] , value: character?.skills?.SphereLore || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[41] , value: character?.skills?.Astronomy || 0, check: {check1: 'ATTR_2', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[42] , value: character?.skills?.Alchemy || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_5'} },
            {name: allSkills[43] , value: character?.skills?.Sailing || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: allSkills[44] , value: character?.skills?.Driving || 0, check: {check1: 'ATTR_4', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: allSkills[45] , value: character?.skills?.Commerce || 0, check: {check1: 'ATTR_2', check2: 'ATTR_3', check3: 'ATTR_4'} },
            {name: allSkills[46] , value: character?.skills?.TreatPoison || 0, check: {check1: 'ATTR_1', check2: 'ATTR_2', check3: 'ATTR_3'} },
            {name: allSkills[47] , value: character?.skills?.TreatDisease || 0, check: {check1: 'ATTR_1', check2: 'ATTR_3', check3: 'ATTR_7'} },
            {name: allSkills[48] , value: character?.skills?.TreatSoul || 0, check: {check1: 'ATTR_3', check2: 'ATTR_4', check3: 'ATTR_7'} },
            {name: allSkills[49] , value: character?.skills?.TreatWounds || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: allSkills[50] , value: character?.skills?.Woodworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_8'} },
            {name: allSkills[51] , value: character?.skills?.PrepareFood || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: allSkills[52] , value: character?.skills?.Leatherworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_6', check3: 'ATTR_7'} },
            {name: allSkills[53] , value: character?.skills?.ArtisticAbility || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: allSkills[54] , value: character?.skills?.Metalworking || 0, check: {check1: 'ATTR_5', check2: 'ATTR_7', check3: 'ATTR_8'} },
            {name: allSkills[55] , value: character?.skills?.Music || 0, check: {check1: 'ATTR_4', check2: 'ATTR_5', check3: 'ATTR_7'} },
            {name: allSkills[56] , value: character?.skills?.PickLocks || 0, check: {check1: 'ATTR_3', check2: 'ATTR_5', check3: 'ATTR_5'} },
            {name: allSkills[57] , value: character?.skills?.Earthencraft || 0, check: {check1: 'ATTR_5', check2: 'ATTR_5', check3: 'ATTR_8'} },
            {name: allSkills[58] , value: character?.skills?.Clothworking || 0, check: {check1: 'ATTR_2', check2: 'ATTR_5', check3: 'ATTR_5'} },
        ];

    return skills;

}