import {allSkills, allSkillChecks} from '../data/skills';
import {Character} from '../models/character';
import { findBestMatch } from 'string-similarity';

export async function skillCheck(id: string, reqSkill: string, discordId?: string) {
        
    let character = await Character.findById(id);

    if(discordId){      
        let character = await Character.find({discordId: discordId});      
    }
    
    const skills = [
        {name: 'Flying' , value: character?.skills?.Flying},
        {name: 'Gaukelei' , value: character?.skills?.Gaukelei},
        {name: 'Climbing' , value: character?.skills?.Climbing},
        {name: 'BodyControl' , value: character?.skills?.BodyControl},
        {name: 'FeatOfStrength' , value: character?.skills?.FeatOfStrength},
        {name: 'Riding' , value: character?.skills?.Riding},
        {name: 'Swimming' , value: character?.skills?.Swimming},
        {name: 'SelfControl' , value: character?.skills?.SelfControl},
        {name: 'Singing' , value: character?.skills?.Singing},
        {name: 'Perception' , value: character?.skills?.Perception},
        {name: 'Dancing' , value: character?.skills?.Dancing},
        {name:   'Pickpocket' , value: character?.skills?.Pickpocket},
        {name:   'Stealth' , value: character?.skills?.Stealth},
        {name:   'Carousing' , value: character?.skills?.Carousing},
        {name:   'Persuasion' , value: character?.skills?.Persuasion},
        {name:   'Seduction' , value: character?.skills?.Seduction},
        {name:   'Intimidation' , value: character?.skills?.Intimidation},
        {name:   'Etiquette' , value: character?.skills?.Etiquette},
        {name:   'Streetwise' , value: character?.skills?.Streetwise},
        {name:   'Empathy' , value: character?.skills?.Empathy},
        {name:   'FastTalk' , value: character?.skills?.FastTalk},
        {name:  'Disguise' , value: character?.skills?.Disguise},
        {name:  'Willpower' , value: character?.skills?.Willpower},
        {name:  'Tracking' , value: character?.skills?.Tracking},
        {name:  'Ropes' , value: character?.skills?.Ropes},
        {name:   'Fishing' , value: character?.skills?.Fishing},
        {name: 'Orienting' , value: character?.skills?.Orienting},
        {name: 'PlantLore' , value: character?.skills?.PlantLore},
        {name: 'AnimalLore' , value: character?.skills?.AnimalLore},
        {name: 'Survival' , value: character?.skills?.Survival},
        {name: 'Gambling' , value: character?.skills?.Gambling},
        {name: 'Geography' , value: character?.skills?.Geography},
        {name:     'History' , value: character?.skills?.History},
        {name:     'Religions' , value: character?.skills?.Religions},
        {name:    'Warfare' , value: character?.skills?.Warfare},
        {name:    'MagicalLore' , value: character?.skills?.MagicalLore},
        {name:    'Mechanics' , value: character?.skills?.Mechanics},
        {name:     'Math' , value: character?.skills?.Math},
        {name:    'Law' , value: character?.skills?.Law},
        {name:    'MythsAndLegends' , value: character?.skills?.MythsAndLegends},
        {name:     'SphereLore' , value: character?.skills?.SphereLore},
        {name:     'Astronomy' , value: character?.skills?.Astronomy},
        {name:     'Alchemy' , value: character?.skills?.Alchemy},
        {name:    'Sailing' , value: character?.skills?.Sailing},
        {name:    'Driving' , value: character?.skills?.Driving},
        {name:    'Commerce' , value: character?.skills?.Commerce},
        {name:    'TreatPoison' , value: character?.skills?.TreatPoison},
        {name:    'TreatDisease' , value: character?.skills?.TreatDisease},
        {name:    'TreatSoul' , value: character?.skills?.TreatSoul},
        {name:    'TreatWounds' , value: character?.skills?.TreatWounds},
        {name:    'Woodworking' , value: character?.skills?.Woodworking},
        {name:   'PrepareFood' , value: character?.skills?.PrepareFood},
        {name:    'Leatherworking' , value: character?.skills?.Leatherworking},
        {name:  'ArtisticAbility' , value: character?.skills?.ArtisticAbility},
        {name:  'Metalworking' , value: character?.skills?.Metalworking},
        {name:    'Music' , value: character?.skills?.Music},
        {name:    'PickLocks' , value: character?.skills?.PickLocks},
        {name:   'Earthencraft' , value: character?.skills?.Earthencraft},
        {name:   'Clothworking' , value: character?.skills?.Clothworking},
    ]  

    let coreAttributes = [
        {name: 'agility', value: character?.coreAttributes?.agility},
        {name: 'charisma', value: character?.coreAttributes?.charisma},
        {name: 'constitution', value: character?.coreAttributes?.constitution},
        {name: 'courage', value: character?.coreAttributes?.courage},
        {name: 'dexterity', value: character?.coreAttributes?.dexterity},
        {name: 'intuition', value: character?.coreAttributes?.intuition},
        {name: 'sagacity', value: character?.coreAttributes?.sagacity},
        {name: 'strength', value: character?.coreAttributes?.strength}
    ]
    
    const fuzzySkill = String(findBestMatch(reqSkill, allSkills).bestMatch.target);
 
    let skillChecked = allSkillChecks.find((item) => item.name === fuzzySkill);

    let response =[];
    response.push(skills.find((item) => item.name === fuzzySkill)?.value);
    response.push(coreAttributes.find((item) => item.name === skillChecked?.firstAttr)?.value);
    response.push(coreAttributes.find((item) => item.name === skillChecked?.secondAttr)?.value);
    response.push(coreAttributes.find((item) => item.name === skillChecked?.thirdAttr)?.value);

    return response;
} 