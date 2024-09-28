import { Router } from 'express';
import { asyncHandlerWrapper, JoiSchemaValidationMW, logApiMW } from '../middleware';
import { getImageCtrl } from '../controllers/images.controller';
import { totalImagesJoiSchema } from '../validations';

export const router: Router = Router();

router.use(logApiMW());

/**
 * @swagger
 *   /images/{total}:
 *   get:
 *     tags: ['Images operations']
 *     summary: Retrieve photos from Pixabay API
 *     description: Fetch a list of image URLs based on the total number specified.
 *     parameters:
 *       - in: path
 *         name: total
 *         required: true
 *         description: The total number of images to retrieve.
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of image URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "https://pixabay.com/photo.jpg"
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.get('/:total', JoiSchemaValidationMW(totalImagesJoiSchema, 'params'), asyncHandlerWrapper(getImageCtrl));
