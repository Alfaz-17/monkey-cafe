import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Table from './models/Table.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();
        await Table.deleteMany();

        // 1. Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true,
        });

        console.log('Admin User Created');

        // 2. Create Categories
        const categories = await Category.insertMany([
            { name: 'Coffee', order: 1, isActive: true },
            { name: 'Burgers', order: 2, isActive: true },
            { name: 'Desserts', order: 3, isActive: true },
            { name: 'Beverages', order: 4, isActive: true },
        ]);

        console.log('Categories Created');

        // 3. Create Products
        const coffeeCat = categories[0]._id;
        const burgerCat = categories[1]._id;
        const dessertCat = categories[2]._id;

        await Product.insertMany([
            {
                name: 'Caramel Latte',
                image: '/uploads/caramel-latte.png',
                description: 'Rich espresso with steamed milk and premium caramel syrup.',
                price: 4.50,
                category: coffeeCat,
                isPopular: true,
                isActive: true,
                isVeg: true
            },
            {
                name: 'Hot Cappuccino',
                image: '/uploads/cappuccino.png',
                description: 'Classic italian style cappuccino with velvety foam.',
                price: 3.80,
                category: coffeeCat,
                isPopular: false,
                isActive: true,
                isVeg: true
            },
            {
                name: 'Spicy Zinger Burger',
                image: '/uploads/spicy-burger.png',
                description: 'Crunchy chicken fillet with spicy sauce and fresh lettuce.',
                price: 6.50,
                category: burgerCat,
                isPopular: true,
                isActive: true,
                isVeg: false
            },
            {
                name: 'Double Choco Brownie',
                image: '/uploads/brownie.png',
                description: 'Warm chocolate brownie served with a scoop of vanilla ice cream.',
                price: 5.20,
                category: dessertCat,
                isPopular: true,
                isActive: true,
                isVeg: true
            }
        ]);

        console.log('Products Created');

        // 4. Create 15 Tables
        const tables = [];
        for (let i = 1; i <= 15; i++) {
            tables.push({ tableNo: i, isActive: true, status: 'free' });
        }
        await Table.insertMany(tables);
        
        console.log('15 Tables Created');

        console.log('Demo Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();
        await Table.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
