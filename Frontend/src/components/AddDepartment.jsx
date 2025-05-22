import React, { useState } from "react";
import "../styles/AddDepartment.css";

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([
    "Pediatrics",
    "Pulmonology",
    "Cardiology",
    "Neurology",
    "Dermatology",
  ]);

  const handleAddDepartment = () => {
    if (departmentName.trim() !== "") {
      setDepartments([...departments, departmentName]);
      setDepartmentName(""); // Clear input field
    }
  };

  return (
    <>
  <h2>Add Department</h2>
    <div className="department-container">
      
      <div className="department-form">
        <label>Department Name</label>
        <input
          type="text"
          placeholder="Enter department name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <button onClick={handleAddDepartment}>Add Department</button>
      </div>

      <h3>Existing Departments</h3>
      <ul className="department-list">
        {departments.map((dept, index) => (
          <li key={index}>{dept}</li>
        ))}
      </ul>
    </div>
    </>
  );
}
