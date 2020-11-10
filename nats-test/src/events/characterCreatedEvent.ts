import { Subjects } from './subjects';

export interface CharacterCreatedEvent {
    subject: Subjects.CharacterCreated;
    data: {
        id: string,
        name: string,
        stats: string
    };
}