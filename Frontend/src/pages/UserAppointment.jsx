import React, { useEffect, useState } from 'react';
import '../styles/UserAppointment.css';
import axios from 'axios';
import { FaClock, FaDownload, FaEye, FaFilter } from 'react-icons/fa6';
import { FaRedo } from 'react-icons/fa';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

export default function UserAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filters, setFilters] = useState({ status: 'all', department: 'all', date: '' });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/appointments/my', { withCredentials: true });
                setAppointments(res.data);
            } catch (err) {
                console.error('Error fetching user appointments:', err);
            }
        };
        const fetchDepartments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/departments');
                setDepartments(res.data);
            } catch (err) {
                console.error('Error fetching departments:', err);
            }
        };
        fetchAppointments();
        fetchDepartments();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ status: 'all', department: 'all', date: '' });
    };

    const filteredAppointments = appointments.filter((app) => {
        return (
            (filters.status === 'all' || app.status === filters.status) &&
            (filters.department === 'all' || app.department.name === filters.department) &&
            (filters.date === '' || app.appointmentDate.startsWith(filters.date))
        );
    });

    const handleDetails = (appointment) => {
        Swal.fire({
            title: `<strong>Appointment Details</strong>`,
            icon: 'info',
            html: `
        <div style="text-align:left; font-size:16px; line-height:1.8">
          <p><strong>👤 Name:</strong> ${appointment.firstName} ${appointment.lastName}</p>
          <p><strong>📧 Email:</strong> ${appointment.email}</p>
          <p><strong>📞 Mobile:</strong> ${appointment.mobile}</p>
          <p><strong>🏥 Department:</strong> ${appointment.department.name}</p>
          <p><strong>🧑‍⚕️ Doctor:</strong> ${appointment.doctor.firstName} ${appointment.doctor.lastName}</p>
          <p><strong>📅 Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
          <p><strong>🕒 Time:</strong> ${appointment.timeSlot}</p>
          <p><strong>📌 Status:</strong> <span style="color:${appointment.status === 'completed' ? 'green' : appointment.status === 'pending' ? 'orange' : 'red'}">${appointment.status}</span></p>
          <p><strong>✔️ Visited:</strong> ${appointment.visited ? 'Yes' : 'No'}</p>
        </div>
      `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Close',
            width: '40rem',
            customClass: {
                popup: 'appointment-detail-popup'
            }
        });
    };

    const handleReschedule = (appointment) => {
        Swal.fire({
            title: 'Reschedule Appointment',
            html: `
        <input type="date" id="newDate" class="swal2-input" placeholder="New Date">
        <input type="text" id="newTime" class="swal2-input" placeholder="New Time Slot">
      `,
            preConfirm: () => {
                const newDate = document.getElementById('newDate').value;
                const newTime = document.getElementById('newTime').value;
                if (!newDate || !newTime) {
                    Swal.showValidationMessage('Both date and time are required');
                }
                return { newDate, newTime };
            },
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { newDate, newTime } = result.value;
                    await axios.put(`http://localhost:5000/api/appointments/${appointment._id}/reschedule`, {
                        newDate,
                        newTime,
                    });
                    Swal.fire('Rescheduled!', 'Your appointment has been updated.', 'success');
                    window.location.reload();
                } catch (err) {
                    Swal.fire('Error', 'Failed to reschedule.', 'error');
                }
            }
        });
    };

    const handleDownload = async (appointmentId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/reports/${appointmentId}`, { withCredentials: true });
            const report = res.data;

            const previewHtml = `
            <strong>Patient:</strong> ${report.patientId.firstName} ${report.patientId.lastName}<br/>
            <strong>NIC:</strong> ${report.patientId.NIC}<br/>
            <strong>Doctor:</strong> ${report.doctorId.firstName} ${report.doctorId.lastName}<br/>
            <strong>Status:</strong> ${report.status}<br/>
            <strong>Disease Details:</strong> ${report.diseaseDetails}<br/>
            <strong>Allergies:</strong> ${report.allergies.join(', ') || 'N/A'}<br/>
            <strong>Medications:</strong> ${report.medications || 'N/A'}<br/>
            <strong>Follow Up:</strong> ${report.followUpPlan || 'N/A'}<br/>
            <strong>Dietary Advice:</strong> ${report.dietaryAdvice || 'N/A'}<br/>
            <strong>Notes:</strong> ${report.notes || 'N/A'}<br/>
            <strong>Important Measures:</strong><br/>
            ${report.importantMeasures.map(m => `&nbsp;&nbsp;&nbsp;&nbsp;- ${m.label}: ${m.value}`).join('<br/>')}
          `;

            Swal.fire({
                title: 'Report Preview',
                html: previewHtml,
                width: 700,
                showCancelButton: true,
                confirmButtonText: 'Download as PDF',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const doc = new jsPDF();
                    doc.setFontSize(12);
                    doc.text(`Patient Report`, 20, 20);
                    doc.setFontSize(10);

                    let y = 30;
                    doc.text(`Patient: ${report.patientId.firstName} ${report.patientId.lastName}`, 20, y);
                    doc.text(`NIC: ${report.patientId.NIC}`, 20, y += 7);
                    doc.text(`Doctor: ${report.doctorId.firstName} ${report.doctorId.lastName}`, 20, y += 7);
                    doc.text(`Status: ${report.status}`, 20, y += 7);
                    doc.text(`Disease Details: ${report.diseaseDetails}`, 20, y += 7);
                    doc.text(`Allergies: ${report.allergies.join(', ')}`, 20, y += 7);
                    doc.text(`Medications: ${report.medications || 'N/A'}`, 20, y += 7);
                    doc.text(`Follow Up Plan: ${report.followUpPlan || 'N/A'}`, 20, y += 7);
                    doc.text(`Dietary Advice: ${report.dietaryAdvice || 'N/A'}`, 20, y += 7);
                    doc.text(`Notes: ${report.notes || 'N/A'}`, 20, y += 7);

                    doc.text(`Important Measures:`, 20, y += 10);
                    report.importantMeasures.forEach(m => {
                        doc.text(`- ${m.label}: ${m.value}`, 25, y += 6);
                    });

                    doc.save(`report_${appointmentId}.pdf`);
                }
            });
        } catch (err) {
            Swal.fire('No Report', 'No report found for this appointment.', 'warning');
        }
    };

    return (
        <div className='user-appointment'>
            <div className='heading'>
                <h1>My Appointments</h1>
            </div>

            <div className='filters'>
                <div className='filter-item'>
                    <label>Status</label>
                    <select name='status' value={filters.status} onChange={handleFilterChange}>
                        <option value='all'>All Statuses</option>
                        <option value='completed'>Completed</option>
                        <option value='pending'>Pending</option>
                        <option value='cancelled'>Cancelled</option>
                    </select>
                </div>

                <div className='filter-item'>
                    <label>Department</label>
                    <select name='department' value={filters.department} onChange={handleFilterChange}>
                        <option value='all'>All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                <div className='filter-item'>
                    <label>Date</label>
                    <input type='date' name='date' value={filters.date} onChange={handleFilterChange} />
                </div>
            </div>

            <div className='filter-buttons'>
                <button onClick={() => null}><FaFilter /> Apply Filters</button>
                <button onClick={resetFilters}><FaRedo /> Reset</button>
            </div>

            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Appointment Date</th>
                            <th>Patient Name</th>
                            <th>Time Slot</th>
                            <th>Department</th>
                            <th>Doctor</th>
                            <th>Appointment Status</th>
                            <th>Visited</th>
                            <th colSpan='3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? filteredAppointments.map((a) => (
                            <tr key={a._id}>
                                <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                                <td>{a.firstName} {a.lastName}</td>
                                <td>{a.timeSlot}</td>
                                <td>{a.department?.name}</td>
                                <td>{a.doctor?.firstName} {a.doctor?.lastName}</td>
                                <td><label style={{ backgroundColor: a.status === 'completed' ? 'green' : a.status === 'pending' ? 'orange' : 'red', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{a.status}</label></td>
                                <td><label style={{ backgroundColor: a.visited ? 'green' : 'orange', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{a.visited ? 'Visited' : 'Not Visited'}</label></td>
                                <td><button onClick={() => handleDetails(a)}><FaEye /> Details</button></td>
                                <td><button onClick={() => handleReschedule(a)}><FaClock /> Reschedule</button></td>
                                <td>
                                    <button onClick={() => handleDownload(a._id)}>
                                        <FaDownload />
                                    </button>
                                </td>

                            </tr>
                        )) : (
                            <tr>
                                <td colSpan='10'>No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
