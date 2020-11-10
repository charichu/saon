import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {requireAuth, validateRequest} from '@chasaon/common';
import { Character } from '../models/character';
import { CharacterCreatedPublisher } from '../events/publishers/characterCreatedPublisher';
import {natsWrapper} from '../natsWrapper';

const router = express.Router();
router.post('/api/characters', requireAuth, [
        body('name').not().isEmpty().withMessage('name is required'),
        body('stats').not().isEmpty().withMessage('stats are required')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { name, stats } = req.body;

        const character = Character.build({
            name,
            stats,
            userId: req.currentUser!.id
        });
        await character.save();

        new CharacterCreatedPublisher(natsWrapper.client).publish({
            id: character.id,
            version: character.version,
            name: character.name,
            stats: character.stats,
            userId: character.userId
        });

        res.status(201).send(character);
    }
);

export { router as createCharacterRouter}