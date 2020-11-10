import { Publisher } from './basePublisher';
import { CharacterCreatedEvent } from './characterCreatedEvent';
import {Subjects} from './subjects';

export class CharacterCreatedPublisher extends Publisher<CharacterCreatedEvent>{
    subject: Subjects.CharacterCreated = Subjects.CharacterCreated;
}