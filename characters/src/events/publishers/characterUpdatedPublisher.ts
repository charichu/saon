import { Publisher, Subjects, CharacterUpdatedEvent } from '@chasaon/common';

export class CharacterUpdatedPublisher extends Publisher<CharacterUpdatedEvent> {
    subject: Subjects.CharacterUpdated = Subjects.CharacterUpdated;
}