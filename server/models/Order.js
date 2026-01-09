import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true,
    },
    tableNo: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerMobile: {
        type: String,
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            // customizations can be added here later
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Served', 'Paid', 'Cancelled'],
        default: 'Pending',
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Order', orderSchema);
