import React, { useState, useEffect } from "react";
import "../styles/DoctorsList.css";
import { FaUserDoctor, FaEnvelope, FaPhone, FaCakeCandles, FaHospital, FaIdCard, FaVenusMars } from "react-icons/fa6";


// Dummy doctors list
const dummyDoctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    experience: 10,
    email: "johndoe@example.com",
    phone: "+1 123-456-7890",
    dob: "1980-05-15",
    department: "Cardiology",
    nic: "123456789V",
    gender: "Male",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Dr. Sarah Williams",
    specialization: "Neurologist",
    experience: 8,
    email: "sarahw@example.com",
    phone: "+1 987-654-3210",
    dob: "1985-07-22",
    department: "Neurology",
    nic: "987654321X",
    gender: "Female",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Dr. Michael Smith",
    specialization: "Orthopedic Surgeon",
    experience: 12,
    email: "michaelsmith@example.com",
    phone: "+1 555-777-9999",
    dob: "1975-12-30",
    department: "Orthopedics",
    nic: "456123789L",
    gender: "Male",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  }
];

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Using dummy data instead of API
    setDoctors(dummyDoctors);
  }, []);

  return (
    <div className="doctors-list">
      <h2>Doctors List</h2>
      <div className="doctors-container">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <img src={doctor.profilePic} alt={doctor.name} className="doctor-image" />
              <h3>{doctor.name}</h3>
              <p className="specialization"><FaUserDoctor /> {doctor.specialization}</p>
              <p><FaEnvelope /> {doctor.email}</p>
              <p><FaPhone /> {doctor.phone}</p>
              <p><FaCakeCandles /> DOB: {doctor.dob}</p>

              <p><FaHospital /> Department: {doctor.department}</p>
              <p><FaIdCard /> NIC: {doctor.nic}</p>
              <p><FaVenusMars /> Gender: {doctor.gender}</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))
        ) : (
          <p className="no-data">No doctors found</p>
        )}
      </div>
    </div>
  );
}
