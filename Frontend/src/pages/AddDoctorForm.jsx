import React, { useState } from 'react';
import '../styles/AddDoctorForm.css';

export default function AddDoctorForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    specialization: '',
    experience: '',
    qualification: '',
    licenseNumber: '',
    profileImage: null,
    medicalCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'General Medicine'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.specialization) newErrors.specialization = 'Please select a specialization';
    if (!formData.experience || formData.experience < 1) newErrors.experience = 'Experience must be at least 1 year';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';
    if (!formData.medicalCertificate) newErrors.medicalCertificate = 'Medical registration certificate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Doctor Added Successfully!');
      console.log('Doctor Data:', formData);
    }
  };

  return (
    <div className='doctor-form-container'>
      <h1>Add Doctor</h1>
      <form className='doctor-form' onSubmit={handleSubmit}>

        <label>First Name</label>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter first name' />
        {errors.firstName && <span className='error'>{errors.firstName}</span>}

        <label>Last Name</label>
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter last name' />
        {errors.lastName && <span className='error'>{errors.lastName}</span>}

        <label>Date of Birth</label>
        <input type='date' name='dob' value={formData.dob} onChange={handleChange} />
        {errors.dob && <span className='error'>{errors.dob}</span>}

        <label>Gender</label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value=''>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
        {errors.gender && <span className='error'>{errors.gender}</span>}

        <label>Specialization</label>
        <select name='specialization' value={formData.specialization} onChange={handleChange}>
          <option value=''>Select</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        {errors.specialization && <span className='error'>{errors.specialization}</span>}

        <label>Experience (Years)</label>
        <input type='number' name='experience' value={formData.experience} onChange={handleChange} placeholder='Enter years of experience' />
        {errors.experience && <span className='error'>{errors.experience}</span>}

        <label>Qualification</label>
        <input type='text' name='qualification' value={formData.qualification} onChange={handleChange} placeholder='Enter qualification (e.g., MBBS, MD)' />
        {errors.qualification && <span className='error'>{errors.qualification}</span>}

        <label>License Number</label>
        <input type='text' name='licenseNumber' value={formData.licenseNumber} onChange={handleChange} placeholder='Enter license number' />
        {errors.licenseNumber && <span className='error'>{errors.licenseNumber}</span>}

        <label>Profile Image</label>
        <input type='file' name='profileImage' onChange={handleFileChange} accept='image/*' />
        {errors.profileImage && <span className='error'>{errors.profileImage}</span>}

        <label>Medical Registration Certificate</label>
        <input type='file' name='medicalCertificate' onChange={handleFileChange} accept='application/pdf, image/*' />
        {errors.medicalCertificate && <span className='error'>{errors.medicalCertificate}</span>}

        <button type='submit'>Add Doctor</button>
      </form>
    </div>
  );
}
