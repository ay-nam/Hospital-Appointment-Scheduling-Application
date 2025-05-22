import React, { useState } from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor'  // Default role
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [switchRole, setSwitchRole] = useState('Doctor');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggle = () => {
    setSwitchRole(switchRole === 'Doctor' ? 'Admin' : 'Doctor');
    setFormData({
      ...formData,
      role: switchRole === 'Doctor' ? 'admin' : 'doctor'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        withCredentials: true
      });
      
      if (response.data) {
        alert(`${switchRole} registration successful!`);
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h1>MediCare Medical Institute</h1>
        <h2>{switchRole} Signup</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            placeholder='Enter name'
            onChange={handleChange}
            required
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            placeholder='Enter email'
            onChange={handleChange}
            required
          />
          <label htmlFor='password'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={formData.password}
            placeholder='Enter password'
            onChange={handleChange}
            required
          />
        </form>
        <div className='signup-password-toggle'>
          <div className='signup-password'>
            <input
              type='checkbox'
              id='show-password'
              onClick={togglePassword}
            />
            <label htmlFor='show-password'>Show Password</label>
          </div>

          <div className='signup-toggle'>
            <label className='switch'>
              <input
                type='checkbox'
                id='switch'
                onClick={handleToggle}
              />
              <span className="slider round"></span>
            </label>
            <label htmlFor='switch'>Switch to {switchRole === 'Doctor' ? 'Admin' : 'Doctor'}</label>
          </div>
        </div>

        <button onClick={handleSubmit}>Sign Up as {switchRole}</button>
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}
