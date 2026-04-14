import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const initialForm = {
  phoneNumber: "",
  password: ""
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
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

    setUser({
      fullName: "Student",
      phoneNumber: form.phoneNumber
    });
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px"
      }}
    >
      <section
        className="card"
        style={{
          width: "min(460px, 100%)"
        }}
      >
        <p className="chip">A/L Physics LMS</p>
        <h1 style={{ marginBottom: "8px" }}>Student Login</h1>
        <p style={{ marginTop: 0, color: "#4a6572" }}>
          Sign in with your phone number to view lessons, marks, and resources.
        </p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {error ? <p className="error-msg">{error}</p> : null}
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}
