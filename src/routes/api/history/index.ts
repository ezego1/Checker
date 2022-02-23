import express, { Request, Response } from 'express';
import axios from 'axios';
import {
  getAllHistory, getUniqueName, getUniqueId, getAllHistoryRelation,
} from '../../../controller/history';

const router = express.Router();

router.get('/', getAllHistory);

router.get('/application', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const result = await axios.get(url);
    console.log(result);
    res.status(200).json({
      status: result.status,
      data: result.data,
      statusText: result.statusText,
      date: result.headers.date,
    });
  } catch (error) {
    res.status(error.code).json({
      data: error.message,
    });
  }
});

router.get('/unique/:name', getUniqueName);

router.get('/:id', getUniqueId);

router.get('/relations', getAllHistoryRelation);

export default router;
