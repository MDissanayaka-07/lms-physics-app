import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview", hint: "Today" },
  { to: "/marks", label: "Marks", hint: "Progress" },
  { to: "/dashboard#quizzes", label: "Quizzes", hint: "Weekly" },
  { to: "/dashboard#resources", label: "Resources", hint: "Papers" }
];

const courseItems = ["A/L 2028", "A/L 2027", "A/L 2026"];

export default function Sidebar() {
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
        <nav className="sidebar-nav">
          {navItems.map((item) => (
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
          ))}
        </nav>
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
