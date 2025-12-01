function HeroSection(){
    return(
        <section
className="w-full h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-4"
style={{ backgroundImage: "url('/hero.jpg')" }}
>
<h1 className="text-3xl md:text-4xl font-bold max-w-2xl">
Découvrez les meilleurs événements près de chez vous
</h1>
<p className="mt-3 max-w-xl text-sm md:text-base">
Réservez vos billets en quelques clics pour des concerts, spectacles, conférences et bien plus encore.
</p>


<div className="mt-6 w-full max-w-xl bg-white rounded-full shadow flex items-center p-2">
<input
type="text"
className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
placeholder="Rechercher un événement..."
/>
<button className="px-6 py-2 bg-[#40916C] text-white rounded-full hover:bg-green-800 transition">
Recherche
</button>
</div>
</section>
    )
}
export default HeroSection;