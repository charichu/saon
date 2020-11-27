import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {BadRequestError, requireAuth, validateRequest} from '@chasaon/common';
import { optoImport } from '../helper/optoImporter';
import mongoose from 'mongoose';

const router = express.Router();
router.post('/api/characters', [
        body('name').not().isEmpty().withMessage('name is required'),
        body('stats').not().isEmpty().withMessage('stats are required')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { name, stats, discordId } = req.body;

        let id = new mongoose.Types.ObjectId().toHexString();

        console.log(id);
        try{
        if(req.currentUser!.id){            
            id = req.currentUser!.id;
        }
    } catch(e){console.log(e);}

        console.log(id);

        const character = await optoImport(stats, id, name, discordId);
        
        if(typeof character.id === 'string'){            
            res.status(201).send(character);
        } else {
            throw new BadRequestError('JSON does not match Optolith Export');
        }
    }
);

export { router as createCharacterRouter}