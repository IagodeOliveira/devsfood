import { Router } from "express";
import * as apiController from '../controllers/apiController';
const router = Router();

router.get('/categories', apiController.categories);
router.get('/products', apiController.products);
router.get('/cat', apiController.createCategories);
router.get('/prod', apiController.createProducts);
router.get('/orders', apiController.orders);
router.post('/auth/signup', apiController.signUp);
router.post('/auth/login', apiController.login);
router.post('/address', apiController.address);
router.post('/newOrder', apiController.newOrder);

export default router;