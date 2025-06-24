import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/DoctorAppointmentAnalysis.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DoctorAppointmentAnalysis = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [barCounts, setBarCounts] = useState([]);
    const [statusCounts, setStatusCounts] = useState([]);
    const [totalAppointments, setTotalAppointments] = useState(0);

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            const [dailyRes, statusRes] = await Promise.all([
                axios.get("http://localhost:5000/api/appointments/stats/daily"),
                axios.get("http://localhost:5000/api/appointments/stats/status")
            ]);

            setBarCounts(dailyRes.data);

            let total = 0;
            statusRes.data.forEach(s => total += s.count);
            setTotalAppointments(total);
            setStatusCounts(statusRes.data);
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    };

    const barData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "Appointments",
                data: barCounts,
                backgroundColor: "#007bff",
            },
        ],
    };

    const pieData = {
        labels: statusCounts.map(s => s._id),
        datasets: [
            {
                data: statusCounts.map(s => s.count),
                backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
            },
        ],
    };

    return (
        <div className="doctor-analysis-container">
            <h2>Doctor's Appointment Analysis</h2>

            <div className="summary-box">
                <h3>Total Appointments: <span>{totalAppointments}</span></h3>
            </div>

            <div className="date-filter">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <button className="filter-btn" disabled>Apply Filter</button> {/* filter logic optional */}
            </div>

            <div className="chart-container">
                <div className="chart-box">
                    <h3>Appointments Per Day</h3>
                    <div className="chart">
                        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
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
