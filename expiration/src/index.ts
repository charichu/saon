import { natsWrapper} from './natsWrapper';
import { GMChangeCreatedListener } from '../src/events/listeners/gmchangeCreatedListener';

const start = async () => {
    console.log('Starting...');
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }
         

    try {
      console.log('try');
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
      natsWrapper.client.on('close', () => {
        console.log('NATS connection closed!!');
        process.exit();
      });
      process.on('SIGINT', () => natsWrapper.client.close());
      process.on('SIGTERM', () => natsWrapper.client.close());

      new GMChangeCreatedListener(natsWrapper.client).listen();

    } catch (err) {
      console.error(err);
    }
  };
  
  start();  