function Ticket(){
return(
    <div className="min-h-screen bg-gray-50">
     
      <header className="py-12 px-6 md:px-20">
        <h1 className="text-3xl font-semibold">Mes billets</h1>
        <p className="text-gray-600 mt-2">
          Tous vos billets d’événements en un seul endroit
        </p>
      </header>

      
      <div className="space-y-10 px-6 md:px-20 pb-20">
     {[1, 2, 3].map((i) => (  
    <div key={i} className="bg-white flex flex-col md:flex-row gap-6 p-6 rounded-2xl shadow-sm items-center">
            
    <img src="event.jpg" alt="Event" className="w-full md:w-64 h-48 rounded-xl object-cover"/>

           
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Festival de Musique Électronique 2025</h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg"><svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
</svg></span>
                  <span>8 Août 2025</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
</svg>
</span>
                  <span>Théâtre National, Lyon</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
</svg></span>
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
export default Ticket;