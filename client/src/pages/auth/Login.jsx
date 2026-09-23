import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendVerificationEmail } from "../../services/emailService";

const initialForm = {
  email: "",
  password: "",
  rememberMe: false
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "email") {
      if (!value.trim()) {
        errorMsg = "Email address is required.";
      } else if (!EMAIL_REGEX.test(value.trim())) {
        errorMsg = "Please enter a valid email address (e.g., student@example.com).";
      }
    }
    if (name === "password") {
      if (!value) {
        errorMsg = "Password is required.";
      } else if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters.";
      }
    }
    return errorMsg;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setForm((current) => ({
      ...current,
      [name]: val
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, val)
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validateField("email", form.email);
    const passwordError = validateField("password", form.password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send verification code to email from madhudissa07@gmail.com
      const res = await sendVerificationEmail(form.email);
      
      navigate("/otp", {
        state: {
          email: form.email,
          message: res.message,
          activeCode: res.code
        }
      });
    } catch (err) {
      setErrors({ email: "Failed to send verification email. Please try again." });
      setIsSubmitting(false);
    }
  };

  const isEmailValid = touched.email && !errors.email && form.email;

  return (
    <div className="auth-shell auth-shell-compact">
      <section className="auth-panel auth-panel-center">
        <div className="auth-panel-head">
          <div className="auth-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>A/L Physics LMS</span>
          </div>
          <h2>Login to your account</h2>
          <p>Use your email address and password to continue.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <div className={`input-wrapper ${touched.email && errors.email ? "has-error" : ""} ${isEmailValid ? "is-valid" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="student@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              {isEmailValid && (
                <svg className="valid-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            {touched.email && errors.email && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper ${touched.password && errors.password ? "has-error" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.password}
              </span>
            )}
          </div>

          {/* Options Row */}
          <div className="auth-options-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-link">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="btn-spinner">Sending verification email...</span>
            ) : (
              <>
                <span>Continue with Email Verification</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer-links">
          <Link to="/register" className="highlight-link">Create student account</Link>
          <span className="divider-dot">•</span>
          <Link to="/teacher-login" className="teacher-link">Teacher login</Link>
        </div>
      </section>
    </div>
  );
}
