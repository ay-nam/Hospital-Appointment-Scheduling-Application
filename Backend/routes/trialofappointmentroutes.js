const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentSchema');

router.post('/', async(req,res) => {
    try{
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({message: 'Appointment created successfully', appointment});
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('department')  // Populate referenced Department
            .populate('doctor')      // Populate referenced Doctor
            .populate('uploadedBy', 'firstName lastName email');  // Populate only selected fields of User
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const totalAppointments = await Appointment.countDocuments();
        res.json({ totalAppointments });
    } catch (error) {
        res.status(500).json({ message: "Error counting appointments", error: error.message });
    }
});

// PUT /api/appointments/:id/reschedule
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

module.exports = router;