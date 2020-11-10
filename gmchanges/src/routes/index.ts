import { GMChangeStatus, requireAuth } from '@chasaon/common';
import express, { Request, Response} from 'express';
import { GMChange } from '../models/gmchanges';

const router = express.Router();

router.get('/api/gmchanges', requireAuth, async (req: Request, res: Response) => {
    const gmchanges = await GMChange.find({
        userId: req.currentUser!.id
    }).populate('ticket');
    res.send(gmchanges);
});

export {router as indexGMChangesRouter } 