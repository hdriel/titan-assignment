import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { getImagesServiceHandler } from '../services/images.service';
import { MAX_IMAGES } from '../consts/consts';

export const getImageCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total: number = req.params.total ? +req.params.total : 0;

        if (!total) {
            throw Error('missing total images param');
        }

        if (total > MAX_IMAGES) {
            throw Error(`max number of images param must be till ${MAX_IMAGES}`);
        }

        const result = await getImagesServiceHandler(total);

        return res.status(200).json({ photos: result });
    } catch (error) {
        logger.warn(null, 'Failed on GET images', { ...req.params, error: (<any>error)?.message ?? error });
        return next(error);
    }
};
