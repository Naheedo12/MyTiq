import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold text-green-600">
            <Link to="/">            
                MyTiq
            </Link>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-100 text-green-700">
          <span className="text-lg">📊</span>
          <span className="font-medium">Dashboard</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <span className="text-lg">📅</span>
          <span className="font-medium">Events</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <span className="text-lg">👥</span>
          <span className="font-medium">Attendees</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <span className="text-lg">📈</span>
          <span className="font-medium">Reports</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <span className="text-lg">⚙️</span>
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      <div className="px-6 py-4 mt-auto">
        <UserProfile />
      </div>
    </div>
  );
}
