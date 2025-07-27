import axios from "axios";
import React, { useState } from "react";
import { MessageList, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { FaComments } from "react-icons/fa"; // Import chat icon
const ChatbotUI = () => {
    const [isOpen, setIsOpen] = useState(false); // Control popup visibility
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
  
    const toggleChatbot = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSendMessage = async () => {
      if (input.trim()) {
        const newMessage = {
          position: "right",
          type: "text",
          text: input,
          date: new Date(),
        };
        setMessages([...messages, newMessage]);
        try {
            // Send user's message to your API
            const response = await axios.post("https://localhost:5000/api/chat", {
              message: input,
            });
            // Add the bot's response to the chat
            const botMessage = {
              position: "left",
              type: "text",
              text: response.data.reply, // Adjust according to your API's response
              date: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
          } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
              ...prev,
              {
                position: "left",
                type: "text",
                text: "Error: Unable to fetch reply.",
                date: new Date(),
              },
            ]);
          }
          setInput(""); // Clear the input field
      
      }
    };
  
    return (
      <div>
        {/* Floating Chat Icon */}
        <div
          onClick={toggleChatbot}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
         <FaComments color="white" size="30"/>
        </div>
  
        {/* Chatbot Popup */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              bottom: "90px", // Positioning above the floating button
              right: "20px",
              width: "350px",
              height: "500px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              zIndex: 999,
            }}
          >
            {/* Chat Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px",
              }}
            >
              <MessageList className="message-list" dataSource={messages} />
            </div>
  
            {/* Input Box */}
            <div
              style={{
                padding: "10px",
                borderTop: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                rightButtons={
                  <button
                    onClick={handleSendMessage}
                    style={{
                      padding: "10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Send
                  </button>
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  
};

export default ChatbotUI;
