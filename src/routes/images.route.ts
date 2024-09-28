import { Router } from 'express';
import { asyncHandlerWrapper, logApiMW } from '../middleware';
import { getImageCtrl } from '../controllers/images.controller';

export const router: Router = Router();

router.use(logApiMW());

router.get('/:total', asyncHandlerWrapper(getImageCtrl));
