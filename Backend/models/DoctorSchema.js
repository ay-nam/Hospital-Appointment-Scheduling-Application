const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    image: { type: String, required: true },
    registrationCertificate: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    leaves: [
        {
            leaveDate: { type: Date, required: true },
            leaveReason: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
