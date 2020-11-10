import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { Character } from '../models/character';
import { GMChange, GMChangeStatus } from '../models/gmchanges';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@chasaon/common';
import { GMChangeCancelledPublisher } from '../events/publishers/gmchangeCancelledPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.delete('/api/gmchanges/:gmchangeId',requireAuth, async (req: Request, res: Response) => {
    const {gmchangeId} = req.params;

    const gmchange = await GMChange.findById(gmchangeId).populate('character');

    if(!gmchange){
        throw new NotFoundError();
    }
    if(gmchange.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    gmchange.status = GMChangeStatus.Cancelled;
    await gmchange.save()

    // PUBLISH CANCEL EVENT
    new GMChangeCancelledPublisher(natsWrapper.client).publish({
        id: gmchange.id,
        version: gmchange.version,
        character: {
            id: gmchange.character.id
        },
    });
    res.status(204).send(gmchange);
});

export {router as deleteGMChangesRouter } 