import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const pageMeta = {
  "/dashboard": {
    eyebrow: "Student Workspace",
    title: "Dashboard",
    description: "Track lessons, marks, assignments, and class updates in one place."
  },
  "/marks": {
    eyebrow: "Performance",
    title: "Marks Analytics",
    description: "Review trends, compare recent exams, and identify your next target score."
  }
};

export default function MainLayout({ children }) {
  const location = useLocation();

  const meta = useMemo(() => {
    return (
      pageMeta[location.pathname] || {
        eyebrow: "A/L Physics LMS",
        title: "Student Panel",
        description: "Stay on top of every lesson, quiz, and submission."
      }
    );
  }, [location.pathname]);

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar
          eyebrow={meta.eyebrow}
          title={meta.title}
          description={meta.description}
        />

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
