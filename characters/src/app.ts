import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError, currentUser} from '@chasaon/common';
import { createCharacterRouter} from './routes/new';
import { showCharacterRouter} from './routes/show';
import { indexCharacterRouter} from './routes/index';
import { updateCharacterRouter} from './routes/update';
import { skillsCharacterRouter } from './routes/skills';

const app = express();
app.set('trust proxy', true);
app.use(json({limit: 10000000}));
app.use(
    cookieSession({
        signed: false,
        //secure: process.env.NODE_ENV !== 'test'
        secure: false
    })
);

app.use(currentUser);

app.use(createCharacterRouter);
app.use(showCharacterRouter);
app.use(indexCharacterRouter);
app.use(updateCharacterRouter);
app.use(skillsCharacterRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };