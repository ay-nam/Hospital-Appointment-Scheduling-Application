import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer-container'>

      <div className='footer'>
        <h1>Quick Links</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/appointment'>Appointment</Link></li>
          <li><Link to='/about'>About Us</Link></li>
        </ul>
      </div>

      <div className='footer'>
        <h1>Working Hours</h1>
        <ul>
          <li>Monday : 9:00 AM - 11:00 PM</li>
          <li>Tuesday : 12:00 PM - 12:00 PM</li>
          <li>Wednesday : 10:00 AM - 10:00 PM</li>
          <li>Thursday : 9:00 AM - 9:00 PM</li>
          <li>Friday : 3:00 PM - 9:00 PM</li>
          <li>Saturday : 9:00 AM - 3:00 PM</li>
        </ul>
      </div>

      <div className='footer'>
        <h1>Contact</h1>
        <ul>
          <li>999-999-999</li>
          <li>zeelab@gmail.com</li>
          <li>Karachi,Pakistan</li>
        </ul>
      </div>

    </div>
  )
}
