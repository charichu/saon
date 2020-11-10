import request from 'supertest';
import {app} from '../../app';

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);   

    expect(response.get('Set-Cookie')).toBeDefined();
});