import { Router } from 'express';
import * as apiController from '../controllers/apiController';
import auth from '../controllers/auth';
const router = Router();

router.get('/categories', apiController.categories);
router.get('/products', apiController.products);
// router.get('/cat', apiController.createCategories);
// router.get('/prod', apiController.createProducts);
router.post('/auth/signup', apiController.signUp);
router.post('/auth/login', apiController.login);
router.post('/auth/newProfile', auth, apiController.newProfile);
router.post('/address', apiController.address);
router.post('/newOrder', apiController.newOrder);
router.post('/orders', auth, apiController.orders);
router.post('/payments', auth, apiController.stripePayment);

export default router;
