import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-full p-4">

      <h2 className="text-xl font-bold mb-6 text-red-500">
        📘 LMS Panel
      </h2>

      <ul className="space-y-3">

        <li>
          <Link className="block p-3 rounded hover:bg-gray-100" to="/dashboard">
            🏠 My Lessons
          </Link>
        </li>

        <li>
          <Link className="block p-3 rounded hover:bg-gray-100" to="/practical">
            💻 Practical Sessions
          </Link>
        </li>

        <li className="text-gray-400 text-sm mt-4">Courses</li>

        <li><Link className="block p-2 hover:bg-gray-100" to="#">A/L 2028</Link></li>
        <li><Link className="block p-2 hover:bg-gray-100" to="#">A/L 2027</Link></li>
        <li><Link className="block p-2 hover:bg-gray-100" to="#">A/L 2026</Link></li>

        <li className="text-gray-400 text-sm mt-4">Resources</li>

        <li><Link className="block p-2 hover:bg-gray-100" to="/papers">Past Papers</Link></li>
        <li><Link className="block p-2 hover:bg-gray-100" to="/pdfs">PDFs</Link></li>

        <li className="text-gray-400 text-sm mt-4">Other</li>

        <li><Link className="block p-2 hover:bg-gray-100" to="/profile">Profile</Link></li>

      </ul>
    </div>
  );
}
