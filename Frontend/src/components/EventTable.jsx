export default function EventTable() {
  const events = [
    { id: 1, name: "Summer Music Festival", date: "2024-08-15", location: "Central Park", ticketsSold: "4,500", totalTickets: "5,000", status: "Published" },
    { id: 2, name: "Tech Conference 2024", date: "2024-09-22", location: "Convention Center", ticketsSold: "1,230", totalTickets: "2,000", status: "Published" },
    { id: 3, name: "Art & Wine Fair", date: "2024-10-05", location: "City Gallery", ticketsSold: "0", totalTickets: "300", status: "Draft" },
    { id: 4, name: "Charity Gala Dinner", date: "2023-12-10", location: "Grand Hotel Ballroom", ticketsSold: "250", totalTickets: "250", status: "Completed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Event Management</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Add Event
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tickets Sold</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{event.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{event.ticketsSold} / {event.totalTickets}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>{event.status}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">✏️</button>
                  <button className="text-red-600 hover:text-red-700 font-medium">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
