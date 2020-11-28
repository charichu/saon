import express, { Request, Response} from 'express';
import { Character } from '../models/character';
import {NotAuthorizedError, NotFoundError, requireAuth, validateRequest} from '@chasaon/common';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/characters/:id/avatar', async (req: Request, res: Response) => {
  const character = await Character.findById(req.params.id);

  if (!character) {
    throw new NotFoundError();
  }

  const avatar = character.avatar;

  const output = {
      name: character?.name,
      characterId: character?.id,
      avatar: avatar
  }


  res.send(output);
});

router.put('/api/characters/:id/avatar',requireAuth, 
        [
            body('name').not().isEmpty().withMessage('Name required'),
            body('avatar').not().isEmpty().withMessage('New Avatar required'),
        ], validateRequest,
        async (req: Request, res: Response) => {
    
            const character = await Character.findById(req.params.id);
        
            if (!character) {
            throw new NotFoundError();
            }

            if(character.userId !== req.currentUser!.id){
                throw new NotAuthorizedError();
            }
        
            const avatar = character.avatar;
        
            const output = {
                name: character?.name,
                characterId: character?.id,
                avatar: avatar
            }

            character.set({
                avatar: req.body.avatar
            });

            await character.save();
        
            res.send(output);
  });

export { router as avatarCharacterRouter };