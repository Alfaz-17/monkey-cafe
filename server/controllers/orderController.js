import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Table from '../models/Table.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        tableNo,
        customerName,
        customerMobile,
        orderItems,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    // Verify table exists or auto-create (Lazy Creation for smoother flow)
    let table = await Table.findOne({ tableNo });
    if (!table) {
        table = await Table.create({
            tableNo,
            status: 'free',
            isActive: true
        });
        // Or if strict mode is preferred:
        // res.status(404);
        // throw new Error('Table not found');
    }

    const order = new Order({
        table: table._id,
        tableNo,
        customerName,
        customerMobile,
        items: orderItems,
        totalAmount: totalPrice,
    });

    const createdOrder = await order.save();
    
    // Here we can trigger Socket.IO event in future
    // io.emit('new_order', createdOrder);

    // Update table status to occupied
    table.status = 'occupied';
    await table.save();

    res.status(201).json(createdOrder);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('table', 'tableNo').sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        
        if (status === 'Paid') {
            order.isPaid = true;
            // Free up the table? Depends on workflow. 
            // Usually table is freed manually or when bill is settled.
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export { addOrderItems, getOrders, updateOrderStatus };
