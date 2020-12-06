import express, { Request, Response} from 'express';
import { Character } from '../models/character';
import {NotFoundError} from '@chasaon/common';
import { exposeCharacter } from '../helper/exposeCharacter';

const router = express.Router();

router.get('/api/characters/:id', async (req: Request, res: Response) => {
  
  const character = await Character.findById(req.params.id);

  if (!character) {
    throw new NotFoundError();
  }

  try{
  const output = await exposeCharacter(character);

  res.send(output);
  } catch(e){console.log(e)}
});

export { router as showCharacterRouter };