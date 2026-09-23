import { NavLink } from "react-router-dom";

const studentNavItems = [
  { to: "/dashboard", label: "Overview", hint: "Today" },
  { to: "/marks", label: "Marks", hint: "Progress" },
  { to: "/quiz", label: "Quizzes", hint: "Weekly" },
  { to: "/papers", label: "Papers", hint: "Resources" },
  { to: "/submission", label: "Submission", hint: "Upload" }
];

const teacherPrimaryItems = [
  { to: "/teacher", label: "Command Center", hint: "Overview" }
];

const teacherManageItems = [
  { href: "/teacher#students", label: "Student Progress", hint: "Monitor" },
  { href: "/teacher#quizzes", label: "Quiz Control", hint: "Manage" },
  { href: "/teacher#submissions", label: "PDF Reviews", hint: "Review" }
];

const courseItems = ["A/L 2028", "A/L 2027", "A/L 2026"];

const renderNavItem = (item) =>
  item.to ? (
    <NavLink
      key={item.to}
      className={({ isActive }) =>
        isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
      }
      to={item.to}
    >
      <div className="sidebar-link-copy">
        <span>{item.label}</span>
        <small>{item.hint}</small>
      </div>
      <span className="sidebar-link-arrow">+</span>
    </NavLink>
  ) : (
    <a className="sidebar-link" href={item.href} key={item.href}>
      <div className="sidebar-link-copy">
        <span>{item.label}</span>
        <small>{item.hint}</small>
      </div>
      <span className="sidebar-link-arrow">+</span>
    </a>
  );

export default function Sidebar({ variant = "student" }) {
  if (variant === "teacher") {
    return (
      <aside className="sidebar sidebar-teacher">
        <div className="sidebar-brand">
          <div className="sidebar-brand-badge sidebar-brand-badge-teacher">AD</div>
          <div>
            <h2>Teacher Panel</h2>
            <p>Admin and teacher workspace</p>
          </div>
        </div>

        <section className="sidebar-section">
          <p className="sidebar-label">Workspace</p>
          <nav className="sidebar-nav">{teacherPrimaryItems.map(renderNavItem)}</nav>
        </section>

        <section className="sidebar-section">
          <p className="sidebar-label">Management</p>
          <nav className="sidebar-nav">{teacherManageItems.map(renderNavItem)}</nav>
        </section>

        <section className="sidebar-section">
          <p className="sidebar-label">Batches</p>
          <div className="sidebar-pills">
            {courseItems.map((course) => (
              <span className="sidebar-pill sidebar-pill-teacher" key={course}>
                {course}
              </span>
            ))}
          </div>
        </section>

        <section className="sidebar-card sidebar-card-teacher">
          <p className="sidebar-card-label">Teacher Focus</p>
          <h3>Review, support, and approve</h3>
          <p>
            Monitor weak students, check uploaded files, and control who can publish
            quizzes and marks.
          </p>
        </section>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-badge">PH</div>
        <div>
          <h2>Physics LMS</h2>
          <p>Smart learning panel</p>
        </div>
      </div>

      <section className="sidebar-section">
        <p className="sidebar-label">Navigation</p>
        <nav className="sidebar-nav">{studentNavItems.map(renderNavItem)}</nav>
      </section>

      <section className="sidebar-section">
        <p className="sidebar-label">Academic Years</p>
        <div className="sidebar-pills">
          {courseItems.map((course) => (
            <span className="sidebar-pill" key={course}>
              {course}
            </span>
          ))}
        </div>
      </section>

      <section className="sidebar-card">
        <p className="sidebar-card-label">This Week</p>
        <h3>Wave Motion Revision</h3>
        <p>
          Finish the quiz, submit the tutorial, and compare your score with last
          month.
        </p>
      </section>
    </aside>
  );
}
