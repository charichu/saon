import { Listener } from '../../../common/src/events/baseListener';
import nats, { Message } from 'node-nats-streaming';
import {CharacterCreatedEvent} from './characterCreatedEvent';
import {Subjects} from './subjects';

export class CharacterCreatedListener extends Listener<CharacterCreatedEvent> {
    readonly subject: Subjects.CharacterCreated = Subjects.CharacterCreated;
    queueGroupName = 'editor-servic';

    onMessage(data: CharacterCreatedEvent['data'], msg: Message){
        console.log('event data: ', data);
        msg.ack();
    }
}