import React from 'react'
import '../styles/Login.css'

export default function Login() {
  return (
    <div className='login-container'>
      <h1>Welcome Back</h1>
      <p>Sign in to continue to MediCare</p>

      <input></input>
      <label>

      </label>
      <input></input>
      <label></label>
      <input type='checkbox'></input>
      <p>Remeber me</p>
      <a href='/nopage'>Forgot password?</a>
      <button>Sign In</button>
      <p>Don't have an account?</p>
      <a href='/signup'>Register</a>
    </div>
  )
}
