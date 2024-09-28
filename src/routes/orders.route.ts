import { Request, Response, Router } from 'express';
import { logApiMW } from '../middleware';

export const router: Router = Router();

router.use(logApiMW());

router.get('/:userId', (_req: Request, res: Response) => {
    res.status(200).json({ status: true });
});

router.post('/', (_req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});
