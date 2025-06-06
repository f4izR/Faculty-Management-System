import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        University Management
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/departments">
              Departments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faculty">
              Faculty
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/programs">
              Programs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/skills">
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses">
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sections">
              Sections
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
