import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import dotenv from 'dotenv';
import path from 'path';
import smartRoute from './routes';
import DBConnect from './db/db';

dotenv.config();

DBConnect();

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/v1', smartRoute);

app.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new createError.NotFound('This route does not exit!'));
});

app.use(
  (
    error: { message: string; status: number },
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.status(error.status || 500);
    res.json({
      status: 'error',
      message: error.message,
    });
    next();
  },
);

export default app;
