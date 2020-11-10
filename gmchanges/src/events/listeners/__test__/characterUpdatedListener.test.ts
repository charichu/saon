import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { CharacterUpdatedEvent } from '@chasaon/common';
import { CharacterUpdatedListener } from '../characterUpdatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Character } from '../../../models/character';

const setup = async () => {
  // create an instance of the listener
  const listener = new CharacterUpdatedListener(natsWrapper.client);

  // create and save a char
  const character = Character.build({
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'Alrik',
      stats: 'KO: 11'
  });
  await character.save();

  // create a fake data object
  const data: CharacterUpdatedEvent['data'] = {
      id: character.id,
      version: character.version +1,
      name: 'Balrik',
      stats: 'KO:12',
      userId: '1234'
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, character };
};

it('finds updates and saves a character', async () => {
    const { listener, data, msg, character } = await setup();

    await listener.onMessage(data, msg);

    const updatedCharacter = await Character.findById(character.id);

    expect(updatedCharacter!.name).toEqual(data.name);
    expect(updatedCharacter!.stats).toEqual(data.stats);
    expect(updatedCharacter!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { data, listener, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data,msg);
  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if event has skipped version', async () => {
    const { data, listener, msg } = await setup();

    data.version = 10;
    try{
        await listener.onMessage(data,msg);
    } catch(err) {}

    expect(msg.ack).not.toHaveBeenCalled();
});