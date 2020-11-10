import { Message } from 'node-nats-streaming';
import { Subjects, Listener, CharacterCreatedEvent } from '@chasaon/common';
import { Character } from '../../models/character';
import {queueGroupName} from './queueGroupName';

export class CharacterCreatedListener extends Listener<CharacterCreatedEvent> {
    subject: Subjects.CharacterCreated = Subjects.CharacterCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: CharacterCreatedEvent['data'], msg: Message){
        const { id, name, stats } = data;
        const character = Character.build({
            id,
            name,
            stats
        });
        await character.save();

        msg.ack();
    }
}