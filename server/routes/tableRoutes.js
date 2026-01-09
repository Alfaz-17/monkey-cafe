import express from 'express';
const router = express.Router();
import {
    getTables,
    createTable,
    deleteTable,
} from '../controllers/tableController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getTables).post(protect, admin, createTable);
router.route('/:id').delete(protect, admin, deleteTable);

export default router;
