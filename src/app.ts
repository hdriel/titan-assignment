import express, { Express, NextFunction, Response, Request } from 'express';
import { json, urlencoded } from 'body-parser';
import { initAppRoutes } from './routes';

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: true }));

initAppRoutes(app);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ err });
});

export default app;
