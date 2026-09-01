import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const quickStats = [
  { value: "128", label: "Paper files ready", note: "Past papers, model packs, and answer schemes." },
  { value: "18", label: "Topics indexed", note: "Search by mechanics, waves, electricity, and more." },
  { value: "92%", label: "Weekly completion goal", note: "Based on your recent revision streak." }
];

const spotlightPaper = {
  year: "2024",
  title: "A/L Physics Full Past Paper",
  difficulty: "Exam standard",
  duration: "3 hours",
  questions: "50 MCQ + 6 structured",
  description:
    "A complete exam simulation pack with a clean printable layout, guided timing plan, and separate answer discussion.",
  tags: ["Most recent", "Printable", "Answer scheme"],
  progress: 72
};

const paperSets = [
  {
    year: "2024",
    title: "Structured Questions Booster",
    type: "Practice pack",
    status: "Recommended",
    duration: "45 min",
    topic: "Electricity",
    description: "Focused structured questions with step-by-step marking points for high-score practice."
  },
  {
    year: "2023",
    title: "Model Paper Discussion Pack",
    type: "Model paper",
    status: "Popular",
    duration: "90 min",
    topic: "Mixed revision",
    description: "Teacher-selected questions with worked answers, common mistakes, and correction notes."
  },
  {
    year: "2022",
    title: "Weekend Revision Bundle",
    type: "Timed bundle",
    status: "Ready",
    duration: "2 hours",
    topic: "Mechanics",
    description: "Topic-based paper collection built for timed weekend practice and self-review."
  },
  {
    year: "2021",
    title: "MCQ Accuracy Drill",
    type: "Speed set",
    status: "Fast practice",
    duration: "30 min",
    topic: "Thermal physics",
    description: "Short sharp MCQ rounds to improve elimination technique and exam pace."
  }
];

const revisionTracks = [
  {
    title: "Weak chapter recovery",
    note: "Start with capacitance and electric fields, then move into mixed-application questions."
  },
  {
    title: "Exam-week sprint",
    note: "Alternate one full paper with one answer-review session to build confidence without burnout."
  },
  {
    title: "Rank-up strategy",
    note: "Use model packs after each past paper to convert mistakes into pattern recognition."
  }
];

const aiSuggestions = [
  "Ask the AI bot for capacitor questions only from papers after 2018.",
  "Generate a 30-minute revision plan before opening a full paper.",
  "Request a model paper with only high-frequency structured question styles."
];

export default function Papers() {
  return (
    <MainLayout>
      <section className="papers-hero">
        <div className="papers-hero-copy">
          <span className="chip">Exam Library</span>
          <h2>Plan, practice, and review every paper from one place.</h2>
          <p>
            Move from quick topic drills to full exam simulations with guided
            timing, answer schemes, and AI-powered recommendations based on what
            you should revise next.
          </p>

          <div className="papers-hero-actions">
            <button type="button">Start today&apos;s paper</button>
            <button className="hero-button hero-button-secondary" type="button">
              Open revision planner
            </button>
          </div>

          <div className="papers-filter-row">
            <span className="papers-filter-active">All papers</span>
            <span className="papers-filter-chip">Past papers</span>
            <span className="papers-filter-chip">Model packs</span>
            <span className="papers-filter-chip">MCQ drills</span>
            <span className="papers-filter-chip">Answer discussions</span>
          </div>
        </div>

        <div className="papers-spotlight">
          <p className="papers-spotlight-label">Spotlight pack</p>
          <h3>{spotlightPaper.title}</h3>
          <p>{spotlightPaper.description}</p>

          <div className="papers-spotlight-meta">
            <div>
              <span>Duration</span>
              <strong>{spotlightPaper.duration}</strong>
            </div>
            <div>
              <span>Questions</span>
              <strong>{spotlightPaper.questions}</strong>
            </div>
            <div>
              <span>Difficulty</span>
              <strong>{spotlightPaper.difficulty}</strong>
            </div>
          </div>

          <div className="papers-progress-card">
            <div className="papers-progress-head">
              <span>Completion target</span>
              <strong>{spotlightPaper.progress}%</strong>
            </div>
            <div className="progress-track">
              <span className="progress-fill" style={{ width: `${spotlightPaper.progress}%` }} />
            </div>
          </div>

          <div className="papers-tag-row">
            {spotlightPaper.tags.map((tag) => (
              <span className="papers-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="papers-stats-grid">
        {quickStats.map((item) => (
          <Card key={item.label} className="papers-stat-card">
            <p className="papers-stat-value">{item.value}</p>
            <h3>{item.label}</h3>
            <p className="metric-note">{item.note}</p>
          </Card>
        ))}
      </section>

      <section className="dashboard-grid papers-layout-grid">
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Paper library"
          title="Past papers and model packs"
          action={<span className="section-badge">Updated weekly</span>}
        >
          <div className="paper-grid">
            {paperSets.map((paper) => (
              <article className="paper-card paper-card-rich" key={paper.title}>
                <div className="paper-card-top">
                  <span className="paper-year">{paper.year}</span>
                  <span className="status-pill">{paper.status}</span>
                </div>

                <div className="paper-card-headline">
                  <h4>{paper.title}</h4>
                  <p className="paper-type">{paper.type}</p>
                </div>

                <p className="lesson-description">{paper.description}</p>

                <div className="paper-card-meta">
                  <span>{paper.topic}</span>
                  <span>{paper.duration}</span>
                </div>

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

        <Card className="dashboard-panel" eyebrow="Smart support" title="AI paper helper" tone="primary">
          <div className="assistant-card papers-assistant-card">
            <p className="assistant-title">Paper Finder Assistant</p>
            <p className="assistant-copy">
              Use the AI helper to find the right paper set by chapter,
              difficulty, exam year, or the exact mistake pattern you want to fix.
            </p>
            <button type="button">Open AI paper bot</button>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Study tracks" title="Recommended next steps">
          <div className="papers-track-list">
            {revisionTracks.map((track) => (
              <article className="papers-track-item" key={track.title}>
                <h4>{track.title}</h4>
                <p>{track.note}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel dashboard-panel-wide" eyebrow="Best use" title="Suggestions for you">
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
