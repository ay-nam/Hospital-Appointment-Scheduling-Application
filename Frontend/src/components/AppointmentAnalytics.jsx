import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AppointmentAnalytics.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


export default function AppointmentAnalytics() {

  const [byDate, setByDate] = useState(null);
  const [byDepartment, setByDepartment] = useState(null);
  const [byDoctor, setByDoctor] = useState(null);
  const [byStatus, setByStatus] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [dateRes, deptRes, doctorRes, statusRes] = await Promise.all([
          axios.get("http://localhost:5000/api/appointments/stats/by-date"),
          axios.get("http://localhost:5000/api/appointments/stats/by-department"),
          axios.get("http://localhost:5000/api/appointments/stats/by-doctor"),
          axios.get("http://localhost:5000/api/appointments/stats/by-status")
        ]);

        setByDate({
          labels: dateRes.data.map(item => item._id),
          datasets: [{
            label: "Appointments",
            data: dateRes.data.map(item => item.count),
            backgroundColor: "#4caf50"
          }]
        });

        setByDepartment({
          labels: deptRes.data.map(item => item._id),
          datasets: [{
            label: "Appointments",
            data: deptRes.data.map(item => item.count),
            backgroundColor: ["#f44336", "#2196f3", "#ff9800", "#4caf50", "#9c27b0"]
          }]
        });

        setByDoctor({
          labels: doctorRes.data.map(item => item._id),
          datasets: [{
            label: "Appointments",
            data: doctorRes.data.map(item => item.count),
            backgroundColor: "#ff9800"
          }]
        });

        setByStatus({
          labels: statusRes.data.map(item =>item._id),
          datasets: [{
            data: statusRes.data.map(item => item.count),
            backgroundColor: ["#ffeb3b", "#4caf50", "#f44336"]
          }]
        });

      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);


  return (
    <div className="admin-analytics-container">
      <h2>Appointment Analytics</h2>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Appointments by Date</h3>
          {byDate && <Bar data={byDate} />}
        </div>

        <div className="chart-box">
          <h3>Appointments by Department</h3>
          {byDepartment && <Bar data={byDepartment} />}
        </div>

        <div className="chart-box">
          <h3>Appointments by Doctor</h3>
          {byDoctor && <Bar data={byDoctor} />}
        </div>

        <div className="chart-box">
          <h3>Appointments by Status</h3>
          {byStatus && <Pie data={byStatus} />}
        </div>

      </div>
    </div>
  );
}
