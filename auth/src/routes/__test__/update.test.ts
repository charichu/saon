import request from 'supertest';
import {app} from '../../app';

it('returns a 404 if no user found', async () => {    
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
    await request(app)
        .put('/api/users/update')
        .send({
            email: 'test.com',
            room: { name: "Alrik", roomId: "testId"}
        })
        .expect(404);   
});

it('returns a 400 if no roomId is given', async () => {    
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
    await request(app)
        .put('/api/users/update')
        .send({
            email: 'test@test.com',
            room: { name: "Alrik"}
        })
        .expect(400);   
});

it('successfully added the room to the user', async () => {    
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
    const response = await request(app)
        .put('/api/users/update')
        .send({
            email: 'test@test.com',
            room: { name: "Alrik", roomId: "roomId"}
        })
        .expect(200); 
        
    expect(response.body.rooms[0].roomId).toEqual('roomId');
    expect(response.body.rooms[0].name).toEqual('Alrik');
});