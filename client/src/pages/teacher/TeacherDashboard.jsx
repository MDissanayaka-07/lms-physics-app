import { useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";

const summaryCards = [
  {
    title: "Active Students",
    value: "126",
    tone: "primary",
    note: "Across A/L 2026, 2027, and 2028 batches"
  },
  {
    title: "Class Average",
    value: "74%",
    tone: "success",
    note: "Improved by 6% since the previous monthly paper"
  },
  {
    title: "Pending Reviews",
    value: "09",
    tone: "warning",
    note: "PDF submissions and one quiz result require review"
  }
];

const studentProgress = [
  { name: "Madhuwantha", year: "A/L 2026", score: 84, trend: "Up 8%" },
  { name: "Dineth", year: "A/L 2027", score: 79, trend: "Stable" },
  { name: "Kavindu", year: "A/L 2028", score: 68, trend: "Needs support" },
  { name: "Sahan", year: "A/L 2026", score: 91, trend: "Top performer" }
];

const submissions = [
  { student: "Madhuwantha", file: "tutorial-12.pdf", status: "Reviewed", mark: "18/20" },
  { student: "Dineth", file: "practical-report.pdf", status: "Pending", mark: "Waiting" },
  { student: "Kavindu", file: "essay-revision.pdf", status: "Pending", mark: "Waiting" }
];

const quizzes = [
  { title: "Electrostatics Speed Quiz", due: "Tomorrow", status: "Scheduled" },
  { title: "Wave Motion Revision", due: "Friday", status: "Draft" },
  { title: "Mechanics Mixed Drill", due: "Completed", status: "Published" }
];

const assignmentPdfs = [
  { title: "Tutorial 12 Question Paper", batch: "A/L 2026", status: "Uploaded" },
  { title: "Capacitors Homework Sheet", batch: "A/L 2027", status: "Draft" },
  { title: "Practical Observation PDF", batch: "A/L 2028", status: "Uploaded" }
];

export default function TeacherDashboard() {
  const {
    user,
    teachers,
    approveTeacherPublishing,
    revokeTeacherPublishing
  } = useContext(AuthContext);

  const canPublish = Boolean(user?.canPublish ?? true);
  const isAdmin = Boolean(user?.isAdmin);

  return (
    <MainLayout>
      <section className="hero-panel teacher-hero" id="overview">
        <div>
          <span className="chip">Teacher Control Center</span>
          <h2 className="hero-heading">Manage your physics classes from one dashboard.</h2>
          <p className="hero-copy">
            View every student, enter marks, monitor progress curves, publish quizzes,
            and review submitted PDFs without leaving the panel.
          </p>

          <div className="hero-actions">
            <a className="hero-button" href="#students">
              View students
            </a>
            <a className="hero-button hero-button-secondary" href="#submissions">
              Review submissions
            </a>
          </div>
        </div>

        <div className="hero-highlight">
          <p className="hero-highlight-label">Teacher Snapshot</p>
          <h3>Upload access is enabled for your teacher-admin account.</h3>
          <p>
            {isAdmin
              ? "You can upload marks, publish quizzes, and upload question PDFs directly from this workspace."
              : "You can manage classroom content from this workspace."}
          </p>
        </div>
      </section>

      <section className="stats-grid">
        {summaryCards.map((card) => (
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
          eyebrow="Student oversight"
          title="Student progress monitoring"
          action={<span className="section-badge">Live overview</span>}
        >
          <div className="stack-list" id="students">
            {studentProgress.map((student) => (
              <article className="teacher-student-row" key={student.name}>
                <div>
                  <h4>{student.name}</h4>
                  <p>{student.year}</p>
                </div>
                <div className="teacher-progress-wrap">
                  <div className="progress-track">
                    <span className="progress-fill" style={{ width: `${student.score}%` }} />
                  </div>
                  <small>{student.score}%</small>
                </div>
                <div className="record-row-side">
                  <strong>{student.trend}</strong>
                  <span>Progress trend</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Marks upload" title="Upload student marks">
          <form className="form-grid teacher-form-grid">
            <label className="auth-field">
              <span>Student</span>
              <select defaultValue="Madhuwantha">
                <option>Madhuwantha</option>
                <option>Dineth</option>
                <option>Kavindu</option>
                <option>Sahan</option>
              </select>
            </label>

            <label className="auth-field">
              <span>Exam</span>
              <input placeholder="Monthly Paper - April" />
            </label>

            <label className="auth-field">
              <span>Score</span>
              <input placeholder="84" />
            </label>

            <label className="auth-field">
              <span>Remarks</span>
              <textarea rows="4" placeholder="Add teacher notes and feedback" />
            </label>

            <div className="teacher-action-row">
              <button type="button">Upload marks</button>
            </div>
          </form>
        </Card>

        <Card className="dashboard-panel" eyebrow="Quiz upload" title="Upload and publish quizzes">
          <form className="form-grid teacher-form-grid">
            <label className="auth-field">
              <span>Quiz Title</span>
              <input placeholder="Electrostatics Weekly Quiz" />
            </label>

            <label className="auth-field">
              <span>Batch</span>
              <select defaultValue="A/L 2026">
                <option>A/L 2026</option>
                <option>A/L 2027</option>
                <option>A/L 2028</option>
              </select>
            </label>

            <label className="auth-field">
              <span>Question Count</span>
              <input placeholder="20" />
            </label>

            <label className="auth-field">
              <span>Quiz Note</span>
              <textarea rows="4" placeholder="Add instructions or topic coverage" />
            </label>

            <div className="teacher-action-row">
              <button type="button">Upload quiz</button>
            </div>
          </form>
        </Card>

        <Card className="dashboard-panel" eyebrow="Quiz status" title="Current quiz pipeline">
          <div className="stack-list" id="quizzes">
            {quizzes.map((quiz) => (
              <article className="record-row" key={quiz.title}>
                <div>
                  <h4>{quiz.title}</h4>
                  <p>{quiz.due}</p>
                </div>
                <div className="record-row-side">
                  <strong>{quiz.status}</strong>
                  <span>Quiz status</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Submission review"
          title="PDF submissions from students"
          action={<span className="section-badge">Needs grading</span>}
        >
          <div className="stack-list" id="submissions">
            {submissions.map((item) => (
              <article className="record-row" key={`${item.student}-${item.file}`}>
                <div>
                  <h4>{item.student}</h4>
                  <p>{item.file}</p>
                </div>
                <div className="record-row-side">
                  <strong>{item.mark}</strong>
                  <span>{item.status}</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Question PDF upload"
          title="Upload submission question PDF for students"
          action={<span className="section-badge">Teacher upload</span>}
        >
          <div className="teacher-upload-grid">
            <form className="form-grid teacher-form-grid">
              <label className="auth-field">
                <span>Assignment Title</span>
                <input placeholder="Tutorial 13 - Electric Field Questions" />
              </label>

              <label className="auth-field">
                <span>Batch</span>
                <select defaultValue="A/L 2026">
                  <option>A/L 2026</option>
                  <option>A/L 2027</option>
                  <option>A/L 2028</option>
                </select>
              </label>

              <label className="auth-field">
                <span>PDF File Name</span>
                <input placeholder="tutorial-13-question-paper.pdf" />
              </label>

              <label className="auth-field">
                <span>Instructions</span>
                <textarea rows="4" placeholder="Add due date, marks, and upload instructions" />
              </label>

              <div className="teacher-action-row">
                <button type="button">Upload question PDF</button>
              </div>
            </form>

            <div className="stack-list">
              {assignmentPdfs.map((item) => (
                <article className="record-row" key={`${item.title}-${item.batch}`}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.batch}</p>
                  </div>
                  <div className="record-row-side">
                    <strong>{item.status}</strong>
                    <span>Question file status</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Card>

        {isAdmin && teachers.length > 1 && (
          <Card
            className="dashboard-panel dashboard-panel-wide"
            eyebrow="Admin control"
            title="Grant teacher publishing access"
            action={<span className="section-badge">Admin only</span>}
          >
            <div className="stack-list">
              {teachers
                .filter((teacher) => !teacher.isAdmin)
                .map((teacher) => (
                  <article className="record-row" key={teacher.id}>
                    <div>
                      <h4>{teacher.fullName}</h4>
                      <p>{teacher.phoneNumber}</p>
                    </div>
                    <div className="teacher-access-actions">
                      <span
                        className={
                          teacher.canPublish ? "access-pill access-pill-on" : "access-pill"
                        }
                      >
                        {teacher.canPublish ? "Publishing enabled" : "Publishing locked"}
                      </span>
                      <div className="teacher-access-buttons">
                        <button type="button" onClick={() => approveTeacherPublishing(teacher.id)}>
                          Allow publish
                        </button>
                        <button
                          className="hero-button hero-button-secondary"
                          type="button"
                          onClick={() => revokeTeacherPublishing(teacher.id)}
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </Card>
        )}
      </section>
    </MainLayout>
  );
}
