import express from 'express';
import 'express-async-errors';
import * as serviceController from '../controller/service.js';

const router = express.Router();
router.use(express.static('./'));

// GET /service
router.get('/', (req, res, next) => {
    res.sendStatus(200);
});

export default router;