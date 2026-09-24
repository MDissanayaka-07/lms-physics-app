import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";

const lessonsData = [
  {
    id: "les-1",
    module: "Module 01",
    title: "Gravitational Nullification & Mechanics",
    category: "Classical & Advanced Mechanics",
    badge: "Active Batch",
    progress: 85,
    summary: "Fundamental principles of gravitational fields, orbital velocity, nullification vector math, and satellite dynamics.",
    notes: [
      { id: "n1", title: "Gravitational Nullification Theory Note.pdf", size: "3.4 MB", pages: 18, date: "Apr 2026" },
      { id: "n2", title: "Orbital Mechanics & Field Intensity Formulae.pdf", size: "1.8 MB", pages: 8, date: "Apr 2026" },
      { id: "n3", title: "Vector Field Superposition Mindmap.pdf", size: "4.2 MB", pages: 4, date: "Mar 2026" }
    ],
    formulas: [
      { symbol: "g_eff", formula: "g_{eff} = G \\frac{M}{(R+h)^2} - \\omega^2 R \\cos^2 \\phi", desc: "Effective Gravitational Field Intensity with Earth's Rotation" },
      { symbol: "v_esc", formula: "v_{escape} = \\sqrt{\\frac{2 G M}{R}}", desc: "Escape Velocity from Primary Gravitational Well" },
      { symbol: "T^2", formula: "T^2 = \\frac{4 \\pi^2}{G M} r^3", desc: "Kepler's Third Law for Elliptical & Circular Orbits" }
    ],
    tutes: [
      { id: "t1", title: "Tutorial 01 - Gravitational Fields & Vector Math", questions: 15, duration: "45 mins", difficulty: "Medium" },
      { id: "t2", title: "MCQ Drill - 25 Rapid Mechanics Questions", questions: 25, duration: "30 mins", difficulty: "Exam Standard" },
      { id: "t3", title: "Structured Essay Tute - Satellite Nullification", questions: 4, duration: "60 mins", difficulty: "Advanced" }
    ],
    videos: [
      { id: "v1", title: "Lecture 01: Gravitational Nullification Derivations & Vector Superposition", duration: "54:20", resolution: "1080p HD", instructor: "Eng. Dissanayaka" },
      { id: "v2", title: "Lab Demo: Magnetic Field Levitation & Gravity Counterbalancing", duration: "32:15", resolution: "4K Ultra HD", instructor: "Eng. Dissanayaka" }
    ],
    timestamps: [
      { time: "00:00", label: "Introduction & Gravitational Field Definitions" },
      { time: "14:30", label: "Derivation of Nullification Field Vector Equation" },
      { time: "32:10", label: "Worked Example: A/L Past Paper 2023 Essay Question" },
      { time: "46:50", label: "Common Exam Pitfalls & Calculation Mistakes" }
    ],
    qna: [
      {
        id: "q1",
        student: "Kasun Perera",
        time: "2 hours ago",
        question: "Why does the effective gravitational field intensity decrease at the equator compared to the poles?",
        answer: "At the equator, the centrifugal acceleration due to Earth's rotation (ω²R) opposes gravitational attraction at its maximum value. At the poles, cos(90°) = 0, so rotational subtraction is zero!",
        teacher: "Eng. Dissanayaka",
        likes: 14
      },
      {
        id: "q2",
        student: "Nimesha Fernando",
        time: "Yesterday",
        question: "In Tutorial 01 Question 4, how do we calculate the energy required to lift a satellite to geo-stationary orbit?",
        answer: "Use ΔE = -G M m / (2 r_final) - (-G M m / R_earth). Remember that total mechanical energy in orbit is E_total = -1/2 (G M m / r).",
        teacher: "Eng. Dissanayaka",
        likes: 9
      }
    ]
  },
  {
    id: "les-2",
    module: "Module 02",
    title: "Electrostatics & Capacitor Energy Systems",
    category: "Electricity & Magnetism",
    badge: "Revision Core",
    progress: 70,
    summary: "Coulomb's Law, electric potential gradient, Gauss's theorem, series & parallel capacitor network energy dissipation.",
    notes: [
      { id: "n21", title: "Electrostatics & Dielectric Field Theory Note.pdf", size: "2.9 MB", pages: 16, date: "Apr 2026" },
      { id: "n22", title: "Capacitor Charging & Discharging Equations.pdf", size: "1.5 MB", pages: 6, date: "Apr 2026" }
    ],
    formulas: [
      { symbol: "E", formula: "E = - \\frac{d V}{d r}", desc: "Electric Field Strength as Potential Gradient" },
      { symbol: "U", formula: "U = \\frac{1}{2} C V^2 = \\frac{1}{2} \\frac{Q^2}{C}", desc: "Energy Stored inside Parallel Plate Capacitor" },
      { symbol: "C_eff", formula: "C_{parallel} = C_1 + C_2, \\quad \\frac{1}{C_{series}} = \\frac{1}{C_1} + \\frac{1}{C_2}", desc: "Capacitor Equivalent Capacitance Laws" }
    ],
    tutes: [
      { id: "t21", title: "Tutorial 02 - Dielectric Insertion & Charge Distribution", questions: 12, duration: "40 mins", difficulty: "Medium" },
      { id: "t22", title: "MCQ Pack - 20 Electrostatic Field Problems", questions: 20, duration: "25 mins", difficulty: "Exam Standard" }
    ],
    videos: [
      { id: "v21", title: "Full Revision Class: Capacitor Energy Loss in Parallel Switches", duration: "48:10", resolution: "1080p HD", instructor: "Eng. Dissanayaka" }
    ],
    timestamps: [
      { time: "00:00", label: "Electric Field Lines & Equipotential Surfaces" },
      { time: "18:20", label: "Dielectric Constant & Polarization Dynamics" },
      { time: "35:00", label: "Graphing Capacitor Charge vs Time Graph" }
    ],
    qna: [
      {
        id: "q21",
        student: "Sahan Wickramasinghe",
        time: "3 days ago",
        question: "When a dielectric slab is inserted into a connected capacitor, why does energy increase?",
        answer: "Because the battery supplies extra work to pull additional charge Q = C·V onto the plates as capacitance increases by factor K!",
        teacher: "Eng. Dissanayaka",
        likes: 18
      }
    ]
  },
  {
    id: "les-3",
    module: "Module 03",
    title: "Electromagnetism & Faraday Induction",
    category: "Magnetic Fields & Currents",
    badge: "Upcoming Topic",
    progress: 40,
    summary: "Biot-Savart Law, Ampere's Law, Faraday's Law of Induction, Lenz's Law, Eddy currents, and AC transformer design.",
    notes: [
      { id: "n31", title: "Electromagnetic Induction & Flux Derivations.pdf", size: "3.8 MB", pages: 22, date: "Apr 2026" }
    ],
    formulas: [
      { symbol: "e", formula: "e = - N \\frac{d \\Phi}{d t}", desc: "Faraday's Law of Electromagnetic Induction" },
      { symbol: "F", formula: "F = B I L \\sin \\theta", desc: "Magnetic Force on Current-Carrying Conductor" }
    ],
    tutes: [
      { id: "t31", title: "Tutorial 03 - AC Transformer Losses & Mutual Induction", questions: 10, duration: "35 mins", difficulty: "Hard" }
    ],
    videos: [
      { id: "v31", title: "Live Session: Lenz Law Direction Tricks & Eddy Current Damping", duration: "62:00", resolution: "1080p HD", instructor: "Eng. Dissanayaka" }
    ],
    timestamps: [
      { time: "00:00", label: "Magnetic Flux & Right Hand Grip Rule" },
      { time: "22:15", label: "Self & Mutual Inductance Equations" }
    ],
    qna: [
      {
        id: "q31",
        student: "Dilshan Jayawardena",
        time: "4 days ago",
        question: "How do laminated iron cores reduce heat loss in transformers?",
        answer: "Laminations break up large closed loops, drastically increasing electrical resistance against eddy currents and reducing I²R heat loss!",
        teacher: "Eng. Dissanayaka",
        likes: 11
      }
    ]
  },
  {
    id: "les-4",
    module: "Module 04",
    title: "Wave Optics & Interference Phenomena",
    category: "Waves & Vibrations",
    badge: "Core Physics",
    progress: 90,
    summary: "Coherent wave sources, Young's double slit interference, diffraction gratings, thin film interference, and Doppler effect.",
    notes: [
      { id: "n41", title: "Wave Optics Complete Theory & Fringe Width Derivation.pdf", size: "4.1 MB", pages: 20, date: "Mar 2026" }
    ],
    formulas: [
      { symbol: "y", formula: "y = \\frac{\\lambda D}{d}", desc: "Double Slit Fringe Separation Distance" },
      { symbol: "d sinθ", formula: "d \\sin \\theta = n \\lambda", desc: "Diffraction Grating Principal Maxima Formula" }
    ],
    tutes: [
      { id: "t41", title: "Tutorial 04 - Diffraction Grating & Wavelength Measurement", questions: 14, duration: "45 mins", difficulty: "Medium" }
    ],
    videos: [
      { id: "v41", title: "Experiment Walkthrough: Young's Double Slit Laser Bench", duration: "28:45", resolution: "1080p HD", instructor: "Eng. Dissanayaka" }
    ],
    timestamps: [
      { time: "00:00", label: "Conditions for Sustained Wave Interference" },
      { time: "12:40", label: "Derivation of λ = y·d / D" }
    ],
    qna: [
      {
        id: "q41",
        student: "Tharindu Silva",
        time: "5 days ago",
        question: "What happens to fringe width if the whole apparatus is immersed in water?",
        answer: "In water, wavelength reduces to λ' = λ / n_water. Since y = λ D / d, the fringe width decreases proportionally!",
        teacher: "Eng. Dissanayaka",
        likes: 15
      }
    ]
  },
  {
    id: "les-5",
    module: "Module 05",
    title: "Quantum Physics & Photoelectric Effect",
    category: "Modern & Quantum Physics",
    badge: "Advanced Topic",
    progress: 60,
    summary: "Photon model of radiation, Einstein's photoelectric equation, stopping potential, work function, and De Broglie matter waves.",
    notes: [
      { id: "n51", title: "Quantum Photons & Photoelectric Effect Master Note.pdf", size: "3.6 MB", pages: 15, date: "Apr 2026" }
    ],
    formulas: [
      { symbol: "E_k", formula: "h \\nu = \\Phi + E_{k,max} = h \\nu_0 + e V_s", desc: "Einstein's Photoelectric Energy Balance Equation" },
      { symbol: "λ", formula: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m q V}}", desc: "De Broglie Wavelength of Accelerated Charged Particles" }
    ],
    tutes: [
      { id: "t51", title: "Tutorial 05 - Photoelectric Stopping Potential Graphs", questions: 16, duration: "50 mins", difficulty: "Advanced" }
    ],
    videos: [
      { id: "v51", title: "Quantum Physics: Photoelectric Graphs & Slope Calculations", duration: "41:30", resolution: "1080p HD", instructor: "Eng. Dissanayaka" }
    ],
    timestamps: [
      { time: "00:00", label: "Failure of Wave Theory of Light" },
      { time: "15:10", label: "Einstein's Photon Postulate & Stopping Voltage" }
    ],
    qna: [
      {
        id: "q51",
        student: "Ruwan Gamage",
        time: "1 week ago",
        question: "Does increasing light intensity increase the maximum kinetic energy of emitted photoelectrons?",
        answer: "No! Light intensity only increases the number of photons emitted per second (hence saturation current), but kinetic energy depends ONLY on light frequency ν!",
        teacher: "Eng. Dissanayaka",
        likes: 22
      }
    ]
  }
];

