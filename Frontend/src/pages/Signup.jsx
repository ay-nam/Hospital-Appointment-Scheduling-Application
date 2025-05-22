import React, { useState } from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'  
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (response.data) {
        alert('Registration successful!');
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
        <h2>Signup</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            placeholder='Enter your name'
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
        </div>

        <button onClick={handleSubmit}>Sign Up</button>
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}
