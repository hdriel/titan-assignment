import { Router } from 'express';
import { asyncHandlerWrapper, JoiSchemaValidationMW, logApiMW } from '../middleware';
import { getOrdersCtrl, createOrderCtrl } from '../controllers/orders.controller';
import { orderJoiSchema } from '../validations';
export const router: Router = Router();

router.use(logApiMW());

/**
 * @swagger
 * components:
 *   schemas:
 *     orderCreate:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of order's user
 *           example: "amackowle2@miibeian.gov.cn"
 *         fullName:
 *           type: string
 *           description: The fullName of user
 *           example: "Dan von Grollmann"
 *         fullAddress:
 *           type: string
 *           description: The full address of user
 *           example: "379 Hazelcrest Park"
 *         images:
 *           type: string[]
 *           description: The images of orders
 *           example: ["http://dummyimage.com/147x100.png/ff4444/ffffff"]
 *         frameColor:
 *           type: string
 *           description: The color frame
 *           example: "#2eb5bd"
 *         user:
 *           type: string
 *           description: The userId
 *           example: 66f8698cfe0a908834aa043c
 *       required:
 *         - email
 *         - fullAddress
 *         - user
 */

/**
 * @swagger
 *   /orders/{userId}:
 *   get:
 *     tags: ['Orders operations']
 *     summary: Retrieve user's orders
 *     description: Fetch a list of orders base on userId.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The userId
 *         schema:
 *           type: string
 *           example: 66f8698cfe0a908834aa043c
 *     responses:
 *       200:
 *         description: A list user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/order"
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', asyncHandlerWrapper(getOrdersCtrl));

/**
 * @swagger
 *   /orders/:
 *   post:
 *     tags: ['Orders operations']
 *     summary: Create order
 *     description: create a user order
 *     requestBody:
 *        description: The Order's data
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: "#/components/schemas/orderCreate"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/order"
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.post('/', JoiSchemaValidationMW(orderJoiSchema), asyncHandlerWrapper(createOrderCtrl));
