import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';
import { GMChange, GMChangeStatus } from '../../models/gmchanges';
import { natsWrapper } from '../../natsWrapper';

it('marks an gmchange as cancelled', async () => {
  // create a char with Character Model
  const character = Character.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'Einsamer Wanderer',
  });
  await character.save();

  const user = global.signin();
  // make a request to create an gmchange
  const { body: gmchange } = await request(app)
    .post('/api/gmchanges')
    .set('Cookie', user)
    .send({ characterId: character.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/gmchanges/${gmchange.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedGMChange = await GMChange.findById(gmchange.id);

  expect(updatedGMChange!.status).toEqual(GMChangeStatus.Cancelled);
});

it('emits a gmchange cancelled event', async () => {
    // create a char with Character Model
    const character = Character.build({
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'Alrik',
      stats: 'Einsamer Wanderer',
    });
    await character.save();
  
    const user = global.signin();
    // make a request to create an gmchange
    const { body: gmchange } = await request(app)
      .post('/api/gmchanges')
      .set('Cookie', user)
      .send({ characterId: character.id })
      .expect(201);
  
    // make a request to cancel the order
    await request(app)
      .delete(`/api/gmchanges/${gmchange.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);
  
    // expectation to make sure the thing is cancelled
    const updatedGMChange = await GMChange.findById(gmchange.id);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
