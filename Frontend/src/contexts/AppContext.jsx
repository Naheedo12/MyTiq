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
      const token = localStorage.getItem("token");

      const eventRes = await axios.get("http://127.0.0.1:8000/api/events");
      setEvents(eventRes.data.events);

      // Tickets ADMIN seulement
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

  /* ================= USER TICKETS ================= */

  const getUserTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/tickets",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserTickets(res.data.tickets);
      return res.data.tickets;

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
    getEvents(); // admin data

    if (localStorage.getItem("token")) {
      getUserTickets(); // user data
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
        getUserTickets,
        purchaseTicket,
        downloadTicketPdf,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
