import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/DoctorAppointmentAnalysis.css";
// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DoctorAppointmentAnalysis = () => {
    // State for date filtering
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Sample data for appointments per day
    const barData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Appointments",
                data: [5, 8, 6, 10, 7, 4, 3], // Example data
                backgroundColor: "#007bff",
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true },
        },
    };

    // Sample data for appointment status distribution
    const pieData = {
        labels: ["Completed", "Pending", "Cancelled"],
        datasets: [
            {
                data: [50, 30, 20], // Example percentage values
                backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
            },
        ],
    };

    return (
        <div className="doctor-analysis-container">
            <h2>Doctor's Appointment Analysis</h2>

            {/* Total Appointments */}
            <div className="summary-box">
                <h3>Total Appointments: <span>85</span></h3>
            </div>

            {/* Date Range Filter */}
            <div className="date-filter">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <button className="filter-btn">Apply Filter</button>
            </div>

            <div className="chart-container">
                <div className="chart-box">
                    <h3>Appointments Per Day</h3>
                    <div className="chart">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                <div className="chart-box">
                    <h3>Appointment Status Distribution</h3>
                    <div className="chart">
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointmentAnalysis;
