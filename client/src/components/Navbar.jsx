export default function Navbar({ eyebrow, title, description }) {
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
          <div className="dashboard-avatar">SM</div>
          <div>
            <strong>Madhuwantha</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}
