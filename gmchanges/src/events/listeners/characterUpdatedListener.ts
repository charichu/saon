import { Message } from 'node-nats-streaming';
import { Subjects, Listener, CharacterUpdatedEvent } from '@chasaon/common';
import { Character } from '../../models/character';
import {queueGroupName} from './queueGroupName';

export class CharacterUpdatedListener extends Listener<CharacterUpdatedEvent> {
    subject: Subjects.CharacterUpdated = Subjects.CharacterUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: CharacterUpdatedEvent['data'], msg: Message){
        const character = await Character.findByEvent(data);

        if(!character){
            throw new Error('Char not found');
        }

        const { name, stats } = data;

        character.set({ name, stats })

        await character.save();

        msg.ack();
    }
}