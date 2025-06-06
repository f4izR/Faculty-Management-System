import React, { useState, useEffect } from 'react';
import { fetchSections, fetchFaculties, addSection, updateSection, deleteSection } from '../api/apiService';

const SectionManagement = () => {
  const [sections, setSections] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [facultyMap, setFacultyMap] = useState({});
  const [currentSection, setCurrentSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [sectionsResponse, facultiesResponse] = await Promise.all([
      fetchSections(),
      fetchFaculties()
    ]);

    setSections(sectionsResponse.data);
    setFaculties(facultiesResponse.data);

    const facultyMap = facultiesResponse.data.reduce((acc, faculty) => {
      acc[faculty.Faculty_id] = faculty.Name;
      return acc;
    }, {});

    setFacultyMap(facultyMap);
  };

  const handleEdit = (section) => {
    setCurrentSection(section);
    setIsEditing(true);
  };

  const handleDelete = async (sectionId) => {
    await deleteSection(sectionId);
    setSections(sections.filter(section => section.Section_id !== sectionId));
  };

  const handleAdd = () => {
    setCurrentSection({ Section_name: '', Enroll_year: '', class_advisor: '' });
    setIsAdding(true);
  };

  const handleSave = async (section) => {
    if (isEditing) {
      const response = await updateSection(section.Section_id, section);
      setSections(sections.map(s => s.Section_id === section.Section_id ? response.data : s));
    } else {
      const response = await addSection(section);
      setSections([...sections, response.data]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className='section-management'>
      <h1 className='section-title'>Section Management</h1>
      <table className="table table-bordered section-table">
        <thead>
          <tr>
            <th>Section Name</th>
            <th>Enroll Year</th>
            <th>Class Advisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map(section => (
            <tr key={section.Section_id}>
              <td>{section.Section_name}</td>
              <td>{section.Enroll_year}</td>
              <td>{facultyMap[section.class_advisor] || 'Advisor not found'}</td>
              <td className='operation-btns'>
                <button className='btn btn-sm btn-warning' onClick={() => handleEdit(section)}>Edit</button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(section.Section_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isEditing || isAdding) && (
        <SectionForm section={currentSection} onSave={handleSave} />
      )}
      <button className='btn btn-primary mb-3 skill__add' onClick={handleAdd}>Add Section</button>
    </div>
  );
};

const SectionForm = ({ section, onSave }) => {
  const [formData, setFormData] = useState(section);

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
        Section Name:
        <input type="text" name="Section_name" value={formData.Section_name} onChange={handleChange} />
      </label>
      <label>
        Enroll Year:
        <input type="text" name="Enroll_year" value={formData.Enroll_year} onChange={handleChange} />
      </label>
      <label>
        Class Advisor:
        <input type="text" name="class_advisor" value={formData.class_advisor} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default SectionManagement;
