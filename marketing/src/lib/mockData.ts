
export const MOCK_CATEGORIES = [
    { _id: 'c1', name: 'Coffee', image: '/uploads/coffee_cat.png', isActive: true, order: 1 },
    { _id: 'c2', name: 'Snacks', image: '/uploads/snacks_cat.png', isActive: true, order: 2 },
    { _id: 'c3', name: 'Desserts', image: '/uploads/desserts_cat.png', isActive: true, order: 3 },
    { _id: 'c4', name: 'Beverages', image: '/uploads/bev_cat.png', isActive: true, order: 4 },
];

export const MOCK_PRODUCTS = [
    { 
        _id: 'p1', 
        name: 'Cappuccino', 
        description: 'Rich espresso with steamed milk foam.', 
        price: 150, 
        category: 'c1', 
        image: '/uploads/cappuccino.png', 
        isPopular: true, 
        isActive: true, 
        isVeg: true 
    },
    { 
        _id: 'p2', 
        name: 'Chicken Sandwich', 
        description: 'Grilled chicken with fresh lettuce and mayo.', 
        price: 220, 
        category: 'c2', 
        image: '/uploads/sandwich.png', 
        isPopular: true, 
        isActive: true, 
        isVeg: false 
    },
    { 
        _id: 'p3', 
        name: 'Chocolate Brownie', 
        description: 'Gooey rich chocolate brownie.', 
        price: 120, 
        category: 'c3', 
        image: '/uploads/brownie.png', 
        isPopular: false, 
        isActive: true, 
        isVeg: true 
    },
    { 
        _id: 'p4', 
        name: 'Iced Latte', 
        description: 'Chilled espresso with milk and ice.', 
        price: 180, 
        category: 'c1', 
        image: '/uploads/iced_latte.png', 
        isPopular: true, 
        isActive: true, 
        isVeg: true 
    },
];

export const MOCK_USER = {
    _id: 'u1',
    name: 'Demo Admin',
    email: 'admin@demo.com',
    isAdmin: true,
    token: 'mock-jwt-token-12345'
};
