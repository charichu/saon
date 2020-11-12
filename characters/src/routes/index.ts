import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { Character } from '../models/character';
import {requireAuth, validateRequest, NotFoundError, NotAuthorizedError, BadRequestError} from '@chasaon/common';

const router = express.Router();

router.get('/api/characters', requireAuth, async (req: Request, res: Response) => {
   const characters = await Character.find({userId: req.currentUser!.id});

    res.send(characters);
});

export {router as indexCharacterRouter } 