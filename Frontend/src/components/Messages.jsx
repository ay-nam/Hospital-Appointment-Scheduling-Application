import React, { useState, useEffect } from "react";
import "../styles/Messages.css";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="messages-list">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <h3>{msg.firstName} {msg.lastName}</h3>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Mobile:</strong> {msg.mobile}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Date:</strong> {new Date(msg.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
}
