import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Character } from '../../models/character';
import { natsWrapper } from '../../natsWrapper';

it('returns 404 if char id not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    await request(app)
        .put('/api/characters')  
        .set('Cookie', global.signin())
        .send({ name: 'Alrik', stats: 'strong'})
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/characters/${id}`)
      .send({
        name: 'Alrik',
        stats: 'strong',
      })
      .expect(401);
  });

it('returns 401 if user is not owner', async () => {
    const response = await request(app)
      .post('/api/characters')
      .set('Cookie', global.signin())
      .send({
        name: 'Alrik',
        stats: 'strong',
      });
    await request(app)
      .put(`/api/characters/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
        name: 'Alrik',
        stats: 'weak',
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
        stats: 'strong',
        });
    
        await request(app)
        .put(`/api/characters/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
          name: '',
          stats: 'weak'
        })
        .expect(400);

        await request(app)
            .put(`/api/characters/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                stats: 'weak'
            })
            .expect(400);

        await request(app)
            .put(`/api/characters/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                name: ''
            })
            .expect(400);
        
});

it('returns 400 if invalid params provided', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/characters')
        .set('Cookie', cookie)
        .send({
        name: 'Alrik',
        stats: 'strong',
        });
    
    await request(app)
        .put(`/api/characters/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
          name: 'Alrik',
          stats: 'stronger'
        })
        .expect(200);

    const characterResponse = await request(app)
        .get(`/api/characters/${response.body.id}`)
        .send();
    
    expect(characterResponse.body.stats).toEqual('stronger');                
});

it('publishes an event', async () => {
  const cookie = global.signin();
  const response = await request(app)
      .post('/api/characters')
      .set('Cookie', cookie)
      .send({
      name: 'Alrik',
      stats: 'strong',
      });
  
  await request(app)
      .put(`/api/characters/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        name: 'Alrik',
        stats: 'stronger'
      })
      .expect(200);
  
  expect(natsWrapper.client.publish).toHaveBeenCalled();

})

it('rejects updates if char is reserved', async () => {
  
  const cookie = global.signin();
  const response = await request(app)
      .post('/api/characters')
      .set('Cookie', cookie)
      .send({
      name: 'Alrik',
      stats: 'strong',
      });

  const character = await Character.findById(response.body.id);
  character!.set({ gmchangeId: mongoose.Types.ObjectId().toHexString() });
  await character!.save();
  
  await request(app)
      .put(`/api/characters/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        name: 'Alrik',
        stats: 'stronger'
      })
      .expect(400);

})