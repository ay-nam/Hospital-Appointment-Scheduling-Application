const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientSchema');

// routes/patientRoutes.js
router.get('/basic', async (req, res) => {
    try {
        const patients = await Patient.find().populate('department', 'name');
        const result = patients.map(p => ({
            id: p._id,
            name: `${p.firstName} ${p.lastName}`,
            phone: p.mobile,
            email: p.email,
            department: p.department?.name || "N/A"
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch patients" });
    }
});


router.get('/count', async (req, res) => {
    try {
        const totalPatients = await Patient.countDocuments();
        res.json({ totalPatients });
    } catch (error) {
        res.status(500).json({ message: "Error counting patients", error: error.message });
    }
});

module.exports = router;