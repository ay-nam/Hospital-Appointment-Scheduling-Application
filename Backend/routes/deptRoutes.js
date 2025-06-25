const express = require('express');
const router = express.Router();
const Department = require('../models/DeptSchema');

// POST: Add new department
router.post('/', async (req, res) => {
    try {
        const department = new Department(req.body);
        const saved = await department.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Fetch all departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Department.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctor count' });
    }
});

// PUT: Update department by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Department not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete department by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Department.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Department not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
