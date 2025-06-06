import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DepartmentManagement from './components/DepartmentManagement';
import FacultyManagement from './components/FacultyManagement';
import ProgramManagement from './components/ProgramManagement';
import SkillsManagement from './components/SkillsManagement';
import ExperienceManagement from './components/ExperienceManagement';
import CourseManagement from './components/CourseManagement';
import SectionManagement from './components/SectionManagement';
import FacultySkillsManagement from './components/FacultySkillsManagement';
import SignIn from './components/SignIn';
import './style.css';

import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import BookIcon from '@mui/icons-material/Book';
import ClassIcon from '@mui/icons-material/Class';

function App() {
  return (
    <Router>
      <div className='app'>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">Faculty Management</Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Tooltip title="Dashboard" arrow>
                  <Link className="nav-link" to="/dashboard">
                    <DashboardIcon /> Dashboard
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Departments" arrow>
                  <Link className="nav-link" to="/departments">
                    <ApartmentIcon /> Departments
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Faculty" arrow>
                  <Link className="nav-link" to="/faculty">
                    <PeopleIcon /> Faculty
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Programs" arrow>
                  <Link className="nav-link" to="/programs">
                    <SchoolIcon /> Programs
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Skills" arrow>
                  <Link className="nav-link" to="/skills">
                    <BuildIcon /> Skills
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Courses" arrow>
                  <Link className="nav-link" to="/courses">
                    <BookIcon /> Courses
                  </Link>
                </Tooltip>
              </li>
              <li className="nav-item">
                <Tooltip title="Sections" arrow>
                  <Link className="nav-link" to="/sections">
                    <ClassIcon /> Sections
                  </Link>
                </Tooltip>
              </li>
              {/* <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li> */}
            </ul>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <div className="home">
              <img src="/logo.png" alt="Logo" className="home-logo" />
            </div>
          } />
          <Route path="/dashboard" element={
            <div className='btns'>
              <div className="btns__1">
                <Link to="/departments" className='departments-btn display-btn' >Departments</Link>
                <Link to="/faculty" className='faculty-btn display-btn' >Faculty</Link>
                <Link to="/programs" className='programs-btn display-btn' >Programs</Link>
              </div>
              <div className="btns__2">
                <Link to="/skills" className='skills-btn display-btn' >Skills</Link>
                <Link to="/courses" className='courses-btn display-btn' >Courses</Link>
                <Link to="/sections" className='sections-btn display-btn' >Sections</Link>
              </div>
            </div>} />
          <Route path="/departments" element={<DepartmentManagement />} />
          <Route path="/faculty" element={<FacultyManagement />} />
          <Route path="/programs" element={<ProgramManagement />} />
          <Route path="/skills" element={<SkillsManagement />} />
          <Route path="/experience" element={<ExperienceManagement />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/sections" element={<SectionManagement />} />
          <Route path="/faculty-skills" element={<FacultySkillsManagement />} />
          {/* <Route path="/signin" element={<SignIn />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



            // <div className='btns'>
            //   <div className="btns__1">
            //     <Link to="/departments" className='departments-btn display-btn' >Departments</Link>
            //     <Link to="/faculty" className='faculty-btn display-btn' >Faculty</Link>
            //     <Link to="/programs" className='programs-btn display-btn' >Programs</Link>
            //   </div>
            //   <div className="btns__2">
            //     <Link to="/skills" className='skills-btn display-btn' >Skills</Link>
            //     <Link to="/courses" className='courses-btn display-btn' >Courses</Link>
            //     <Link to="/sections" className='sections-btn display-btn' >Sections</Link>
            //   </div>
            // </div>