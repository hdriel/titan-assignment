import express, { ErrorRequestHandler, Express, NextFunction, Response, Request } from 'express';
import { json, urlencoded } from 'body-parser';
import { initAppRoutes } from './routes';
import { initSwagger } from './swagger';
import { PUBLIC_DIR_PATH } from './consts/paths';

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR_PATH));

initAppRoutes(app);

app.use((err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ err });
});

initSwagger(app);

export default app;
