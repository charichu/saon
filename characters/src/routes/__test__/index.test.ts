import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';
import { testImport } from '../../test/testImport';

it('returns 404 if char not found', async () => {
    
    const stats = testImport.stats;
    
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin('1234'))
        .send({ name: 'Alrik', stats});
    
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin('1234'))
        .send({ name: 'Balrik', stats});
        
    await request(app)
        .post('/api/characters')  
        .set('Cookie', global.signin('1234'))
        .send({ name: 'Calrik', stats}); 

    const response = await request(app)
        .get('/api/characters') 
        .set('Cookie', global.signin('1234'))
        .send()
        .expect(200);
    expect(response.body.length).toEqual(3);
    
    const response1 = await request(app)
        .get('/api/characters') 
        .set('Cookie', global.signin())
        .send()
        .expect(200);
    expect(response1.body.length).toEqual(0);
});