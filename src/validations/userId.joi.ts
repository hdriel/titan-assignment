import Joi from 'joi';

export const userIdJoiSchema = Joi.object({
    userId: Joi.string().length(24).required(),
});
