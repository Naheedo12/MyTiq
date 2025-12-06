// src/contexts/AppContext.jsx

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [newsletter, setNewsletter] = useState([]);
    const [tickets, setTickets] = useState([]);


   // ➤ Ajouter un nouvel événement
const addEvent = async (formData) => {
    try {
        const token = localStorage.getItem("token");

        // Envoi de la requête POST pour ajouter l'événement
        const res = await axios.post(
            "http://127.0.0.1:8000/api/events",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Mise à jour locale de la liste des événements
        setEvents((prev) => [...prev, res.data.event]);

    } catch (err) {
        console.error("Erreur lors de l'ajout de l'evenement:", err);
        throw err;
    }
};

// ➤ Récupérer événements + tickets + newsletter
const getEvents = async () => {
    try {
        const token = localStorage.getItem("token");

        // 1) Récupérer les événements
        const event = await axios.get("http://127.0.0.1:8000/api/events");
        setEvents(event.data.events);

        // 2) Récupérer les tickets 
        const ticket = await axios.get(
            "http://127.0.0.1:8000/api/ticketsAdmin",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(ticket.data.Tickets);

        // 3) Récupérer les newsletter
        const newsletter = await axios.get(
            "http://127.0.0.1:8000/api/newsletter",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewsletter(newsletter.data.newsletter);

    } catch (err) {
        console.error("Erreur :", err);
    }
};

// ➤ Mettre à jour un événement
const updateEvent = async (id, formData) => {
    try {
        const token = localStorage.getItem("token");

        // Envoi de la requête POST pour update 
        const res = await axios.post(
            `http://127.0.0.1:8000/api/events/${id}`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Modifier l'événement dans le state
        setEvents((prev) =>
            prev.map((event) =>
                event.id === id ? res.data.event : event
            )
        );

        return res.data.event;

    } catch (err) {
        console.error(`Erreur mise à jour événement ID ${id}:`, err);
        throw err;
    }
};

// ➤ Supprimer un événement
const deleteEvent = async (id) => {
    try {
        const token = localStorage.getItem("token");

        // Requête DELETE
        await axios.delete(
            `http://127.0.0.1:8000/api/events/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Supprimer l’élément du state
        setEvents((prev) => prev.filter((event) => event.id !== id));

    } catch (err) {
        console.error(`Erreur suppression événement ID ${id}:`, err);
        alert("Impossible de supprimer l'événement.");
    }
};

// ➤ Acheter un ticket pour un événement
const purchaseTicket = async (eventId) => {
    try {
        const token = localStorage.getItem("token");

        // Envoi de la requête POST pour acheter un ticket
        const res = await axios.post(
            "http://127.0.0.1:8000/api/tickets",
            { event_id: eventId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Mise à jour de la liste des tickets du user
        await getUserTickets();

        return res.data;

    } catch (err) {
        console.error("Erreur lors de l'achat du ticket:", err);
        throw err;
    }
};

// ➤ Récupérer les tickets de l'utilisateur connecté
const getUserTickets = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://127.0.0.1:8000/api/tickets",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Sécurité : s'assurer que c'est bien un tableau
        setTickets(
            Array.isArray(res.data) ? res.data : res.data.tickets || []
        );

    } catch (err) {
        console.error("Erreur récupération tickets:", err);
    }
};

// ➤ Télécharger un ticket PDF
const downloadTicketPdf = async (ticketId) => {
    try {
        const token = localStorage.getItem("token");

        // Requête blob pour récupérer le PDF
        const res = await axios.get(
            `http://127.0.0.1:8000/api/tickets/${ticketId}/download`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob" // obligatoire pour PDF
            }
        );

        // Création d'un lien temporaire
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        // Télécharger automatiquement
        link.href = url;
        link.setAttribute("download", `ticket-${ticketId}.pdf`);
        document.body.appendChild(link);

        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

    } catch (err) {
        console.error("Erreur téléchargement PDF:", err);
        throw err;
    }
};

// ➤ Newsletter 
const addNew = async (email) => {
    try{
   const res= await axios.post('http://127.0.0.1:8000/api/newsletter/subscribe',{ email });
    setNewsletter((prev) => [...prev, res.data])
    }catch(err){
     console.error("Erreur lors de l'affiche de l'evenement:", err);
    }
};

// ➤ Charger les données au démarrage de l'application
useEffect(() => {
    getEvents();         // Charger les événements / tickets admin / newsletter

    const token = localStorage.getItem("token");
    if (token) getUserTickets();   // Si connecté → charger tickets user

}, []);

// ➤ Fournir les valeurs via le Context
return (
    <AppContext.Provider
        value={{
            addEvent,
            events,
            deleteEvent,
            updateEvent,
            tickets,
            newsletter,
            purchaseTicket,
            getUserTickets,
            downloadTicketPdf,
            addNew
        }}
    >
        {children}
    </AppContext.Provider>
);
}
