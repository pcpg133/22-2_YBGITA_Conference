import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as mainController from '../controller/main.js';

const router = express.Router();
router.use(express.static('./'));

const validateCredential = [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('username should not be empty'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password should not be empty'),
    validate,
];

// GET /login?username=:username&password=:password
router.get('/', mainController.login);

// POST /login
router.post('/', mainController.loginPost);

router.get('/nickname', mainController.getNickname);

router.post('/building', mainController.getBuilding);

router.get('/find', mainController.findBuilding);

export default router;

