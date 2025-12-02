export default function StatCard({ title, value, icon, backgroundColor, iconColor }) {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 border border-gray-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <span className={`text-3xl ${iconColor}`}>{icon}</span>
      </div>
    </div>
  );
}
