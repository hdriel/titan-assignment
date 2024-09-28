import { Request, Response, NextFunction } from 'express';
import logger, { LOGGER_LEVEL } from '../utils/logger';

export const logAPI = (logLevel: LOGGER_LEVEL = 'debug') => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        (<any>logger)[logLevel]((req as any).id, 'Call to REST API', {
            url: req.originalUrl,
            method: req.method,
            ...(Object.keys(req.params).length && { params: req.params }),
            ...(Object.keys(req.query).length && { query: req.query }),
            ...(Object.keys(req.body).length && {
                body: { ...req.body, ...(req.body.password && { password: '********' }) },
            }),
        });
        next();
    };
};
