function TicketTable(){
    const tickets = [
    { id: 1, reference: "S657jgjg8790", purchased_at: "2024-08-15", seat_number: "10", price: "4,500"},
    { id: 2, reference: "S657jgjg8790", purchased_at: "2024-08-15", seat_number: "10", price: "4,500"},
    { id: 3, reference: "S657jgjg8790", purchased_at: "2024-08-15", seat_number: "10", price: "4,500"},
    { id: 4, reference: "S657jgjg8790", purchased_at: "2024-08-15", seat_number: "10", price: "4,500"},
  ];
    return(
        <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Ticket Management</h3>
        
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Id Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Refrence</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.reference}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.purchased_at}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.seat_number}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.price}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}
export default TicketTable;