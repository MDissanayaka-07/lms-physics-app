import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const studentNavItems = [
  {
    to: "/dashboard",
    label: "Overview",
    hint: "Today",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    to: "/marks",
    label: "Marks",
    hint: "Progress",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  },
  {
    to: "/quiz",
    label: "Quizzes",
    hint: "Weekly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    )
  },
  {
    to: "/papers",
    label: "Papers",
    hint: "Resources",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )
  },
  {
    to: "/lessons",
    label: "Lessons",
    hint: "Modules",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  }
];

const teacherPrimaryItems = [
  {
    to: "/teacher",
    label: "Command Center",
    hint: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  }
];

const teacherManageItems = [
  { href: "/teacher#students", label: "Student Progress", hint: "Monitor" },
  { href: "/teacher#quizzes", label: "Quiz Control", hint: "Manage" },
  { href: "/teacher#submissions", label: "PDF Reviews", hint: "Review" }
];

const renderNavItem = (item) =>
  item.to ? (
    <NavLink
      key={item.to}
      className={({ isActive }) =>
        isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
      }
      to={item.to}
    >
      <div className="sidebar-link-left">
        {item.icon && <span className="sidebar-link-icon">{item.icon}</span>}
        <div className="sidebar-link-copy">
          <span>{item.label}</span>
          <small>{item.hint}</small>
        </div>
      </div>
      <span className="sidebar-link-arrow">+</span>
    </NavLink>
  ) : (
    <a className="sidebar-link" href={item.href} key={item.href}>
      <div className="sidebar-link-left">
        {item.icon && <span className="sidebar-link-icon">{item.icon}</span>}
        <div className="sidebar-link-copy">
          <span>{item.label}</span>
          <small>{item.hint}</small>
        </div>
      </div>
      <span className="sidebar-link-arrow">+</span>
    </a>
  );

export default function Sidebar({ variant = "student" }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (variant === "teacher") {
    return (
      <aside className="sidebar sidebar-teacher">
        <div className="sidebar-top-container">
          <Link to="/teacher" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-brand-badge sidebar-brand-badge-teacher">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(150 12 12)" />
              </svg>
            </div>
            <div>
              <h2>Teacher Panel</h2>
              <p>Admin workspace</p>
            </div>
          </Link>

          <section className="sidebar-section">
            <p className="sidebar-label">Workspace</p>
            <nav className="sidebar-nav">{teacherPrimaryItems.map(renderNavItem)}</nav>
          </section>

          <section className="sidebar-section">
            <p className="sidebar-label">Management</p>
            <nav className="sidebar-nav">{teacherManageItems.map(renderNavItem)}</nav>
          </section>
        </div>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top-container">
        <Link to="/dashboard" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="sidebar-brand-badge">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(150 12 12)" />
            </svg>
          </div>
          <div>
            <h2>Physics LMS</h2>
            <p>Smart learning panel</p>
          </div>
        </Link>

        <section className="sidebar-section">
          <p className="sidebar-label">Navigation</p>
          <nav className="sidebar-nav">{studentNavItems.map(renderNavItem)}</nav>
        </section>
      </div>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
