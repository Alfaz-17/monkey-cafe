import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import users from './data/users.js'; // Not used in this version
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Table from './models/Table.js';
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

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true,
        });

        console.log('Admin User Created: admin@example.com / 123456');

        // 2. Create Categories
        const categories = await Category.insertMany([
            { name: 'Coffee', order: 1, isActive: true },
            { name: 'Snacks', order: 2, isActive: true },
            { name: 'Desserts', order: 3, isActive: true },
        ]);

        console.log('Categories Created');

        // 3. Create Products
        const coffeeCat = categories[0]._id;
        const snacksCat = categories[1]._id;

        const products = await Product.insertMany([
            {
                name: 'Caramel Latte',
                image: 'https://images.unsplash.com/photo-1599398054066-271a79b71622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Rich espresso with steamed milk and caramel syrup',
                price: 4.50,
                category: coffeeCat,
                isPopular: true,
                isActive: true
            },
            {
                name: 'Americano',
                image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Espresso shots topped with hot water',
                price: 3.00,
                category: coffeeCat,
                isPopular: false,
                isActive: true
            },
            {
                name: 'Butter Croissant',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Flaky and buttery fresh croissant',
                price: 3.50,
                category: snacksCat,
                isPopular: true,
                isActive: true
            }
        ]);

        console.log('Products Created');

        // 4. Create Tables
        await Table.insertMany([
            { tableNo: 1 },
            { tableNo: 2 },
            { tableNo: 3 },
        ]);
        
        console.log('Tables Created');

        console.log('Data Imported!');
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

// We need to import Order model if we want to delete orders, 
// even though we aren't seeding them.
import Order from './models/Order.js';

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
