const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'doctor', 'admin'], 
        default: 'user' 
    },
    active: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;