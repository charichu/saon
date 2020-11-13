import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CharacterAttrs {
  name: string;
  stats: string;
  userId: string;
  discordId?: string;
  experienceLevel?: string;
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
    LPLost : number,
    AELost : number,
    KPLost : number,
    LPCurrent : number,
    AECurrent : number,
    KPCurrent : number,
  };
  race?: string;
  profession?: string;
  socialStatus?: number;  
  advantages?: [{}];    
  disadvantages?: [{}];
  gender?: string;
  personals?: [{}];
  exp?: number;
}

interface CharacterDoc extends mongoose.Document {
  name: string;
  stats: string;
  userId: string;
  version: number;
  discordId?: string;
  gmchangeId?: string;
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
    LPLost : number,
    AELost : number,
    KPLost : number,
    LPCurrent : number,
    AECurrent : number,
    KPCurrent : number,
     };
  race?: string;
  profession?: string;
  socialStatus?: number;  
  advantages?: [{}];    
  disadvantages?: [{}];
  gender?: string;
  personals?: [{}];
  exp?: number;
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  build(attrs: CharacterAttrs): CharacterDoc;
}

const characterSchema = new mongoose.Schema(
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
    experienceLevel: {
      type: String,
    },
    race: {
      type: String,
    },
    culture: {
      type: String,
    },
    profession: {
      type: String,
    },
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
      LPLost : Number,
      AELost : Number,
      KPLost : Number,
      LPCurrent : Number,
      AECurrent : Number,
      KPCurrent : Number,
       },
    advantages: [{}],    
    disadvantages: [{}],
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
    specialAbilities: [{}],
    socialStatus: {
      type: Number,
    },
    gender: {
      type: String,
    },
    personals: [{}],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.stats;
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