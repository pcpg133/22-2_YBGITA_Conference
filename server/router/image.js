import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as imageController from '../controller/image.js';

const router = express.Router();
router.use(express.static('./'));

// GET /image/imagelist
router.post('/imagelist', imageController.getImageList);

// POST /image/result
router.post('/result', imageController.getStoreList);

// GET /image/detail?storename=:storename
router.get('/detail', imageController.getStoreDetail);

// GET /image/random
router.get('/random', imageController.getRandomStore);

export default router;
