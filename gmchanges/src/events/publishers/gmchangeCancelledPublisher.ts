import { Publisher, GMChangeCancelledEvent, Subjects} from '@chasaon/common';

export class GMChangeCancelledPublisher extends Publisher<GMChangeCancelledEvent>{
    subject: Subjects.GMChangeCancelled = Subjects.GMChangeCancelled;
};