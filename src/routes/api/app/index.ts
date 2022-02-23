import express from 'express';
import {
  getAllApplication, createApplication, applicationSwitch, updateApplication, relation,
  getAllActiveOrInactiveServer,
  findByName,
  checkApplicationEndpoint,
  getAllHistory,
} from '../../../controller/application';
// const createError = require('http-errors');

const router = express.Router();

router.get('/', getAllApplication);

router.get('/history', getAllHistory);

router.get('/active', getAllActiveOrInactiveServer);

router.get('/unique/:name', findByName);

router.get('/:id', relation);

router.post('/', createApplication);

router.post('/smart', checkApplicationEndpoint);

router.patch('/:id', applicationSwitch);

router.put('/:id', updateApplication);

export default router;
