import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { GMChangeCreatedEvent, GMChangeStatus } from '@chasaon/common';
import { GMChangeCreatedListener } from '../gmchangeCreatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Character } from '../../../models/character';

const setup = async () => {
  // Create an instance of the listener
  const listener = new GMChangeCreatedListener(natsWrapper.client);

  // Create and save a char
  const character = Character.build({
    name: 'Alrik',
    stats: 'KO: 12',
    userId: 'asdf',
  });
  await character.save();

  // Create the fake data event
  const data: GMChangeCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: GMChangeStatus.Created,
    userId: 'alskdfj',
    expiresAt: 'alskdjf',
    character: {
      id: character.id,
      name: character.name,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, character, data, msg };
};

it('sets userId of the char', async () => {
    const { listener, character, data, msg } = await setup();
    await listener.onMessage(data, msg);
    const updatedCharacter = await Character.findById(character.id);

    expect(updatedCharacter!.gmchangeId).toEqual(data.id);
})

it('acks the message', async () => {
    const { listener, character, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();    
})

it('publishes a char updated event', async () => {  
  const { listener, character, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const characterUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  expect(characterUpdatedData.gmchangeId).toEqual(data.id);
})