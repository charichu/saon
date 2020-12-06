import { skillCategoriesDE, skillCategoriesEN } from "../../data/skillCategories";

export function setSkillCategories(language: string){
    
    return  (language == 'de-DE') ? skillCategoriesDE : skillCategoriesEN;
};