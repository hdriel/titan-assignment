import Joi from 'joi';

export const userIdJoiSchema = Joi.object({
    userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/, 'valid object')
        .required(),
});

export const userIdOptionalJoiSchema = Joi.object({
    userId: Joi.string()
        .optional()
        .pattern(/^[0-9a-fA-F]{24}$/, 'valid object'),
});
