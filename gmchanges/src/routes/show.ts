import express, { Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@chasaon/common';
import { body } from 'express-validator';
import { GMChange } from '../models/gmchanges';

const router = express.Router();

router.get('/api/gmchanges/:gmchangeId', requireAuth, async (req: Request, res: Response) => {
    const gmchange = await GMChange.findById(req.params.gmchangeId).populate('ticket');

    if(!gmchange){
        throw new NotFoundError();
    }
    if(gmchange.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    res.send(gmchange);
});

export {router as showGMChangesRouter } 