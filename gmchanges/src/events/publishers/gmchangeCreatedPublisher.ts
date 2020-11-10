import { Publisher, GMChangeCreatedEvent, Subjects} from '@chasaon/common';

export class GMChangeCreatedPublisher extends Publisher<GMChangeCreatedEvent>{
    subject: Subjects.GMChangeCreated = Subjects.GMChangeCreated;
};