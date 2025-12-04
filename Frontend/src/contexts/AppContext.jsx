import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext=createContext();

export const AppProvider=({children})=>{

    const [events,setEvents]=useState([]);
    const [newsletter,setNewsletter]=useState([]);

const addEvent = async (formData) => {
    try {
        const token = localStorage.getItem("token");
      const res = await axios.post('http://127.0.0.1:8000/api/events', formData,{
       headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
      });
      setEvents((prev) => [...prev, res.data])
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'evenement:", err);
      alert("Impossible d'ajouter l'oeuvre.");
    }
  };

  const getEvents = async ()=>{
    try{
const event= await axios.get('http://127.0.0.1:8000/api/events');
    setEvents(event.data.events);
    }catch (err) {
      console.error("Erreur lors de l'affiche de l'evenement:", err);
      
    }
    
  }
  const addNew = async (email)=>{
    try{
const res= await axios.post('http://127.0.0.1:8000/api/newsletter/subscribe',{ email });
    setNewsletter((prev) => [...prev, res.data])
    }catch (err) {
      console.error("Erreur lors de l'affiche de l'evenement:", err);
      
    }
    
  }
  
   useEffect(() => {
    getEvents();
  }, []);

    return(
        <AppContext.Provider
      value={{ addEvent, events, addNew }}
    >
      {children}
    </AppContext.Provider>
    )
    
}