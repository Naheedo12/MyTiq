function EventCard(){
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
{[1, 2, 3, 4, 5, 6].map((i) => (
<div key={i} className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
<img src="/event.jpg" className="w-full h-48 object-cover rounded-lg" alt="event"/>
<h3 className="font-semibold mt-3">Festival de Musique Électronique 2025</h3>
<div className="text-sm text-gray-600 mt-2">
<p>📅 15 Juillet 2025</p>
<p>📍 Parc des Expositions, Paris</p>
</div>
<div className="flex items-center justify-between mt-4">
<span className="text-[#40916C] font-semibold">54 DH</span>
<button className="px-4 py-1 border border-[#40916C] text-[#40916C] rounded-full hover:bg-[#40916C] hover:text-white transition text-sm">
voir détails
</button>
</div>
</div>
))}
</div>
</section>
    )
}
export default EventCard;