import { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const initialOtp = {
  code: ""
};

export default function OTP() {
  const [form, setForm] = useState(initialOtp);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const phoneNumber = useMemo(() => {
    return location.state?.phoneNumber || "+94 77 123 4567";
  }, [location.state]);

  const handleChange = (event) => {
    const { value } = event.target;
    setForm({ code: value.replace(/\D/g, "").slice(0, 6) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (form.code.length !== 6) {
      setError("Enter the 6-digit OTP code.");
      return;
    }

    setUser({
      fullName: "Madhuwantha",
      phoneNumber
    });
    navigate("/dashboard");
  };

  return (
    <div className="auth-shell auth-shell-compact">
      <section className="auth-panel auth-panel-center">
        <div className="auth-panel-head">
          <p className="auth-eyebrow">OTP verification</p>
          <h2>Check your phone</h2>
          <p>
            We sent a 6-digit login code to <strong>{phoneNumber}</strong>.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>One-time password</span>
            <input
              className="otp-input"
              name="code"
              inputMode="numeric"
              placeholder="000000"
              value={form.code}
              onChange={handleChange}
            />
          </label>

          {error ? <p className="error-msg">{error}</p> : null}

          <button type="submit">Verify and enter dashboard</button>
        </form>

        <div className="auth-links auth-links-center">
          <Link to="/">Back to login</Link>
          <a href="#resend-otp">Resend code</a>
        </div>
      </section>
    </div>
  );
}
