import { Message } from 'node-nats-streaming';
import { Listener, GMChangeCancelledEvent, Subjects, GMChangeStatus } from '@chasaon/common';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<GMChangeCancelledEvent> {
  subject: Subjects.GMChangeCancelled = Subjects.GMChangeCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: GMChangeCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
        _id: data.id,
        version: data.version -1
    });

    if(!order){
        throw new Error('Order not found');
    }
    order.set({status: GMChangeStatus.Cancelled})
    await order.save();

    msg.ack();
  }
}