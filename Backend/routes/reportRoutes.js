const express = require('express');
const router = express.Router();
const Report = require('../models/PatientReportSchema');


// Create or update a report for a specific appointment
// router.post('/:appointmentId', async (req, res) => {
//     const { appointmentId } = req.params;
//     const data = req.body;

//     try {
//         let report = await PatientReport.findOne({ appointmentId });

//         if (report) {
//             Object.assign(report, data);
//             await report.save();
//             return res.json({ message: "Report updated successfully", report });
//         }

//         report = new PatientReport({ appointmentId, ...data });
//         await report.save();
//         res.status(201).json({ message: "Report created successfully", report });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// routes/reportRoutes.js
// router.get('/:appointmentId', async (req, res) => {
//     try {
//         const report = await PatientReport.findOne({ appointmentId: req.params.appointmentId })
//             .populate('patientId', 'firstName lastName NIC')
//             .populate('doctorId', 'firstName lastName email');
//         if (!report) return res.status(404).json({ message: "No report found" });
//         res.json(report);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.get('/doctor/:doctorId', async (req, res) => {
//     try {
//         const reports = await PatientReport.find({ doctorId: req.params.doctorId })
//             .populate('patientId', 'firstName lastName NIC')
//             .populate('appointmentId');
//         res.json(reports);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


router.get('/count', async (req, res) => {
    try {
        const totalReports = await Report.countDocuments(); // or change to totalDoctors if needed
        res.json({ totalReports });
    } catch (error) {
        res.status(500).json({ message: "Error counting reports", error: error.message });
    }
});

module.exports = router;