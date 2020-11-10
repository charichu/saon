import { Subjects, Publisher, ExpirationCompleteEvent } from '@chasaon/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}