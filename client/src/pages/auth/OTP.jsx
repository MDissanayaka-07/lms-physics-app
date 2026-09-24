import { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { verifySubmittedCode, sendVerificationEmail } from "../../services/emailService";
import PhysicsBackground from "../../components/PhysicsBackground";

export default function OTP() {
  const [form, setForm] = useState({ code: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const email = useMemo(() => {
    return location.state?.email || "student@example.com";
  }, [location.state]);

  const handleChange = (event) => {
    const { value } = event.target;
    setForm({ code: value.replace(/\D/g, "").slice(0, 6) });
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");

    if (form.code.length !== 6) {
      setError("Please enter the complete 6-digit verification code sent to your email.");
      return;
    }

    setIsVerifying(true);

    const result = await verifySubmittedCode(email, form.code);

    setIsVerifying(false);

    if (!result.success) {
      setError(result.message || "Invalid verification code. The 6-digit code entered does not match your email.");
      return;
    }

    setSuccessMsg("Email verified successfully! Logging you into dashboard...");

    setTimeout(() => {
      setUser({
        fullName: "Madhuwantha",
        email: email,
        phoneNumber: location.state?.phoneNumber || ""
      });
      navigate("/dashboard");
    }, 600);
  };

  const handleResendCode = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsResending(true);

    try {
      const res = await sendVerificationEmail(email);
      setIsResending(false);
      setSuccessMsg(`A new 6-digit verification code has been sent to ${email}.`);
    } catch (e) {
      setIsResending(false);
      setError("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <PhysicsBackground>
      <div className="auth-shell auth-shell-compact">
      <section className="auth-panel auth-panel-center">
        <div className="auth-panel-head">
          <div className="auth-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Email Authentication</span>
          </div>
          <h2>Check Your Email Inbox</h2>
          <p>
            A 6-digit verification code was sent from <strong>madhudissa07@gmail.com</strong> to:
          </p>
          <div className="email-target-box">
            <span>{email}</span>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="code">Enter 6-Digit Verification Code *</label>
            <div className={`input-wrapper ${error ? "has-error" : ""}`}>
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="code"
                className="otp-input"
                name="code"
                inputMode="numeric"
                placeholder="000000"
                value={form.code}
                onChange={handleChange}
                maxLength="6"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="field-error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="field-success-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isVerifying}>
            {isVerifying ? (
              <span>Verifying code...</span>
            ) : (
              <>
                <span>Verify Code & Log In</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-links" style={{ marginTop: '16px' }}>
          <button
            type="button"
            className="resend-btn"
            onClick={handleResendCode}
            disabled={isResending}
          >
            {isResending ? "Resending code..." : "Resend Code to Email"}
          </button>
          <span className="divider-dot">•</span>
          <Link to="/" className="highlight-link">Back to Login</Link>
        </div>
      </section>
    </div>
  </PhysicsBackground>
  );
}
