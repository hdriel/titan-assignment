import { Request, Response, Router } from 'express';
import { logAPI } from '../middleware';

export const router: Router = Router();

router.use(logAPI());

router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: true });
});

router.get('/', (_req: Request, res: Response) => {
    res.status(200).send('Hello TITAN!');
});
