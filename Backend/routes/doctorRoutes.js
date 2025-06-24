const express = require('express');
const router = express.Router();
const Doctor = require('../models/DoctorSchema');

// POST: Add new doctor
router.post('/', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        const saved = await doctor.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Fetch all doctors (with department populated)
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('department');
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Doctor.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctor count' });
    }
});

// POST /api/doctors/:id/leaves
router.post('/:id/leaves', async (req, res) => {
    const { leaveDate, leaveReason } = req.body;
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        doctor.leaves.push({ leaveDate, leaveReason });
        await doctor.save();

        res.json({ message: 'Leave added successfully', doctor });
    } catch (error) {
        res.status(500).json({ message: "Error adding leave", error: error.message });
    }
});

// GET doctor leaves (optional)
router.get('/:id/leaves', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        res.json(doctor.leaves);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaves", error: error.message });
    }
});

module.exports = router;
