import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { CharacterCreatedListener } from './events/characterCreatedListener';

console.clear();

const stan = nats.connect('saon', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('listener connected');

    stan.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    });

    new CharacterCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());