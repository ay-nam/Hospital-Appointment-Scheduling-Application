import React, { useState, useEffect } from "react";
import "../styles/UsersList.css";
import { FaEye, FaFilter } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire("Error", "Could not fetch users", "error");
    }
  };

  const toggleActiveStatus = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/auth/users/${id}/status`);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? res.data.user : user))
      );

      Swal.fire({
        icon: "success",
        title: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error toggling status:", err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  // View user details
  const handleView = (user) => {
    Swal.fire({
      title: `<strong>${user.name}</strong>`,
      html: `
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Role:</b> ${user.role}</p>
        <p><b>Status:</b> ${user.active ? "Active" : "Inactive"}</p>
        <p><b>Joined:</b> ${new Date(user.createdAt).toLocaleDateString()}</p>
      `,
      icon: "info",
    });
  };

  // Filtered list
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-list">
      <h2>Users Management</h2>

      <div className="users-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaFilter className="filter-icon" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
      </div>

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
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className={user.role === "admin" ? "admin-role" : ""}>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="view-btn" onClick={() => handleView(user)}>
                  <FaEye />
                </button>
                <button
                  className={user.active ? "deactivate-btn" : "activate-btn"}
                  onClick={() => toggleActiveStatus(user._id)}
                >
                  {user.active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
