import { useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";

const lessonItems = [
  {
    title: "Electrostatics",
    meta: "Today at 7:30 PM",
    status: "Live Class",
    tone: "live"
  },
  {
    title: "Revision Quiz (Mechanics)",
    meta: "Due Tomorrow",
    status: "Action Needed",
    tone: "warning"
  },
  {
    title: "Paper Discussion",
    meta: "Saturday Release",
    status: "Ready",
    tone: "success"
  }
];

const activityItems = [
  { title: "March unit test marks published", time: "2h ago" },
  { title: "Submission reviewed by teacher", time: "1d ago" },
  { title: "New model paper pack added", time: "2d ago" }
];

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const studentName = user?.fullName ? user.fullName.split(" ")[0] : "Madhuwantha";
  const studentId = user?.studentId || "2541115";

  return (
    <MainLayout>
      {/* Compact Top Banner */}
      <section className="dashboard-hero-compact">
        <div className="hero-compact-left">
          <div className="hero-greeting-row">
            <h2>Welcome back, {studentName} 👋</h2>
            <span className="hero-goal-pill">🎯 Target: 85% average next paper</span>
          </div>
        </div>

        <div className="hero-compact-right">
          <a className="hero-btn primary" href="/marks">
            View Marks
          </a>
          <a className="hero-btn secondary" href="/papers">
            Open Papers
          </a>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="stats-row-compact">
        <div className="metric-pill">
          <span className="metric-title">Student ID</span>
          <strong className="metric-val">{studentId}</strong>
          <span className="metric-sub">2026 A/L Batch</span>
        </div>

        <div className="metric-pill highlighted">
          <span className="metric-title">Average Score</span>
          <strong className="metric-val">78%</strong>
          <span className="metric-sub trend-up">↑ +12% this month</span>
        </div>

        <div className="metric-pill">
          <span className="metric-title">Pending Submissions</span>
          <strong className="metric-val">02</strong>
          <span className="metric-sub">Tutorial 12 & Practical</span>
        </div>
      </section>

      {/* Streamlined 2-Column Dashboard Grid */}
      <section className="dashboard-grid-compact">
        {/* Left Column: Today's Priorities & Feed */}
        <div className="dashboard-col-main">
          <Card className="compact-card" title="Today's Priorities">
            <div className="compact-lesson-list">
              {lessonItems.map((item) => (
                <div className="compact-lesson-row" key={item.title}>
                  <div className="compact-lesson-info">
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <span className={`compact-status-badge ${item.tone}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="compact-card" title="Recent Activity">
            <ul className="compact-activity-list">
              {activityItems.map((item) => (
                <li key={item.title}>
                  <span>{item.title}</span>
                  <small>{item.time}</small>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right Column: Quick Shortcuts & AI */}
        <div className="dashboard-col-side">
          <Card className="compact-card" title="Quick Links">
            <div className="quick-links-grid">
              <a className="quick-link-tile" href="/marks">
                📈 Marks & Curve
              </a>
              <a className="quick-link-tile" href="/papers">
                📄 Past Papers
              </a>
              <a className="quick-link-tile" href="/quiz">
                📝 Weekly Quizzes
              </a>
              <a className="quick-link-tile" href="/submission">
                📤 Submit Tutorial
              </a>
            </div>
          </Card>

          <Card className="compact-card ai-card" title="AI Study Assistant">
            <div className="ai-compact-box">
              <p>Ask model paper questions & revision prompts.</p>
              <a className="hero-btn primary full-width" href="/papers">
                🤖 Open AI Bot
              </a>
            </div>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}

