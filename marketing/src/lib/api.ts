import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_USER } from './mockData';

// Helper to delay response for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from LS or Default
const getFromLS = (key: string, defaultData: any) => {
    if (typeof window === 'undefined') return defaultData;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
};

const saveToLS = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const IMAGE_BASE_URL = ''; // Relative path for demo

const api = {
    get: async (url: string) => {
        await delay(300); // Simulate network

        if (url === '/products') {
            const products = getFromLS('demo_products', MOCK_PRODUCTS);
            return { data: products };
        }
        if (url === '/products/public') { // Handle public endpoint if different
             const products = getFromLS('demo_products', MOCK_PRODUCTS);
             return { data: products };
        }
        if (url === '/categories') {
            const categories = getFromLS('demo_categories', MOCK_CATEGORIES);
            return { data: categories };
        }
        if (url === '/orders') {
             const orders = getFromLS('demo_orders', []);
             return { data: orders }; // Admin view
        }
        if (url === '/tables') {
            const tables = getFromLS('demo_tables', [
                { _id: 't1', tableNo: 1, status: 'free', isActive: true },
                { _id: 't2', tableNo: 2, status: 'free', isActive: true },
                { _id: 't3', tableNo: 3, status: 'free', isActive: true },
            ]);
            return { data: tables };
        }
        
        // Dynamic routes

        if (url.startsWith('/products/')) {
            const id = url.split('/')[2];
            const products = getFromLS('demo_products', MOCK_PRODUCTS);
            const product = products.find((p: any) => p._id === id);
            if (product) return { data: product };
        }

        console.warn('Mock API: Unhandled GET', url);
        return { data: [] };
    },

    post: async (url: string, body: any, config?: any) => {

        await delay(400);

        if (url === '/users/login') {
            if (body.email === 'admin@demo.com' && body.password === '123456') {
                 localStorage.setItem('userInfo', JSON.stringify(MOCK_USER));
                 return { data: MOCK_USER };
            }
            return Promise.reject({ response: { data: { message: 'Invalid credentials. Use admin@demo.com / 123456' } } });
        }

        if (url === '/orders') {
            const newOrder = { 
                ...body, 
                _id: 'ord_' + Date.now(),
                createdAt: new Date().toISOString(),
                status: 'New',
                paymentStatus: 'Pending'
            };
            const orders = getFromLS('demo_orders', []);
            orders.unshift(newOrder); // Add to top
            saveToLS('demo_orders', orders);
            return { data: newOrder };
        }

        if (url === '/products') {
             // Admin create product
             const newProduct = { ...body, _id: 'p_' + Date.now() };
             const products = getFromLS('demo_products', MOCK_PRODUCTS);
             products.push(newProduct);
             saveToLS('demo_products', products);
             return { data: newProduct };
        }
        
         if (url === '/categories') {
             const newCat = { ...body, _id: 'c_' + Date.now() };
             const cats = getFromLS('demo_categories', MOCK_CATEGORIES);
             cats.push(newCat);
             saveToLS('demo_categories', cats);
             return { data: newCat };
        }

        if (url === '/tables') {
             const newTable = { ...body, _id: 't_' + Date.now(), status: 'free', isActive: true };
             const tables = getFromLS('demo_tables', []);
             tables.push(newTable);
             saveToLS('demo_tables', tables);
             return { data: newTable };
        }

        if (url === '/upload') {

            await delay(1000);
            return { data: { url: '/placeholder-food.jpg' } };
        }

        console.warn('Mock API: Unhandled POST', url, body);

        return { data: {} };
    },

    put: async (url: string, body: any, config?: any) => {

        await delay(300);
        
        if (url.startsWith('/orders/') && url.includes('/pay')) {
             const id = url.split('/')[2];
             const orders = getFromLS('demo_orders', []);
             const order = orders.find((o: any) => o._id === id);
             if (order) {
                 order.paymentStatus = 'Paid';
                 saveToLS('demo_orders', orders);
                 return { data: order };
             }
        }

        if (url.startsWith('/orders/') && url.includes('/status')) {
             const id = url.split('/')[2];
             const orders = getFromLS('demo_orders', []);
             const order = orders.find((o: any) => o._id === id);
             if (order) {
                 order.status = body.status;
                 saveToLS('demo_orders', orders);
                 return { data: order };
             }
        }

        if (url.startsWith('/products/')) {
            const id = url.split('/')[2];
            let products = getFromLS('demo_products', MOCK_PRODUCTS);
            const index = products.findIndex((p: any) => p._id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...body };
                saveToLS('demo_products', products);
                return { data: products[index] };
            }
        }

        console.warn('Mock API: Unhandled PUT', url, body);
        return { data: {} };
    },

    delete: async (url: string, config?: any) => {

        await delay(300);

        if (url.startsWith('/tables/')) {
             const id = url.split('/')[2];
             let tables = getFromLS('demo_tables', []);
             tables = tables.filter((t: any) => t._id !== id);
             saveToLS('demo_tables', tables);
             return { data: { message: 'Deleted' } };
        }

        if (url.startsWith('/products/')) {

             const id = url.split('/')[2];
             let products = getFromLS('demo_products', MOCK_PRODUCTS);
             products = products.filter((p: any) => p._id !== id);
             saveToLS('demo_products', products);
             return { data: { message: 'Deleted' } };
        }
        
        console.warn('Mock API: Unhandled DELETE', url);
        return { data: {} };
    }
};

export default api;
