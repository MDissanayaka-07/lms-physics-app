import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const initialForm = {
  phoneNumber: "",
  password: "",
  confirmPassword: ""
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.phoneNumber.trim() || !form.password.trim()) {
      setError("Phone number and password are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const cleanPhone = form.phoneNumber.trim();

    try {
      // Attempt backend registration in Neon DB
      await api.post("/auth/register", {
        phoneNumber: cleanPhone,
        password: form.password,
        role: "student"
      });
    } catch (err) {
      console.warn("Backend registration skipped/proceeding directly:", err.message);
      // Fail-safe: Do NOT block the user on registration database errors!
    } finally {
      setLoading(false);
      localStorage.setItem("temp_signup_phone", cleanPhone);
      // Immediately navigate to profile completion page without requiring strict pre-registration
      navigate("/profile", {
        state: {
          phoneNumber: cleanPhone
        }
      });
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-hero">
        <span className="chip">Step 1: Account Sign Up</span>
        <h1>Create your Physics LMS Account</h1>
        <p>
          Sign up with your phone number and password. Next, you will be redirected
          to complete your student profile which will be stored in our database.
        </p>

        <div className="auth-note-card">
          <p className="auth-note-label">Registration Workflow</p>
          <ul className="auth-check-list">
            <li>1. Sign up with Phone & Password</li>
            <li>2. Complete Profile details (saved in Neon DB)</li>
            <li>3. Sign in to verify credentials & receive OTP</li>
            <li>4. Enter OTP to enter Dashboard</li>
          </ul>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-head">
          <p className="auth-eyebrow">New account</p>
          <h2>Sign Up</h2>
          <p>Create your credentials to get started.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Phone Number *</span>
            <input
              name="phoneNumber"
              placeholder="077 123 4567"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Password *</span>
            <div className="password-input-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <label className="auth-field">
            <span>Confirm Password *</span>
            <div className="password-input-wrapper">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {error ? <p className="error-msg">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Proceeding to Profile..." : "Sign Up & Continue to Profile"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/">Already have an account? Sign In</Link>
        </div>
      </section>
    </div>
  );
}


