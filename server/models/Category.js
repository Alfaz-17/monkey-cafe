import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Category', categorySchema);
