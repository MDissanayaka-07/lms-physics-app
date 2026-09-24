import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateUserProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    callingName: user?.callingName || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    school: user?.school || "",
    nicNumber: user?.nicNumber || "",
    academicYear: user?.academicYear || "A/L 2026",
    district: user?.district || "Colombo",
    parentPhone: user?.parentPhone || "",
    profilePic: user?.profilePic || "",
    bio: user?.bio || "Advanced Level Physics Student."
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [passForm, setPassForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const nextForm = { ...prev, [name]: value };
      if (name === "firstName" || name === "lastName") {
        nextForm.fullName = `${nextForm.firstName} ${nextForm.lastName}`.trim();
      }
      return nextForm;
    });
    if (successMsg) setSuccessMsg("");
    if (errorMsg) setErrorMsg("");
  };

  // Image file reader for custom profile picture upload with auto-save
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please choose a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const newPic = reader.result;
      setForm((prev) => ({ ...prev, profilePic: newPic }));
      setSuccessMsg("Profile photo uploaded & updated automatically!");

      try {
        await updateUserProfile({
          firstName: form.firstName,
          lastName: form.lastName,
          callingName: form.callingName,
          fullName: `${form.firstName} ${form.lastName}`.trim() || form.callingName,
          phoneNumber: form.phoneNumber,
          school: form.school,
          nicNumber: form.nicNumber,
          academicYear: form.academicYear,
          district: form.district,
          parentPhone: form.parentPhone,
          profilePic: newPic,
          bio: form.bio
        });
      } catch (err) {
        console.warn("Auto-save photo warning:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = async () => {
    setForm((prev) => ({ ...prev, profilePic: "" }));
    setSuccessMsg("Profile photo removed.");

    try {
      await updateUserProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        callingName: form.callingName,
        fullName: `${form.firstName} ${form.lastName}`.trim() || form.callingName,
        phoneNumber: form.phoneNumber,
        school: form.school,
        nicNumber: form.nicNumber,
        academicYear: form.academicYear,
        district: form.district,
        parentPhone: form.parentPhone,
        profilePic: "",
        bio: form.bio
      });
    } catch (err) {
      console.warn("Auto-remove photo warning:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.callingName.trim() || !form.nicNumber.trim() || !form.phoneNumber.trim()) {
      setIsSaving(false);
      setErrorMsg("Please fill in all mandatory fields (First Name, Last Name, Calling Name, NIC Number, Phone Number).");
      return;
    }

    const computedFullName = `${form.firstName} ${form.lastName}`.trim() || form.callingName;

    try {
      const res = await updateUserProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        callingName: form.callingName,
        fullName: computedFullName,
        phoneNumber: form.phoneNumber,
        school: form.school,
        nicNumber: form.nicNumber,
        academicYear: form.academicYear,
        district: form.district,
        parentPhone: form.parentPhone,
        profilePic: form.profilePic,
        bio: form.bio
      });

      setIsSaving(false);
      if (res?.ok) {
        setSuccessMsg(res.message || "Profile details updated successfully in Neon PostgreSQL database!");
      } else {
        setErrorMsg("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setIsSaving(false);
      setErrorMsg("Error saving profile: " + err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassSuccess("");
    setPassError("");

    if (!passForm.password || passForm.password.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      return;
    }
    if (passForm.password !== passForm.confirmPassword) {
      setPassError("Passwords do not match.");
      return;
    }

    setPassSaving(true);
    try {
      const res = await updateUserProfile({
        ...form,
        password: passForm.password
      });

      setPassSaving(false);
      if (res?.ok) {
        setPassSuccess("Password updated successfully in database!");
        setPassForm({ password: "", confirmPassword: "" });
      } else {
        setPassError("Failed to update password. Please try again.");
      }
    } catch (err) {
      setPassSaving(false);
      setPassError("Error updating password: " + err.message);
    }
  };

  const initials = (form.callingName || form.firstName || "M")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");

  return (
    <MainLayout>
      <div className="profile-settings-shell">
        {/* Navigation Actions Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <Link to="/dashboard" className="back-dashboard-btn" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "14px",
            background: "#176b87",
            color: "#ffffff",
            fontWeight: "700",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(23, 107, 135, 0.25)",
            transition: "all 180ms ease"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Top Header Card with Avatar */}
        <div className="card profile-hero-card">
          <div className="profile-avatar-container">
            <div className="profile-large-avatar">
              {form.profilePic ? (
                <img src={form.profilePic} alt="Profile Avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-fallback">{initials}</div>
              )}
            </div>

            <div className="avatar-actions">
              <label htmlFor="avatar-file-input" className="avatar-upload-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>Upload New Photo</span>
              </label>
              <input
                id="avatar-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              {form.profilePic && (
                <button type="button" className="avatar-remove-btn" onClick={handleRemovePicture}>
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          <div className="profile-summary">
            <h2>{form.firstName ? `${form.firstName} ${form.lastName}` : form.callingName || "Student Profile"}</h2>
            <span className="profile-role-badge">
              Calling Name: <strong>{form.callingName || "Student"}</strong> • {form.academicYear}
            </span>
            <p className="profile-email-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {form.email || "No email provided"}
            </p>
          </div>
        </div>

        {/* Alert Notifications */}
        {successMsg && (
          <div className="field-success-msg" style={{ fontSize: "0.95rem", padding: "14px 18px", marginBottom: "20px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="field-error-msg" style={{ fontSize: "0.95rem", padding: "14px 18px", marginBottom: "20px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Profile Details Edit Form */}
        <Card>
          <div className="ui-card-header">
            <div>
              <h3>Personal Information & Name Settings</h3>
              <p>Update your First Name, Last Name, Calling Name, contact details, and school batch.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form-grid profile-form-grid">
            {/* Row 1: First Name & Last Name */}
            <div className="auth-field">
              <label htmlFor="firstName">First Name *</label>
              <div className="input-wrapper">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="lastName">Last Name *</label>
              <div className="input-wrapper">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Row 2: Calling Name & NIC Number (Matching Signup Grid) */}
            <div className="auth-field">
              <label htmlFor="callingName">Calling Name (Name shown on dashboard) *</label>
              <div className="input-wrapper">
                <input
                  id="callingName"
                  name="callingName"
                  type="text"
                  value={form.callingName}
                  onChange={handleChange}
                  placeholder="Calling name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="nicNumber">NIC Number *</label>
              <div className="input-wrapper">
                <input
                  id="nicNumber"
                  name="nicNumber"
                  type="text"
                  value={form.nicNumber}
                  onChange={handleChange}
                  placeholder="NIC number"
                  required
                />
              </div>
            </div>

            {/* Row 3: Email Address & Phone Number */}
            <div className="auth-field">
              <label htmlFor="email">Email Address (Primary) *</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  readOnly
                  style={{ opacity: 0.85, cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <div className="input-wrapper">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>
            </div>

            {/* Row 4: School & Academic Batch */}
            <div className="auth-field">
              <label htmlFor="school">School Name</label>
              <div className="input-wrapper">
                <input
                  id="school"
                  name="school"
                  type="text"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Your school name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="academicYear">Academic Batch</label>
              <div className="input-wrapper">
                <select
                  id="academicYear"
                  name="academicYear"
                  value={form.academicYear}
                  onChange={handleChange}
                >
                  <option value="A/L 2026">A/L 2026 Batch</option>
                  <option value="A/L 2027">A/L 2027 Batch</option>
                  <option value="A/L 2025 Revision">A/L 2025 Revision</option>
                </select>
              </div>
            </div>

            {/* Row 5: District & Parent Phone Number */}
            <div className="auth-field">
              <label htmlFor="district">District</label>
              <div className="input-wrapper">
                <select id="district" name="district" value={form.district} onChange={handleChange}>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Matara">Matara</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Ratnapura">Ratnapura</option>
                </select>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="parentPhone">Parent's Phone Number</label>
              <div className="input-wrapper">
                <input
                  id="parentPhone"
                  name="parentPhone"
                  type="text"
                  value={form.parentPhone}
                  onChange={handleChange}
                  placeholder="Parent contact number"
                />
              </div>
            </div>

            {/* Row 6: About / Learning Goals */}
            <div className="auth-field auth-grid-full">
              <label htmlFor="bio">About / Learning Goals</label>
              <div className="input-wrapper">
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Write a brief note about your physics targets and goals..."
                  style={{ width: "100%", padding: "12px", border: "none", outline: "none", resize: "vertical" }}
                />
              </div>
            </div>

            <div className="auth-grid-full" style={{ marginTop: "12px" }}>
              <button type="submit" className="submit-btn" disabled={isSaving}>
                {isSaving ? (
                  <span>Saving changes to Database...</span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Card>

        {/* Change Password Card */}
        <Card style={{ marginTop: "24px" }}>
          <div className="ui-card-header">
            <div>
              <h3>Security & Password Management</h3>
              <p>Change your account password to keep your portal account secure.</p>
            </div>
          </div>

          {passSuccess && (
            <div className="field-success-msg" style={{ fontSize: "0.95rem", padding: "12px 16px", marginBottom: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{passSuccess}</span>
            </div>
          )}

          {passError && (
            <div className="field-error-msg" style={{ fontSize: "0.95rem", padding: "12px 16px", marginBottom: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="form-grid profile-form-grid">
            {/* New Password */}
            <div className="auth-field">
              <label htmlFor="newPassword">New Password *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="newPassword"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passForm.password}
                  onChange={(e) => setPassForm(p => ({ ...p, password: e.target.value }))}
                  required
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
            </div>

            {/* Confirm New Password */}
            <div className="auth-field">
              <label htmlFor="confirmNewPassword">Confirm New Password *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <input
                  id="confirmNewPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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
            </div>

            <div className="auth-grid-full" style={{ marginTop: "12px" }}>
              <button type="submit" className="submit-btn" disabled={passSaving}>
                {passSaving ? (
                  <span>Updating Password...</span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
