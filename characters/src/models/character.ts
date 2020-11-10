import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CharacterAttrs {
  name: string;
  stats: string;
  userId: string;
}

interface CharacterDoc extends mongoose.Document {
  name: string;
  stats: string;
  userId: string;
  version: number;
  gmchangeId?: string;
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
    }
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

characterSchema.set('versionKey', 'version')
characterSchema.plugin(updateIfCurrentPlugin);

characterSchema.statics.build = (attrs: CharacterAttrs) => {
  return new Character(attrs);
};

const Character = mongoose.model<CharacterDoc, CharacterModel>('Character', characterSchema);

export { Character };