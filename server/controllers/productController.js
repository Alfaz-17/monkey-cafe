import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const products = await Product.find({ ...keyword }).populate('category', 'name');
    res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, isPopular, isActive, isVeg } = req.body;

    const product = new Product({
        name,
        price,
        description,
        image,
        category,
        isPopular,
        isActive,
        isVeg
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, isPopular, isActive, isVeg } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name !== undefined ? name : product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description !== undefined ? description : product.description;
        product.image = image !== undefined ? image : product.image;
        product.category = category !== undefined ? category : product.category;
        product.isPopular = isPopular !== undefined ? isPopular : product.isPopular;
        product.isActive = isActive !== undefined ? isActive : product.isActive;
        product.isVeg = isVeg !== undefined ? isVeg : product.isVeg;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Toggle popular status
// @route   PUT /api/products/:id/popular
// @access  Private/Admin
const togglePopular = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.isPopular = !product.isPopular;
        await product.save();
        res.json({ isPopular: product.isPopular });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    togglePopular
};
