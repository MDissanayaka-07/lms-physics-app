import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import OTP from "./pages/auth/OTP";
import Register from "./pages/auth/Register";
import TeacherLogin from "./pages/auth/TeacherLogin";
import Dashboard from "./pages/student/Dashboard";
import Marks from "./pages/student/Marks";
import Quiz from "./pages/student/Quiz";
import Papers from "./pages/student/Papers";
import Submission from "./pages/student/Submission";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marks" element={<Marks />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/submission" element={<Submission />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
    </Routes>
  );
}

export default App;
