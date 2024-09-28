import Joi from 'joi';

export const orderJoiSchema = Joi.object({
    user: Joi.string().length(24).required(),
    email: Joi.string().email().required().strict(),
    fullName: Joi.string().min(1).max(100).required().strict(),
    fullAddress: Joi.string().min(1).max(200).required().strict(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    frameColor: Joi.alternatives().try(
        Joi.string().valid('black', 'white', 'brown', 'red', 'blue', 'green'),
        Joi.string().pattern(/^#([0-9A-Fa-f]{3}){1,2}$/) // Matches hex color codes
    ),
});
