const mongoose = require('mongoose');

const  ImportantMeasureSchema = new mongoose.Schema({
    label: {type:String, required:true},
    value: {type:String, required:true},
});

const PatientReportSchema = new mongoose.Schema({
    appointmentId: {type: mongoose.Schema.Types.ObjectId, ref:'Appointment', required:true},
    patientId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    doctorId: {type:mongoose.Schema.Types.ObjectId , ref:'Doctor', required:true},
    status: {type:String, required:true},
    diseaseDetails: {type:String, required:true},
    importantMeasures: [ImportantMeasureSchema],
    allergies: {type:[String], default:[]},
    medications: {type:String},
    followUpPlan: {type:String},
    labTests: {type:String},
    dietaryAdvice:{ type:String},
    notes: {type:String},
},
    { timestamps:true}
);

module.exports = mongoose.model('PatientReport',PatientReportSchema);
