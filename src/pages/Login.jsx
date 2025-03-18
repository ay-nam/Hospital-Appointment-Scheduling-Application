import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import '../styles/Login.css'

export default function Login() {

  const [formData,setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : [e.target.value]
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Form data Submitted: ",formData);
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1>Welcome Back</h1>
        <p>Sign in to continue to MediCare</p>

        <form onSubmit={handleLogin}>
          <div className='login-input1'>
            <label htmlFor='email' ><FaEnvelope /></label>
            <input
              type='email'
              id='email'
              name='email'
              value= {formData.email}
              placeholder='Enter your email' 
              onChange={handleChange} 
              required
              />
          </div>

          <div className='login-input1'>
            <label htmlFor='password'><FaLock /></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value= {formData.password}
              placeholder='Enter your password'
              onChange={handleChange} 
              required
              />
            <span onClick={togglePassword} style={{ cursor: "pointer",  position:"absolute", right:"10px" }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className='login-input2'>
            <input
              type='checkbox'
              id='remember-me'
              name='remember-me' 
              style={{cursor:"pointer"}}/>
            <label htmlFor='remember-me' style={{color:"rgb(107, 106, 106)"}}>Remember me</label>
            <a href='/nopage' style={{color:"rgb(24, 110, 207)", textDecoration:"none" }}>Forgot password?</a>
          </div>


          <button>Sign In</button>
        </form>

        <p >Don't have an account?<a href='/signup' style={{color:"rgb(24, 110, 207)", textDecoration:"none",fontWeight: "bold", paddingLeft:"3px"}}>Register</a></p>
      </div>
    </div>
  )
}
