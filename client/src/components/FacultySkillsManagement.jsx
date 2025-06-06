// FacultySkillsManagement.jsx
import React, { useState, useEffect } from "react";
import {
  fetchFacultySkills,
  addFacultySkill,
  updateFacultySkill,
  deleteFacultySkill,
} from "../api/apiService";

const FacultySkillsManagement = () => {
  const [facultySkills, setFacultySkills] = useState([]);
  const [currentFacultySkill, setCurrentFacultySkill] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchFacultySkillsData();
  }, []);

  const fetchFacultySkillsData = async () => {
    const response = await fetchFacultySkills();
    setFacultySkills(response.data);
  };

  const handleEdit = (facultySkill) => {
    setCurrentFacultySkill(facultySkill);
    setIsEditing(true);
  };

  const handleDelete = async (facultyId, skillId) => {
    await deleteFacultySkill(facultyId, skillId);
    setFacultySkills(
      facultySkills.filter(
        (facultySkill) =>
          facultySkill.Faculty_id !== facultyId ||
          facultySkill.Skill_id !== skillId
      )
    );
  };

  const handleAdd = () => {
    setCurrentFacultySkill({ Faculty_id: "", Skill_id: "" });
    setIsAdding(true);
  };

  const handleSave = async (facultySkill) => {
    if (isEditing) {
      const response = await updateFacultySkill(
        facultySkill.Faculty_id,
        facultySkill.Skill_id,
        facultySkill
      );
      setFacultySkills(
        facultySkills.map((fs) =>
          fs.Faculty_id === facultySkill.Faculty_id &&
          fs.Skill_id === facultySkill.Skill_id
            ? response.data
            : fs
        )
      );
    } else {
      const response = await addFacultySkill(facultySkill);
      setFacultySkills([...facultySkills, response.data]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div>
      <h1>Faculty Skills Management</h1>
      <button onClick={handleAdd}>Add Faculty Skill</button>
      <table className="faculty-skills-table">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Skill ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultySkills.map((facultySkill) => (
            <tr key={`${facultySkill.Faculty_id}-${facultySkill.Skill_id}`}>
              <td>{facultySkill.Faculty_id}</td>
              <td>{facultySkill.Skill_id}</td>
              <td>
                <button onClick={() => handleEdit(facultySkill)}>Edit</button>
                <button
                  onClick={() =>
                    handleDelete(facultySkill.Faculty_id, facultySkill.Skill_id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isEditing || isAdding) && (
        <FacultySkillForm
          facultySkill={currentFacultySkill}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const FacultySkillForm = ({ facultySkill, onSave }) => {
  const [formData, setFormData] = useState(facultySkill);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Faculty ID:
        <input
          type="text"
          name="Faculty_id"
          value={formData.Faculty_id}
          onChange={handleChange}
        />
      </label>
      <label>
        Skill ID:
        <input
          type="text"
          name="Skill_id"
          value={formData.Skill_id}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default FacultySkillsManagement;
