import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
function AddEvent(){
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    capacity: "",
    location: "",
    description: "",
    price: "",
    image_path: null,
    status:"",
  });
  const { addEvent }=useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      image_path: e.target.files[0],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();

  formData.append("title", eventData.title);
  formData.append("date", eventData.date);
  formData.append("capacity", eventData.capacity);
  formData.append("location", eventData.location);
  formData.append("description", eventData.description);
  formData.append("price", eventData.price);
  formData.append("image_path", eventData.image_path);
  formData.append("status", eventData.status);

  await addEvent(formData);

    setEventData({
      title: "",
      date: "",
      capacity:"",
      location: "",
      description: "",
      price: "",
      image_path: null,
      status:"",
    });

    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl my-10 border border-green-200">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Créer un Nouvel Événement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Titre de l'événement
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Ex: Conférence Tech"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

     
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Lieu
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Ex: Palais des Congrès"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700"
          >
            Capacité
          </label>
          <input
            type="number"
            name="capacity"
            id="capacity"
            value={eventData.capacity}
            onChange={handleChange}
            placeholder="Ex: 500"
            required
            min="1"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="ticketPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Prix du billet (Dhs)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={eventData.price}
            onChange={handleChange}
            placeholder="Ex: 150"
            required
            min="0"
            step="any"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="ticketPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            type="text"
            name="status"
            id="status"
            value={eventData.status}
            onChange={handleChange}
            placeholder="Ex: active"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Décrivez l'événement en détail..."
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="imageFile"
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
          {eventData.image_path && (
            <p className="mt-2 text-sm text-gray-500">
              Fichier sélectionné: {eventData.image_path.name}
            </p>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
          >
            Ajouter Événement
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEvent;
