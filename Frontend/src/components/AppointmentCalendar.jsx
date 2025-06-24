import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/AppointmentCalendar.css";

export default function AppointmentCalendar() {
    const [events, setEvents] = useState([]);
    const [doctorId, setDoctorId] = useState("684d58f5ddd07119fc68c621"); // Set current doctor ID

    // Reschedule State
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    // Leave State
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [leaveDate, setLeaveDate] = useState("");
    const [leaveReason, setLeaveReason] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch appointments
                const appointmentRes = await axios.get("http://localhost:5000/api/appointments");
                const appointments = appointmentRes.data.map(appt => ({
                    id: appt._id,
                    title: `${appt.firstName} ${appt.lastName} - ${appt.department?.name || ""}`,
                    date: appt.appointmentDate,
                    nic: appt.NIC,
                    time: appt.timeSlot,
                    isAppointment: true
                }));

                // 2. Fetch doctor leaves
                const leaveRes = await axios.get(`http://localhost:5000/api/doctors/${doctorId}/leaves`);
                const leaves = leaveRes.data.map((leave, index) => ({
                    id: `leave-${index}`,
                    title: "🚫 Leave",
                    date: leave.leaveDate,
                    reason: leave.leaveReason,
                    isAppointment: false
                }));

                setEvents([...appointments, ...leaves]);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [doctorId]);

    // Modal handlers
    const openRescheduleModal = (appointment) => {
        setSelectedAppointment(appointment);
        setRescheduleModalOpen(true);
    };

    const closeRescheduleModal = () => {
        setRescheduleModalOpen(false);
        setSelectedAppointment(null);
        setNewDate("");
        setNewTime("");
    };

    const confirmReschedule = () => {
        if (!newDate || !newTime) return alert("Select both new date and time.");

        setEvents(events.map(event =>
            event.id === selectedAppointment.id
                ? { ...event, date: newDate, time: newTime }
                : event
        ));

        alert(`Appointment rescheduled to ${newDate} at ${newTime}`);
        closeRescheduleModal();
    };

    const openLeaveModal = () => setLeaveModalOpen(true);
    const closeLeaveModal = () => {
        setLeaveModalOpen(false);
        setLeaveDate("");
        setLeaveReason("");
    };

    const confirmLeave = async () => {
        if (!leaveDate || !leaveReason) return alert("Enter both date and reason.");

        try {
            await axios.post(`http://localhost:5000/api/doctors/${doctorId}/leaves`, {
                leaveDate,
                leaveReason
            });

            setEvents(prev => [
                ...prev,
                {
                    id: `leave-${Date.now()}`,
                    title: "🚫 Leave",
                    date: leaveDate,
                    reason: leaveReason,
                    isAppointment: false
                }
            ]);
            alert("Leave added successfully.");
            closeLeaveModal();
        } catch (err) {
            console.error("Error adding leave:", err);
            alert("Error adding leave.");
        }
    };

    return (
        <div className="calendar-container">
            <h1>Appointment Calendar</h1>

            <div className="actions">
                <button className="leave-btn" onClick={openLeaveModal}>Add Leave</button>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events.map(event => ({
                    title: event.title + (event.time ? ` (${event.time})` : ""),
                    date: event.date
                }))}
            />

            {/* Appointment List */}
            <div className="appointment-list">
                <h2>Upcoming Appointments</h2>
                {events.map(event => (
                    <div key={event.id} className="appointment-card">
                        <h3>{event.title}</h3>
                        {event.nic && <p><b>NIC:</b> {event.nic}</p>}
                        <p><b>Date:</b> {event.date}</p>
                        {event.time && <p><b>Time:</b> {event.time}</p>}
                        {event.reason && <p><b>Reason:</b> {event.reason}</p>}
                        {event.isAppointment && (
                            <button onClick={() => openRescheduleModal(event)}>Reschedule</button>
                        )}
                    </div>
                ))}
            </div>

            {/* Reschedule Modal */}
            {rescheduleModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Reschedule Appointment</h2>
                        <p><b>Patient:</b> {selectedAppointment.title}</p>
                        <p><b>NIC:</b> {selectedAppointment.nic}</p>
                        <p><b>Current Date:</b> {selectedAppointment.date}</p>
                        <p><b>Current Time:</b> {selectedAppointment.time}</p>

                        <label>New Date</label>
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />

                        <label>New Time Slot</label>
                        <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />

                        <div className="modal-buttons">
                            <button onClick={confirmReschedule} className="confirm-btn">Reschedule</button>
                            <button onClick={closeRescheduleModal} className="cancel-btn">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Modal */}
            {leaveModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add Leave</h2>
                        <label>Select Date</label>
                        <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
                        <label>Reason</label>
                        <input type="text" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />

                        <div className="modal-buttons">
                            <button onClick={confirmLeave} className="confirm-btn">Confirm Leave</button>
                            <button onClick={closeLeaveModal} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
