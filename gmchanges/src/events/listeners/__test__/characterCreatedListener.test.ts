import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { CharacterCreatedEvent } from '@chasaon/common';
import { CharacterCreatedListener } from '../characterCreatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Character } from '../../../models/character';

const setup = async () => {
  // create an instance of the listener
  const listener = new CharacterCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: CharacterCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    name: 'Alrik',
    stats: 'MU:12',
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a character', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a char was created!
  const character = await Character.findById(data.id);

  expect(character).toBeDefined();
  expect(character!.name).toEqual(data.name);
  expect(character!.stats).toEqual(data.stats);
});

it('acks the message', async () => {
    const { data, listener, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data,msg);
  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
