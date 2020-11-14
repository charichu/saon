import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';
import { testImport } from '../../test/testImport';

const userId = '123';
const name = 'Alrik';
const stats = testImport.stats;

it('returns 200 and response contains all stats', async () => {
    const response = await request(app)
        .post('/api/characters')
        .set('Cookie', global.signin(userId))
        .send({
            name,
            stats
        })
        .expect(201);

    const skillCheck = await request(app)
        .post(`/api/characters/skill/${response.body.id}`)
        .set('Cookie', global.signin(userId))
        .send({
            talent: 'Geography'
        })
        .expect(200);

        expect(skillCheck.body.attr[0]).toEqual(14);
        expect(skillCheck.body.attr[1]).toEqual(14);
        expect(skillCheck.body.attr[2]).toEqual(13);
        expect(skillCheck.body.taw).toEqual(2);
        expect(skillCheck.body.mod).toEqual(0);
});