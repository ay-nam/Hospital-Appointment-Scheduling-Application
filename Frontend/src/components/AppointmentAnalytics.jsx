import React from "react";
import "../styles/AppointmentAnalytics.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Dummy Data for Charts
const appointmentsByDate = {
  labels: ["March 10", "March 11", "March 12", "March 13", "March 14"],
  datasets: [
    {
      label: "Appointments",
      data: [5, 8, 6, 10, 7],
      backgroundColor: "#4caf50",
    },
  ],
};

const appointmentsByDepartment = {
  labels: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics"],
  datasets: [
    {
      label: "Appointments",
      data: [10, 7, 5, 12, 9],
      backgroundColor: ["#f44336", "#2196f3", "#ff9800", "#4caf50", "#9c27b0"],
    },
  ],
};

const appointmentsByDoctor = {
  labels: ["Dr. Smith", "Dr. Johnson", "Dr. Brown", "Dr. Lee", "Dr. Davis"],
  datasets: [
    {
      label: "Appointments",
      data: [12, 8, 10, 6, 9],
      backgroundColor: "#ff9800",
    },
  ],
};

const appointmentsByStatus = {
  labels: ["Pending", "Completed", "Canceled"],
  datasets: [
    {
      data: [10, 30, 5],
      backgroundColor: ["#ffeb3b", "#4caf50", "#f44336"],
    },
  ],
};

export default function AppointmentAnalytics() {
  return (
    <div className="admin-analytics-container">
      <h2>Appointment Analytics</h2>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Appointments by Date</h3>
          <Bar data={appointmentsByDate} />
        </div>

        <div className="chart-box">
          <h3>Appointments by Department</h3>
          <Bar data={appointmentsByDepartment} />
        </div>

        <div className="chart-box">
          <h3>Appointments by Doctor</h3>
          <Bar data={appointmentsByDoctor} />
        </div>

        <div className="chart-box">
          <h3>Appointments by Status</h3>
          <Pie data={appointmentsByStatus} />
        </div>
      </div>
    </div>
  );
}
