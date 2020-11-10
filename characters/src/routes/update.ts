import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {requireAuth, validateRequest, NotFoundError, NotAuthorizedError, BadRequestError} from '@chasaon/common';
import { Character } from '../models/character';
import {CharacterUpdatedPublisher} from '../events/publishers/characterUpdatedPublisher';
import {natsWrapper} from '../natsWrapper';

const router = express.Router();

router.put(
    '/api/characters/:id',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name required'),
        body('stats').not().isEmpty().withMessage('Stats required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const character = await Character.findById(req.params.id);
  
      if (!character) {
        throw new NotFoundError();
      }

      if(character.gmchangeId){
        throw new BadRequestError('Char is reserved');
      }

      if(character.userId !== req.currentUser!.id){
          throw new NotAuthorizedError();
      }

      character.set({
          name: req.body.name,
          stats: req.body.stats
      });
      await character.save();

      new CharacterUpdatedPublisher(natsWrapper.client).publish({
        id: character.id,
        version: character.version,
        name: character.name,
        stats: character.stats,
        userId: character.userId
      });

      res.send(character);
    }
);

export { router as updateCharacterRouter};