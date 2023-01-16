import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as registerController from '../controller/register.js';

const router = express.Router();
router.use(express.static('./'));

const validateRegister = [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('username should not be empty'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password should not be empty'),
    body('passwordcheck')
      .trim()
      .optional({ nullable: true }),
    body('nickname')
      .trim()
      .notEmpty()
      .withMessage('nickname should not be empty'),
    validate,
];

// POST /register
router.post('/', registerController.registerUser);

export default router;
