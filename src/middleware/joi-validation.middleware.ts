import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const JoiSchemaValidationMW =
    (schmea: Schema, fieldFrom: 'body' | 'query' | 'params' = 'body') =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schmea.validateAsync(req[fieldFrom]);
            next();
        } catch (error) {
            res.status(412).send(error);
        }
    };
