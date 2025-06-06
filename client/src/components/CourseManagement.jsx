// CourseManagement.jsx
import React, { useState, useEffect } from "react";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/apiService";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    const response = await fetchCourses();
    setCourses(response.data);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
  };

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
    setCourses(courses.filter((course) => course.Course_code !== courseId));
  };

  const handleAdd = () => {
    setCurrentCourse({ Course_name: "", Credit_hrs: "" });
    setIsAdding(true);
  };

  const handleSave = async (course) => {
    if (isEditing) {
      const response = await updateCourse(course.Course_code, course);
      setCourses(
        courses.map((c) =>
          c.Course_code === course.Course_code ? response.data : c
        )
      );
    } else {
      const response = await addCourse(course);
      setCourses([...courses, response.data]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="course-management">
      <h1 className="course__title">Course Management</h1>
      <table className="table table-bordered course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.Course_code}>
              <td>{course.Course_name}</td>
              <td>{course.Credit_hrs}</td>
              <td className="operation-btns">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(course.Course_code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isEditing || isAdding) && (
        <CourseForm course={currentCourse} onSave={handleSave} />
      )}
      <button className="btn btn-primary mb-3 skill__add" onClick={handleAdd}>
        Add Course
      </button>
    </div>
  );
};

const CourseForm = ({ course, onSave }) => {
  const [formData, setFormData] = useState(course);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}className='section-form'>
      <label>
        Course Name:
        <input
          type="text"
          name="Course_name"
          value={formData.Course_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Credit Hours:
        <input
          type="text"
          name="Credit_hrs"
          value={formData.Credit_hrs}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default CourseManagement;
