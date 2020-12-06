// @ts-nocheck

import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CharacterAttrs {
  name: string;
  stats: string;
  userId: string;
  discordId?: string;
  language?: string;
  experienceLevel?: string;
  avatar?: string;
  culture?: string;
  coreAttributes?: {
    courage : number,
    sagacity : number,
    intuition : number,
    charisma : number,
    dexterity : number,
    agility : number,
    constitution : number,
    strength : number,
  },skills?: {
    Flying : number,
    Gaukelei : number,
    Climbing : number,
    BodyControl : number,
    FeatOfStrength : number,
    Riding : number,
    Swimming : number,
    SelfControl : number,
    Singing : number,
    Perception : number,
    Dancing : number,
    Pickpocket : number,
    Stealth : number,
    Carousing : number,
    Persuasion : number,
    Seduction : number,
    Intimidation : number,
    Etiquette : number,
    Streetwise : number,
    Empathy : number,
    FastTalk : number,
    Disguise : number,
    Willpower : number,
    Tracking : number,
    Ropes : number,
    Fishing : number,
    Orienting : number,
    PlantLore : number,
    AnimalLore : number,
    Survival : number,
    Gambling : number,
    Geography : number,
    History : number,
    Religions : number,
    Warfare : number,
    MagicalLore : number,
    Mechanics : number,
    Math : number,
    Law : number,
    MythsAndLegends : number,
    SphereLore : number,
    Astronomy : number,
    Alchemy : number,
    Sailing : number,
    Driving : number,
    Commerce : number,
    TreatPoison : number,
    TreatDisease : number,
    TreatSoul : number,
    TreatWounds : number,
    Woodworking : number,
    PrepareFood : number,
    Leatherworking : number,
    ArtisticAbility : number,
    Metalworking : number,
    Music : number,
    PickLocks : number,
    Earthencraft : number,
    Clothworking : number,
  };
  energy?: {
    LPMax : number,
    AEMax : number,
    KPMax : number,
    LPLost : [{}],
    AELost : [{}],
    KPLost : [{}],
    LPCurrent : number,
    AECurrent : number,
    KPCurrent : number,
  };
  spirit?: { 
    type: number
  };
  toughness?: { 
      type:number
  };
  dodge?: { 
      type: number
  };    
  initiative?: { 
      type: number
  };
  movement?: { 
      type: number
  };
  race?: {
    id: string, 
    name: string, 
    nameDE: string,
    health: number, 
    spirit: number, 
    toughness: number, 
    speed: number
  };
  profession?: {};
  socialStatus?: number;  
  advantages?: {};    
  disadvantages?: {};
  gender?: string;
  personals?: [{}];
  exp?: number;  
  specialAbilities?: {};
  combatTechniques?: {
    Crossbows : number,
    Bows : number,
    Daggers : number,
    FencingWeapons : number,
    ImpactWeapons : number,
    ChainWeapons : number,
    Lances : number,
    Whips : number,
    Brawling : number,
    Shields : number,
    Slings : number,
    Swords : number,
    Polearms : number,
    ThrownWeapons : number,
    TwoHandedImpactWeapons : number,
    TwoHandedSwords : number,
    SpittingFire : number,
    Blowguns : number,
    Discuses : number,
    Faecher : number,
    Spiesswaffen : number
  };
  spells?: [{}];    
  cantrips?: [{}];
  blessings?: [{}];
  liturgies?: [{}];
  belongings?: [{}];
  rules?: [{}];
}

interface CharacterDoc extends mongoose.Document {
  name: string;
  stats: string;
  userId: string;
  version: number;
  discordId?: string;
  language?: string;
  gmchangeId?: string;
  avatar?: string;
  coreAttributes?: {
    courage : number,
    sagacity : number,
    intuition : number,
    charisma : number,
    dexterity : number,
    agility : number,
    constitution : number,
    strength : number,
  };
  skills?: {
    Flying : number,
    Gaukelei : number,
    Climbing : number,
    BodyControl : number,
    FeatOfStrength : number,
    Riding : number,
    Swimming : number,
    SelfControl : number,
    Singing : number,
    Perception : number,
    Dancing : number,
    Pickpocket : number,
    Stealth : number,
    Carousing : number,
    Persuasion : number,
    Seduction : number,
    Intimidation : number,
    Etiquette : number,
    Streetwise : number,
    Empathy : number,
    FastTalk : number,
    Disguise : number,
    Willpower : number,
    Tracking : number,
    Ropes : number,
    Fishing : number,
    Orienting : number,
    PlantLore : number,
    AnimalLore : number,
    Survival : number,
    Gambling : number,
    Geography : number,
    History : number,
    Religions : number,
    Warfare : number,
    MagicalLore : number,
    Mechanics : number,
    Math : number,
    Law : number,
    MythsAndLegends : number,
    SphereLore : number,
    Astronomy : number,
    Alchemy : number,
    Sailing : number,
    Driving : number,
    Commerce : number,
    TreatPoison : number,
    TreatDisease : number,
    TreatSoul : number,
    TreatWounds : number,
    Woodworking : number,
    PrepareFood : number,
    Leatherworking : number,
    ArtisticAbility : number,
    Metalworking : number,
    Music : number,
    PickLocks : number,
    Earthencraft : number,
    Clothworking : number,
  };
  energy?: {
    LPMax : number,
    AEMax : number,
    KPMax : number,
    LPLost : {},
    AELost : {},
    KPLost : {},
    LPCurrent : number,
    AECurrent : number,
    KPCurrent : number,
     };  
  spirit?: { 
      type: number
  };
  toughness?: { 
      type:number
  };
  dodge?: { 
      type: number
  };    
  initiative?: { 
      type: number
  };
  movement?: { 
      type: number
  };
  race?: {
    id: string, 
    name: string,
    nameDE: string,
    health: number, 
    spirit: number, 
    toughness: number, 
    speed: number
  };
  profession?: {};
  socialStatus?: number;  
  advantages?: {};    
  disadvantages?: {};
  gender?: string;
  personals?: {};
  exp?: number;
  specialAbilities?: {};
  combatTechniques?: {
    Crossbows : number,
    Bows : number,
    Daggers : number,
    FencingWeapons : number,
    ImpactWeapons : number,
    ChainWeapons : number,
    Lances : number,
    Whips : number,
    Brawling : number,
    Shields : number,
    Slings : number,
    Swords : number,
    Polearms : number,
    ThrownWeapons : number,
    TwoHandedImpactWeapons : number,
    TwoHandedSwords : number,
    SpittingFire : number,
    Blowguns : number,
    Discuses : number,
    Faecher : number,
    Spiesswaffen : number
  };
  spells?: {};    
  cantrips?: {};
  blessings?: {};
  liturgies?: {};
  belongings?: {};
  rules?: {};
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  coreAttributes: any;
  skills: any;
  build(attrs: CharacterAttrs): CharacterDoc;
}

const characterSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stats: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    gmchangeId: {
      type: String,
    },
    discordId: {
      type: String,
    },
    avatar: {
      type: String
    },
    experienceLevel: {
      type: String,
    },
    language: {
      type: String,
    },
    race: {
      id: String, 
      name: String,
      nameDE: String, 
      health: Number, 
      spirit: Number, 
      toughness: Number, 
      speed: Number
    },
    culture: {
      type: String,
    },
    profession: {},
    exp: {
      type: Number
    },
    coreAttributes: {
      courage : Number,
      sagacity : Number,
      intuition : Number,
      charisma : Number,
      dexterity : Number,
      agility : Number,
      constitution : Number,
      strength : Number,
       },
    energy: {
      LPMax : Number,
      AEMax : Number,
      KPMax : Number,
      LPLost : {},
      AELost : {},
      KPLost : {},
      LPCurrent : Number,
      AECurrent : Number,
      KPCurrent : Number,
       },
    spirit: { 
      type: Number
    },
    toughness: { 
      type: Number
    },
    dodge: { 
      type: Number
    },    
    initiative: { 
      type: Number
    },
    movement: { 
      type: Number
    },
    advantages: {},    
    disadvantages: {},
    skills: {
      Flying : Number,
      Gaukelei : Number,
      Climbing : Number,
      BodyControl : Number,
      FeatOfStrength : Number,
      Riding : Number,
      Swimming : Number,
      SelfControl : Number,
      Singing : Number,
      Perception : Number,
      Dancing : Number,
      Pickpocket : Number,
      Stealth : Number,
      Carousing : Number,
      Persuasion : Number,
      Seduction : Number,
      Intimidation : Number,
      Etiquette : Number,
      Streetwise : Number,
      Empathy : Number,
      FastTalk : Number,
      Disguise : Number,
      Willpower : Number,
      Tracking : Number,
      Ropes : Number,
      Fishing : Number,
      Orienting : Number,
      PlantLore : Number,
      AnimalLore : Number,
      Survival : Number,
      Gambling : Number,
      Geography : Number,
      History : Number,
      Religions : Number,
      Warfare : Number,
      MagicalLore : Number,
      Mechanics : Number,
      Math : Number,
      Law : Number,
      MythsAndLegends : Number,
      SphereLore : Number,
      Astronomy : Number,
      Alchemy : Number,
      Sailing : Number,
      Driving : Number,
      Commerce : Number,
      TreatPoison : Number,
      TreatDisease : Number,
      TreatSoul : Number,
      TreatWounds : Number,
      Woodworking : Number,
      PrepareFood : Number,
      Leatherworking : Number,
      ArtisticAbility : Number,
      Metalworking : Number,
      Music : Number,
      PickLocks : Number,
      Earthencraft : Number,
      Clothworking : Number,
       },
      combatTechniques: {
      Crossbows : Number,
      Bows : Number,
      Daggers : Number,
      FencingWeapons : Number,
      ImpactWeapons : Number,
      ChainWeapons : Number,
      Lances : Number,
      Whips: Number,
      Brawling : Number,
      Shields : Number,
      Slings : Number,
      Swords : Number,
      Polearms : Number,
      ThrownWeapons : Number,
      TwoHandedImpactWeapons : Number,
      TwoHandedSwords : Number,
      SpittingFire : Number,
      Blowguns : Number,
      Discuses : Number,
      Faecher : Number,
      Spiesswaffen : Number
    },
    specialAbilities: {},
    socialStatus: {
      type: Number,
    },
    gender: {
      type: String,
    },
    personals: {},
    spells: {},    
    cantrips: {},
    blessings: {},
    liturgies: {},
    belongings: {},
    rules: {},
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.stats;
        delete ret.avatar;
      },
    },
  }
);

characterSchema.set('versionKey', 'version')
characterSchema.plugin(updateIfCurrentPlugin);

characterSchema.statics.build = (attrs: CharacterAttrs) => {
  return new Character(attrs);
};

const Character = mongoose.model<CharacterDoc, CharacterModel>('Character', characterSchema);

export { Character };