export default function UserProfile() {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">T</div>
      <div>
        <p className="text-sm font-semibold text-gray-900">Girlies</p>
        <p className="text-xs text-gray-600">Admin</p>
      </div>
      <button className="ml-2 text-gray-400 hover:text-gray-600">⋯</button>
    </div>
  );
}
