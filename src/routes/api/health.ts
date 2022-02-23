import express, { Request, Response } from 'express';
import version from '../../../package.json';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({
    statusText: 'Ok',
    version: version.version,
    date: new Date().toUTCString(),
    statusCode: 200,
  });
});

export default router;
