import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { GMChangeCancelledEvent, GMChangeStatus } from '@chasaon/common';
import { natsWrapper } from '../../../natsWrapper';
import { OrderCancelledListener } from '../orderCancelledListener';
import { Order } from '../../../models/order';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: GMChangeStatus.Created,
    price: '10',
    userId: 'asldkfj',
    version: 0,
  });
  await order.save();

  const data: GMChangeCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    character: {
      id: 'asldkfj',
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('updates the status of the order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(GMChangeStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
