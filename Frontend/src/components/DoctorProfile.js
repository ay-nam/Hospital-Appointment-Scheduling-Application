import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/DoctorProfile.css";

export default function DoctorProfile() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/doctors/${id}`)
            .then(res => setDoctor(res.data))
            .catch(err => console.error("Error fetching doctor:", err));
    }, [id]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <div className="doctor-profile">
            <h2>Doctor Profile</h2>
            <img
                src={`http://localhost:5000/uploads/doctors/${doctor.image}`}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="profile-img"
            />
            <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Mobile:</strong> {doctor.mobile}</p>
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>DOB:</strong> {new Date(doctor.dob).toLocaleDateString()}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Department:</strong> {doctor.department?.name}</p>
            <p><strong>License:</strong> {doctor.licenseNumber}</p>
            <embed
                src={`http://localhost:5000/uploads/doctors/${doctor.registrationCertificate}`}
                width="100%"
                height="500px"
                type="application/pdf"
            />
        </div>
    );
}
