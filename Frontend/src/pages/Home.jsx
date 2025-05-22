import React, { useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import cardiology from '../assets/cardiology.jpg';
import neurology from '../assets/neurology.jpg';
import pediatrics from '../assets/pediatrics.jpg';
import orthopedics from '../assets/orthopedics.jpg';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HealthCare Plus</h1>
          <p>Providing Excellence in Healthcare Services</p>
          <Link to="/appointment" className="cta-button">Book Appointment</Link>
        </div>
      </div>

      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>To provide exceptional healthcare services with compassion and expertise, ensuring every patient receives personalized care and the best possible medical outcomes. We are committed to innovation, excellence, and the well-being of our community.</p>
        </div>
      </div>

      <div className="departments-section">
        <h2>Our Departments</h2>
        <div className="departments-grid">
          {/* <div className="department-card">
            <img src={cardiology} alt="Cardiology" />
            <h3>Cardiology</h3>
            <p>Expert care for heart-related conditions</p>
          </div> */}
          <div className="department-card">
            <img src={neurology}alt="Neurology" />
            <h3>Neurology</h3>
            <p>Specialized treatment for neurological disorders</p>
          </div>
          <div className="department-card">
            <img src={pediatrics} alt="Pediatrics" />
            <h3>Pediatrics</h3>
            <p>Comprehensive care for children</p>
          </div>
          <div className="department-card">
            <img src={orthopedics}  alt="Orthopedics" />
            <h3>Orthopedics</h3>
            <p>Treatment for bone and joint conditions</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Home;