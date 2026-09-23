import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const initialForm = {
  phoneNumber: "",
  password: ""
};

export default function TeacherLogin() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { loginTeacher } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.phoneNumber.trim() || !form.password.trim()) {
      setError("Enter your teacher phone number and password.");
      return;
    }

    const result = loginTeacher(form.phoneNumber.trim());

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/teacher");
  };

  return (
    <div className="auth-shell">
      <section className="auth-hero auth-hero-teacher">
        <span className="chip">Teacher Access</span>
        <h1>Teacher and admin access in one account.</h1>
        <p>
          This setup uses one staff account that acts as both teacher and admin,
          so marks, quizzes, and question PDFs can be uploaded directly.
        </p>

        <div className="auth-note-card">
          <p className="auth-note-label">Login account</p>
          <ul className="auth-check-list">
            <li>Admin and teacher: 0710000001</li>
          </ul>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-head">
          <p className="auth-eyebrow">Teacher sign in</p>
          <h2>Open the teacher workspace</h2>
          <p>Upload access is enabled automatically for the admin-teacher account.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Teacher Phone Number</span>
            <input
              name="phoneNumber"
              placeholder="0710000002"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          {error ? <p className="error-msg">{error}</p> : null}

          <button type="submit">Login as teacher</button>
        </form>

        <div className="auth-links">
          <Link to="/">Back to student login</Link>
        </div>
      </section>
    </div>
  );
}
