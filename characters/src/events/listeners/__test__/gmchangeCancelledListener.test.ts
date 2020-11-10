import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { GMChangeCancelledEvent } from '@chasaon/common';
import { natsWrapper } from '../../../natsWrapper';
import { GMChangeCancelledListener } from '../gmchangeCancelledListener';
import { Character } from '../../../models/character';

const setup = async () => {
  const listener = new GMChangeCancelledListener(natsWrapper.client);

  const gmchangeId = mongoose.Types.ObjectId().toHexString();
  const character = Character.build({
    name: 'Calrik',
    stats: 'KO: 19',
    userId: 'asdf',
  });
  character.set({ gmchangeId });
  await character.save();

  const data: GMChangeCancelledEvent['data'] = {
    id: gmchangeId,
    version: 0,
    character: {
      id: character.id
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, character, gmchangeId, listener };
};

it('updates the char, publishes an event, and acks the message', async () => {
  const { msg, data, character, gmchangeId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedCharacter = await Character.findById(character.id);
  console.log(data);
  console.log('Character: ', character);
  console.log('Updatedcharcter: ', updatedCharacter);
  expect(updatedCharacter!.gmchangeId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
