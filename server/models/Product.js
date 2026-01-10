import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: String, // URL to the image
        required: false,
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVeg: {
        type: Boolean,
        default: true,
    },
    customizations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customization'
    }]
}, {
    timestamps: true,
});

export default mongoose.model('Product', productSchema);
