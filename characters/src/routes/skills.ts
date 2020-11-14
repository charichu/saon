import express, { Request, Response} from 'express';
import { skillCheck } from '../helper/skillCheck';

const router = express.Router();

router.post('/api/characters/skill/:id', async (req: Request, res: Response) => {

    console.log('Router is running');
    
    let id = req.params.id;

    if(req.body.discordId){
       id = req.body.discordId
    }

    const response = await skillCheck(req.params.id, req.body.talent, id);

    const attr = response.slice(1, 4);
    const taw = response.slice(0,1);

    const skillresponse = {
        attr,
        taw,
        mod: 0,
    }
  
    res.status(200).send(skillresponse);
});

export {router as skillsCharacterRouter } 