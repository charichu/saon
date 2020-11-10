import { Publisher, Subjects, PaymentCreatedEvent } from '@chasaon/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}