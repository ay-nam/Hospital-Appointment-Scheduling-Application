import React, { useState } from "react";
import "../styles/Reports.css";

export default function Reports() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [reports, setReports] = useState({});

    // Dummy Data for Patients (Initially No Reports)
    const patients = [
        { id: "1", name: "John Doe", phone: "123-456-7890", email: "johndoe@example.com", department: "Cardiology" },
        { id: "2", name: "Jane Smith", phone: "987-654-3210", email: "janesmith@example.com", department: "Neurology" }
    ];

    // Open Popup and Load Report (If Exists)
    const openPopup = (patient) => {
        setSelectedPatient({
            ...patient,
            report: reports[patient.id] || {
                appointmentDate: "",
                doctorName: "",
                status: "Pending",
                bloodPressure: "",
                heartRate: "",
                bodyTemperature: "",
                oxygenLevels: "",
                allergies: "",
                medications: "",
                followUpPlan: "",
                labTests: "",
                dietaryAdvice: "",
                additionalNotes: ""
            }
        });
    };

    // Close the Popup
    const closePopup = () => {
        setSelectedPatient(null);
    };

    // Handle Report Form Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedPatient((prev) => ({
            ...prev,
            report: { ...prev.report, [name]: value }
        }));
    };

    // Save Report
    const handleSave = () => {
        if (selectedPatient) {
            setReports((prev) => ({
                ...prev,
                [selectedPatient.id]: selectedPatient.report
            }));
            alert("Report saved successfully!");
            closePopup();
        }
    };

    return (
        <div className="reports-container">
            <h1>Patient Reports</h1>

            <div className="report-cards">
                {patients.map((patient) => (
                    <div key={patient.id} className="report-card" onClick={() => openPopup(patient)}>
                        <h3>{patient.name}</h3>
                        <p>{patient.phone}</p>
                        <p>{patient.email}</p>
                        <p>{patient.department}</p>
                    </div>
                ))}
            </div>

            {/* Popup Modal for Creating/Editing Reports */}
            {selectedPatient && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <span className="close-btn" onClick={closePopup}>&times;</span>
                        <h2>Patient Report : {selectedPatient.name}</h2>

                        <div className="popup-body">
                            <h4>Patient Information</h4>
                            <input type="date" name="appointmentDate" value={selectedPatient.report.appointmentDate} onChange={handleChange} placeholder="Appointment Date" />
                            <input type="text" name="doctorName" value={selectedPatient.report.doctorName} onChange={handleChange} placeholder="Doctor's Name" />
                            <select name="status" value={selectedPatient.report.status} onChange={handleChange}>
                                <option>Pending</option>
                                <option>Completed</option>
                                <option>Follow-up Required</option>
                            </select>

                            <h4>Important Measures</h4>
                            <input type="text" name="bloodPressure" value={selectedPatient.report.bloodPressure} onChange={handleChange} placeholder="Blood Pressure" />
                            <input type="text" name="heartRate" value={selectedPatient.report.heartRate} onChange={handleChange} placeholder="Heart Rate" />
                            <input type="text" name="bodyTemperature" value={selectedPatient.report.bodyTemperature} onChange={handleChange} placeholder="Body Temperature" />
                            <input type="text" name="oxygenLevels" value={selectedPatient.report.oxygenLevels} onChange={handleChange} placeholder="Oxygen Levels" />

                            <h4>Allergies</h4>
                            <textarea name="allergies" value={selectedPatient.report.allergies} onChange={handleChange} placeholder="Allergies (if any)"></textarea>

                            <h4>Medications</h4>
                            <textarea name="medications" value={selectedPatient.report.medications} onChange={handleChange} placeholder="Prescribed Medications"></textarea>

                            <h4>Follow-Up Plan</h4>
                            <textarea name="followUpPlan" value={selectedPatient.report.followUpPlan} onChange={handleChange} placeholder="Follow-up Plan"></textarea>

                            <h4>Lab Tests Required</h4>
                            <textarea name="labTests" value={selectedPatient.report.labTests} onChange={handleChange} placeholder="Required Lab Tests"></textarea>

                            <h4>Dietary Advice</h4>
                            <textarea name="dietaryAdvice" value={selectedPatient.report.dietaryAdvice} onChange={handleChange} placeholder="Dietary Advice"></textarea>

                            <h4>Additional Notes</h4>
                            <textarea name="additionalNotes" value={selectedPatient.report.additionalNotes} onChange={handleChange} placeholder="Additional Notes"></textarea>

                            <button className="save-btn" onClick={handleSave}>Save Report</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
