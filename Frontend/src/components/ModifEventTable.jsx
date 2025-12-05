// src/components/ModifEventTable.jsx

import React from "react";
import { Edit, Save, X, Trash2 } from "lucide-react"; 

function ModifEventTable({ 
    events, 
    handleEdit,          
    handleDelete, 
    getStatusColor,
    editingEventId,      
    editedEventData,     
    handleSaveInline,    
    handleInlineChange   
}) {
    
    // Nouveaux statuts pour la validation
    const acceptedStatuses = ['active', 'canceled', 'completed'];

    const isEditing = (eventId) => eventId === editingEventId;

    // Fonction utilitaire pour le rendu des cellules (avec ou sans mode édition)
    const renderCell = (event, fieldName, type = 'text') => {
        if (!event) return null; 

        if (isEditing(event.id)) {
            return (
                <input
                    type={type}
                    name={fieldName}
                    // Assurer que la valeur est bien le dernier état édité ou la valeur originale
                    value={(editedEventData ? editedEventData[fieldName] : event[fieldName]) || ""} 
                    onChange={(e) => handleInlineChange(fieldName, e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            );
        }
        // Affichage en mode non-édition
        if (fieldName === 'price') {
             return `${event[fieldName]} MAD`; // Ajout de la devise
        }
        return event[fieldName];
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Titre</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lieu</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Capacité</th>
                        {/* 🆕 AJOUT DE LA COLONNE PRIX 🆕 */}
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prix</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {events && events.length > 0 ? (
                        events.filter(event => event).map((event) => ( 
                            <tr 
                                key={event.id} 
                                className={`transition-colors ${isEditing(event.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                            >
                                {/* Colonnes de données (Titre, Date, Lieu) */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 mr-3">
                                            <img 
                                                src={event.image_path || "https://placehold.co/100"} 
                                                alt={event.title} 
                                                className="h-full w-full object-cover" 
                                                onError={(e) => (e.target.src = "https://placehold.co/100?text=IMG")}
                                            />
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {renderCell(event, 'title')}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(renderCell(event, 'date', 'date')).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {renderCell(event, 'location')}
                                </td>
                                
                                {/* Colonne Capacité */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {isEditing(event.id) ? (
                                        <div className="flex items-center gap-1">
                                            {renderCell(event, 'capacity', 'number')} places
                                        </div>
                                    ) : (
                                        <span className="font-medium">{event.capacity}</span>
                                    )}
                                </td>
                                
                                {/* 🆕 Colonne Prix 🆕 */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {isEditing(event.id) ? (
                                        <div className="flex items-center gap-1">
                                            {renderCell(event, 'price', 'number')} MAD
                                        </div>
                                    ) : (
                                        <span className="font-medium">{event.price} MAD</span>
                                    )}
                                </td>
                                
                                {/* Colonne Statut */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {isEditing(event.id) ? (
                                        <select
                                            name="status"
                                            value={editedEventData?.status || event.status || acceptedStatuses[0]}
                                            onChange={(e) => handleInlineChange('status', e.target.value)}
                                            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500 capitalize"
                                        >
                                            {acceptedStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                                            {event.status || "Indéfini"}
                                        </span>
                                    )}
                                </td>
                                
                                {/* Colonne Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        {isEditing(event.id) ? (
                                            <>
                                                <button 
                                                    onClick={handleSaveInline} 
                                                    type="button" 
                                                    className="text-green-600 hover:text-green-900 transition-colors p-1 rounded hover:bg-green-100" 
                                                    title="Sauvegarder">
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleEdit(null)} 
                                                    type="button" 
                                                    className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded hover:bg-gray-100" 
                                                    title="Annuler">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={() => handleEdit(event)} 
                                                    type="button" 
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded hover:bg-indigo-50" 
                                                    title="Modifier">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    type="button" 
                                                    className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                {events ? "Aucun événement trouvé." : "Chargement des événements..."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ModifEventTable;