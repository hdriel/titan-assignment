import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { getUsersSrviceHandler } from '../services/users.service';

export const getUsersCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        const result = await getUsersSrviceHandler(userId);

        return res.status(200).json({ total: result?.length ?? 0, users: result ?? [] });
    } catch (error) {
        logger.warn(null, 'Failed on GET users', { ...req.params, error: (<any>error)?.message ?? error });
        return next(error);
    }
};
