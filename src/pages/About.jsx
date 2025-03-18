import React from 'react'
import { FaHeartPulse, FaNotesMedical, FaPeopleGroup, FaShield } from "react-icons/fa6";
import '../styles/About.css'

export default function About() {
  return (
    <div className='aboutus'>
      <div className='header'>
        <FaNotesMedical style={{ width: "50px", height: "50px" }} />
        <h1>Medi Care Healthcare Institute</h1>
        <p>Transforming Healthcare Through Compassion,Innovation and Excellence</p>
      </div>

      <div className='middle'>
        <img src='../images/doctor.avif' alt='MediCare Healthcare' />
        <div className='ourstory'>
          <h2>Our Story</h2>
          <p>Founded in 2005, Care Wave Healthcare Institute emerged from a vision to revolutionize patient care. We believe that healthcare is more than treatment-it's about holistic well- being, personalized attention, and creating meaningful connections with our patients. </p>
          <p>Our journey began with a simple yet powerful mission: to provide compassionate, cutting- edge healthcare that transforms lives and communities.</p>
        </div>
      </div>

      <div className='corevalues-container'>
        <div className='corevalues'>
          <h2>Our Core Values</h2>
          <ul>
            <li>
              <FaHeartPulse style={{ width: "40px", height: "40px", color:"#1f78b4"}}/>
              <h3>Compassionate Care</h3>
              <p>We prioritize empathy and understanding in every patient interaction.</p>
            </li>
            <li>
              <FaShield style={{ width: "40px", height: "40px", color:"#1f78b4"}}/>
              <h3>Patient Safety</h3>
              <p>Our highest commitment is ensuring the safety and well- being of our patients.</p>
            </li>
            <li>
              <FaPeopleGroup style={{ width: "40px", height: "40px", color:"#1f78b4"}} />
              <h3>Community Focus</h3>
              <p>We believe in serving and supporting our local healthcare community.</p>
            </li>
          </ul>

          <div className='leadership'>
            <h2>Meet Our Leadership</h2>
            <ul>
              <li>
                <img src='../images/person1.jpg' alt='person1' />
                <h4>Dr.Emily Rodriguez</h4>
                <p>Chief Medical Officer</p>
              </li>
              <li>
                <img src='../images/person2.jpg' alt='person2' />
                <h4>Michael Chen</h4>
                <p>Head of Operations</p>
              </li>
              <li>
                <img src='../images/person3.jpg' alt='person3' />
                <h4>John Thompson</h4>
                <p>Chief Nursing Officer</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
