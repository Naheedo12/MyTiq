// src/contexts/AppContext.jsx

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [newsletter, setNewsletter] = useState([]);
 const [tickets, setTickets] = useState([]);

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
            setTickets(ticket.data.Tickets);
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

    const updateEvent = async (id, formData) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`http://127.0.0.1:8000/api/events/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setEvents(events.map(event => 
                event.id === id ? res.data.event : event
            ));
            
            return res.data.event; 
            
        } catch (err) {
            console.error(`Erreur lors de la mise à jour de l'événement ID ${id}:`, err);
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

    const purchaseTicket = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://127.0.0.1:8000/api/tickets', 
                { event_id: eventId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            await getUserTickets();
            
            return res.data;
        } catch (err) {
            console.error("Erreur lors de l'achat du ticket:", err);
            throw err;
        }
    };

    const getUserTickets = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get('http://127.0.0.1:8000/api/tickets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTickets(Array.isArray(res.data) ? res.data : res.data.tickets || []);
        } catch (err) {
            console.error("Erreur lors de la récupération des tickets:", err);
        }
    };

    const downloadTicketPdf = async (ticketId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://127.0.0.1:8000/api/tickets/${ticketId}/download`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });
            
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `ticket-${ticketId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erreur lors du téléchargement du PDF:", err);
            throw err;
        }
    };
    const addNew = async (email) => { 
        /* ... */ 
    };
    useEffect(() => {
        getEvents();
        const token = localStorage.getItem("token");
        if (token) {
            getUserTickets();
        }
    }, []);

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
};
