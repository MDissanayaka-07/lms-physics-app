import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const paperSets = [
  {
    year: "2024",
    title: "A/L Physics Past Paper",
    type: "Past paper",
    status: "New",
    description: "Complete paper with MCQ, structured, and essay sections."
  },
  {
    year: "2023",
    title: "Model Paper Discussion Pack",
    type: "Model paper",
    status: "Popular",
    description: "Teacher-selected questions with worked answers and method notes."
  },
  {
    year: "2022",
    title: "Revision Bundle",
    type: "Practice pack",
    status: "Ready",
    description: "Topic-based paper collection for timed weekend practice."
  }
];

const aiSuggestions = [
  "Ask the AI bot for difficult capacitor questions.",
  "Generate a 30-minute revision plan before opening a paper.",
  "Request a topic-based paper pack for your weakest chapter."
];

export default function Papers() {
  return (
    <MainLayout>
      <section className="dashboard-grid">
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Paper library"
          title="Past papers and model packs"
          action={<span className="section-badge">Updated weekly</span>}
        >
          <div className="paper-grid">
            {paperSets.map((paper) => (
              <article className="paper-card" key={paper.title}>
                <div className="paper-card-top">
                  <span className="paper-year">{paper.year}</span>
                  <span className="status-pill">{paper.status}</span>
                </div>
                <h4>{paper.title}</h4>
                <p className="paper-type">{paper.type}</p>
                <p className="lesson-description">{paper.description}</p>
                <div className="paper-actions">
                  <button type="button">Download PDF</button>
                  <button className="hero-button hero-button-secondary" type="button">
                    View answers
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="AI bot" title="Smart paper help">
          <div className="assistant-card">
            <p className="assistant-title">Paper Finder Assistant</p>
            <p className="assistant-copy">
              Use the AI helper to find the right paper set based on chapter,
              difficulty, or exam year.
            </p>
            <button type="button">Open AI paper bot</button>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Best use" title="Suggestions for you">
          <ul className="activity-list">
            {aiSuggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </MainLayout>
  );
}
