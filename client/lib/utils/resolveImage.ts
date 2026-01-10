import { IMAGE_BASE_URL } from '../api';

export const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '/placeholder-food.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) {
        return `${IMAGE_BASE_URL}${imagePath}`;
    }
    return imagePath;
};
