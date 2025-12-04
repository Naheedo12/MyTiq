import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext=createContext();

export const AppProvider=({children})=>{

    const [events,setEvents]=useState([]);
    const [tickets,setTickets]=useState([]);

const addEvent = async (newevent) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/events', newevent);
      setEvents((prev) => [...prev, res.data])
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'evenement:", err);
      alert("Impossible d'ajouter l'oeuvre.");
    }
  };

  const getEvent = async ()=>{
    try{
const event= await axios.get('http://127.0.0.1:8000/api/events');
    setEvents(event.data.events);
    }catch (err) {
      console.error("Erreur lors de l'affiche de l'evenement:", err);
      
    }
    
  }
   useEffect(() => {
    getEvent();
  }, []);

    return(
        <AppContext.Provider
      value={{ addEvent, events }}
    >
      {children}
    </AppContext.Provider>
    )
    
}