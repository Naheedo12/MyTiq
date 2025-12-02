import React from "react"
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react"

function Ticket() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-12 px-6 md:px-20">
        <h1 className="text-3xl font-semibold">Mes billets</h1>
        <p className="text-gray-600 mt-2">
          Tous vos billets d’événements en un seul endroit
        </p>
      </header>

      <div className="space-y-10 px-6 md:px-20 pb-20">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white flex flex-col md:flex-row gap-6 p-6 rounded-2xl shadow-sm items-center"
          >
            <img
              src="event.jpg"
              alt="Event"
              className="w-full md:w-64 h-48 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                Festival de Musique Électronique 2025
              </h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-5 h-5 text-gray-800" />
                  <span>8 Août 2025</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-5 h-5 text-gray-800" />
                  <span>Théâtre National, Lyon</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <TicketIcon className="w-5 h-5 text-gray-800" />
                  <span>T-001235</span>
                </div>
              </div>
            </div>

            <button className="bg-[#40916C] text-white px-6 py-3 rounded-full hover:bg-green-800 transition text-sm">
              Télécharger pdf
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ticket
