import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';
import { testImport } from '../../test/testImport';

it('returns 404 if char not found', async () => {
    const res = await request(app)
        .get('/api/characters/shr4hfkjwhf74ff4729119')  
        .send()
        expect(404);
});

it('returns the character if the character is found', async () => {
    const name = 'Alrik';
    const stats = testImport.stats;
    const userId = '1234';

    const response = await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin(userId))
        .send({
            name, stats
        })
        expect(201);

    const characterResponse = await request(app)
        .get(`/api/characters/${response.body.id}`)
        .set('Cookie', global.signin(userId))
        .send()
        .expect(200);
    
    expect(characterResponse.body.name).toEqual(name);
    // stats no longer shown on the character model
    // expect(characterResponse.body.stats).toEqual(stats);
});