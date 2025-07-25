import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DoctorsList.css";
import {
  FaUserDoctor, FaEnvelope, FaPhone, FaCakeCandles,
  FaHospital, FaIdCard, FaVenusMars
} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors-list">
      <h2>Doctors List</h2>
      <div className="doctors-container">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <img src={`http://localhost:5000/uploads/doctors/${doctor.image}`} alt={`${doctor.firstName} ${doctor.lastName}`} className="doctor-image" />
              <h3>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
              <p className="specialization"><FaUserDoctor /> {doctor.qualification} ({doctor.experience} yrs)</p>
              <p><FaEnvelope /> {doctor.email}</p>
              <p><FaPhone /> {doctor.mobile}</p>
              <p><FaCakeCandles /> DOB: {new Date(doctor.dob).toLocaleDateString()}</p>
              <p><FaHospital /> Department: {doctor.department?.name}</p>
              <p><FaIdCard /> License: {doctor.licenseNumber}</p>
              <p><FaVenusMars /> Gender: {doctor.gender}</p>
              <button
                className="view-profile-btn"
                onClick={() => navigate(`/admin/doctor/${doctor._id}`)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No doctors found</p>
        )}
      </div>
    </div>
  );
}
