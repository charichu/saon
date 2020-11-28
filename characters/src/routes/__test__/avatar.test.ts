import request from 'supertest';
import { app } from '../../app';
import { defaultAvatar } from '../../data/defaultAvatar';
import { testImport } from '../../test/testImport';
import mongoose from 'mongoose';


const stats = testImport.stats;

it('returns 404 if char not found', async () => {
    const res = await request(app)
        .get('/api/characters/shr4hfkjwhf74ff4729119/avatar')  
        .send()
        expect(404);
});

it('returns the avatar if the character is found', async () => {
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
        .get(`/api/characters/${response.body.id}/avatar`)
        .set('Cookie', global.signin(userId))
        .send()
        .expect(200);
        
    expect(characterResponse.body.name).toEqual(name);
    
    expect(characterResponse.body.avatar).toEqual(defaultAvatar);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/characters/${id}/avatar`)
      .send({
        name: 'Alrik',
        stats,
      })
      .expect(401);
  });

it('returns 401 if user is not owner', async () => {
    const response = await request(app)
      .post('/api/characters')
      .set('Cookie', global.signin())
      .send({
        name: 'Alrik',
        stats,
      });
    await request(app)
      .put(`/api/characters/${response.body.id}/avatar`)
      .set('Cookie', global.signin())
      .send({
        name: 'Alrik',
        avatar: defaultAvatar,
      })
      .expect(401);
});

it('returns 400 if invalid params provided', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/characters')
        .set('Cookie', cookie)
        .send({
        name: 'Alrik',
        stats,
        });
    
        await request(app)
        .put(`/api/characters/${response.body.id}/avatar`)
        .set('Cookie', cookie)
        .send({
          name: '',
          stats: 'weak'
        })
        .expect(400);

        await request(app)
            .put(`/api/characters/${response.body.id}/avatar`)
            .set('Cookie', cookie)
            .send({
                stats: 'weak'
            })
            .expect(400);

        await request(app)
            .put(`/api/characters/${response.body.id}/avatar`)
            .set('Cookie', cookie)
            .send({
                name: ''
            })
            .expect(400);
        
});

it('update avatar is successfull', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/characters')
        .set('Cookie', cookie)
        .send({
        name: 'Alrik',
        stats
        })
        .expect(201);
    
    await request(app)
        .put(`/api/characters/${response.body.id}/avatar`)
        .set('Cookie', cookie)
        .send({
          name: 'Alrik',
          avatar: 'newAvatar'
        })
        .expect(200);

    const characterResponse = await request(app)
        .get(`/api/characters/${response.body.id}/avatar`)
        .send();
        
    //No real updates possible atm
    //expect(characterResponse.body.stats).toEqual('stronger');
    expect(characterResponse.body.avatar).toEqual('newAvatar');                
});