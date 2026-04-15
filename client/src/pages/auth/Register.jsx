import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  fullName: "",
  phoneNumber: "",
  school: "",
  nicNumber: "",
  academicYear: "A/L 2026",
  district: "",
  parentPhone: "",
  password: ""
};

export default function Register() {
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

    if (!form.fullName.trim() || !form.phoneNumber.trim() || !form.password.trim()) {
      setError("Full name, phone number, and password are required.");
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
        <span className="chip">Student Registration</span>
        <h1>Create your Physics LMS profile for classes, marks, and submissions.</h1>
        <p>
          Start with a complete student profile so teachers can track your
          performance, papers, quizzes, and progress correctly.
        </p>

        <div className="auth-note-card">
          <p className="auth-note-label">What you can do after signup</p>
          <ul className="auth-check-list">
            <li>View marks and curve charts</li>
            <li>Download theory and model papers</li>
            <li>Submit tutorials and assignments</li>
            <li>Access AI help for revision planning</li>
          </ul>
        </div>
      </section>

      <section className="auth-panel auth-panel-wide">
        <div className="auth-panel-head">
          <p className="auth-eyebrow">New account</p>
          <h2>Register as a student</h2>
          <p>Fill in the important details to activate your class account.</p>
        </div>

        <form className="form-grid auth-grid-two" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Full Name</span>
            <input
              name="fullName"
              placeholder="Student full name"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>

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
            <span>School</span>
            <input
              name="school"
              placeholder="Your school"
              value={form.school}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>NIC Number</span>
            <input
              name="nicNumber"
              placeholder="NIC number"
              value={form.nicNumber}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>Academic Year</span>
            <select name="academicYear" value={form.academicYear} onChange={handleChange}>
              <option value="A/L 2026">A/L 2026</option>
              <option value="A/L 2027">A/L 2027</option>
              <option value="A/L 2028">A/L 2028</option>
            </select>
          </label>

          <label className="auth-field">
            <span>District</span>
            <input
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>Parent Phone Number</span>
            <input
              name="parentPhone"
              placeholder="Parent contact"
              value={form.parentPhone}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          {error ? <p className="error-msg auth-grid-full">{error}</p> : null}

          <button className="auth-grid-full" type="submit">
            Create account and continue
          </button>
        </form>

        <div className="auth-links">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </section>
    </div>
  );
}
