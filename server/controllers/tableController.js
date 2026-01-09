import asyncHandler from 'express-async-handler';
import Table from '../models/Table.js';

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private/Admin
const getTables = asyncHandler(async (req, res) => {
    const tables = await Table.find({}).sort({ tableNo: 1 });
    res.json(tables);
});

// @desc    Create a table
// @route   POST /api/tables
// @access  Private/Admin
const createTable = asyncHandler(async (req, res) => {
    const { tableNo } = req.body;

    const tableExists = await Table.findOne({ tableNo });

    if (tableExists) {
        res.status(400);
        throw new Error('Table already exists');
    }

    const table = new Table({
        tableNo,
    });

    const createdTable = await table.save();
    res.status(201).json(createdTable);
});

// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private/Admin
const deleteTable = asyncHandler(async (req, res) => {
    const table = await Table.findById(req.params.id);

    if (table) {
        await table.deleteOne();
        res.json({ message: 'Table removed' });
    } else {
        res.status(404);
        throw new Error('Table not found');
    }
});

export { getTables, createTable, deleteTable };
