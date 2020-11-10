import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError, currentUser} from '@chasaon/common';
import { newGMChangesRouter} from './routes/new';
import { showGMChangesRouter} from './routes/show';
import { indexGMChangesRouter} from './routes/index';
import { deleteGMChangesRouter} from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

app.use(newGMChangesRouter);
app.use(showGMChangesRouter);
app.use(indexGMChangesRouter);
app.use(deleteGMChangesRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };