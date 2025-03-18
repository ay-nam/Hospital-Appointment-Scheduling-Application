import React, { useState } from 'react'
import '../styles/Signup.css'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.username || e.target.email || e.target.password) {
      alert("Please fill out all the fields before submitting.");
      return;
    }

    if (window.confirm(`Are you sure you want to signup as ${formData.username}? You will be registering with the email ${formData.email}`)) {
      console.log("Form data Submitted: ", formData);
    }

  }

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h1>MediCare Medical Institute</h1>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>User Name</label>
          <input
            type='username'
            id='username'
            name='username'
            value={formData.username}
            placeholder='Enter username'
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
            <label htmlFor='show-password' >Show Password</label>
          </div>
        </div>

        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  )
}
