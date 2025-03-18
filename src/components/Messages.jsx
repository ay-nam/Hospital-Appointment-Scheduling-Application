import React, { useState } from "react";
import "../styles/Messages.css";

export default function Messages() {
  // Dummy messages data
  const [messages] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", message: "I need an appointment with Dr. Smith.", date: "2025-03-10" },
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", message: "Is the cardiology department available this week?", date: "2025-03-11" },
    { id: 3, name: "Michael Johnson", email: "michael@gmail.com", message: "I want to reschedule my appointment.", date: "2025-03-12" }
  ]);

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <h3>{msg.name}</h3>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Date:</strong> {msg.date}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
}
