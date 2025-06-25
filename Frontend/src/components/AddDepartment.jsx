import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/AddDepartment.css";

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null); // For edit mode

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments", err);
      Swal.fire("Error", "Could not fetch departments", "error");
    }
  };

  const handleAddOrUpdateDepartment = async () => {
    if (departmentName.trim() === "") return;

    try {
      if (editId) {
        // Update department
        const res = await axios.put(`http://localhost:5000/api/departments/${editId}`, {
          name: departmentName.trim()
        });
        Swal.fire("Updated!", "Department name updated", "success");
      } else {
        // Add new department
        const res = await axios.post("http://localhost:5000/api/departments", {
          name: departmentName.trim()
        });
        Swal.fire("Added!", "Department added successfully", "success");
      }

      setDepartmentName("");
      setEditId(null);
      fetchDepartments();
    } catch (err) {
      console.error("Error saving department", err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleEdit = (dept) => {
    setDepartmentName(dept.name);
    setEditId(dept._id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the department",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${id}`);
        Swal.fire("Deleted!", "Department removed", "success");
        fetchDepartments();
      } catch (err) {
        console.error("Error deleting department", err);
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  return (
    <>
      <h2>{editId ? "Edit Department" : "Add Department"}</h2>
      <div className="department-container">
        <div className="department-form">
          <label>Department Name</label>
          <input
            type="text"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <button onClick={handleAddOrUpdateDepartment}>
            {editId ? "Update" : "Add"} Department
          </button>
        </div>

        <h3>Existing Departments</h3>
        <ul className="department-list">
          {departments.map((dept) => (
            <li key={dept._id}>
              <span className="department-name">{dept.name}</span>
              <div>
                <button onClick={() => handleEdit(dept)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(dept._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}
