import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, GMChangeStatus, BadRequestError } from '@chasaon/common';
import mongoose from 'mongoose';
import {Character} from '../models/character';
import {GMChange} from '../models/gmchanges';
import { natsWrapper } from '../natsWrapper';
import { GMChangeCreatedPublisher } from '../events/publishers/gmchangeCreatedPublisher';

const router = express.Router();
const EXPPIRATON_WINDOW_SECONDS = 0.5 * 60;

router.post('/api/gmchanges', requireAuth, [
    //EXPECTS REAL MONGODB ID!
    body('characterId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('Character Id must be provided')
], validateRequest, 
async (req: Request, res: Response) => {
    const { characterId } = req.body;

    // Find the Character the user is trying to gmchange in the database
    const character = await Character.findById(characterId);
    if (!character) {
      throw new NotFoundError();
    }

    // Make sure that this Character is not already reserved
    const isReserved = await character.isReserved();

    if(isReserved){
        throw new BadRequestError('Character has outstanding changes');
    }

    // Calculate an expiration date for this gmchange
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPPIRATON_WINDOW_SECONDS);

    // Build the change and save it to the database
    const  gmchange = GMChange.build({
        userId: req.currentUser!.id,
        status: GMChangeStatus.Created,
        expiresAt: expiration,
        character
    });
    await gmchange.save();

    // Publish an event saying that an change was done
    new GMChangeCreatedPublisher(natsWrapper.client).publish({
        id: gmchange.id,
        version: gmchange.version,
        status: gmchange.status,
        userId: gmchange.userId,
        expiresAt: gmchange.expiresAt.toISOString(),
        character: {
            id: character.id,
            name: character.name,
        },
    });
    
    res.status(201).send(gmchange);
});

export {router as newGMChangesRouter } 