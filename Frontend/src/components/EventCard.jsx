import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom";


function EventCard(){
    const {events}=useContext(AppContext);

    return(
        <section className="px-6 md:px-12 py-12">
<div className="flex items-center justify-between mb-6">
<div>
<h2 className="text-2xl font-bold">Événements à la une</h2>
<p className="text-gray-500 text-sm">Découvrez les événements les plus populaires</p>
</div>
<a href="#" className="text-[#40916C] hover:underline text-sm">Voir tout</a>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{events.map((event) => (
<div key={event.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
<img src={event.image_path} className="w-full h-48 object-cover rounded-lg" alt="event"/>
<h3 className="font-semibold mt-3">{event.title}</h3>

<div className="mt-4 space-y-2 text-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-5 h-5 text-gray-800" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-5 h-5 text-gray-800" />
                  <span>{event.location}</span>
                </div>
              </div>

<div className="flex items-center justify-between mt-4">
<span className="text-[#40916C] font-semibold">{event.price} DH</span>
<Link to={`/eventDetail/${event.id}`}>
<button className="px-4 py-1 border border-[#40916C] text-[#40916C] rounded-full hover:bg-[#40916C] hover:text-white transition text-sm">
voir détails
</button>
</Link>

</div>
</div>
))}
</div>
</section>
    )
}
export default EventCard;