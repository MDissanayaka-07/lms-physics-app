import { useContext } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const performanceData = [
  { exam: "Jan", score: 60 },
  { exam: "Feb", score: 72 },
  { exam: "Mar", score: 80 },
  { exam: "Apr", score: 65 },
  { exam: "May", score: 90 }
];

const statCards = [
  {
    title: "Exam Score Avg",
    value: "78.4%",
    tone: "success",
    pill: "+12% Growth",
    note: "Highest score: 90/100 (May Exam)",
    to: "/marks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  },
  {
    title: "Quiz Accuracy",
    value: "84%",
    tone: "primary",
    pill: "Top 15% Rank",
    note: "1 Upcoming: Electrostatics (Tomorrow)",
    to: "/quiz",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    )
  },
  {
    title: "Active Lesson",
    value: "85%",
    tone: "primary",
    pill: "Module 01 Active",
    note: "Gravitational Nullification & Mechanics",
    progress: 85,
    to: "/lessons",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(150 12 12)" />
      </svg>
    )
  },
  {
    title: "Paper Files Ready",
    value: "128",
    tone: "primary",
    pill: "18 Topics Indexed",
    note: "72% Spotlight target completed",
    to: "/papers",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  },
  {
    title: "Pending Submissions",
    value: "02",
    tone: "warning",
    pill: "Action Needed",
    note: "Tutorial 01 & Lab Record due soon",
    to: "/submission",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    title: "Student ID",
    value: "2541115",
    tone: "primary",
    pill: "2026 A/L Batch",
    note: "Verified Physical Science Student",
    to: "/profile",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
];

const lessonItems = [
  {
    title: "Electrostatics Live Session",
    meta: "Today at 7.30 PM • Eng. Dissanayaka",
    status: "Live class",
    statusTone: "success",
    description: "Field intensity, capacitor derivations, and rapid MCQ drill.",
    link: "/lessons"
  },
  {
    title: "Electrostatics Speed Quiz",
    meta: "Due tomorrow at 8.00 PM",
    status: "Action needed",
    statusTone: "warning",
    description: "20 questions covering electric field, Coulomb force, and capacitor energy.",
    link: "/quiz"
  },
  {
    title: "2024 A/L Physics Full Past Paper",
    meta: "Saturday paper discussion",
    status: "Ready",
    statusTone: "primary",
    description: "Download worked solutions, step-by-step marking schemes, and video breakdown.",
    link: "/papers"
  }
];

