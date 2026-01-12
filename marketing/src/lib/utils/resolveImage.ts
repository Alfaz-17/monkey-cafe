import { IMAGE_BASE_URL } from '../api';

export const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '/placeholder-food.jpg';
    
    // If it's already a full URL (like Cloudinary), return it as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // Handle local uploads path
    if (imagePath.startsWith('/uploads')) {
        return `${IMAGE_BASE_URL}${imagePath}`;
    }
    
    return imagePath;
};
