import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {requireAuth, validateRequest} from '@chasaon/common';
import { Character } from '../models/character';
import { CharacterCreatedPublisher } from '../events/publishers/characterCreatedPublisher';
import {natsWrapper} from '../natsWrapper';
import { optoImport } from '../helper/optoImporter';

const router = express.Router();
router.post('/api/characters', requireAuth, [
        body('name').not().isEmpty().withMessage('name is required'),
        body('stats').not().isEmpty().withMessage('stats are required')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { name, stats, discordId } = req.body;

        const characterId = await optoImport(stats, req.currentUser!.id, name, discordId);
        
        res.status(201).send(characterId);
    }
);

export { router as createCharacterRouter}