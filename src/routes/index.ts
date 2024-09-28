import { Express } from 'express';
import { router as mainRouter } from './main.route';

export const initAppRoutes = (app: Express) => {
    app.use('/', mainRouter);
};
