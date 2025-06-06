// apiService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:8800';

// 


const api = axios.create({
  baseURL: 'http://localhost:8800',
});

export const fetchDepartments = () => api.get('/Department');
export const fetchDepartment = (id) => api.get(`/Department/${id}`);
export const addDepartment = (department) => api.post('/Department', department);
export const updateDepartment = (id, department) => api.put(`/Department/${id}`, department);
export const deleteDepartment = (id) => api.delete(`/Department/${id}`,id);

// Course API
export const fetchCourses = () => api.get('/Course');
export const fetchCourse = (id) => api.get(`/Course/${id}`);
export const addCourse = (course) => api.post('/Course', course);
export const updateCourse = (id, course) => api.put(`/Course/${id}`, course);
export const deleteCourse = (id) => api.delete(`/Course/${id}`);

// Experience API
export const fetchExperiences = () => api.get('/Experience');
export const fetchExperience = (id) => api.get(`/Experience/${id}`);
export const addExperience = (experience) => api.post('/Experience', experience);
export const updateExperience = (id, experience) => api.put(`/Experience/${id}`, experience);
export const deleteExperience = (id) => api.delete(`/Experience/${id}`);

// Faculty API
export const fetchFaculties = () => api.get('/Faculty');
export const fetchFaculty = (id) => api.get(`/Faculty/${id}`);
export const addFaculty = (faculty) => api.post('/Faculty', faculty);
export const updateFaculty = (id, faculty) => api.put(`/Faculty/${id}`, faculty);
export const deleteFaculty = (id) => api.delete(`/Faculty/${id}`);

// Faculty Skills API
export const fetchFacultySkills = () => api.get('/Faculty_Skills');
export const fetchFacultySkill = (facultyId, skillId) => api.get(`/Faculty_Skills/${facultyId}/${skillId}`);
export const addFacultySkill = (facultySkill) => api.post('/Faculty_Skills', facultySkill);
export const updateFacultySkill = (facultyId, skillId, facultySkill) => api.put(`/Faculty_Skills/${facultyId}/${skillId}`, facultySkill);
export const deleteFacultySkill = (facultyId, skillId) => api.delete(`/Faculty_Skills/${facultyId}/${skillId}`);


export const fetchPrograms = () => api.get('/Program');
export const fetchProgram = (id) => api.get(`/Program/${id}`);
export const addProgram = (program) => api.post('/Program', program);
export const updateProgram = (id, program) => api.put(`/Program/${id}`, program);
export const deleteProgram = (id) => api.delete(`/Program/${id}`);

// Section API
export const fetchSections = () => api.get('/Section');
export const fetchSection = (id) => api.get(`/Section/${id}`);
export const addSection = (section) => api.post('/Section', section);
export const updateSection = (id, section) => api.put(`/Section/${id}`, section);
export const deleteSection = (id) => api.delete(`/Section/${id}`);


export const fetchSkills = () => api.get('/Skills');
export const fetchSkill = (id) => api.get(`/Skills/${id}`);
export const addSkill = (skill) => api.post('/Skills', skill);
export const updateSkill = (id, skill) => api.put(`/Skills/${id}`, skill);
export const deleteSkill = (id)=> api.delete(`/Skills/${id}`,id)






// export const deleteSkill = async (id) => {
//   try {
//       const response = await axios.delete(`${API_BASE_URL}/Skills/${id}`);
//       return response.data;
//   } catch (error) {
//       console.error('Error deleting skill:', error);
//       throw error;
//   }
// };
//export const getDepartments = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Department`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching departments:', error);
  //         throw error;
  //     }
  // };
  
  // export const getCourses = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Course`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching courses:', error);
  //         throw error;
  //     }
  // };
  
  // export const getExperiences = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Experience`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching experiences:', error);
  //         throw error;
  //     }
  // };
  
  // export const getFaculties = async () => {
  //   try {
  //       const response = await axios.get(`${API_URL}/Faculty`);
  //       return response.data;
  //   } catch (error) {
  //       console.error('Error fetching faculties:', error);
  //       throw error;
  //   }
  // };
  
  // export const getFacultySkills = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Faculty_Skills`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching faculty skills:', error);
  //         throw error;
  //     }
  // };
  
  // export const getPrograms = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Program`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching programs:', error);
  //         throw error;
  //     }
  // };
  
  // export const getSections = async () => {
  //     try {
  //         const response = await axios.get(`${API_URL}/Section`);
  //         return response.data;
  //     } catch (error) {
  //         console.error('Error fetching sections:', error);
  //         throw error;
  //     }
  // };
  
  // export const getSkills = async () => {
  //   try {
  //       const response = await axios.get(`${API_URL}/Skills`);
  //       return response.data;
  //   } catch (error) {
  //       console.error('Error fetching skills:', error);
  //       throw error;
  //   }
  // };