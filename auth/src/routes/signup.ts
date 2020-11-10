import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@chasaon/common';

const router = express.Router();

router.post('/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Email not valid'),
        body('password')
            .trim()
            .isLength({min: 4})
            .withMessage('Password too short')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email,password } = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password});
        await user.save();

        //generate jwt
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
            }, 
            process.env.JWT_KEY!
        );

        //store it on session obj
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
});

export { router as signupRouter };