import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {BadRequestError, requireAuth, validateRequest} from '@chasaon/common';
import { optoImport } from '../helper/optoImporter';
import mongoose from 'mongoose';

const router = express.Router();
router.post('/api/characters', requireAuth, [
        body('name').not().isEmpty().withMessage('name is required'),
        body('stats').not().isEmpty().withMessage('stats are required')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { name, stats, discordId } = req.body;
        
        const character = await optoImport(stats, req.currentUser!.id, name, discordId);
        
        if(typeof character.id === 'string'){            
            res.status(201).send(character);
        } else {
            throw new BadRequestError('JSON does not match Optolith Export');
        }
    }
);

export { router as createCharacterRouter}