import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { GMChange, GMChangeStatus } from '../../models/gmchanges';
import { Character } from '../../models/character';
import { natsWrapper } from '../../natsWrapper';

it('returns an error if the character does not exist', async () => {
  const characterId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/gmchanges')
    .set('Cookie', global.signin())
    .send({ characterId })
    .expect(404);
});

it('returns an error if the character is already reserved', async () => {
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'einsamer Wanderer',
  });
  await character.save();
  const gmchange = GMChange.build({
    character,
    userId: 'laskdflkajsdf',
    status: GMChangeStatus.Created,
    expiresAt: new Date(),
  });
  await gmchange.save();

  await request(app)
    .post('/api/gmchanges')
    .set('Cookie', global.signin())
    .send({ characterId: character.id })
    .expect(400);
});

it('reserves a character', async () => {
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'Einsamer Wanderer',
  });
  await character.save();

  await request(app)
    .post('/api/gmchanges')
    .set('Cookie', global.signin())
    .send({ characterId: character.id })
    .expect(201);
});

it('emits an gmchange event', async () => {
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'Einsamer Wanderer',
  });
  await character.save();

  await request(app)
    .post('/api/gmchanges')
    .set('Cookie', global.signin())
    .send({ characterId: character.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});