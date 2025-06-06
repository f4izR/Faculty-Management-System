import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [facultyMap, setFacultyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [departmentRes, facultyRes] = await Promise.all([
          axios.get("http://localhost:8800/Department"),
          axios.get("http://localhost:8800/Faculty"),
        ]);

        console.log("Fetched Departments:", departmentRes.data);
        console.log("Fetched Faculties:", facultyRes.data);

        setDepartments(departmentRes.data);

        const facultyMap = facultyRes.data.reduce((acc, faculty) => {
          acc[faculty.Faculty_id] = faculty.Name;
          return acc;
        }, {});

        console.log("Faculty Map:", facultyMap);
        setFacultyMap(facultyMap);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Department/${id}`);
      setDepartments(
        departments.filter((department) => department.Dep_id !== id)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to delete department. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dept">
      <h1 className="dept__Title">Department Management</h1>
      <table className="table table-bordered department-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>HOD</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.Dep_id}>
              <td>{department.Dep_name}</td>
              <td>{facultyMap[department.hod] || "HOD not found"}</td>
              <td>
                <button className="btn btn-sm btn-warning dept-btn">
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger dept-btn"
                  onClick={() => handleDelete(department.Dep_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mb-3 skill__add">
        Add Department
      </button>
    </div>
  );
};

export default DepartmentManagement;
