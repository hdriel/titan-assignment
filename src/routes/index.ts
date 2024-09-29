import { Express } from 'express';
import { router as mainRouter } from './main.route';
import { router as imagesRouter } from './images.route';
import { router as ordersRouter } from './orders.route';
import { router as usersRouter } from './users.route';

export const initAppRoutes = (app: Express) => {
    app.use('/', mainRouter);
    app.use('/images', imagesRouter);
    app.use('/orders', ordersRouter);
    app.use('/users', usersRouter);
};
