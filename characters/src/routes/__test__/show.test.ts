import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';

it('returns 404 if char not found', async () => {
    const res = await request(app)
        .get('/api/characters/shr4hfkjwhf74ff4729119')  
        .send()
        expect(404);
});

it('returns the character if the character is found', async () => {
    const name = 'Alrik';
    const stats = 'stats';

    const response = await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin())
        .send({
            name, stats
        })
        expect(201);

    const characterResponse = await request(app)
        .get(`/api/characters/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(characterResponse.body.name).toEqual(name);
    expect(characterResponse.body.stats).toEqual(stats);
});