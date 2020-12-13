import { GMChangeCancelledEvent, Listener, Subjects } from '@chasaon/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Character } from '../../models/character';
import { CharacterUpdatedPublisher } from '../publishers/characterUpdatedPublisher';
import mongoose from 'mongoose';

export class GMChangeCancelledListener extends Listener<GMChangeCancelledEvent> {
    subject: Subjects.GMChangeCancelled = Subjects.GMChangeCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: GMChangeCancelledEvent['data'], msg: Message){
        const character = await Character.findById(data.character.id);
        
        if(!character){
            throw new Error('Char not found!');
        }

        character.set({ gmchangeId: undefined });
        await character.save();
        await new CharacterUpdatedPublisher(this.client).publish({
            //@ts-ignore
            id: character.id,
            gmchangeId: character.gmchangeId,
            name: character.name,
            stats: character.stats,
            version: character.version,
            userId: character.userId
        });
        
        msg.ack();
    }
}