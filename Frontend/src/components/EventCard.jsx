import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext"; 
import { Calendar, MapPin } from "lucide-react";    
import { Link } from "react-router-dom";            

function EventCard({ searchQuery }) {
  const { events } = useContext(AppContext);
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Filtrer les événements en fonction de la recherche
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = events.filter((event) => {
        // Recherche par nom
        const matchTitle = event.title.toLowerCase().includes(query);
        
        // Recherche par lieu/pays
        const matchLocation = event.location.toLowerCase().includes(query);
        
        // Recherche par date
        const eventDate = new Date(event.date).toLocaleDateString('fr-FR');
        const matchDate = eventDate.includes(query);
        
        // Recherche par prix
        const matchPrice = event.price.toString().includes(query);
        
        return matchTitle || matchLocation || matchDate || matchPrice;
      });
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);

  return (
    <section className="px-6 md:px-12 py-12">

      {/* 🔹 En-tête de la section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Événements à la une</h2>
          <p className="text-gray-500 text-sm">
            Découvrez les événements les plus populaires
          </p>
        </div>
        <a href="#" className="text-[#40916C] hover:underline text-sm">
          Voir tout
        </a>
      </div>

      {/* Grille des événements */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun événement trouvé pour "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
          <div
            key={event.id}  // Clé unique pour chaque élément de la liste
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
          >
            {/* Image de l'événement */}
            <img
              src={event.image_path}
              className="w-full h-48 object-cover rounded-lg"
              alt={`Image de ${event.title}`}
            />

            {/* Titre de l'événement */}
            <h3 className="font-semibold mt-3">{event.title}</h3>

            {/* Informations : date et lieu */}
            <div className="mt-4 space-y-2 text-gray-700">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-5 h-5 text-gray-800" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>

              {/* Lieu */}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-5 h-5 text-gray-800" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Prix et bouton détails */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-[#40916C] font-semibold">
                {event.price} DH
              </span>

              {/* Bouton pour voir les détails de l'événement */}
              <Link to={`/eventDetail/${event.id}`}>
                <button className="px-4 py-1 border border-[#40916C] text-[#40916C] rounded-full hover:bg-[#40916C] hover:text-white transition text-sm">
                  voir détails
                </button>
              </Link>
            </div>
          </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventCard;