import React, { useEffect, useState } from 'react';
import '../styles/AppointmentForm.css';
import axios from 'axios';
import { getUserIdFromToken } from '../utils/auth';
import Swal from 'sweetalert2';


export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    NIC: '',
    gender: '',
    department: '',
    doctor: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, docRes] = await Promise.all([
          axios.get('http://localhost:5000/api/departments'),
          axios.get('http://localhost:5000/api/doctors')
        ]);
        setDepartments(deptRes.data);
        setDoctors(docRes.data);
        console.log("Doctors from backend:", docRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/user-id', { withCredentials: true })
      .then(res => setUserId(res.data.id))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.mobile.length < 10) newErrors.mobile = 'Enter a valid mobile number';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.NIC) newErrors.NIC = 'NIC/Aadhar number is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.doctor) newErrors.doctor = 'Please select a preferred doctor';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (!userId) {
          Swal.fire({
            icon: 'error',
            title: 'User not logged in',
            text: 'Please log in again.',
          });
          return;
        }
  
        const response = await axios.post('http://localhost:5000/api/appointments', {
          ...formData,
          appointmentDate: new Date().toISOString(),
          timeSlot: '10:00 AM - 11:00 AM',
          gender: formData.gender.toLowerCase(),
          uploadedBy: userId
        }, { withCredentials: true });
  
        Swal.fire({
          icon: 'success',
          title: 'Appointment Scheduled!',
          text: 'Your appointment has been booked successfully.',
        });
  
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          dob: '',
          NIC: '',
          gender: '',
          department: '',
          doctor: '',
          address: ''
        });
  
      } catch (error) {
        console.error("Failed to schedule Appointment:", error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to schedule appointment. Please try again later.',
        });
      }
    }
  };
  

  return (
    <div className='appointment-container'>
      <h1>Schedule Your Appointment</h1>
      <form className='appointment-form' onSubmit={handleSubmit}>

        <label>Patient First Name</label>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter your first name' />
        {errors.firstName && <span className='error'>{errors.firstName}</span>}

        <label>Patient Last Name</label>
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter your last name' />
        {errors.lastName && <span className='error'>{errors.lastName}</span>}

        <label>Email</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
        {errors.email && <span className='error'>{errors.email}</span>}

        <label>Mobile Number</label>
        <input type='text' name='mobile' value={formData.mobile} onChange={handleChange} placeholder='Enter your mobile number' />
        {errors.mobile && <span className='error'>{errors.mobile}</span>}

        <label>Date of Birth</label>
        <input type='date' name='dob' value={formData.dob} onChange={handleChange} />
        {errors.dob && <span className='error'>{errors.dob}</span>}

        <label>NIC (Aadhar number)</label>
        <input type='text' name='NIC' value={formData.NIC} onChange={handleChange} placeholder='Enter your NIC' />
        {errors.NIC && <span className='error'>{errors.NIC}</span>}

        <label>Gender</label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value=''>Select</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
        {errors.gender && <span className='error'>{errors.gender}</span>}

        <label>Department</label>
        <select name='department' value={formData.department} onChange={handleChange}>
          <option value=''>Select</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
        {errors.department && <span className='error'>{errors.department}</span>}
        
        <label>Preferred Doctor</label>
        <select
          name='doctor'
          value={formData.doctor}
          onChange={handleChange}
          disabled={!formData.department}
        >
          <option value=''>Select</option>
          {doctors
            .filter(doc => doc.department && doc.department._id === formData.department)
            .map(doc => (
              <option key={doc._id} value={doc._id}>{doc.firstName} {doc.lastName}</option>
            ))}
        </select>
        {errors.doctor && <span className='error'>{errors.doctor}</span>}

        <label>Address</label>
        <input type='text' name='address' value={formData.address} onChange={handleChange} placeholder='Enter your address' />
        {errors.address && <span className='error'>{errors.address}</span>}

        <button type='submit'>Book Appointment</button>
      </form>
    </div>
  );
} 
