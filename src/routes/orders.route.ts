import { Router } from 'express';
import { asyncHandlerWrapper, logApiMW } from '../middleware';
import { getOrdersCtrl, createOrderCtrl } from '../controllers/orders.controller';

export const router: Router = Router();

router.use(logApiMW());

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
 *                  $ref: "#/components/schemas/order"
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
router.post('/', asyncHandlerWrapper(createOrderCtrl));
