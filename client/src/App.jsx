import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import MarksPage from "./pages/MarksPage";
import QuizPage from "./pages/QuizPage";
import SubmissionPage from "./pages/SubmissionPage";
import ModelPapersPage from "./pages/ModelPapersPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/marks"
          element={
            <ProtectedRoute allowRoles={["student"]}>
              <MarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quiz"
          element={
            <ProtectedRoute allowRoles={["student"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/submission"
          element={
            <ProtectedRoute allowRoles={["student"]}>
              <SubmissionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/model-papers"
          element={
            <ProtectedRoute allowRoles={["student"]}>
              <ModelPapersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
