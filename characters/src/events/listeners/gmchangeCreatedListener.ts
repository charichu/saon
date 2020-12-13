import { GMChangeCreatedEvent, Listener, Subjects } from '@chasaon/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Character } from '../../models/character';
import { CharacterUpdatedPublisher } from '../publishers/characterUpdatedPublisher';

export class GMChangeCreatedListener extends Listener<GMChangeCreatedEvent> {
    subject: Subjects.GMChangeCreated = Subjects.GMChangeCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: GMChangeCreatedEvent['data'], msg: Message){
        // Find reserved char
        const character = await Character.findById(data.character.id);
        // no char, throw error
        if(!character){
            throw new Error('No reserved Char found');
        }
        // mark char as reserved
        character.set({gmchangeId: data.id});
        // save char
        await character.save();
        new CharacterUpdatedPublisher(this.client).publish({
            //@ts-ignore
            id: character.id,
            name: character.name,
            stats: character.stats,
            userId: character.userId,
            version: character.version,
            gmchangeId: character.gmchangeId
        });

        // ack message
        msg.ack();
    }
}