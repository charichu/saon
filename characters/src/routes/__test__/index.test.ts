import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';

it('returns 404 if char not found', async () => {
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin())
        .send({ name: 'Alrik', stats: 'strong'});
    
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin())
        .send({ name: 'Balrik', stats: 'weak'});
        
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin())
        .send({ name: 'Calrik', stats: 'average'}); 

    const response = await request(app)
        .get('/api/characters') 
        .send()
        .expect(200);
    expect(response.body.length).toEqual(3);
});