// src/components/EventTable.jsx

import React, { useState, useContext } from "react";
import AddEvent from "./AddEvent";
import ModifEventTable from "./ModifEventTable"; 
import { AppContext } from "../contexts/AppContext";
import { Plus } from "lucide-react"; 

export default function EventTable() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null); 
    const [editedEventData, setEditedEventData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); 

    const { events, deleteEvent, updateEvent } = useContext(AppContext); 

    // 🛑 LOGIQUE DE COULEUR POUR LES STATUTS 🛑
    const getStatusColor = (status) => {
        const s = status ? status.toLowerCase() : "";
        switch (s) {
            case "active":
                return "bg-green-100 text-green-800 border border-green-200";
            case "completed":
                return "bg-gray-100 text-gray-800 border border-gray-200";
            case "canceled":
                return "bg-red-100 text-red-800 border border-red-200";
            default:
                return "bg-blue-50 text-blue-800 border border-blue-200";
        }
    };

    const handleAddEventClick = () => {
        setEditingEventId(null); 
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            deleteEvent(id); 
        }
    };

    const handleEdit = (event) => {
        if (event && event.id) {
            setEditingEventId(event.id);
            setEditedEventData(event); 
        } else {
            setEditingEventId(null);
            setEditedEventData(null);
        }
        setIsFormVisible(false); 
    };

    const handleInlineChange = (name, value) => {
        setEditedEventData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 🛑 LOGIQUE DE SAUVEGARDE 🛑
    const handleSaveInline = async () => {
        if (!editingEventId || !editedEventData) return;

        const formData = new FormData();
        
        const currentEvent = events.find(e => e.id === editingEventId);
        const dataToSend = { ...currentEvent, ...editedEventData };


        Object.keys(dataToSend).forEach(key => {
            const value = dataToSend[key];
            
            if (key === 'id') return;

            // Exclusion des chaînes d'URL d'image et des objets non-fichiers
            if (key === 'image_path' && typeof value === 'string') return; 
            if (typeof value === 'object' && value !== null && !(value instanceof File)) return; 

            // Append seulement si la valeur n'est ni null, ni undefined
            if (value !== null && value !== undefined) {
                 formData.append(key, value);
            }
        });
        
        try {
            await updateEvent(editingEventId, formData); 
            
            setEditingEventId(null);
            setEditedEventData(null);

            setSuccessMessage("La modification a été effectuée avec succès.");
            setTimeout(() => setSuccessMessage(null), 4000); 

        } catch (error) {
            console.error("Erreur détaillée lors de la sauvegarde:", error.response?.data || error.message);
            
            const validationErrors = error.response?.data?.errors;
            const statusError = validationErrors?.status?.[0]; 
            
            const errorMessage = statusError || error.response?.data?.message || "Échec de la sauvegarde de l'événement.";
            alert(`${errorMessage} Veuillez vérifier la console (F12) pour les détails de validation.`); 
        }
    };

    if (isFormVisible) {
        return <AddEvent onClose={handleCloseForm} />;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Succès de l'opération</p>
                    <p>{successMessage}</p>
                </div>
            )}
            
            <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Gestion des Événements
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Gérez vos conférences, ateliers et soirées.
                    </p>
                </div>

                <button
                    onClick={handleAddEventClick}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter Événement
                </button>
            </div>

            <ModifEventTable
                events={events} 
                handleDelete={handleDelete} 
                getStatusColor={getStatusColor} 
                
                editingEventId={editingEventId}
                editedEventData={editedEventData}
                handleEdit={handleEdit} 
                handleSaveInline={handleSaveInline} 
                handleInlineChange={handleInlineChange} 
            />
        </div>
    );
}