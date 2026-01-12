export interface CustomizationOption {
    _id: string;
    name: string;
    price: number;
    isDefault: boolean;
}

export interface Customization {
    _id: string;
    name: string;
    type: 'single' | 'multiple';
    options: CustomizationOption[];
    isActive: boolean;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string; // ID
    image?: string;
    isPopular: boolean;
    isActive: boolean;
    isVeg: boolean;
    customizations?: Customization[];
}

export interface CartItem extends Product {
    uniqueId: string; // For cart distinguishing (id + options)
    qty: number;
    selectedCustomizations: {
        name: string;
        optionName: string;
        price: number;
    }[];
}

export interface Category {
    _id: string;
    name: string;
    image?: string;
    isActive: boolean;
    order: number;
}
