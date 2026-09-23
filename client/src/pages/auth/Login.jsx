import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  phoneNumber: "",
  password: ""
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
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
      setError("Enter your phone number and password.");
      return;
    }

    navigate("/otp", {
      state: {
        phoneNumber: form.phoneNumber
      }
    });
  };

  return (
    <div className="auth-shell">
      <section className="auth-hero">
        <span className="chip">A/L Physics LMS</span>
        <h1>Study smarter, track your marks, and stay connected to every lesson.</h1>
        <p>
          A student portal designed for physics classes with marks analysis, quiz
          tracking, submissions, and AI-powered study help.
        </p>

        <div className="auth-feature-list">
          <article className="auth-feature-card">
            <strong>Progress Curve</strong>
            <span>Compare each test and identify your improvement trend.</span>
          </article>
          <article className="auth-feature-card">
            <strong>AI Study Assistant</strong>
            <span>Find model papers, quick revision prompts, and practice paths.</span>
          </article>
          <article className="auth-feature-card">
            <strong>Teacher Connected</strong>
            <span>Get updates on marks, submissions, and class tasks in one place.</span>
          </article>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-head">
          <p className="auth-eyebrow">Welcome back</p>
          <h2>Login to your account</h2>
          <p>Use your phone number and password to continue.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Phone Number</span>
            <input
              name="phoneNumber"
              placeholder="077 123 4567"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          {error ? <p className="error-msg">{error}</p> : null}

          <button type="submit">Continue with OTP</button>
        </form>

        <div className="auth-links">
          <Link to="/register">Create a new student account</Link>
          <Link to="/teacher-login">Teacher login</Link>
          <a href="#forgot-password">Forgot password?</a>
        </div>
      </section>
    </div>
  );
}
