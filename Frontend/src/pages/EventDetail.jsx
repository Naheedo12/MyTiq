import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams, useNavigate } from "react-router-dom";

function EventDetail() {
  const { events, purchaseTicket } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const event = events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Événement non trouvé</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBuyTicket = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMsg("Veuillez vous connecter pour acheter un ticket.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await purchaseTicket(event.id);
      setSuccessMsg("Achat de ticket fait avec succès ! Vous allez recevoir un email de confirmation.");
      setTimeout(() => navigate("/ticket"), 2500);
    } catch (err) {
      console.error("Erreur lors de l'achat :", err);
      setErrorMsg(err.response?.data?.message || "Erreur lors de l'achat. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 pt-3 pb-10">
      <section className="max-w-7xl mx-auto mt-10 px-6 flex flex-col lg:flex-row gap-8">
        <img
          src={event.image_path}
          alt={event.title}
          className="w-full lg:w-3/5 rounded-lg object-cover h-[400px] lg:h-auto"
        />

        <div className="bg-white shadow-md rounded-lg p-6 h-fit w-full lg:w-2/5">
          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

          <div className="flex items-start gap-3 mb-4">
            <span className="text-[#40916C] text-xl">📅</span>
            <div>
              <p className="font-semibold">Date & Time</p>


              <p className="text-sm">{formatDate(event.date)}</p>

            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <span className="text-[#40916C] text-xl">📍</span>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm">{event.location}</p>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-1">Starting from</p>
          <p className="text-3xl font-bold mb-6">{event.price} DH</p>

          {successMsg && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-800 text-sm px-4 py-3 rounded-lg">
              ✅ {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded-lg">
              ❌ {errorMsg}
            </div>
          )}

          <button
            onClick={handleBuyTicket}
            disabled={loading}
            className="w-full bg-[#40916C] hover:bg-green-800 text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Traitement en cours..." : "Buy Ticket"}
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-10 px-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">About The Event</h3>
          <p className="text-sm leading-relaxed">
            {event.description || "Rejoignez-nous pour un événement inoubliable! Profitez d'une expérience unique avec des performances exceptionnelles, une ambiance conviviale et des moments mémorables."}
          </p>
        </div>
      </section>
    </main>
  );
}

export default EventDetail;