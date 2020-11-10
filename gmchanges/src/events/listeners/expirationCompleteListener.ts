import { Listener, Subjects, ExpirationCompleteEvent, GMChangeStatus } from '@chasaon/common';
import {queueGroupName} from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { GMChange } from '../../models/gmchanges';
import { check } from 'express-validator';
import { GMChangeCancelledPublisher } from '../publishers/gmchangeCancelledPublisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const gmchange = await GMChange.findById(data.gmchangeId).populate('character'); 

        if(!gmchange){
            throw new Error('No GMCHANGE found');
        }

        if(gmchange.status === GMChangeStatus.Complete){
            return msg.ack();
        }

        gmchange.set({
            status: GMChangeStatus.Cancelled,
        });

        await gmchange.save();

        await new GMChangeCancelledPublisher(this.client).publish({
            id: gmchange.id,
            version: gmchange.version,
            character: {
                id: gmchange.character.id,
            },
        });

        msg.ack();
    };
}