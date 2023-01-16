import express from 'express';
import 'express-async-errors';
import * as cafeteriaController from '../controller/cafeteria.js';

const router = express.Router();
router.use(express.static('./'));

// GET /cafeteria
router.get('/', cafeteriaController.getCafeteria);

export default router;