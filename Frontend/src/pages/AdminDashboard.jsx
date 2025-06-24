import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";
import { FaHome } from "react-icons/fa";
import {
  FaCalendarCheck,
  FaEnvelope,
  FaStethoscope,
  FaUserDoctor,
  FaUserInjured,
  FaUsers,
} from "react-icons/fa6";
import DoctorsList from "../components/DoctorsList";
import UsersList from "../components/UsersList";
import AddDepartment from "../components/AddDepartment";
import AppointmentAnalytics from "../components/AppointmentAnalytics";
import Messages from "../components/Messages";

export default function AdminDashboard() {
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    doctor: "",
    department: "",
    status: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          deptRes,
          patientRes,
          doctorRes,
          appRes,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/departments/count"),
          axios.get("http://localhost:5000/api/patients/count"),
          axios.get("http://localhost:5000/api/doctors/count"),
          axios.get("http://localhost:5000/api/appointments"),
        ]);
        setDepartmentsCount(deptRes.data.count);
        setPatientsCount(patientRes.data.count);
        setDoctorsCount(doctorRes.data.count);
        setAppointments(appRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchAll();
  }, []);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () =>
    setFilters({ startDate: "", endDate: "", doctor: "", department: "", status: "" });

  const filteredAppointments = appointments.filter((app) =>
    (filters.startDate === "" || app.appointmentDate.slice(0, 10) >= filters.startDate) &&
    (filters.endDate === "" || app.appointmentDate.slice(0, 10) <= filters.endDate) &&
    (filters.doctor === "" || app.doctor.firstName + " " + app.doctor.lastName === filters.doctor) &&
    (filters.department === "" || app.department.name === filters.department) &&
    (filters.status === "" || app.status === filters.status.toLowerCase())
  );

  const rowsToShow = activeTab === "dashboard" ? filteredAppointments : [];

  return (
    <>
      <div className="heading">
        <h1>Admin Dashboard</h1>
      </div>

      <header className="admin-header">
        <nav>
          <ul>
            <li onClick={() => setActiveTab("dashboard")}><FaHome /> Dashboard</li>
            <li onClick={() => setActiveTab("appointments")}><FaCalendarCheck /> Appointments</li>
            <li onClick={() => setActiveTab("doctors")}><FaUserDoctor /> Doctors List</li>
            <li onClick={() => setActiveTab("users")}><FaUsers /> Users</li>
            <li onClick={() => setActiveTab("departments")}><FaStethoscope /> Departments</li>
            <li onClick={() => setActiveTab("messages")}><FaEnvelope /> Messages</li>
          </ul>
        </nav>
      </header>

      <div className="admin-dashboard">
        {activeTab === "dashboard" && (
          <>
            <div className="dashboard-cards">
              <div className="card"><FaStethoscope /><h3>Total Departments</h3><p>{departmentsCount}</p></div>
              <div className="card"><FaUserInjured /><h3>Total Patients</h3><p>{patientsCount}</p></div>
              <div className="card"><FaCalendarCheck /><h3>Total Appointments</h3><p>{appointments.length}</p></div>
              <div className="card"><FaUserDoctor /><h3>Total Doctors</h3><p>{doctorsCount}</p></div>
            </div>

            <div className="filters">
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange}/>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange}/>
              <select name="doctor" value={filters.doctor} onChange={handleFilterChange}>
                <option value="">All Doctors</option>
                {appointments.map(app => (
                  <option key={app.doctor._id}>{app.doctor.firstName + " " + app.doctor.lastName}</option>
                ))}
              </select>
              <select name="department" value={filters.department} onChange={handleFilterChange}>
                <option value="">All Departments</option>
                {departmentsCount && appointments.map(app => (
                  <option key={app.department._id}>{app.department.name}</option>
                ))}
              </select>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Status</option>
                <option>pending</option>
                <option>completed</option>
                <option>cancelled</option>
              </select>
            </div>

            <div className="filter-buttons">
              <button onClick={resetFilters}>Reset Filters</button>
            </div>

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
                  {rowsToShow.length > 0 ? rowsToShow.map(app => (
                    <tr key={app._id}>
                      <td>{app.firstName + " " + app.lastName}</td>
                      <td>{new Date(app.appointmentDate).toLocaleDateString()}</td>
                      <td>{app.timeSlot}</td>
                      <td>{app.doctor.firstName + " " + app.doctor.lastName}</td>
                      <td>{app.department.name}</td>
                      <td>{app.status}</td>
                      <td>{app.visited ? "Yes" : "No"}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="7">No Appointments Found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activeTab === "doctors" && <DoctorsList />}
        {activeTab === "users" && <UsersList />}
        {activeTab === "appointments" && <AppointmentAnalytics />}
        {activeTab === "departments" && <AddDepartment />}
        {activeTab === "messages" && <Messages />}
      </div>
    </>
  );
}
