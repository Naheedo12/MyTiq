import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function NewsletterTable(){
    const { newsletter }  = useContext(AppContext);
    return(
        <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">NewsLetter Management</h3>
        
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Id</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Subscribed_at</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {newsletter.map((news) => (
              <tr key={news.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{news.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{news.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(news.subscribed_at).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{news.confirmed === true ? "Confirmé" : "Non confirmé"}</td>
               

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}
export default NewsletterTable;