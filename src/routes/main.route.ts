import { Request, Response, Router } from 'express';
import { logApiMW } from '../middleware';

export const router: Router = Router();

router.use(logApiMW());

/**
 * @swagger
 *   /health:
 *   get:
 *     tags: ['Main operations']
 *     summary: Retrieve health status
 *     description: Fetch a health status OK for server is up
 *     responses:
 *       200:
 *         description: A health status
 */
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: true });
});

/**
 * @swagger
 *   /:
 *   get:
 *     tags: ['Main operations']
 *     summary: Retrieve 'hello' greetings
 *     description: get 'Hello TITAN!' message
 *     responses:
 *       200:
 *         description: 'Hello TITAN!'
 */
router.get('/', (_req: Request, res: Response) => {
    res.status(200).send('Hello TITAN!');
});
