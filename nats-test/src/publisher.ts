import nats from 'node-nats-streaming';
import { CharacterCreatedListener } from './events/characterCreatedListener';
import { CharacterCreatedPublisher } from './events/characterCreatedPublisher';

console.clear();

const stan = nats.connect('saon', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected');

    const publisher = new CharacterCreatedPublisher(stan);
    
    try 
        {await publisher.publish({
            id: '123',
            name: 'Alrik',
            stats: 'test'
        });
    } catch (err) {
        console.error(err);
    }

    // const data = JSON.stringify({
    //     id: '123',
    //     name: 'Alrik',
    //     stats: 'strong'
    // });

    // stan.publish('character:created', data, () => {
    //     console.log('Event character:created published');
    // });
});