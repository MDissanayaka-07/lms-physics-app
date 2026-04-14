import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const statCards = [
  {
    title: "Student ID",
    value: "2541115",
    tone: "primary",
    note: "Verified for 2026 advanced level batch"
  },
  {
    title: "Average Score",
    value: "78%",
    tone: "success",
    note: "Up by 12% compared with last month"
  },
  {
    title: "Pending Submissions",
    value: "02",
    tone: "warning",
    note: "Tutorial 12 and practical record"
  }
];

const lessonItems = [
  {
    title: "Electrostatics",
    meta: "Today at 7.30 PM",
    status: "Live class",
    description: "Field intensity, capacitor derivations, and rapid MCQ drill."
  },
  {
    title: "Revision Quiz",
    meta: "Due tomorrow",
    status: "Action needed",
    description: "25 mixed questions from mechanics and wave motion."
  },
  {
    title: "Paper Discussion",
    meta: "Saturday release",
    status: "Ready",
    description: "Download worked solutions and compare method marks."
  }
];

const activityItems = [
  "Marks for March unit test were published.",
  "Your latest submission was reviewed by the teacher.",
  "New model paper pack is available in resources."
];

export default function Dashboard() {
  return (
    <MainLayout>
      <section className="hero-panel">
        <div>
          <span className="chip">Good Morning</span>
          <h2 className="hero-heading">Welcome back, Madhuwantha.</h2>
          <p className="hero-copy">
            Your dashboard is organized around the things that matter most today:
            class readiness, score growth, submissions, and quick access to
            learning tools.
          </p>

          <div className="hero-actions">
            <a className="hero-button" href="/marks">
              View marks
            </a>
            <a className="hero-button hero-button-secondary" href="#assistant">
              Open AI assistant
            </a>
          </div>
        </div>

        <div className="hero-highlight">
          <p className="hero-highlight-label">Next Goal</p>
          <h3>Reach 85% average before the next monthly paper.</h3>
          <p>
            Focus on timed structured questions and revise capacitor graphs this
            week.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        {statCards.map((card) => (
          <Card className="metric-card" key={card.title} tone={card.tone}>
            <p className="metric-label">{card.title}</p>
            <h3 className="metric-value">{card.value}</h3>
            <p className="metric-note">{card.note}</p>
          </Card>
        ))}
      </section>

      <section className="dashboard-grid">
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Today's flow"
          title="What you should do next"
          action={<span className="section-badge">3 priorities</span>}
        >
          <div className="lesson-list">
            {lessonItems.map((item) => (
              <article className="lesson-card" key={item.title}>
                <div className="lesson-card-top">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.meta}</p>
                  </div>
                  <span className="status-pill">{item.status}</span>
                </div>
                <p className="lesson-description">{item.description}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="AI assistant" title="Study support">
          <div className="assistant-card">
            <p className="assistant-title">Ask Me Anything</p>
            <p className="assistant-copy">
              Download model papers, get revision prompts, and find the right
              topic to review before class.
            </p>
            <button type="button">Launch assistant</button>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Quick links" title="Resources">
          <div className="resource-list">
            <a className="resource-link" href="/marks">
              Marks and growth curve
            </a>
            <a className="resource-link" href="#papers">
              Past paper packs
            </a>
            <a className="resource-link" href="#pdfs">
              Tutorial PDFs
            </a>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Recent updates" title="Activity feed">
          <ul className="activity-list">
            {activityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </MainLayout>
  );
}
