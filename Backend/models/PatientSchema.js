const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIC: {type: String, required: true, unique: true},
    dob:{type: String, required: true},
    gender:{type: String, enum: ['male','female','other'], required:true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
    createdAt:{type: Date, default: Date.now}

});

module.exports = mongoose.model('Patient', PatientSchema);