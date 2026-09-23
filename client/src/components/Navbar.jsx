import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ eyebrow, title, description }) {
  const { user } = useContext(AuthContext);

  const roleLabel = user?.isAdmin
    ? "Admin / Teacher"
    : user?.role === "teacher"
      ? "Teacher"
      : "Student";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("")
    : "SM";

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-copy">
        <p className="dashboard-eyebrow">{eyebrow}</p>
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-description">{description}</p>
      </div>

      <div className="dashboard-navbar-actions">
        <div className="dashboard-search">
          <span className="dashboard-search-label">Search lessons, marks, quizzes</span>
        </div>
        <button className="dashboard-icon-button" type="button" aria-label="Notifications">
          N
        </button>
        <div className="dashboard-profile-chip">
          <div className="dashboard-avatar">{initials}</div>
          <div>
            <strong>{user?.fullName || "Physics LMS"}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
