import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { IORDER } from '../interfaces';
import { createOrderServiceHandler, getOrderByUserIdServiceHandler } from '../services/orders.service';

export const getOrdersCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        const result = await getOrderByUserIdServiceHandler(userId);

        return res.status(200).json({ total: result?.length ?? 0, orders: result ?? [] });
    } catch (error) {
        logger.warn(null, 'Failed on GET orders', { ...req.params, error: (<any>error)?.message ?? error });
        return next(error);
    }
};

export const createOrderCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order: Omit<Partial<IORDER>, '_id' | 'createdAt' | 'updatedAt' | 'active'> = {
            user: req.body.user,
            email: req.body.email,
            images: req.body.images,
            frameColor: req.body.frameColor,
            fullAddress: req.body.fullAddress,
            fullName: req.body.fullName,
        };

        const result = await createOrderServiceHandler(order);

        return res.status(201).json(result);
    } catch (error) {
        logger.warn(null, 'Failed on create order', { ...req.body, error: (<any>error)?.message ?? error });
        return next(error);
    }
};
