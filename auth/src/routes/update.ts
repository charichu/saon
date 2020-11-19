import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import {requireAuth, validateRequest, NotFoundError, NotAuthorizedError, BadRequestError} from '@chasaon/common';
import { User } from '../models/user';

const router = express.Router();

router.put(
    '/api/users/update',
    [
        body('email').not().isEmpty().withMessage('Email required'),
        body('room').not().isEmpty().withMessage('Room is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, room } = req.body;
      const user = await User.findOne({email});
  
      if (!user) {
        throw new NotFoundError();
      }
      if (!room.roomId) {
        throw new BadRequestError('No RoomId given');
      }

      user.rooms.push(room);

      await user.save();

      res.send(user);
    }
);

export { router as updateUserRouter};