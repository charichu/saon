import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';

const buildCharacter = async () => {
    const character = Character.build({
        id: mongoose.Types.ObjectId().toHexString(),
        name: 'Alrik',
        stats: 'Einsamer Wanderer'
    });
    await character.save();
    return character;
}


it('fetches gmchanges for particular user', async () => {
    // Create three characters
    const characterOne = await buildCharacter();
    const characterTwo = await buildCharacter();
    const characterThree = await buildCharacter();

    const userOne = global.signin();
    const userTwo = global.signin();

    // Create one change as user1
    await request(app)
        .post('/api/gmchanges')
        .set('Cookie', userOne)
        .send({characterId: characterOne.id})
        .expect(201);

    // create two changes as user2
    const { body: gmchangeOne } = await request(app)
        .post('/api/gmchanges')
        .set('Cookie', userTwo)
        .send({characterId: characterTwo.id})
        .expect(201);
    
    const { body: gmchangeTwo } = await request(app)
        .post('/api/gmchanges')
        .set('Cookie', userTwo)
        .send({characterId: characterThree.id})
        .expect(201);

    // make request to get orders for user2
    const response = await request(app)
        .get('/api/gmchanges')
        .set('Cookie', userTwo)
        .expect(200);

    // make sure we only got the changes for user2
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(gmchangeOne.id);
    expect(response.body[1].id).toEqual(gmchangeTwo.id);
    expect(response.body[0].character).toEqual(characterTwo.id);
    expect(response.body[1].character).toEqual(characterThree.id);
});