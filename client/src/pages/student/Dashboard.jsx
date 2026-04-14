import MainLayout from "../../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        👋 Welcome Madhuwantha
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Student ID */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Student ID</p>
          <h2 className="text-2xl font-bold">2541115</h2>
        </div>

        {/* Work Time */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Avg Work Time</p>
          <h2 className="text-2xl font-bold">0 Hours</h2>
        </div>

        {/* Delivery */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Tute Delivery</p>
          <h2 className="text-2xl font-bold text-red-500">
            Not Delivered
          </h2>
        </div>

      </div>

      {/* AI Card */}
      <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold">🤖 Ask Me Anything</h2>
        <p>AP LearniX AI Assistant</p>
      </div>

    </MainLayout>
  );
}