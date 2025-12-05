import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function TicketTable(){
    const { ticket } = useContext(AppContext);
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
            {ticket.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.reference}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(ticket.purchased_at).toLocaleDateString()}</td>
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