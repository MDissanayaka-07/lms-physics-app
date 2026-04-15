import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import OTP from "./pages/auth/OTP";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/student/Dashboard";
import Marks from "./pages/student/Marks";
import Quiz from "./pages/student/Quiz";
import Papers from "./pages/student/Papers";
import Submission from "./pages/student/Submission";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marks" element={<Marks />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/submission" element={<Submission />} />
    </Routes>
  );
}

export default App;
