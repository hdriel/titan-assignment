import { Router } from 'express';
import { asyncHandlerWrapper, JoiSchemaValidationMW, logApiMW } from '../middleware';
import { getUsersCtrl } from '../controllers/users.controller';
import { userIdOptionalJoiSchema } from '../validations';
export const router: Router = Router();

router.use(logApiMW());

/**
 * @swagger
 *   /users:
 *   get:
 *     tags: ['Users operations']
 *     summary: Retrieve user list
 *     description: Fetch a list of users
 *     responses:
 *       200:
 *         description: A list users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/user"
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 *   /users/{userId}:
 *   get:
 *     tags: ['Users operations']
 *     summary: Retrieve user data
 *     description: Fetch a specific user data
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: to fetch specific userId data
 *         schema:
 *           type: string
 *           example: 66f8698cfe0a908834aa043c
 *     responses:
 *       200:
 *         description: A list users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/user"
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.get('/:userId?', JoiSchemaValidationMW(userIdOptionalJoiSchema, 'params'), asyncHandlerWrapper(getUsersCtrl));
