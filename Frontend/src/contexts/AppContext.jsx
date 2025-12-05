// src/contexts/AppContext.jsx

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [newsletter, setNewsletter] = useState([]);
    const [ticket, setTicket] = useState([]); 

    // --- Fonctions de CRUD ---

    const addEvent = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://127.0.0.1:8000/api/events', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEvents((prev) => [...prev, res.data.event]);
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'evenement:", err);
            // On lève l'erreur pour la gestion côté composant (AddEvent.jsx)
            throw err;
        }
    };

    const getEvents = async () => {
        try {
           const token = localStorage.getItem("token");
            const event = await axios.get('http://127.0.0.1:8000/api/events');
            setEvents(event.data.events);
            const ticket = await axios.get('http://127.0.0.1:8000/api/ticketsAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
            setTicket(ticket.data.Tickets);
            const newsletter = await axios.get('http://127.0.0.1:8000/api/newsletter', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
            setNewsletter(newsletter.data.newsletter);
        } catch (err) {
            console.error("Erreur :", err);
        }
    };

    // Fonction de mise à jour (utilisée par EventTable.jsx)
    const updateEvent = async (id, formData) => {
        try {
            const token = localStorage.getItem("token");
            // Utilise POST vers l'ID pour la mise à jour des données (méthode courante pour FormData dans Laravel)
            const res = await axios.post(`http://127.0.0.1:8000/api/events/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Mise à jour de l'état local avec l'événement retourné par l'API
            setEvents(events.map(event => 
                event.id === id ? res.data.event : event
            ));
            
            return res.data.event; 
            
        } catch (err) {
            console.error(`Erreur lors de la mise à jour de l'événement ID ${id}:`, err);
            // Laisse l'erreur se propager pour être gérée dans EventTable.jsx
            throw err; 
        }
    };
    
    const deleteEvent = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setEvents(events.filter(event => event.id !== id));
            
        } catch (err) {
            console.error(`Erreur lors de la suppression de l'événement ID ${id}:`, err);
            alert("Impossible de supprimer l'événement.");
        }
    };

    const addNew = async (email) => { /* ... */ };
    // ----------------------------------------------------

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <AppContext.Provider
            value={{ addEvent, events,ticket,newsletter, addNew, deleteEvent, updateEvent }} 
        >
            {children}
        </AppContext.Provider>
    );
};