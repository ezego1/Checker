import express from 'express';
import apiV1Route from './api';

const router = express.Router();

router.use('/', apiV1Route);

export default router;
