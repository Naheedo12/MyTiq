import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [adminTickets, setAdminTickets] = useState([]);
  const [userTickets, setUserTickets] = useState([]);

  /* ================= EVENTS ================= */

  const getEvents = async () => {
    try {
      const eventRes = await axios.get("http://127.0.0.1:8000/api/events");
      setEvents(eventRes.data.events);
    } catch (err) {
      console.error("Erreur chargement événements:", err);
    }
  };

  /* ================= ADMIN DATA ================= */

  const getAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const ticketRes = await axios.get(
        "http://127.0.0.1:8000/api/ticketsAdmin",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdminTickets(ticketRes.data.Tickets);

      const newsletterRes = await axios.get(
        "http://127.0.0.1:8000/api/newsletter",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewsletter(newsletterRes.data.newsletter);

    } catch (err) {
      console.error("Erreur chargement admin:", err);
    }
  };

  /* ================= NEWSLETTER SUBSCRIBE ================= */

  const addNew = async (email) => {
    const res = await axios.post("http://127.0.0.1:8000/api/newsletter/subscribe", { email });
    return res.data;
  };

  /* ================= ADD EVENT ================= */

  const addEvent = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/events",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newEvent = res.data.event ?? res.data;
      setEvents((prev) => [...prev, newEvent]);
      return res.data;
    } catch (err) {
      console.error("Erreur ajout événement:", err);
      throw err;
    }
  };

  /* ================= DELETE / UPDATE EVENT ================= */

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Erreur suppression événement:", err);
      throw err;
    }
  };

  const updateEvent = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/events/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? res.data.event ?? res.data.events ?? res.data : e))
      );
      return res.data;
    } catch (err) {
      console.error("Erreur modification événement:", err);
      throw err;
    }
  };

  const getUserTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/tickets",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Backend returns a plain array
      const tickets = Array.isArray(res.data) ? res.data : res.data.tickets ?? [];
      setUserTickets(tickets);
      return tickets;

    } catch (err) {
      console.error("Erreur récupération tickets user:", err);
      return [];
    }
  };

  /* ================= ACHAT ================= */

  const purchaseTicket = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/tickets",
        { event_id: eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await getUserTickets(); 
      return res.data;

    } catch (err) {
      console.error("Erreur achat ticket:", err);
      throw err;
    }
  };

  /* ================= PDF ================= */

  const downloadTicketPdf = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://127.0.0.1:8000/api/tickets/${ticketId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${ticketId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Erreur téléchargement PDF:", err);
    }
  };

  /* ================= INIT ================= */

  useEffect(() => {
    getEvents(); // public events

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      getUserTickets();

      // Only fetch admin data if user is admin
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role === "admin") {
          getAdminData();
        }
      }
    }
  }, []);

  /* ================= PROVIDER ================= */

  return (
    <AppContext.Provider
      value={{
        events,
        newsletter,
        adminTickets,
        userTickets,
        getAdminData,
        getUserTickets,
        purchaseTicket,
        downloadTicketPdf,
        addEvent,
        deleteEvent,
        updateEvent,
        addNew,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
