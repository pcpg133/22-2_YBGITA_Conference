import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as categoryController from '../controller/category.js';

const router = express.Router();
router.use(express.static('./'));

// GET /category/label?label:=labelname
router.post('/label', categoryController.getLabel);

// GET /category/mc?Mcategory:=Mcategory
router.post('/Mcategory', categoryController.getMcategory);

router.get('/Mcategory/get', categoryController.getMcategoryGet);

// GET /category/sc?Scategory:=Scategory
router.post('/Scategory', categoryController.getScategory);

// GET /category/result
router.get('/result', categoryController.getStoreList);

router.get('/result/list', categoryController.getStoreListGet)

// GET /category/detail?storename=:storename
router.post('/detail', categoryController.setName);

router.get('/detail/name', categoryController.getStoreDetail);

// GET /category/random
router.get('/random', categoryController.getRandomStore);

export default router;
