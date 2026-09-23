import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const submissionHistory = [
  { title: "Tutorial 11", date: "Apr 12", status: "Reviewed", score: "18/20" },
  { title: "Practical Report", date: "Apr 07", status: "Pending", score: "Waiting" },
  { title: "Monthly Essay", date: "Mar 30", status: "Reviewed", score: "72/100" }
];

const initialForm = {
  assignment: "",
  note: "",
  fileName: ""
};

export default function Submission() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.assignment.trim() || !form.fileName.trim()) {
      setMessage("Add an assignment title and PDF file name.");
      return;
    }

    setMessage("Submission saved to your draft queue. Connect backend upload next.");
    setForm(initialForm);
  };

  return (
    <MainLayout>
      <section className="dashboard-grid">
        <Card
          className="dashboard-panel"
          eyebrow="Upload work"
          title="Submit your assignment"
        >
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Assignment Title</span>
              <input
                name="assignment"
                placeholder="Tutorial 12 - Capacitors"
                value={form.assignment}
                onChange={handleChange}
              />
            </label>

            <label className="auth-field">
              <span>PDF File Name</span>
              <input
                name="fileName"
                placeholder="tutorial-12.pdf"
                value={form.fileName}
                onChange={handleChange}
              />
            </label>

            <label className="auth-field">
              <span>Note to Teacher</span>
              <textarea
                name="note"
                rows="5"
                placeholder="Add anything important about this submission"
                value={form.note}
                onChange={handleChange}
              />
            </label>

            {message ? <p className="error-msg submission-message">{message}</p> : null}

            <button type="submit">Submit assignment</button>
          </form>
        </Card>

        <Card className="dashboard-panel" eyebrow="Checklist" title="Before you upload">
          <ul className="activity-list">
            <li>Make sure every page is in one PDF file.</li>
            <li>Write your name and student ID on the first page.</li>
            <li>Check image clarity before final submission.</li>
          </ul>
        </Card>

        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Submission history"
          title="Recent uploads"
          action={<span className="section-badge">Last 3 records</span>}
        >
          <div className="stack-list">
            {submissionHistory.map((item) => (
              <article className="record-row" key={`${item.title}-${item.date}`}>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                </div>
                <div className="record-row-side">
                  <strong>{item.score}</strong>
                  <span>{item.status}</span>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </section>
    </MainLayout>
  );
}
