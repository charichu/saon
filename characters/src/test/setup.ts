import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[];
        }
    }
}

jest.mock('../natsWrapper');

let mongo: any;
beforeAll(async ()=> {
    process.env.JWT_KEY = '1234'
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async() => {
    jest.clearAllMocks();

    const collections = await Object.keys(mongoose.connection.collections);

    for(let collection of collections){
        await mongoose.connection.dropCollection(collection, (error)=>{console.log(error);console.log(collection)});
    }
});

afterAll(async() => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    // Build a JWT payload {id,email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    //create JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //build session object
    const session = { jwt: token};
    const sessionJSON = JSON.stringify(session);

    // encode iit as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    
    return [`express:sess=${base64}`];
};