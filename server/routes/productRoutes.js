import express from 'express';
const router = express.Router();
import {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    togglePopular,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

router.route('/:id/popular').put(protect, admin, togglePopular); // Added route for quick toggle

export default router;
