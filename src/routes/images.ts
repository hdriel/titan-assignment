import { Request, Response, Router } from 'express';
import { logAPI } from '../middleware';

export const router: Router = Router();

router.use(logAPI());

router.get('/:total-images', (_req: Request, res: Response) => {
    res.status(200).json({ status: true });
});
