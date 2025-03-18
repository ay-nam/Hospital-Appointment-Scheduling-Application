import React, { useState } from "react";
import "../styles/UsersList.css";
import { FaEye, FaFilter } from "react-icons/fa";

export default function UsersList() {
  // Dummy user data
  const [users, setUsers] = useState([
    { id: 1, username: "Admin", email: "admin@gmail.com", role: "Admin", createdAt: "1/13/2025", isActive: true },
    { id: 2, username: "JohnDoe", email: "john@example.com", role: "User", createdAt: "2/15/2025", isActive: false },
    { id: 3, username: "JaneSmith", email: "jane@example.com", role: "Doctor", createdAt: "3/20/2025", isActive: true },
  ]);

  // Toggle user active status
  const toggleActiveStatus = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, isActive: !user.isActive } : user));
  };

  return (
    <div className="users-list">
      {/* Heading & Search Bar */}
      <h2>Users Management</h2>
      <div className="users-header">
        
        <div className="search-container">
          <input type="text" placeholder="Search users..." />
          <FaFilter className="filter-icon" />
          <select>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className={user.role === "Admin" ? "admin-role" : ""}>{user.role}</td>
              <td>{user.createdAt}</td>
              <td>
                <button className="view-btn"><FaEye /></button>
                <button className={user.isActive ? "deactivate-btn" : "activate-btn"} onClick={() => toggleActiveStatus(user.id)}>
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