export default function Lessons() {
  const [selectedLesson, setSelectedLesson] = useState(lessonsData[0]);
  const [activeTab, setActiveTab] = useState("notes"); // 'notes' | 'tutes' | 'videos' | 'qna'
  
  // Q&A State
  const [qnaSearch, setQnaSearch] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [qnaList, setQnaList] = useState(selectedLesson.qna);
  const [activeVideoTime, setActiveVideoTime] = useState(selectedLesson.timestamps[0]?.time || "00:00");
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Switch Lesson Selection
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setQnaList(lesson.qna);
    setActiveVideoTime(lesson.timestamps[0]?.time || "00:00");
    setIsPlayingVideo(false);
  };

  // Add Question in Q&A Forum
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newEntry = {
      id: "q-" + Date.now(),
      student: "You (Student)",
      time: "Just now",
      question: newQuestionText.trim(),
      answer: "Question submitted! Eng. Dissanayaka or a peer will respond shortly.",
      teacher: "Pending Teacher Review",
      likes: 1
    };

    setQnaList([newEntry, ...qnaList]);
    setNewQuestionText("");
  };

  // Filter Q&A
  const filteredQna = qnaList.filter(
    (item) =>
      item.question.toLowerCase().includes(qnaSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(qnaSearch.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="lessons-page-shell">
        {/* Top KPI Metrics Row */}
        <div className="lessons-kpi-row">
          <div className="lessons-kpi-card tone-teal">
            <div className="kpi-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div>
              <span className="kpi-label">Active Modules</span>
              <h3 className="kpi-value">{lessonsData.length} Lessons</h3>
              <p className="kpi-sub">Curated for 2026 Batch</p>
            </div>
          </div>

          <div className="lessons-kpi-card tone-blue">
            <div className="kpi-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <span className="kpi-label">Notes & Tutes</span>
              <h3 className="kpi-value">24 PDF Packs</h3>
              <p className="kpi-sub">Theory & Question Papers</p>
            </div>
          </div>

          <div className="lessons-kpi-card tone-orange">
            <div className="kpi-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div>
              <span className="kpi-label">Video Library</span>
              <h3 className="kpi-value">18.5 Hours</h3>
              <p className="kpi-sub">HD Lectures & Demonstrations</p>
            </div>
          </div>

          <div className="lessons-kpi-card tone-purple">
            <div className="kpi-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <span className="kpi-label">Q&A Forum</span>
              <h3 className="kpi-value">48 Answered</h3>
              <p className="kpi-sub">Direct Teacher Explanations</p>
            </div>
          </div>
        </div>

        {/* Lesson Module Selection Cards (Lesson by Lesson KPI Cards) */}
        <section className="lessons-selection-section">
          <div className="section-head-bar">
            <div>
              <h3 className="section-heading-title">Physics Topic Modules</h3>
              <p className="section-heading-sub">Select a lesson to access its lecture notes, question tutes, videos, and Q&A discussion board.</p>
            </div>
          </div>

          <div className="lesson-cards-grid">
            {lessonsData.map((les) => {
              const isSelected = selectedLesson.id === les.id;
              return (
                <div
                  key={les.id}
                  className={`lesson-kpi-card ${isSelected ? "is-selected-card" : ""}`}
                  onClick={() => handleSelectLesson(les)}
                >
                  <div className="lesson-card-top-row">
                    <span className="module-tag">{les.module}</span>
                    <span className="badge-pill">{les.badge}</span>
                  </div>

                  <h4 className="lesson-card-title">{les.title}</h4>
                  <p className="lesson-card-desc">{les.summary}</p>

                  <div className="lesson-card-stats-row">
                    <span title="Lecture Notes">📄 {les.notes.length} Notes</span>
                    <span title="Question Tutorials">📝 {les.tutes.length} Tutes</span>
                    <span title="Video Recorded Classes">🎥 {les.videos.length} Videos</span>
                    <span title="Q&A Threads">💬 {les.qna.length} Q&A</span>
                  </div>

                  <div className="lesson-card-progress-bar">
                    <div className="progress-fill" style={{ width: `${les.progress}%` }}></div>
                  </div>
                  <div className="progress-text-row">
                    <span>Course Progress</span>
                    <strong>{les.progress}%</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Lesson Interactive Content Hub */}
        <section className="selected-lesson-hub-card card">
          <div className="hub-header">
            <div>
              <span className="hub-module-chip">{selectedLesson.module} • {selectedLesson.category}</span>
              <h2 className="hub-title">{selectedLesson.title}</h2>
            </div>

            {/* Content Tabs Navigation Bar */}
            <div className="hub-tabs-bar">
              <button
                className={`hub-tab-btn ${activeTab === "notes" ? "is-active-tab" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Related Notes ({selectedLesson.notes.length})</span>
              </button>

              <button
                className={`hub-tab-btn ${activeTab === "tutes" ? "is-active-tab" : ""}`}
                onClick={() => setActiveTab("tutes")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
                <span>Question Tutes ({selectedLesson.tutes.length})</span>
              </button>

              <button
                className={`hub-tab-btn ${activeTab === "videos" ? "is-active-tab" : ""}`}
                onClick={() => setActiveTab("videos")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <span>Relative Video ({selectedLesson.videos.length})</span>
              </button>

              <button
                className={`hub-tab-btn ${activeTab === "qna" ? "is-active-tab" : ""}`}
                onClick={() => setActiveTab("qna")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Q&A Board ({qnaList.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: RELATED NOTES */}
          {activeTab === "notes" && (
            <div className="tab-pane fade-in">
              <div className="pane-grid-two">
                <div>
                  <h4 className="pane-subtitle">Downloadable PDF Theory Notes</h4>
                  <div className="pdf-files-list">
                    {selectedLesson.notes.map((note) => (
                      <div key={note.id} className="pdf-item-card">
                        <div className="pdf-icon-badge">PDF</div>
                        <div className="pdf-info">
                          <h5>{note.title}</h5>
                          <p>{note.pages} pages • {note.size} • Released {note.date}</p>
                        </div>
                        <a
                          href="#download"
                          onClick={(e) => { e.preventDefault(); alert(`Downloading ${note.title}...`); }}
                          className="pdf-download-btn"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          <span>Download Note</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="pane-subtitle">Key Formulae & Definitions</h4>
                  <div className="formula-cards-list">
                    {selectedLesson.formulas.map((item, idx) => (
                      <div key={idx} className="formula-card">
                        <span className="formula-symbol-chip">Formula {idx + 1}</span>
                        <div className="formula-latex-box">
                          <code>{item.formula}</code>
                        </div>
                        <p className="formula-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUESTION TUTES */}
          {activeTab === "tutes" && (
            <div className="tab-pane fade-in">
              <div className="tute-cards-list">
                {selectedLesson.tutes.map((tute) => (
                  <div key={tute.id} className="tute-item-card">
                    <div className="tute-badge-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="tute-info">
                      <h4>{tute.title}</h4>
                      <p>
                        <span>{tute.questions} Questions</span> • 
                        <span>Est. Duration: {tute.duration}</span> • 
                        <strong className="difficulty-tag">{tute.difficulty}</strong>
                      </p>
                    </div>
                    <div className="tute-actions">
                      <button
                        className="tute-btn-primary"
                        onClick={() => alert(`Opening ${tute.title} Question Paper PDF...`)}
                      >
                        Download PDF Tute
                      </button>
                      <button
                        className="tute-btn-secondary"
                        onClick={() => alert(`Starting interactive online practice mode for ${tute.title}...`)}
                      >
                        Start Online Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RELATIVE VIDEO */}
          {activeTab === "videos" && (
            <div className="tab-pane fade-in">
              {selectedLesson.videos.map((vid) => (
                <div key={vid.id} className="video-player-card">
                  {/* Simulated Video Viewport */}
                  <div className="video-viewport">
                    <div className="video-overlay">
                      <span className="video-quality-tag">{vid.resolution}</span>
                      <div className="video-center-controls">
                        <button
                          className="video-play-btn"
                          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        >
                          {isPlayingVideo ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="6" y="4" width="4" height="16"/>
                              <rect x="14" y="4" width="4" height="16"/>
                            </svg>
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                          )}
                        </button>
                        <p className="video-status-text">
                          {isPlayingVideo ? "Playing Stream..." : "Click to Play Recorded Lecture"}
                        </p>
                      </div>

                      <div className="video-bottom-bar">
                        <span className="time-indicator">{activeVideoTime} / {vid.duration}</span>
                        <div className="video-progress-line">
                          <div className="progress-fill-line" style={{ width: isPlayingVideo ? "45%" : "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Info & Timestamps Column */}
                  <div className="video-details-row">
                    <div>
                      <h3>{vid.title}</h3>
                      <p className="instructor-meta">Instructor: <strong>{vid.instructor}</strong> • Physics Department</p>
                    </div>

                    <div className="timestamps-box">
                      <h5>Lesson Timestamps</h5>
                      <div className="timestamps-list">
                        {selectedLesson.timestamps.map((ts, idx) => (
                          <button
                            key={idx}
                            className={`timestamp-chip ${activeVideoTime === ts.time ? "active-timestamp" : ""}`}
                            onClick={() => { setActiveVideoTime(ts.time); setIsPlayingVideo(true); }}
                          >
                            <span className="time-code">{ts.time}</span>
                            <span className="time-label">{ts.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Q&A SECTION */}
          {activeTab === "qna" && (
            <div className="tab-pane fade-in">
              <div className="qna-section-container">
                {/* Ask a Question Box */}
                <form onSubmit={handleAddQuestion} className="ask-question-form">
                  <h4 className="qna-form-title">Have a question about {selectedLesson.title}?</h4>
                  <div className="qna-input-wrapper">
                    <textarea
                      rows="3"
                      placeholder="Type your question or problem step here to get a direct answer from Eng. Dissanayaka..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                    />
                    <button type="submit" className="ask-submit-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      <span>Post Question</span>
                    </button>
                  </div>
                </form>

                {/* Filter & Search Bar */}
                <div className="qna-search-bar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Q&A questions by keyword (e.g. formula, equation, tutorial)..."
                    value={qnaSearch}
                    onChange={(e) => setQnaSearch(e.target.value)}
                  />
                </div>

                {/* Questions Feed */}
                <div className="qna-feed">
                  {filteredQna.length > 0 ? (
                    filteredQna.map((item) => (
                      <div key={item.id} className="qna-card">
                        <div className="qna-question-head">
                          <div className="qna-avatar">{item.student[0]}</div>
                          <div>
                            <h5>{item.student}</h5>
                            <span className="qna-time">{item.time}</span>
                          </div>
                        </div>

                        <p className="qna-question-body">{item.question}</p>

                        <div className="qna-answer-box">
                          <div className="teacher-badge-row">
                            <span className="teacher-chip">{item.teacher}</span>
                            <span className="like-count">❤️ {item.likes} helpful</span>
                          </div>
                          <p className="qna-answer-body">{item.answer}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="qna-empty-state">
                      <p>No questions matching your search. Be the first to ask a question above!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
