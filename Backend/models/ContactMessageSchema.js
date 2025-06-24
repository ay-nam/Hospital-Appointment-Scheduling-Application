const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    firstName:{type:String, required:true, trim:true},
    lastName: {type:String, required:true, trim:true},
    email: {type:String, required:true, trim:true},
    mobile: {type:String, required:true},
    message: {type:String, required:true, trim:true},
    createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);