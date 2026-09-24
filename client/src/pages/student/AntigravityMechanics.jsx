import { useState } from "react";
import { Link } from "react-router-dom";

export default function AntigravityMechanics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [moduleStatus, setModuleStatus] = useState({
    m1: true,
    m2: true,
    m3: false,
    lab4: false
  });

  const toggleModule = (key) => {
    setModuleStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ag-dashboard-root">
      {/* 30% Structural Element 1: Quantum Navy Sidebar */}
      <aside className="ag-sidebar">
        <div className="ag-sidebar-brand">
          <div className="ag-brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 0 0 18M3 12h18" />
              <circle cx="12" cy="12" r="3" fill="#FF5722" />
            </svg>
          </div>
          <div>
            <h2>A/L PHYSICS</h2>
            <p>Quantum Mechanics LMS</p>
          </div>
        </div>

        <nav className="ag-nav">
          <div className="ag-nav-group-label">NAVIGATION</div>
          <Link to="/dashboard" className="ag-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Overview</span>
          </Link>

          <Link to="/antigravity-mechanics" className="ag-nav-item active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
            </svg>
            <span>PHYSICS 405</span>
          </Link>

          <Link to="/marks" className="ag-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>Analytics & Marks</span>
          </Link>

          <Link to="/quiz" className="ag-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Interactive Quiz</span>
          </Link>

          <Link to="/papers" className="ag-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Past Papers</span>
          </Link>
        </nav>

        <div className="ag-sidebar-footer">
          <div className="ag-user-card">
            <div className="ag-avatar">AP</div>
            <div className="ag-user-info">
              <strong>Advanced Student</strong>
              <small>Index: #2026-PHYS</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Structural Wrapper */}
      <div className="ag-main-wrapper">
        {/* 30% Structural Element 2: Quantum Navy Header Bar */}
        <header className="ag-header">
          <div className="ag-header-title">
            <h1>PHYSICS 405: Antigravity Mechanics</h1>
            <span className="ag-tag">Advanced Theoretical Physics</span>
          </div>

          <div className="ag-header-actions">
            <button className="ag-icon-btn" title="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="ag-icon-btn" title="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="ag-notification-badge" />
            </button>
          </div>
        </header>

        {/* 60% Dominant Canvas: Lab-inspired Light Gray Background (#F4F6F9) */}
        <main className="ag-content-canvas">
          <div className="ag-dashboard-grid">
            {/* Center Main Hero Card */}
            <div className="ag-hero-card">
              <div className="ag-hero-text">
                <div className="ag-course-code">PHYSICS 405</div>
                <h2>Antigravity Mechanics</h2>
                <p className="ag-hero-desc">
                  Explore diamagnetic levitation, superconducting field gradients, and zero-gravity metric tensor manipulation in modern physics.
                </p>

                {/* 10% Accent Element: Electric Laser Orange CTA Button */}
                <button className="ag-cta-btn">
                  <span>BEGIN MODULE: Gravitational Nullification</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* 3D Levitation Device Diagram Graphic */}
              <div className="ag-levitation-stage">
                <div className="mag-device top-plate" />
                <div className="mag-device bottom-plate" />
                
                {/* Metallic Sphere */}
                <div className="levitating-sphere">
                  <div className="sphere-core" />
                  <div className="sphere-reflection" />
                </div>

                {/* Glowing Teal Magnetic Field Lines */}
                <svg className="magnetic-field-lines" viewBox="0 0 300 240">
                  <path d="M 60,30 C 10,80 10,160 60,210" fill="none" stroke="#7ad7cf" strokeWidth="2" strokeDasharray="6 4" className="field-line-anim" />
                  <path d="M 85,30 C 45,80 45,160 85,210" fill="none" stroke="#7ad7cf" strokeWidth="2.5" className="field-line-pulse" />
                  <path d="M 110,30 C 80,80 80,160 110,210" fill="none" stroke="#00f2fe" strokeWidth="2" />
                  
                  <path d="M 240,30 C 290,80 290,160 240,210" fill="none" stroke="#7ad7cf" strokeWidth="2" strokeDasharray="6 4" className="field-line-anim-rev" />
                  <path d="M 215,30 C 255,80 255,160 215,210" fill="none" stroke="#7ad7cf" strokeWidth="2.5" className="field-line-pulse" />
                  <path d="M 190,30 C 220,80 220,160 190,210" fill="none" stroke="#00f2fe" strokeWidth="2" />
                </svg>

                {/* Orange Energy Pulses */}
                <div className="energy-pulse pulse-top" />
                <div className="energy-pulse pulse-bottom" />
              </div>
            </div>

            {/* Right Side Widgets */}
            <div className="ag-side-widgets">
              {/* Progress Tracker Widget */}
              <div className="ag-card ag-progress-card">
                <div className="ag-card-head">
                  <h3>Progress Tracker</h3>
                  <span className="ag-percent">70%</span>
                </div>
                <div className="ag-progress-bar-bg">
                  <div className="ag-progress-fill" style={{ width: "70%" }} />
                </div>
                <div className="ag-progress-stats">
                  <div className="ag-stat-item">
                    <span className="ag-dot active" />
                    <span>Completed: 7 / 10 Modules</span>
                  </div>
                  <div className="ag-stat-item">
                    <span className="ag-dot pending" />
                    <span>In Progress: Diamagnetism</span>
                  </div>
                </div>
              </div>

              {/* Dedicated Key Formula Card */}
              <div className="ag-card ag-formula-card">
                <div className="ag-card-head">
                  <div className="ag-formula-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <h3>Key Formula</h3>
                  </div>
                  <span className="ag-formula-tag">Gravitational Null</span>
                </div>

                <div className="ag-formula-box">
                  <div className="ag-math-eq">
                    {"F_g = G · (m₁ · m₂) / r²"}
                  </div>
                  <div className="ag-math-sub">
                    {"g_eff = g₀ [ 1 - (B² · χ_m) / (2μ₀ · ρ · g₀) ]"}
                  </div>
                </div>
                <p className="ag-formula-caption">
                  Effective gravitational acceleration under high-intensity diamagnetic gradient.
                </p>
              </div>
            </div>
          </div>

          {/* Structured Modules & Labs Grid */}
          <div className="ag-section-title">
            <h3>Course Curriculum & Simulations</h3>
            <p>Access active lecture modules and laboratory simulations</p>
          </div>

          <div className="ag-modules-grid">
            {/* Module 3 */}
            <div className="ag-module-card">
              <div className="ag-module-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2B4C" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="ag-module-body">
                <h4>Module 3: Introduction to Diamagnetism</h4>
                <p>Study magnetic susceptibility χ_m &lt; 0, Pyrolytic carbon levitation, and orbital magnetic moments.</p>
              </div>
              <button className="ag-module-action" onClick={() => toggleModule("m3")}>
                {moduleStatus.m3 ? "Completed" : "Start Module"}
              </button>
            </div>

            {/* Lab 4 */}
            <div className="ag-module-card">
              <div className="ag-module-icon lab-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2">
                  <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A2 2 0 0 0 6.51 23.5h10.98a2 2 0 0 0 1.79-2.95l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                  <line x1="8.5" y1="2" x2="15.5" y2="2" />
                </svg>
              </div>
              <div className="ag-module-body">
                <h4>Lab 4: Quantum Locking Simulation</h4>
                <p>Interactive YBCO Type-II Superconductor flux pinning simulation in 3-axis magnetic tracks.</p>
              </div>
              <button className="ag-module-action lab-action" onClick={() => toggleModule("lab4")}>
                {moduleStatus.lab4 ? "Completed" : "Launch Simulation"}
              </button>
            </div>

            {/* Module 4 */}
            <div className="ag-module-card">
              <div className="ag-module-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2B4C" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="ag-module-body">
                <h4>Module 4: Superconducting Field Gradients</h4>
                <p>Meissner-Ochsenfeld effect, critical magnetic fields B_c, and London penetration depth.</p>
              </div>
              <button className="ag-module-action">View Content</button>
            </div>

            {/* Lab 5 */}
            <div className="ag-module-card">
              <div className="ag-module-icon lab-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2">
                  <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A2 2 0 0 0 6.51 23.5h10.98a2 2 0 0 0 1.79-2.95l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                  <line x1="8.5" y1="2" x2="15.5" y2="2" />
                </svg>
              </div>
              <div className="ag-module-body">
                <h4>Lab 5: Meissner Effect & Null-G Vector Setup</h4>
                <p>Measuring lift forces vs cryogenic temperature thresholds on magnetic track arrays.</p>
              </div>
              <button className="ag-module-action lab-action">Locked</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
