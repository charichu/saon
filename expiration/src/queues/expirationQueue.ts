import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expirationCompletePublisher';
import {natsWrapper} from '../natsWrapper';

interface Payload {
    gmchangeId: string;

}

const expirationQueue = new Queue<Payload>('gmchange:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        gmchangeId: job.data.gmchangeId,
    });
});

export  { expirationQueue };