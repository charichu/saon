import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';
import { natsWrapper } from '../../natsWrapper';

it('has a route handler listening to /api/characters for post requests', async () => {
    const response = await request(app)
        .post('/api/characters')
        .send({})    
        expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/characters')
        .send({})
        .expect(401);
});

it('returns a stuats other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin())
        .send({});
    
    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid name is provided', async () => {
    await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin())
        .send({
            name: '',
            stats: 10
        })
        .expect(400);
    
    await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin())
        .send({
            stats: 10
        })
        .expect(400);
});

it('returns an error if stats are not provided', async () => {
    await request(app)
    .post('/api/characters')
    .set('Cookie', global.signin())
    .send({
        name: 'Alrik'
    })
    .expect(400);
});

it('creates a character with valid inputs', async () => {
    let characters = await Character.find({});
    expect(characters.length).toEqual(0);

    await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin())
        .send({
            name: 'Alrik',
            stats: '{"clientVersion": "1.4.2-alpha.4"}'
        })
        .expect(201);

    characters = await Character.find({});
    expect(characters.length).toEqual(1);
});

it('publishes an event', async () => {
    await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin())
        .send({
            name: 'Alrik',
            stats: '{"clientVersion": "1.4.2-alpha.4"}'
        })
        .expect(201);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();

})