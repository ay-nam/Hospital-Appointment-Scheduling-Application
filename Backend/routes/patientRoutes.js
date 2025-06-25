const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientSchema');

// routes/patientRoutes.js
router.get('/basic', async (req, res) => {
    try {
        const patients = await Patient.find();
        const result = patients.map(p => ({
            id: p._id,
            name: `${p.firstName} ${p.lastName}`,
            NIC: p.NIC,
            dob: p.dob,
            gender: p.gender
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