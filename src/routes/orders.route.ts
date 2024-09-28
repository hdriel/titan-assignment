import { Router } from 'express';
import { asyncHandlerWrapper, logApiMW } from '../middleware';
import { getOrdersCtrl, createOrderCtrl } from '../controllers/orders.controller';

export const router: Router = Router();

router.use(logApiMW());

router.get('/:userId', asyncHandlerWrapper(getOrdersCtrl));

router.post('/', asyncHandlerWrapper(createOrderCtrl));
