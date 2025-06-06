import React, { useState, useEffect } from "react";
import {
  fetchPrograms,
  fetchDepartments,
  fetchFaculties,
  addProgram,
  updateProgram,
  deleteProgram,
} from "../api/apiService";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentMap, setDepartmentMap] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [facultyMap, setFacultyMap] = useState({});
  const [currentProgram, setCurrentProgram] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [programsResponse, departmentsResponse, facultiesResponse] =
      await Promise.all([
        fetchPrograms(),
        fetchDepartments(),
        fetchFaculties(),
      ]);

    setPrograms(programsResponse.data);
    setDepartments(departmentsResponse.data);
    setFaculties(facultiesResponse.data);

    const departmentMap = departmentsResponse.data.reduce((acc, department) => {
      acc[department.Dep_id] = department.Dep_name;
      return acc;
    }, {});

    const facultyMap = facultiesResponse.data.reduce((acc, faculty) => {
      acc[faculty.Faculty_id] = faculty.Name;
      return acc;
    }, {});

    setDepartmentMap(departmentMap);
    setFacultyMap(facultyMap);
  };

  const handleEdit = (program) => {
    setCurrentProgram(program);
    setIsEditing(true);
  };

  const handleDelete = async (programId) => {
    await deleteProgram(programId);
    setPrograms(programs.filter((program) => program.Program_id !== programId));
  };

  const handleAdd = () => {
    setCurrentProgram({
      Program_name: "",
      Program_shift: "",
      Dep_id: "",
      program_lead: "",
    });
    setIsAdding(true);
  };

  const handleSave = async (program) => {
    if (isEditing) {
      const response = await updateProgram(program.Program_id, program);
      setPrograms(
        programs.map((p) =>
          p.Program_id === program.Program_id ? response.data : p
        )
      );
    } else {
      const response = await addProgram(program);
      setPrograms([...programs, response.data]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="program-management">
      <h1 className="program-title">Program Management</h1>
      <table className="table table-bordered program-table">
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Program Shift</th>
            <th>Department</th>
            <th>Program Lead</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.Program_id}>
              <td>{program.Program_name}</td>
              <td>{program.Program_shift}</td>
              <td>{departmentMap[program.Dep_id] || "Department not found"}</td>
              <td>{facultyMap[program.program_lead] || "Faculty not found"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning program__btn"
                  onClick={() => handleEdit(program)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger program__btn"
                  onClick={() => handleDelete(program.Program_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isEditing || isAdding) && (
        <ProgramForm program={currentProgram} onSave={handleSave} />
      )}
      <button className="btn btn-primary mb-3 skill__add" onClick={handleAdd}>
        Add Program
      </button>
    </div>
  );
};

const ProgramForm = ({ program, onSave }) => {
  const [formData, setFormData] = useState(program);

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
        Program Name:
        <input
          type="text"
          name="Program_name"
          value={formData.Program_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Program Shift:
        <input
          type="text"
          name="Program_shift"
          value={formData.Program_shift}
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
      <label>
        Program Lead:
        <input
          type="text"
          name="program_lead"
          value={formData.program_lead}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProgramManagement;
