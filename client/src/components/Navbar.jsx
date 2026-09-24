import { useContext } from "react";
import { Link } from "react-router-dom";
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
    : "M";

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-copy">
        <p className="dashboard-eyebrow">{eyebrow}</p>
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-description">{description}</p>
      </div>

      <div className="dashboard-navbar-actions">
        <Link 
          to="/profile" 
          className="dashboard-profile-chip clickable-profile-chip"
          title="Click to view & edit Profile Settings"
        >
          <div className="dashboard-avatar">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user?.fullName || "User Avatar"} className="dashboard-avatar-img" />
            ) : (
              initials
            )}
          </div>
          <div>
            <strong>{user?.callingName ? `${user.firstName ? user.firstName + ' ' : ''}${user.callingName}` : user?.fullName || "Dissanayaka Madhuwantha"}</strong>
            <span>{roleLabel}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
