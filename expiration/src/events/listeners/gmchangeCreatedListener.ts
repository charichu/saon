import { GMChangeCreatedEvent, Listener, Subjects } from  '@chasaon/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { expirationQueue } from '../../queues/expirationQueue';

export class GMChangeCreatedListener extends Listener<GMChangeCreatedEvent> {
    subject: Subjects.GMChangeCreated = Subjects.GMChangeCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: GMChangeCreatedEvent['data'], msg: Message){
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many miliseconds to process the job:', delay);

        await expirationQueue.add({
            gmchangeId: data.id
        }, {
            delay,
        });
        msg.ack();
    }
}