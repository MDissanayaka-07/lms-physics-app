import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import Marks from "./pages/student/Marks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marks" element={<Marks />} />
    </Routes>
  );
}

export default App;
