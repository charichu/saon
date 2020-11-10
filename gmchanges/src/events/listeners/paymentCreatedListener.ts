import { Subjects, Listener, PaymentCreatedEvent, GMChangeStatus } from '@chasaon/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { GMChange } from '../../models/gmchanges';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const gmchange = await GMChange.findById(data.orderId);

        if(!gmchange){
            throw new Error('GMChange not found');
        }
        //Could be broken if someone tries to change completed gmchanges since version is incremented without an event
        gmchange.set({
            status: GMChangeStatus.Complete
        });
        await gmchange.save();

        msg.ack();
    }
};