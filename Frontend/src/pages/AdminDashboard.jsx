import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";
import { FaCalendarCheck, FaEnvelope, FaStethoscope, FaUserDoctor, FaUserInjured, FaUsers } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import DoctorsList from "../components/DoctorsList";
import UsersList from "../components/UsersList";
import AddDepartment from "../components/AddDepartment";
import AppointmentAnalytics from "../components/AppointmentAnalytics";
import Messages from "../components/Messages";


export default function AdminDashboard() {
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    doctor: "",
    department: "",
    status: "",
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-03-15",
      timeSlot: "10:30 AM",
      doctor: "Dr. Smith",
      department: "Cardiology",
      status: "Pending",
      visited: false,
    },
    {
      id: 2,
      patientName: "Jane Doe",
      date: "2025-03-16",
      timeSlot: "2:00 PM",
      doctor: "Dr. Johnson",
      department: "Neurology",
      status: "Completed",
      visited: true,
    },
    {
      id: 3,
      patientName: "Michael Brown",
      date: "2025-03-17",
      timeSlot: "11:45 AM",
      doctor: "Dr. Williams",
      department: "Orthopedics",
      status: "Canceled",
      visited: false,
    },
  ]);

  // Fetch appointments and statistics from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments") // Adjust API URL
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));

    axios
      .get("http://localhost:5000/api/departments/count")
      .then((response) => setDepartmentsCount(response.data.count))
      .catch((error) => console.error("Error fetching departments:", error));

    axios
      .get("http://localhost:5000/api/patients/count")
      .then((response) => setPatientsCount(response.data.count))
      .catch((error) => console.error("Error fetching patients:", error));

    axios
      .get("http://localhost:5000/api/doctors/count")
      .then((response) => setDoctorsCount(response.data.count))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  // Handle Filter Change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply Filters
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      (filters.startDate === "" || appointment.date >= filters.startDate) &&
      (filters.endDate === "" || appointment.date <= filters.endDate) &&
      (filters.doctor === "" || appointment.doctor === filters.doctor) &&
      (filters.department === "" || appointment.department === filters.department) &&
      (filters.status === "" || appointment.status === filters.status)
    );
  });

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      doctor: "",
      department: "",
      status: "",
    });
  };

  return (
    <>

      {/* Heading */}
      <div className="heading">
        <h1>Admin Dashboard</h1>
      </div>

      {/* 🔹 Admin Header */}
      <header className="admin-header">
        <nav>
          <ul>
            <li onClick={() => setActiveTab("dashboard")}><FaHome /> Dashboard</li>
            <li onClick={() => setActiveTab("appointments")}><FaCalendarCheck /> Appointments</li>
            <li onClick={() => setActiveTab("doctors")}><FaUserDoctor /> Doctors List</li>
            <li onClick={() => setActiveTab("users")}><FaUsers /> Users</li>
            <li onClick={() => setActiveTab("departments")}><FaStethoscope /> Add Departments</li>
            <li onClick={() => setActiveTab("messages")}><FaEnvelope /> Messages</li>
          </ul>
        </nav>
      </header>

      <div className="admin-dashboard">
        {activeTab === "dashboard" && (
          <>

            {/* Dashboard Cards */}
            <div className="dashboard-cards">
              <div className="card">
                <FaStethoscope />
                <h3>Total Departments</h3>
                <p>{departmentsCount}</p>
              </div>
              <div className="card">
                <FaUserInjured />
                <h3>Total Patients</h3>
                <p>{patientsCount}</p>
              </div>
              <div className="card">
                <FaCalendarCheck />
                <h3>Total Appointments</h3>
                <p>{appointments.length}</p>
              </div>
              <div className="card">
                <FaUserDoctor />
                <h3>Total Doctors</h3>
                <p>{doctorsCount}</p>
              </div>
            </div>

            {/* Filters Section */}
            <div className="filters">
              <div className="filter-item">
                <label>Start Date</label>
                <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
              </div>

              <div className="filter-item">
                <label>End Date</label>
                <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
              </div>

              <div className="filter-item">
                <label>Doctor</label>
                <select name="doctor" value={filters.doctor} onChange={handleFilterChange}>
                  <option value="">All Doctors</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Department</label>
                <select name="department" value={filters.department} onChange={handleFilterChange}>
                  <option value="">All Departments</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Status</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
              <button>Apply Filters</button>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>

            {/* Table Section */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Appointment Date</th>
                    <th>Time Slot</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.timeSlot}</td>
                        <td>{appointment.doctor}</td>
                        <td>{appointment.department}</td>
                        <td>{appointment.status}</td>
                        <td>{appointment.visited ? "Yes" : "No"}</td>
                      </tr>
                    ))
                  ) : (
                    appointments.map((appointment) => ( // Use dummy data if no filtered data
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.timeSlot}</td>
                        <td>{appointment.doctor}</td>
                        <td>{appointment.department}</td>
                        <td>{appointment.status}</td>
                        <td>{appointment.visited ? "Yes" : "No"}</td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>

          </>

        )}
        {activeTab === "doctors" && <DoctorsList />}
        {activeTab === "users" && <UsersList/>}
        {activeTab === "appointments" && <AppointmentAnalytics/>}
        {activeTab === "departments" && <AddDepartment/>}
        {activeTab === "messages" && <Messages/>}



      </div>
    </>
  );
}
