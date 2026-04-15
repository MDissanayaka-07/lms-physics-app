import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const upcomingQuiz = {
  title: "Electrostatics Speed Quiz",
  duration: "25 minutes",
  questions: 20,
  due: "Tomorrow at 8.00 PM",
  note: "Covers electric field, Coulomb force, and capacitor basics."
};

const recentAttempts = [
  { title: "Mechanics Mixed Drill", score: "17/20", result: "Excellent", date: "Apr 10" },
  { title: "Wave Motion Revision", score: "14/20", result: "Good", date: "Apr 06" },
  { title: "Heat and Matter Check", score: "11/20", result: "Needs review", date: "Apr 01" }
];

const quickTips = [
  "Start with direct theory questions before solving long calculations.",
  "Keep 5 minutes at the end to recheck units and sign conventions.",
  "If you get stuck, skip and return instead of losing time early."
];

export default function Quiz() {
  return (
    <MainLayout>
      <section className="stats-grid">
        <Card className="metric-card" tone="primary">
          <p className="metric-label">Upcoming Quiz</p>
          <h3 className="metric-value">01</h3>
          <p className="metric-note">One physics quiz scheduled for this week</p>
        </Card>

        <Card className="metric-card" tone="success">
          <p className="metric-label">Average Quiz Score</p>
          <h3 className="metric-value">84%</h3>
          <p className="metric-note">Strong consistency across the last three attempts</p>
        </Card>

        <Card className="metric-card" tone="warning">
          <p className="metric-label">Weak Area</p>
          <h3 className="metric-value">Fields</h3>
          <p className="metric-note">Revise graph interpretation and formula application</p>
        </Card>
      </section>

      <section className="dashboard-grid">
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Next challenge"
          title={upcomingQuiz.title}
          action={<span className="section-badge">{upcomingQuiz.due}</span>}
        >
          <div className="quiz-hero">
            <div className="quiz-meta-grid">
              <div className="quiz-meta-card">
                <span>Duration</span>
                <strong>{upcomingQuiz.duration}</strong>
              </div>
              <div className="quiz-meta-card">
                <span>Questions</span>
                <strong>{upcomingQuiz.questions}</strong>
              </div>
              <div className="quiz-meta-card">
                <span>Topic</span>
                <strong>Electrostatics</strong>
              </div>
            </div>

            <p className="lesson-description">{upcomingQuiz.note}</p>

            <div className="hero-actions">
              <button type="button">Start quiz</button>
              <button className="hero-button hero-button-secondary" type="button">
                Review notes first
              </button>
            </div>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Recent attempts" title="Your latest quiz results">
          <div className="stack-list">
            {recentAttempts.map((item) => (
              <article className="record-row" key={item.title}>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                </div>
                <div className="record-row-side">
                  <strong>{item.score}</strong>
                  <span>{item.result}</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Quiz strategy" title="How to improve faster">
          <ul className="activity-list">
            {quickTips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </MainLayout>
  );
}
