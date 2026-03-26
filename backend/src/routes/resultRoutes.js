import express from 'express';
import { generateResult } from '../controllers/resultController.js';

const router = express.Router();

router.post('/', generateResult);

export default router;