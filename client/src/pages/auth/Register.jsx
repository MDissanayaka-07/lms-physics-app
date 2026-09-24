import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendVerificationEmail } from "../../services/emailService";
import PhysicsBackground from "../../components/PhysicsBackground";

const initialForm = {
  firstName: "",
  lastName: "",
  callingName: "",
  email: "",
  phoneNumber: "",
  school: "",
  nicNumber: "",
  academicYear: "A/L 2026",
  district: "",
  parentPhone: "",
  password: "",
  confirmPassword: ""
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Sri Lankan phone number validation: 07XXXXXXXX or +947XXXXXXXX
const SRI_LANKA_PHONE_REGEX = /^(?:\+947|07)[0-9]{8}$/;

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value, currentForm = form) => {
    let errorMsg = "";
    const cleanValue = typeof value === "string" ? value.trim() : value;

    if (name === "firstName" && !cleanValue) errorMsg = "First name is required.";
    if (name === "lastName" && !cleanValue) errorMsg = "Last name is required.";
    if (name === "callingName" && !cleanValue) errorMsg = "Calling name is required.";
    if (name === "nicNumber" && !cleanValue) errorMsg = "NIC number is required.";
    
    if (name === "email") {
      if (!cleanValue) errorMsg = "Email address is required for login.";
      else if (!EMAIL_REGEX.test(cleanValue)) errorMsg = "Enter a valid email address (e.g. student@example.com).";
    }

    if (name === "phoneNumber") {
      const stripped = cleanValue.replace(/[\s-]/g, "");
      if (!cleanValue) {
        errorMsg = "Phone number is required.";
      } else if (!SRI_LANKA_PHONE_REGEX.test(stripped)) {
        errorMsg = "Enter a valid 10-digit Sri Lankan phone number (e.g. 077 123 4567).";
      }
    }

    if (name === "parentPhone" && cleanValue) {
      const stripped = cleanValue.replace(/[\s-]/g, "");
      if (!SRI_LANKA_PHONE_REGEX.test(stripped)) {
        errorMsg = "Enter a valid Sri Lankan parent phone number (e.g. 071 987 6543).";
      }
    }

    if (name === "password") {
      if (!value) errorMsg = "Password is required.";
      else if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
    }

    if (name === "confirmPassword") {
      if (!value) errorMsg = "Please confirm your password.";
      else if (value !== currentForm.password) errorMsg = "Passwords do not match.";
    }

    return errorMsg;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, updatedForm)
      }));
    }

    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", updatedForm.confirmPassword, updatedForm)
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, form)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstNameErr = validateField("firstName", form.firstName, form);
    const lastNameErr = validateField("lastName", form.lastName, form);
    const callingNameErr = validateField("callingName", form.callingName, form);
    const nicErr = validateField("nicNumber", form.nicNumber, form);
    const emailErr = validateField("email", form.email, form);
    const phoneErr = validateField("phoneNumber", form.phoneNumber, form);
    const parentPhoneErr = validateField("parentPhone", form.parentPhone, form);
    const passErr = validateField("password", form.password, form);
    const confirmPassErr = validateField("confirmPassword", form.confirmPassword, form);

    const allErrors = {
      firstName: firstNameErr,
      lastName: lastNameErr,
      callingName: callingNameErr,
      nicNumber: nicErr,
      email: emailErr,
      phoneNumber: phoneErr,
      parentPhone: parentPhoneErr,
      password: passErr,
      confirmPassword: confirmPassErr
    };

    setTouched({
      firstName: true,
      lastName: true,
      callingName: true,
      nicNumber: true,
      email: true,
      phoneNumber: true,
      parentPhone: true,
      password: true,
      confirmPassword: true,
      school: true,
      district: true
    });

    setErrors(allErrors);

    if (firstNameErr || lastNameErr || callingNameErr || nicErr || emailErr || phoneErr || parentPhoneErr || passErr || confirmPassErr) {
      return;
    }

    setIsSubmitting(true);

    const computedFullName = `${form.firstName} ${form.lastName}`.trim() || form.callingName;

    try {
      // 1. Save user tuple into Neon PostgreSQL database
      try {
        await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "student",
            firstName: form.firstName,
            lastName: form.lastName,
            callingName: form.callingName,
            fullName: computedFullName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            password: form.password,
            school: form.school,
            nicNumber: form.nicNumber,
            academicYear: form.academicYear,
            district: form.district,
            parentPhone: form.parentPhone
          })
        });
      } catch (dbErr) {
        console.warn("Backend registration API warning:", dbErr);
      }

      // 2. Send OTP email verification
      const res = await sendVerificationEmail(form.email);

      navigate("/otp", {
        state: {
          email: form.email,
          phoneNumber: form.phoneNumber,
          message: res.message,
          activeCode: res.code
        }
      });
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: "Failed to send verification email." }));
      setIsSubmitting(false);
    }
  };

  const isPasswordMatching = touched.confirmPassword && !errors.confirmPassword && form.confirmPassword && form.confirmPassword === form.password;

  return (
    <PhysicsBackground>
      <div className="auth-shell auth-shell-compact">
      <section className="auth-panel auth-panel-center-wide">
        <div className="auth-panel-head">
          <div className="auth-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
            <span>Student Registration</span>
          </div>
          <h2>Register as a student</h2>
          <p>Fill in the required information to activate your physics class portal account.</p>
        </div>

        <form className="form-grid auth-grid-two" onSubmit={handleSubmit} noValidate>
          {/* Row 1: First Name & Last Name */}
          <div className="auth-field">
            <label htmlFor="firstName">First Name *</label>
            <div className={`input-wrapper ${touched.firstName && errors.firstName ? "has-error" : ""} ${touched.firstName && !errors.firstName && form.firstName ? "is-valid" : ""}`}>
              <input
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.firstName && errors.firstName && (
              <span className="field-error-msg">{errors.firstName}</span>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="lastName">Last Name *</label>
            <div className={`input-wrapper ${touched.lastName && errors.lastName ? "has-error" : ""} ${touched.lastName && !errors.lastName && form.lastName ? "is-valid" : ""}`}>
              <input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.lastName && errors.lastName && (
              <span className="field-error-msg">{errors.lastName}</span>
            )}
          </div>

          {/* Row 2: Calling Name & NIC Number (Parallel in same row) */}
          <div className="auth-field">
            <label htmlFor="callingName">Calling Name (Name used in class) *</label>
            <div className={`input-wrapper ${touched.callingName && errors.callingName ? "has-error" : ""} ${touched.callingName && !errors.callingName && form.callingName ? "is-valid" : ""}`}>
              <input
                id="callingName"
                name="callingName"
                placeholder="Calling name"
                value={form.callingName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.callingName && errors.callingName && (
              <span className="field-error-msg">{errors.callingName}</span>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="nicNumber">NIC Number *</label>
            <div className={`input-wrapper ${touched.nicNumber && errors.nicNumber ? "has-error" : ""} ${touched.nicNumber && !errors.nicNumber && form.nicNumber ? "is-valid" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2"/>
                <line x1="7" y1="8" x2="17" y2="8"/>
                <line x1="7" y1="12" x2="13" y2="12"/>
              </svg>
              <input
                id="nicNumber"
                name="nicNumber"
                placeholder="NIC number"
                value={form.nicNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.nicNumber && errors.nicNumber && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.nicNumber}
              </span>
            )}
          </div>

          {/* Row 3: Email Address & Phone Number */}
          <div className="auth-field">
            <label htmlFor="email">Email Address (Login Email) *</label>
            <div className={`input-wrapper ${touched.email && errors.email ? "has-error" : ""} ${touched.email && !errors.email && form.email ? "is-valid" : ""}`}>
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
              />
            </div>
            {touched.email && errors.email && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.email}
              </span>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <div className={`input-wrapper ${touched.phoneNumber && errors.phoneNumber ? "has-error" : ""} ${touched.phoneNumber && !errors.phoneNumber && form.phoneNumber ? "is-valid" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.phoneNumber && errors.phoneNumber && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Row 4: School & Academic Year */}
          <div className="auth-field">
            <label htmlFor="school">School</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <input
                id="school"
                name="school"
                placeholder="Your school name"
                value={form.school}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="academicYear">Academic Year</label>
            <div className="input-wrapper select-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <select id="academicYear" name="academicYear" value={form.academicYear} onChange={handleChange}>
                <option value="A/L 2026">A/L 2026</option>
                <option value="A/L 2027">A/L 2027</option>
                <option value="A/L 2028">A/L 2028</option>
              </select>
              <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Row 5: District & Parent Phone Number */}
          <div className="auth-field">
            <label htmlFor="district">District</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                id="district"
                name="district"
                placeholder="District"
                value={form.district}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="parentPhone">Parent Phone Number</label>
            <div className={`input-wrapper ${touched.parentPhone && errors.parentPhone ? "has-error" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <input
                id="parentPhone"
                name="parentPhone"
                placeholder="Parent contact number"
                value={form.parentPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.parentPhone && errors.parentPhone && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.parentPhone}
              </span>
            )}
          </div>

          {/* Password (Twin 1) */}
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
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password (Twin 2) */}
          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <div className={`input-wrapper ${touched.confirmPassword && errors.confirmPassword ? "has-error" : ""} ${isPasswordMatching ? "is-valid" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPasswordMatching && (
                <svg className="valid-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                style={isPasswordMatching ? { right: '36px' } : {}}
              >
                {showConfirmPassword ? (
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
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="field-error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button className="auth-grid-full submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="btn-spinner">Creating account...</span>
            ) : (
              <>
                <span>Create account and continue</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Already have an account?</span>
          <Link to="/" className="highlight-link">Login here</Link>
        </div>
      </section>
    </div>
  </PhysicsBackground>
  );
}
