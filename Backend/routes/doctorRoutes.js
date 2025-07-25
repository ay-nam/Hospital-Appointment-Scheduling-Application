const express = require('express');
const router = express.Router();
const Doctor = require('../models/DoctorSchema');
const upload = require('../middlewares/upload');

// POST: Add new doctor with files and user data
router.post(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'medicalCertificate', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dob,
        gender,
        experience,
        qualification,
        licenseNumber,
        email,
        mobile,
        department
      } = req.body;

      const doctor = new Doctor({
        firstName,
        lastName,
        dob,
        gender,
        experience,
        qualification,
        licenseNumber,
        email,
        mobile,
        department,
        image: req.files?.profileImage?.[0]?.filename || '',
        registrationCertificate: req.files?.medicalCertificate?.[0]?.filename || ''
      });

      const saved = await doctor.save();
      console.log('Doctor Created:', saved);
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating doctor:', err);
      res.status(400).json({ message: err.message });
    }
  }
);


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

// GET: Get doctor details by ID (with department populated)
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('department');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor details', error: error.message });
  }
});


module.exports = router;
