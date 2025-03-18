import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/AppointmentCalendar.css";

export default function AppointmentCalendar() {
    const [events, setEvents] = useState([
        { id: "1", title: "John Doe - Cardiology", date: "2025-03-15", nic: "987654321V", time: "10:00 AM" },
        { id: "2", title: "Jane Smith - Neurology", date: "2025-03-18", nic: "123456789V", time: "2:00 PM" }
    ]);

    // Reschedule State
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    // Leave State
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [leaveDate, setLeaveDate] = useState("");
    const [leaveReason, setLeaveReason] = useState("");

    // Open Reschedule Modal
    const openRescheduleModal = (appointment) => {
        setSelectedAppointment(appointment);
        setRescheduleModalOpen(true);
    };

    // Close Reschedule Modal
    const closeRescheduleModal = () => {
        setRescheduleModalOpen(false);
        setSelectedAppointment(null);
        setNewDate("");
        setNewTime("");
    };

    // Confirm Reschedule
    const confirmReschedule = () => {
        if (!newDate || !newTime) {
            alert("Please select both new date and time.");
            return;
        }

        setEvents(events.map(event =>
            event.id === selectedAppointment.id
                ? { ...event, date: newDate, time: newTime }
                : event
        ));

        alert(`Appointment rescheduled to ${newDate} at ${newTime}`);
        closeRescheduleModal();
    };

    // Open Leave Modal
    const openLeaveModal = () => {
        setLeaveModalOpen(true);
    };

    // Close Leave Modal
    const closeLeaveModal = () => {
        setLeaveModalOpen(false);
        setLeaveDate("");
        setLeaveReason("");
    };

    // Confirm Leave
    const confirmLeave = () => {
        if (!leaveDate || !leaveReason) {
            alert("Please enter both date and reason for leave.");
            return;
        }

        setEvents([...events, { id: `L${leaveDate}`, title: "Leave", date: leaveDate, reason: leaveReason }]);

        alert(`Leave marked for ${leaveDate}: ${leaveReason}`);
        closeLeaveModal();
    };

    return (
        <div className="calendar-container">
            <h1>Appointment Calendar</h1>

            {/* Buttons for Actions */}
            <div className="actions">
                <button className="leave-btn" onClick={openLeaveModal}>Add Leave</button>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events.map(event => ({
                    title: event.title.includes("Leave") ? `🚫 ${event.title}` : `${event.title} (${event.time})`,
                    date: event.date,
                }))}
            />


            {/* Appointment List */}
            <div className="appointment-list">
                <h2>Upcoming Appointments</h2>
                {events.map((event) => (
                    <div key={event.id} className="appointment-card">
                        <h3>{event.title}</h3>
                        {event.nic && <p><b>NIC:</b> {event.nic}</p>}
                        <p><b>Date: </b> {event.date}</p>
                        {event.time && <p><b>Time:</b> {event.time}</p>}
                        {event.reason && <p><b>Reason:</b> {event.reason}</p>}
                        {!event.title.includes("Leave") && (
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
                        <p><b>Patient</b> {selectedAppointment.title}</p>
                        <p><b>NIC</b> {selectedAppointment.nic}</p>
                        <p><b>Current Date</b> {selectedAppointment.date}</p>
                        <p><b>Current Time slot</b> {selectedAppointment.time}</p>

                        <label>Select New Date</label>
                        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />

                        <label>Select New Time Slot</label>
                        <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />

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

                        <label>Reason for leave</label>
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
