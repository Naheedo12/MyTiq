import React from "react";
import { Link } from "react-router-dom";
import festive from "../assets/festive.png";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

const PageLayout = () => {
  const customBgColor = "bg-[#D8F3DC]";

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`py-16 px-8 shadow-md ${customBgColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Connecting People, Creating Memories
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              MyTiq is your premier destination for discovering and booking
              tickets for the most exciting events. From music festivals to tech
              conferences, we bring unforgettable experiences to your
              fingertips.
            </p>
          </div>
        </div>
      </header>
      <main className="flex-[2] w-full bg-white">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-base text-gray-700 mb-8">
                Our mission is to simplify the event discovery and ticketing
                process, making it easier than ever for people to connect with
                events they love. We believe in the power of live experiences to
                inspire, educate, and entertain. We are committed to providing a
                seamless, secure, and user-friendly platform for both event
                organizers and attendees.
              </p>

              <Link
                to="/EventDetail"
                className="bg-[#40916C] hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
              >
                explore events &rarr;
              </Link>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 p-6">
              <img
                src={festive}
                alt="Image de personnes lors d'un événement festif"
                className="w-full h-auto object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </main>
      <section className={`py-16 px-8 ${customBgColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600">
              A feature-rich platform designed for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                For Attendees
              </h3>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 flex justify-center items-center space-x-4">
                <FaPeopleGroup className="text-green-600 w-8 h-8" />
              </h1>

              <p className="text-gray-600">
                Accès facile à l'agenda, réseautage, sessions interactives et
                tout ce dont vous avez besoin pour profiter de l'événement.
              </p>
            </div>

           
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                For Organizers
              </h3>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 flex justify-center items-center space-x-4">
                <FaMicrophone className="text-green-600 w-8 h-8" />
              </h1>
              <p className="text-gray-600">
                Outils de gestion complets, analyses en temps réel, et
                personnalisation avancée pour un événement réussi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Secure & Reliable
              </h3>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 flex justify-center items-center space-x-4">
                <MdOutlineSecurity className="text-green-600 w-8 h-8" />
              </h1>

              <p className="text-gray-600">
                Gestion des sessions, partage de documents, et outils de
                présentation pour une expérience de prise de parole fluide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default PageLayout;