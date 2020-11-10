import { Message } from 'node-nats-streaming';
import { Listener, GMChangeCreatedEvent, Subjects } from '@chasaon/common';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<GMChangeCreatedEvent> {
  subject: Subjects.GMChangeCreated = Subjects.GMChangeCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: GMChangeCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.character.name,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}