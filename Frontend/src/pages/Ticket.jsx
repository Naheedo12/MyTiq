import { useEffect, useState } from "react";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getAuthHeader } from "../services/auth";
import axios from "axios";

function Ticket() {
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Ticket page loaded');
    console.log('Is authenticated:', isAuthenticated());
    
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      navigate("/login");
      return;
    }

    if (sessionStorage.getItem("ticketPurchased") === "true") {
      setShowSuccess(true);
      sessionStorage.removeItem("ticketPurchased");
      setTimeout(() => setShowSuccess(false), 5000);
    }

    console.log('Loading user tickets...');
    loadUserTickets();
  }, [navigate]);

  const loadUserTickets = async () => {
    try {
      console.log('Starting to load tickets...');
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/tickets', {
        headers: getAuthHeader()
      });
      console.log('Tickets response:', response.data);
      setUserTickets(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des tickets:', error);
      setUserTickets([]);
    } finally {
      console.log('Loading finished');
      setLoading(false);
    }
  };

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

  const handleDownload = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}/download`, {
        headers: getAuthHeader(),
        responseType: 'blob'
      });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket-${ticketId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert("Erreur lors du téléchargement du PDF");
    }
  };

  console.log('Render - Loading:', loading, 'Tickets:', userTickets);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Chargement de vos tickets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 pb-20">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50">
          Ticket acheté avec succès !
        </div>
      )}

      <header className="py-12">
        <h1 className="text-3xl font-semibold">Mes billets</h1>
        <p className="text-gray-600 mt-2">
          Tous vos billets d'événements en un seul endroit
        </p>
      </header>

      <div className="space-y-6">
        {userTickets.length === 0 && (
          <div className="text-center py-12">
            <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun billet trouvé.</p>
            <p className="text-gray-400 text-sm mt-2">
              Achetez votre premier ticket pour le voir apparaître ici !
            </p>
          </div>
        )}

        {userTickets.map((ticket) => {
          const event = ticket.event;
          if (!event) return null;

          return (
            <div
              key={ticket.id}
              className="bg-white flex flex-col md:flex-row gap-6 p-6 rounded-2xl shadow-sm"
            >
              <img
                src={event.image_path || '/placeholder-event.jpg'}
                alt={event.title}
                className="md:w-64 w-full h-64 rounded-xl object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-event.jpg';
                }}
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {event.title}
                  </h2>

                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5" />
                      <span>
                        Ticket #{ticket.id} • {event.price} DH
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleDownload(ticket.id)}
                    className="bg-[#40916C] text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
                  >
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ticket;