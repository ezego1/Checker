import express from 'express';
import serverRoute from './server';
import appRoute from './app';
import historyRoute from './history';
import healthRoute from './health';

const router = express.Router();

router.use('/server', serverRoute);
router.use('/application', appRoute);
router.use('/history', historyRoute);
router.use('/ping', healthRoute);

export default router;
