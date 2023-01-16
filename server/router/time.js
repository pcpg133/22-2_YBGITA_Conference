import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as timeController from '../controller/time.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const newFileName = 'schedule.jpeg';
    cb(null, newFileName);
  }
});
const upload = multer({ storage: storage });

const router = express.Router();
router.use(express.static('./'));

// POST /time
router.post('/', timeController.setEmptyTime);

// GET /time
router.get('/', timeController.EmptyTimeCheck);

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
});

export default router;