import React from 'react'
import '../styles/UserAppointment.css'
import { FaCalendar, FaClock, FaDownload, FaEye, FaFilter, } from 'react-icons/fa6'
import { FaRedo } from 'react-icons/fa'

export default function UserAppointment() {
    return (
        <div className='user-appointment'>
            <div className='heading'>
                <FaCalendar />
                <h1>My Appointments</h1>
            </div>

            <div className='filters'>
                <div className='filter-item'>
                    <label>Status</label>
                    <select name='status'>
                        <option value='all'>All Statuses</option>
                        <option value='completed'>Completed</option>
                        <option value='pending'>Pending</option>
                        <option value='cancelled'>Cancelled</option>
                    </select>
                </div>

                <div className='filter-item'>
                    <label>Department</label>
                    <select name='department'>
                        <option value='all'>All Departments</option>
                        <option value='cardiology'>Cardiology</option>
                        <option value='neurology'>Neurology</option>
                    </select>
                </div>

                <div className='filter-item'>
                    <label>Date</label>
                    <input type='date' name='date' />
                </div>

            </div>

            <div className='filter-buttons'>
                <button ><FaFilter /> Apply Filters</button>
                <button ><FaRedo /> Reset</button>
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
                            <th>Actions</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01/17/2025</td>
                            <td>Patient 1</td>
                            <td>9:00 AM - 10:00 AM</td>
                            <td>Pulminology</td>
                            <td>Doctor 3</td>
                            <td><label style={{ backgroundColor: 'green' }}>Completed</label></td>
                            <td><label style={{ backgroundColor: 'orange' }}>Not Visited</label></td>
                            <td className='actions'>
                                <button><FaEye /> Details</button>
                                <button><FaClock /> Reschedule</button>
                            </td>
                            <td><button className="report-btn">Get Report</button></td>
                            <td> <button className="report-btn"><FaDownload /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
