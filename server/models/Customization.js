import mongoose from 'mongoose';

const customizationSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, // e.g., "Spiciness", "Extra Toppings"
    type: { 
        type: String, 
        enum: ['single', 'multiple'], 
        required: true 
    }, // 'single' for radio (Mild/Medium/Hot), 'multiple' for checkbox (Extra Cheese)
    options: [{
        name: { type: String, required: true },
        price: { type: Number, default: 0 }, // Additional cost
        isDefault: { type: Boolean, default: false }
    }],
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Customization', customizationSchema);
