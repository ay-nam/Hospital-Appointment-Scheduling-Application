import React, { useState } from 'react';
import '../styles/AppointmentForm.css';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    nic: '',
    gender: '',
    department: '',
    doctor: '',
  });

  const [errors, setErrors] = useState({});

  const departments = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'General Medicine'];
  const doctors = {
    Cardiology: ['Dr. John Smith', 'Dr. Alice Johnson'],
    Orthopedics: ['Dr. Robert Brown', 'Dr. Sarah Lee'],
    Pediatrics: ['Dr. Mark Wilson', 'Dr. Emma Davis'],
    Dermatology: ['Dr. Nancy White', 'Dr. Daniel Martin'],
    'General Medicine': ['Dr. Sophia Allen', 'Dr. William Harris'],
  };

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
    if (!formData.nic) newErrors.nic = 'NIC/Aadhar number is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.doctor) newErrors.doctor = 'Please select a preferred doctor';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Appointment Scheduled Successfully!');
      console.log('Appointment Data:', formData);
    }
  };

  return (
    <div className='appointment-container'>
      <h1>Schedule Your Appointment</h1>
      <form className='appointment-form' onSubmit={handleSubmit}>

        <label>Patient First Name</label>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter your first name'/>
        {errors.firstName && <span className='error'>{errors.firstName}</span>}

        <label>Patient Last Name</label>
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter your last name'/>
        {errors.lastName && <span className='error'>{errors.lastName}</span>}

        <label>Email</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email'/>
        {errors.email && <span className='error'>{errors.email}</span>}

        <label>Mobile Number</label>
        <input type='text' name='mobile' value={formData.mobile} onChange={handleChange} placeholder='Enter your mobile number'/>
        {errors.mobile && <span className='error'>{errors.mobile}</span>}

        <label>Date of Birth</label>
        <input type='date' name='dob' value={formData.dob} onChange={handleChange} />
        {errors.dob && <span className='error'>{errors.dob}</span>}

        <label>NIC (Aadhar number)</label>
        <input type='text' name='nic' value={formData.nic} onChange={handleChange} placeholder='Enter your NIC'/>
        {errors.nic && <span className='error'>{errors.nic}</span>}

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
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        {errors.department && <span className='error'>{errors.department}</span>}

        <label>Preferred Doctor</label>
        <select name='doctor' value={formData.doctor} onChange={handleChange} disabled={!formData.department}>
          <option value=''>Select</option>
          {formData.department && doctors[formData.department]?.map((doc) => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
        {errors.doctor && <span className='error'>{errors.doctor}</span>}

        <button type='submit'>Book Appointment</button>
      </form>
    </div>
  );
}
