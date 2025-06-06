import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="btns">
      <div className="btns__1">
        <Link to="/departments" className="departments-btn display-btn">
          Departments
        </Link>
        <Link to="/faculty" className="faculty-btn display-btn">
          Faculty
        </Link>
        <Link to="/programs" className="programs-btn display-btn">
          Programs
        </Link>
      </div>
      <div className="btns__2">
        <Link to="/skills" className="skills-btn display-btn">
          Skills
        </Link>
        <Link to="/courses" className="courses-btn display-btn">
          Courses
        </Link>
        <Link to="/sections" className="sections-btn display-btn">
          Sections
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
