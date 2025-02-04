import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import UserManagement from "../../components/UserManagement";
import ProjectManagement from "../../components/ProjectManagement";
import SkillManagement from "../../components/SkillManagement";
import EducationManagement from "../../components/EducationManagement";
import "./styles.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const AdminPanel = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setSidebarOpen(false); 
  };

  return (
    <div className="admin-container">
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/user" className={location.pathname === "/admin/user" ? "active" : ""} onClick={handleLinkClick}>
              User
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" className={location.pathname === "/admin/projects" ? "active" : ""} onClick={handleLinkClick}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/admin/skills" className={location.pathname === "/admin/skills" ? "active" : ""} onClick={handleLinkClick}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/admin/education" className={location.pathname === "/admin/education" ? "active" : ""} onClick={handleLinkClick}>
              Education
            </Link>
          </li>
        </ul>
        <button onClick={logout}>Logout</button>
      </div>

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Routes>
          <Route path="user" element={<UserManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="skills" element={<SkillManagement />} />
          <Route path="education" element={<EducationManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
