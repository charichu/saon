import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';

it('fetches the order', async () => {
  // Create a char
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'Einsamer Wanderer',
  });
  await character.save();

  const user = global.signin();
  // make a request to build an gmchange with this ticket
  const { body: gmchange } = await request(app)
    .post('/api/gmchanges')
    .set('Cookie', user)
    .send({ characterId: character.id })
    .expect(201);

  // make request to fetch the gmchange
  const { body: fetchedGMChange } = await request(app)
    .get(`/api/gmchanges/${gmchange.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedGMChange.id).toEqual(gmchange.id);
});

it('returns an error if one user tries to fetch another users gmchange', async () => {
  // Create a char
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'Einsamer Wanderer',
  });
  await character.save();

  const user = global.signin();
  // make a request to build an gmchange with this char
  const { body: gmchange } = await request(app)
    .post('/api/gmchanges')
    .set('Cookie', user)
    .send({ characterId: character.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/gmchanges/${gmchange.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
