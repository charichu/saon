import express, { Request, Response} from 'express';
import { skillCheck } from '../helper/skillCheck';
import { Character } from '../models/character';

const router = express.Router();

router.post('/api/characters/skill', async (req: Request, res: Response) => {
    
    if(req.body.characterId){
        const character = await Character.findById(req.body.characterId);
        const response = await skillCheck(character, req.body.talent);
        res.status(200).send(response);
    } else if(req.body.discordId) {
        const character = await Character.findOne({discordId: req.body.discordId});
        const response = await skillCheck(character, req.body.talent);
        res.status(200).send(response);
    } else {
        res.status(400).send('No id given');
    }
});

export {router as skillsCharacterRouter } 