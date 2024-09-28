import Joi from 'joi';
import { MAX_IMAGES } from '../consts/consts';

export const totalImagesJoiSchema = Joi.object({
    total: Joi.number().min(1).max(MAX_IMAGES).required(),
});
