import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const initialForm = {
  emailOrPhone: "",
  password: ""
};

export default function TeacherLogin() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loginTeacher } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "emailOrPhone") {
      if (!value.trim()) errorMsg = "Teacher email or phone number is required.";
    }
    if (name === "password") {
      if (!value) errorMsg = "Password is required.";
    }
    return errorMsg;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const idErr = validateField("emailOrPhone", form.emailOrPhone);
    const passErr = validateField("password", form.password);

    setTouched({ emailOrPhone: true, password: true });
    setErrors({ emailOrPhone: idErr, password: passErr });

    if (idErr || passErr) {
      return;
    }

    const result = loginTeacher(form.emailOrPhone.trim());

    if (!result.ok) {
      setErrors({ form: result.message });
      return;
    }

    navigate("/teacher");
  };

  return (
    <div className="auth-shell auth-shell-compact">
      <section className="auth-panel auth-panel-center">
        <div className="auth-panel-head">
          <div className="auth-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            <span>Teacher Portal</span>
          </div>
          <h2>Teacher Workspace</h2>
          <p>Sign in to manage student marks, quizzes, and class papers.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="emailOrPhone">Teacher Email or Phone *</label>
            <div className={`input-wrapper ${touched.emailOrPhone && errors.emailOrPhone ? "has-error" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input
                id="emailOrPhone"
                name="emailOrPhone"
                placeholder="teacher@example.com or phone"
                value={form.emailOrPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.emailOrPhone && errors.emailOrPhone && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.emailOrPhone}
              </span>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password *</label>
            <div className={`input-wrapper ${touched.password && errors.password ? "has-error" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
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
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.password}
              </span>
            )}
          </div>

          {errors.form && (
            <div className="field-error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {errors.form}
            </div>
          )}

          <button className="submit-btn" type="submit">
            <span>Login as teacher</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Student account?</span>
          <Link to="/" className="highlight-link">Back to student login</Link>
        </div>
      </section>
    </div>
  );
}
