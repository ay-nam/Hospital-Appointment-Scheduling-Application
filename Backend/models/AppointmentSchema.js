const mongoose = require('mongoose');
require('../models/PatientSchema');

const AppointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  NIC: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  dob: { type: Date, required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  visited: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },

  notifications: [
    {
      message: { type: String, required: true },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
      },
      timeStamp: { type: Date, default: Date.now },
      source: { type: String }
    }
  ],

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
},
{
  timestamps: true  
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
