import express from 'express';
import {
  updateServer,
  serverSwitch,
  createServer,
  getAllServers,
  getAllActiveOrInactiveServer,
  findByName,
} from '../../../controller/server';

const router = express.Router();

router.get('/', getAllServers);

router.get('/active', getAllActiveOrInactiveServer);

router.get('/:name', findByName);

router.post('/', createServer);

router.patch('/:id', serverSwitch);

router.put('/:id', updateServer);

export default router;
