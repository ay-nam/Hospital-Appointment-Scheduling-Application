import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DoctorDashboard.css";
import { FaCalendarCheck, FaFileMedical, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import Reports from "../components/Reports";
import AppointmentCalendar from "../components/AppointmentCalendar";
import DoctorAppointmentAnalysis from "../components/DoctorAppointmentAnalysis";

export default function DoctorDashboard() {
    const [activeTab, setActiveTab] = useState("home");
    const [patientsCount, setPatientsCount] = useState(0);
    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const [reportsCount, setReportsCount] = useState(0);
    const [filters, setFilters] = useState({
        searchQuery: "",
        status: "",
        date: "",
    });
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/doctor/stats")
            .then((response) => {
                setPatientsCount(response.data.totalPatients);
                setAppointmentsCount(response.data.totalAppointments);
                setReportsCount(response.data.totalReports);
            })
            .catch((error) => console.error("Error fetching stats:", error));

        axios
            .get("http://localhost:5000/api/doctor/appointments")
            .then((response) => setAppointments(response.data))
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ searchQuery: "", status: "", date: "" });
    };

    const filteredAppointments = appointments.filter((appointment) => {
        return (
            (filters.searchQuery === "" ||
                appointment.patientName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                appointment.email.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
            (filters.status === "" || appointment.status === filters.status) &&
            (filters.date === "" || appointment.date === filters.date)
        );
    });

    return (
        <>
            {/* Doctor Header */}
            <header className="doctor-header">
                <nav>
                    <ul>
                        <li onClick={() => setActiveTab("home")}><FaHome /> Doctor Home</li>
                        <li onClick={() => setActiveTab("appointments")}><FaCalendarCheck /> Appointment Scheduler</li>
                        <li onClick={() => setActiveTab("reports")}><FaFileMedical /> Reports</li>
                        <li onClick={() => setActiveTab("dashboard")}><FaUsers /> Dashboard</li>
                    </ul>
                </nav>
            </header>

            {activeTab === "reports" && <Reports />}
            {activeTab === "appointments" && <AppointmentCalendar/>}
            {activeTab === "dashboard" && <DoctorAppointmentAnalysis/>}


            {/* Doctor Dashboard Content */}
            {activeTab === "home" && (
                <div className="doctor-dashboard">
                    <h1>Doctor Dashboard</h1>

                    {/* Dashboard Cards */}
                    <div className="dashboard-cards">
                        <div className="card">
                            <FaUsers />
                            <h3>Total Patients</h3>
                            <p>{patientsCount}</p>
                        </div>
                        <div className="card">
                            <FaCalendarCheck />
                            <h3>Upcoming Appointments</h3>
                            <p>{appointmentsCount}</p>
                        </div>
                        <div className="card">
                            <FaFileMedical />
                            <h3>Uploaded Reports</h3>
                            <p>{reportsCount}</p>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="filters">
                       
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                name="searchQuery"
                                value={filters.searchQuery}
                                onChange={handleFilterChange}
                                placeholder="Enter Name or Email"
                            />
                        </div>

                      
                        <div className="filter-row">
                            <div className="filter-item">
                                <label>Status</label>
                                <select name="status" value={filters.status} onChange={handleFilterChange}>
                                    <option value="">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>

                            <div className="filter-item">
                                <label>Appointment Date</label>
                                <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
                            </div>

                            <div className="filter-buttons">
                                <button onClick={resetFilters}>Reset Filters</button>
                            </div>
                        </div>
                    </div>


                    {/* Appointments Table */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Visited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.patientName}</td>
                                            <td>{appointment.gender}</td>
                                            <td>{appointment.email}</td>
                                            <td>{appointment.mobileNumber}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.status}</td>
                                            <td>{appointment.visited ? "Yes" : "No"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="8" className="no-data">No Appointments Found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
