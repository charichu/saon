import express, { Request, Response} from 'express';
import { Character } from '../models/character';
import {NotFoundError} from '@chasaon/common';

const router = express.Router();

router.get('/api/characters/:id', async (req: Request, res: Response) => {
  const character = await Character.findById(req.params.id);

  if (!character) {
    throw new NotFoundError();
  }

  res.send(character);
});

export { router as showCharacterRouter };