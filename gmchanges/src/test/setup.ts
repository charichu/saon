import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import {app} from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
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
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async() => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // Build a JWT payload {id,email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
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