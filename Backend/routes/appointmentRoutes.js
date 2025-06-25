const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentSchema');
const Patient = require('../models/PatientSchema');
const authenticateToken = require('../middlewares/authMiddleware');

// 🔁 Create appointment (with patient creation if needed)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            mobile,
            NIC,
            dob,
            gender,
            department,
            doctor,
            address,
            appointmentDate,
            timeSlot
        } = req.body;

        const userId = req.user.id;

        // Check if patient exists for this user
        let patient = await Patient.findOne({ NIC, createdBy: userId });

        if (!patient) {
            // Create new patient
            patient = new Patient({
                firstName,
                lastName,
                NIC,
                dob,
                gender: gender.toLowerCase(),
                createdBy: userId
            });
            await patient.save();
        }

        // Create appointment linked to patient
        const appointment = new Appointment({
            firstName,
            lastName,
            email,
            mobile,
            NIC,
            dob,
            gender: gender.toLowerCase(),
            department,
            doctor,
            address,
            appointmentDate,
            timeSlot,
            uploadedBy: patient._id
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(400).json({ error: error.message });
    }
});

// 🔁 Get all appointments (for admin view)
router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate('department')
        .populate('doctor')
        .populate('uploadedBy', 'firstName lastName email')
        .sort({ appointmentDate: -1 }); // <-- newest first
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// 🔁 Get count of all appointments
router.get('/count', async (req, res) => {
    try {
        const totalAppointments = await Appointment.countDocuments();
        res.json({ totalAppointments });
    } catch (error) {
        res.status(500).json({ message: "Error counting appointments", error: error.message });
    }
});

// 🔁 Reschedule an appointment
router.put('/:id/reschedule', async (req, res) => {
    const { newDate, newTime } = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                appointmentDate: newDate,
                timeSlot: newTime
            },
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment rescheduled successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error rescheduling", error: error.message });
    }
});

// 🔁 Get appointments for a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.params.doctorId })
            .populate('department')
            .populate('uploadedBy', 'firstName lastName email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
});

// 🔁 Get appointments stats by day of week
router.get('/stats/daily', async (req, res) => {
    try {
        const appointments = await Appointment.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$appointmentDate" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dailyData = Array(7).fill(0);
        appointments.forEach(a => {
            dailyData[a._id - 1] = a.count;
        });

        res.json(dailyData);
    } catch (err) {
        res.status(500).json({ message: "Error getting daily stats", error: err.message });
    }
});

// 🔁 Get appointments stats by status
router.get('/stats/status', async (req, res) => {
    try {
        const statusData = await Appointment.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(statusData);
    } catch (err) {
        res.status(500).json({ message: "Error getting status stats", error: err.message });
    }
});

// ✅ Get appointments for current logged-in user
router.get('/my', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find patients created by this user
        const patients = await Patient.find({ createdBy: userId }).select('_id');
        const patientIds = patients.map(p => p._id);

        const appointments = await Appointment.find({ uploadedBy: { $in: patientIds } })
            .populate('department')
            .populate('doctor')
            .populate('uploadedBy', 'firstName lastName email');

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user appointments", error: error.message });
    }
});

router.get('/stats/by-date', async (req, res) => {
    try {
      const result = await Appointment.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$appointmentDate" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error fetching appointment stats by date", error: err.message });
    }
  });

  router.get('/stats/by-department', async (req, res) => {
    try {
      const result = await Appointment.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "_id",
            as: "departmentInfo"
          }
        },
        { $unwind: "$departmentInfo" },
        {
          $group: {
            _id: "$departmentInfo.name",
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error fetching appointment stats by department", error: err.message });
    }
  });

  router.get('/stats/by-doctor', async (req, res) => {
    try {
      const result = await Appointment.aggregate([
        {
          $lookup: {
            from: "doctors",
            localField: "doctor",
            foreignField: "_id",
            as: "doctorInfo"
          }
        },
        { $unwind: "$doctorInfo" },
        {
          $group: {
            _id: { $concat: ["$doctorInfo.firstName", " ", "$doctorInfo.lastName"] },
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error fetching appointment stats by doctor", error: err.message });
    }
  });

  router.get('/stats/by-status', async (req, res) => {
    try {
      const result = await Appointment.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error fetching appointment stats by status", error: err.message });
    }
  });
  
  
module.exports = router;