const activityItems = [
  { text: "Marks for May unit test were published (Scored 90%).", time: "2 hours ago", badge: "Marks" },
  { text: "Your latest Tutorial 01 submission was reviewed by teacher.", time: "Yesterday", badge: "Review" },
  { text: "New 2024 Model Paper Pack is available in resources.", time: "2 days ago", badge: "Library" }
];

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const displayName = user?.callingName || user?.firstName || user?.fullName || "Student";

  return (
    <MainLayout>
      {/* Top Welcome Hero */}
      <section className="hero-panel">
        <div>
          <span className="chip">PHYSICS LEARNING PORTAL</span>
          <h2 className="hero-heading">Welcome back, {displayName}.</h2>
          <p className="hero-copy">
            Your workspace is synchronized across all modules: class readiness, score growth, 
            quizzes, past paper archives, and tutor feedback in one intelligent dashboard.
          </p>

          <div className="hero-actions">
            <Link className="hero-button" to="/marks">
              View Growth Chart
            </Link>
            <Link className="hero-button hero-button-secondary" to="/lessons">
              Explore Lessons
            </Link>
          </div>
        </div>

        <div className="hero-highlight">
          <p className="hero-highlight-label">Target Milestone</p>
          <h3>Reach 85% average before the next monthly paper.</h3>
          <p>
            Focus on timed structured questions and revise capacitor graphs and gravitational field 
            vectors this week.
          </p>
        </div>
      </section>

      {/* Enhanced KPI Metrics Grid */}
      <section className="kpi-extended-grid">
        {statCards.map((card) => (
          <Link key={card.title} to={card.to} className="kpi-card-link">
            <Card className="metric-card kpi-enhanced-card" tone={card.tone}>
              <div className="kpi-card-header">
                <div className="kpi-card-icon-box">{card.icon}</div>
                <span className={`kpi-pill kpi-pill-${card.tone}`}>{card.pill}</span>
              </div>
              <p className="metric-label">{card.title}</p>
              <h3 className="metric-value">{card.value}</h3>

              {card.progress !== undefined && (
                <div className="kpi-progress-bar">
                  <div className="kpi-progress-fill" style={{ width: `${card.progress}%` }} />
                </div>
              )}

              <p className="metric-note">{card.note}</p>
            </Card>
          </Link>
        ))}
      </section>

      {/* Dashboard Main Grid: Performance Curve + Today's Flow + Quick Tools */}
      <section className="dashboard-grid">
        {/* Performance Chart Card */}
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Score Analytics"
          title="Performance Growth Trend"
          action={
            <Link to="/marks" className="section-badge section-badge-interactive">
              View Detailed Marks →
            </Link>
          }
        >
          <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={performanceData}>
                <XAxis dataKey="exam" stroke="#56717d" fontSize={12} tickLine={false} />
                <YAxis stroke="#56717d" fontSize={12} tickLine={false} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(6, 38, 58, 0.95)",
                    borderColor: "rgba(122, 215, 207, 0.3)",
                    borderRadius: "12px",
                    color: "#ffffff"
                  }}
                  itemStyle={{ color: "#7ad7cf", fontWeight: "bold" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#176b87"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#f5c95c", strokeWidth: 2, stroke: "#176b87" }}
                  activeDot={{ r: 8, fill: "#7ad7cf" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Assistant Support */}
        <Card className="dashboard-panel" eyebrow="AI Assistant" title="Study Support Bot">
          <div className="assistant-card">
            <p className="assistant-title">Physics Concept Helper</p>
            <p className="assistant-copy">
              Ask for derivation hints, past paper answers by year, or personalized topic revision guides.
            </p>
            <Link className="hero-button" to="/papers">
              Open Paper Bot
            </Link>
          </div>
        </Card>

        {/* Today's Action Items */}
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Today's Flow"
          title="What You Should Do Next"
          action={<span className="section-badge">3 Priorities</span>}
        >
          <div className="lesson-list">
            {lessonItems.map((item) => (
              <article className="lesson-card" key={item.title}>
                <div className="lesson-card-top">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.meta}</p>
                  </div>
                  <Link to={item.link} style={{ textDecoration: 'none' }}>
                    <span className="status-pill">{item.status}</span>
                  </Link>
                </div>
                <p className="lesson-description">{item.description}</p>
              </article>
            ))}
          </div>
        </Card>

        {/* Quick Links & Resources */}
        <Card className="dashboard-panel" eyebrow="Quick Access" title="Learning Hub">
          <div className="resource-list">
            <Link className="resource-link" to="/marks">
              📈 Marks and Growth Curve
            </Link>
            <Link className="resource-link" to="/quiz">
              ⏱️ Weekly Speed Quizzes
            </Link>
            <Link className="resource-link" to="/lessons">
              📚 Physics Topic Lessons & Notes
            </Link>
            <Link className="resource-link" to="/papers">
              📑 Past Paper Packs & Marking Schemes
            </Link>
            <Link className="resource-link" to="/submission">
              📤 Upload Homework / Tutes
            </Link>
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="dashboard-panel dashboard-panel-wide" eyebrow="Recent Activity" title="Updates & Notifications">
          <div className="stack-list">
            {activityItems.map((item) => (
              <div className="record-row" key={item.text}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem" }}>{item.text}</h4>
                  <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#607885" }}>{item.time}</p>
                </div>
                <span className="status-pill">{item.badge}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </MainLayout>
  );
}
