import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { Character } from '../models/character';

const router = express.Router();

router.get('/api/characters', async (req: Request, res: Response) => {
    const characters = await Character.find({});

    res.send(characters);
});

export {router as indexCharacterRouter } 