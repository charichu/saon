import { Publisher, Subjects, CharacterCreatedEvent } from '@chasaon/common';

export class CharacterCreatedPublisher extends Publisher<CharacterCreatedEvent> {
    subject: Subjects.CharacterCreated = Subjects.CharacterCreated;
}