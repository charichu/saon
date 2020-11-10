import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new user
// "connecting" mongoose with tyescript

interface UserAttrs {
    email: string;
    password: string;
} 

// Properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, 
    {
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id;
                delete ret._id;                
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

userSchema.pre('save', async function(done) {
   if(this.isModified('password')){
       const hashed = await Password.toHash(this.get('password'));
       this.set('password', hashed);
   } 
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };