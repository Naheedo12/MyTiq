// src/components/AddEvent.jsx

import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function AddEvent({ onClose }) {
  // State local pour stocker les valeurs du formulaire
  const [eventData, setEventData] = useState({
    title: "",          
    date: "",           
    capacity: "",       
    location: "",       
    description: "",    
    price: "",          
    image_path: null,   
    status: "active",   
  });

  // Récupération de la fonction addEvent depuis le Context
  const { addEvent } = useContext(AppContext);

  // Gestion des changements pour les inputs texte, number et select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 📁 Gestion du changement pour l'image (input type file)
  const handleImageChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      image_path: e.target.files[0], // Stocke le premier fichier sélectionné
    }));
  };

  // 🚀 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Création d'un objet FormData pour envoyer les données multipart/form-data
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("capacity", eventData.capacity);
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    formData.append("price", eventData.price); 
    if (eventData.image_path) {
      formData.append("image_path", eventData.image_path); // Ajoute l'image si elle existe
    }
    formData.append("status", eventData.status);

    try {
      // Appel de la fonction addEvent depuis le Context
      await addEvent(formData);

      // Fermer le formulaire/modal si la fonction onClose est passée
      if (onClose) onClose();
    } catch (error) {
      //  Gestion des erreurs
      console.error(
        "Erreur lors de l'ajout de l'événement:",
        error.response?.data || error.message
      );
      alert(
        `Échec de l'ajout. Détails: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      {/* Titre du formulaire */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Ajouter un nouvel événement
      </h2>

      {/* Formulaire principal */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Titre */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Capacité */}
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Capacité
          </label>
          <input
            type="number"
            name="capacity"
            id="capacity"
            value={eventData.capacity}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Lieu */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lieu
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={eventData.location}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Prix */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Prix (€)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={eventData.price}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={eventData.description}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 resize-none"
          ></textarea>
        </div>

        {/* Statut */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Statut
          </label>
          <select
            name="status"
            id="status"
            value={eventData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label
            htmlFor="image_path"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image de l'événement
          </label>
          <input
            type="file"
            name="image_path"
            id="image_path"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
          />
        </div>

        {/* Boutons */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose} // Fermer le modal sans submit
            className="py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Créer l'événement
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
