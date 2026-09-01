import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ eyebrow, title, description }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isTeacher = user?.role === "teacher" || user?.isAdmin;
  const roleTitle = user?.isAdmin
    ? "Teacher (Admin)"
    : isTeacher
      ? "Teacher"
      : "Student";

  const studentId = user?.studentId || "2541115";
  const name = user?.fullName || "Madhuwantha Dissanayaka";
  const avatarSrc = user?.avatarUrl || "/avatar.jpg";

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-copy">
        {eyebrow ? <p className="dashboard-eyebrow">{eyebrow}</p> : null}
        <h1 className="dashboard-title">{title}</h1>
        {description ? <p className="dashboard-description">{description}</p> : null}
      </div>

      <div className="dashboard-navbar-actions">
        <div
          className="dashboard-profile-tag clickable-profile-tag"
          onClick={() => navigate("/profile")}
          title="Click to Manage Profile & Change Password"
        >
          <span className="profile-name">{name}</span>
          <span className="profile-divider">|</span>
          <img
            className="profile-image"
            src={avatarSrc}
            alt={name}
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = "flex";
              }
            }}
          />
          <div className="profile-avatar-fallback" style={{ display: "none" }}>
            {initials}
          </div>
          <span className="profile-divider">|</span>
          <span className="profile-title">{roleTitle}</span>
          {!isTeacher && (
            <>
              <span className="profile-divider">|</span>
              <span className="profile-id">{studentId}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


