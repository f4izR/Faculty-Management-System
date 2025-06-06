// ExperienceManagement.jsx
import React, { useState, useEffect } from "react";
import {
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../api/apiService";

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchExperiencesData();
  }, []);

  const fetchExperiencesData = async () => {
    const response = await fetchExperiences();
    setExperiences(response.data);
  };

  const handleEdit = (experience) => {
    setCurrentExperience(experience);
    setIsEditing(true);
  };

  const handleDelete = async (experienceId) => {
    await deleteExperience(experienceId);
    setExperiences(
      experiences.filter(
        (experience) => experience.Experience_id !== experienceId
      )
    );
  };

  const handleAdd = () => {
    setCurrentExperience({ Faculty_id: "", Title: "", Organization_name: "" });
    setIsAdding(true);
  };

  const handleSave = async (experience) => {
    if (isEditing) {
      const response = await updateExperience(
        experience.Experience_id,
        experience
      );
      setExperiences(
        experiences.map((e) =>
          e.Experience_id === experience.Experience_id ? response.data : e
        )
      );
    } else {
      const response = await addExperience(experience);
      setExperiences([...experiences, response.data]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div>
      <h1>Experience Management</h1>
      <button onClick={handleAdd}>Add Experience</button>
      <table className="experience-table">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Title</th>
            <th>Organization Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience.Experience_id}>
              <td>{experience.Faculty_id}</td>
              <td>{experience.Title}</td>
              <td>{experience.Organization_name}</td>
              <td>
                <button onClick={() => handleEdit(experience)}>Edit</button>
                <button onClick={() => handleDelete(experience.Experience_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isEditing || isAdding) && (
        <ExperienceForm experience={currentExperience} onSave={handleSave} />
      )}
    </div>
  );
};

const ExperienceForm = ({ experience, onSave }) => {
  const [formData, setFormData] = useState(experience);

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
        Title:
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />
      </label>
      <label>
        Organization Name:
        <input
          type="text"
          name="Organization_name"
          value={formData.Organization_name}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ExperienceManagement;
