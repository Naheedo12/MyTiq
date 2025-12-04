import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";

function EventDetail(){
    const {events}=useContext(AppContext);
    const {id}=useParams();

    const event=events.find((f)=>f.id.toString() === id)
    return(
        <main className="bg-gray-50 pt-3">
          <section className="max-w-7xl mx-auto mt-10 px-6 flex flex-col lg:flex-row gap-8">
        
        <img
          src={event.image_path}
          alt="event"
          className="w-full lg:w-3/5 rounded-lg object-cover"
        />

       
        <div className="bg-white shadow-md rounded-lg p-6 h-fit w-full lg:w-2/5">
          <h2 className="text-2xl font-bold mb-4">
            {event.title}
          </h2>

         
          <div className="flex items-start gap-3 mb-4">
            <span className="text-[#40916C] text-xl">📅</span>
            <div>
              <p className="font-semibold">Date & Time</p>
              <p className="text-sm">
                {event.date}
              </p>
            </div>
          </div>

          
          <div className="flex items-start gap-3 mb-6">
            <span className="text-[#40916C] text-xl">📍</span>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm">
                {event.location}
              </p>
            </div>
          </div>

          
          <p className="text-gray-500 text-sm mb-1">Starting from</p>
          <p className="text-3xl font-bold mb-6">{event.price} DH</p>

          
          <button className="w-full bg-[#40916C] hover:bg-green-800 text-white py-3 rounded-md font-semibold">
            Buy Ticket
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto mt-10 px-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">About The Event</h3>
          <p className="text-sm leading-relaxed mb-3">
            Join us for the most anticipated musical event of the year! The
            Summer Soundwave Festival brings together top artists from around
            the globe for a day of unforgettable performances, amazing food, and
            incredible vibes. Set in the beautiful Greenfield Park, this is the
            perfect way to celebrate the peak of summer.
          </p>

          <p className="text-sm leading-relaxed">
            Featuring multiple stages, interactive art installations, and a wide
            variety of gourmet food trucks, there's something for everyone.
            Don't miss out on creating memories that will last a lifetime.
          </p>
        </div>
      </section>
        </main>
        
      

     
    )
}
export default EventDetail;