import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddDoctorForm.css';
import Swal from 'sweetalert2';


export default function AddDoctorForm() {
  const navigates = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // 🚫 Redirect if no email passed
  useEffect(() => {
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please sign up as a doctor first.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        navigates('/signup');
      });
    }
  }, [email, navigates]);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    mobile: '',
    experience: '',
    qualification: '',
    licenseNumber: '',
    department: '',
    profileImage: null,
    medicalCertificate: null,
  });


  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Error fetching departments:', err));
  }, []);

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
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.experience || formData.experience < 1) newErrors.experience = 'Experience must be at least 1 year';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';
    if (!formData.medicalCertificate) newErrors.medicalCertificate = 'Medical registration certificate is required';
    if (!formData.department) newErrors.department = 'Please select a department';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const doctorData = new FormData();
    for (let key in formData) {
      doctorData.append(key, formData[key]);
    }

    // Add email manually
    doctorData.append('email', email);

    try {
      await axios.post('http://localhost:5000/api/doctors', doctorData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      Swal.fire({
        icon: 'success',
        title: 'Doctor Added Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/admin-dashboard');

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add Doctor',
        showConfirmButton: false,
        timer: 1500
      });
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

        <label>Mobile Number</label>
        <input
          type='tel'
          name='mobile'
          value={formData.mobile}
          onChange={handleChange}
          placeholder='Enter mobile number'
        />
        {errors.mobile && <span className='error'>{errors.mobile}</span>}


        <label>Department</label>
        <select name='department' value={formData.department} onChange={handleChange}>
          <option value=''>Select Department</option>
          {departments.map(dept => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
        {errors.department && <span className='error'>{errors.department}</span>}

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