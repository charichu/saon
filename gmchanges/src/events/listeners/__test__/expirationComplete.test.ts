import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { ExpirationCompleteEvent, GMChangeStatus } from '@chasaon/common';
import { natsWrapper } from '../../../natsWrapper';
import { Character } from '../../../models/character';
import { GMChange } from '../../../models/gmchanges';
import { ExpirationCompleteListener } from '../expirationCompleteListener';

const setup = async () => {
  // create an instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // create and save a char
  const character = Character.build({
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'Alrik',
      stats: 'KO: 11'
  });
  await character.save();

  const gmchange = GMChange.build({
      userId: 'tgejhf',
      status: GMChangeStatus.Created ,
      expiresAt: new Date(),
      character,
  });
  await gmchange.save();

  // create a fake data object
  const data: ExpirationCompleteEvent['data'] = {
      gmchangeId: gmchange.id
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, character, gmchange };
};

it('updates gmchange status to cancelled', async () => {
    const { listener, data, msg, character, gmchange } = await setup();

    await listener.onMessage(data, msg);

    const updatedGMChange = await GMChange.findById(gmchange.id);
    expect(updatedGMChange!.status).toEqual(GMChangeStatus.Cancelled);
});

it('emit gmchange cancelled event', async () => {
    const { listener, data, msg, character, gmchange } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData.id).toEqual(gmchange.id);
});

it('ack the message', async () => {
    const { listener, data, msg, character, gmchange } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});