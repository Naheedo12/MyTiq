import { useContext, useEffect, useState } from "react";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function Ticket() {
  const { tickets, getUserTickets, downloadTicketPdf, events } =
    useContext(AppContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    // Afficher notification si ticket acheté récemment
    if (sessionStorage.getItem("ticketPurchased") === "true") {
      setShowSuccess(true);
      sessionStorage.removeItem("ticketPurchased");
      setTimeout(() => setShowSuccess(false), 5000);
    }

    getUserTickets(); // Charger les tickets
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = (ticketId) => {
    downloadTicketPdf(ticketId).catch(() =>
      alert("Erreur lors du téléchargement du PDF")
    );
  };

  const getEvent = (ticket) =>
    ticket.event || events.find((e) => e.id === ticket.event_id);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 pb-20">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50">
          Ticket acheté avec succès ! Vous allez recevoir un email de
          confirmation.
        </div>
      )}

      <header className="py-12">
        <h1 className="text-3xl font-semibold">Mes billets</h1>
        <p className="text-gray-600 mt-2">
          Tous vos billets d'événements en un seul endroit
        </p>
      </header>

      <div className="space-y-6">
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Vous n'avez pas encore de billets
          </p>
        ) : (
          tickets.map((ticket) => {
            const event = getEvent(ticket);
            if (!event) return null;

            return (
              <div
                key={ticket.id}
                className="bg-white flex flex-col md:flex-row gap-6 p-6 rounded-2xl shadow-sm"
              >
                <img
                  src={event.image_path}
                  alt={event.title}
                  className="md:w-64 w-full h-64 rounded-xl object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {event.title}
                    </h2>

                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-800" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-800" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-5 h-5 text-gray-800" />
                        <span>
                          Ticket #{ticket.id} • {event.price} DH
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDownload(ticket.id)}
                      className="bg-[#40916C] text-white px-6 py-3 rounded-full hover:bg-green-800 transition text-sm"
                    >
                      Télécharger PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Ticket;
