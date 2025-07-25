const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const deptRoutes = require('./routes/deptRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes'); 
const reportRoutes = require('./routes/reportRoutes');
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/departments',deptRoutes);
app.use('/api/appointments',appointmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/contact',contactRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.use('/uploads/doctors', express.static(path.join(__dirname, 'uploads/doctors')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.error('MongoDB connection error:', err));
