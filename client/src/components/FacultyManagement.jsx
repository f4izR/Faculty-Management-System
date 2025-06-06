import React, { useState, useEffect } from "react";
import {
  fetchFaculties,
  fetchDepartments,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../api/apiService";

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentMap, setDepartmentMap] = useState({});
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [facultiesResponse, departmentsResponse] = await Promise.all([
      fetchFaculties(),
      fetchDepartments(),
    ]);

    setFaculties(facultiesResponse.data);
    setDepartments(departmentsResponse.data);

    const departmentMap = departmentsResponse.data.reduce((acc, department) => {
      acc[department.Dep_id] = department.Dep_name;
      return acc;
    }, {});

    setDepartmentMap(departmentMap);
  };

  const handleEdit = (faculty) => {
    setCurrentFaculty(faculty);
    setIsEditing(true);
  };

  const handleDelete = async (facultyId) => {
    try {
      await deleteFaculty(facultyId);
      setFaculties(
        faculties.filter((faculty) => faculty.Faculty_id !== facultyId)
      );
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleAdd = () => {
    setCurrentFaculty({ Name: "", Designation: "", Phone_no: "", Dep_id: "" });
    setIsAdding(true);
  };

  const handleSave = async (faculty) => {
    if (isEditing) {
      const response = await updateFaculty(faculty.Faculty_id, faculty);
      setFaculties(
        faculties.map((f) =>
          f.Faculty_id === faculty.Faculty_id ? response.data : f
        )
      );
      setIsEditing(false);
    } else {
      const response = await addFaculty(faculty);
      setFaculties([...faculties, response.data]);
      setIsAdding(false);
    }
    setCurrentFaculty(null);
  };

  return (
    <div className="faculty">
      <h1 className="faculty-title">Faculty Management</h1>
      <table className="table table-bordered faculty-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.Faculty_id}>
              <td>{faculty.Name}</td>
              <td>{faculty.Designation}</td>
              <td>{faculty.Phone_no}</td>
              <td>{departmentMap[faculty.Dep_id] || "Department not found"}</td>
              <td className="operation-btns">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(faculty)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(faculty.Faculty_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isEditing || isAdding) && (
        <FacultyForm faculty={currentFaculty} onSave={handleSave} />
      )}
      <button className="btn btn-primary mb-3 skill__add" onClick={handleAdd}>
        Add Faculty
      </button>
    </div>
  );
};

const FacultyForm = ({ faculty, onSave }) => {
  const [formData, setFormData] = useState(faculty);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='section-form'>
      <label>
        Name:
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
      </label>
      <label>
        Designation:
        <input
          type="text"
          name="Designation"
          value={formData.Designation}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="Phone_no"
          value={formData.Phone_no}
          onChange={handleChange}
        />
      </label>
      <label>
        Department ID:
        <input
          type="text"
          name="Dep_id"
          value={formData.Dep_id}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default FacultyManagement;
