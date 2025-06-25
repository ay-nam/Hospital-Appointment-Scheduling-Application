const express = require('express');
const router = express.Router();
const Report = require('../models/PatientReportSchema');


// GET /api/reports/:appointmentId
router.get('/:appointmentId', async (req, res) => {
    try {
      const report = await Report.findOne({ appointmentId: req.params.appointmentId })
        .populate('patientId', 'firstName lastName NIC')
        .populate('doctorId', 'firstName lastName email');
  
      if (!report) return res.status(404).json({ message: "No report found for this appointment" });
  
      res.json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  


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