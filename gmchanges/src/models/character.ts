import mongoose from 'mongoose';
import { GMChange, GMChangeStatus} from './gmchanges';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CharacterAttrs {
  id: string;
  name: string;
  stats: string;
}

export interface CharacterDoc extends mongoose.Document {
  name: string;
  version: number;
  stats: string;
  isReserved(): Promise<boolean>;
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  build(attrs: CharacterAttrs): CharacterDoc;
  findByEvent(event: { id: string, version: number}): Promise<CharacterDoc | null>;
}

const charcaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    stats: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

charcaterSchema.set('versionKey', 'version');
charcaterSchema.plugin(updateIfCurrentPlugin);

charcaterSchema.statics.findByEvent = (event: { id: string, version: number}) => {
  return Character.findOne({
    _id: event.id,
    version: event.version -1,
  });
};

charcaterSchema.statics.build = (attrs: CharacterAttrs) => {
  return new Character({
    _id: attrs.id,
    name: attrs.name,
    stats: attrs.stats
  });
};

charcaterSchema.methods.isReserved = async function() {
  //this === the character document that is called with isReserved
  const currentGMChange = await GMChange.findOne({
    character: this,
    status: {
        $in: [
            GMChangeStatus.Created,
            GMChangeStatus.AwaitingConfirmation,
            GMChangeStatus.Complete
        ]
    }
  });
  return !!currentGMChange;
}

const Character = mongoose.model<CharacterDoc, CharacterModel>('Character', charcaterSchema);

export { Character };
