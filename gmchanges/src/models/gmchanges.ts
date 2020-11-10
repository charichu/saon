import mongoose, { mongo } from 'mongoose';
import { GMChangeStatus } from '@chasaon/common';
import {CharacterDoc} from './character';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { GMChangeStatus};

interface GMChangesAttrs {
    userId: string;
    status: GMChangeStatus;
    expiresAt: Date;
    character: CharacterDoc;
}

interface GMChangesDoc extends mongoose.Document {
    userId: string;
    version: number;
    status: GMChangeStatus;
    expiresAt: Date;
    character: CharacterDoc;
}

interface GMChangesModel extends mongoose.Model<GMChangesDoc> {
    build(attrs: GMChangesAttrs): GMChangesDoc;
}

const gmchangesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(GMChangeStatus),
        default: GMChangeStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

gmchangesSchema.set('versionKey', 'version');
gmchangesSchema.plugin(updateIfCurrentPlugin);
gmchangesSchema.statics.build = (attrs: GMChangesAttrs) => {
    return new GMChange(attrs);
};

const GMChange = mongoose.model<GMChangesDoc, GMChangesModel>('GMChange', gmchangesSchema);

export {GMChange};