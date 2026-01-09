import mongoose from 'mongoose';

const tableSchema = mongoose.Schema({
    tableNo: {
        type: Number,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    // We can add current status here (e.g., 'occupied', 'free')
    status: {
        type: String,
        enum: ['free', 'occupied'],
        default: 'free',
    }
}, {
    timestamps: true,
});

export default mongoose.model('Table', tableSchema);
