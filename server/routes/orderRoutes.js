import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrders,
    getOrderById,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(addOrderItems).get(protect, admin, getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;
