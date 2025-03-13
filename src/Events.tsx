import { useEffect, useState } from "react";
import Filter from "./components/Filter";

export default function Events({ setPage, setEventId, searchQuery }) {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filters, setFilters] = useState({
        sortByDate: 'dateAsc',
        sortByPrice: 'priceAsc',
        showOnlyAvailable: false,
        selectedPlace: ''
    });

    // Chargement des événements depuis l'API
    useEffect(() => {
        console.log("Chargement des événements...");
        fetch('http://localhost:3000/events')
            .then((response) => response.json())
            .then((json) => {
                console.log("Événements récupérés :", json);
                setEvents(json);
                setFilteredEvents(json); // Initialiser avec tous les événements
            })
            .catch((error) => console.error('Erreur:', error));
    }, []); // Se déclenche une seule fois lors du premier rendu

    // Appliquer les filtres lorsque les filtres ou les événements changent
    useEffect(() => {
        console.log("Filtrage des événements avec les filtres:", filters);
        if (events.length === 0) return; // Éviter le filtrage si aucun événement n'est chargé
        
        let newFilteredEvents = [...events];

        if (filters.selectedPlace) {
            newFilteredEvents = newFilteredEvents.filter(event => event.place === filters.selectedPlace);
            console.log("Filtrés par place :", newFilteredEvents);
        }

        if (filters.showOnlyAvailable) {
            newFilteredEvents = newFilteredEvents.filter(event => event.places_left > 0);
            console.log("Filtrés par disponibilité :", newFilteredEvents);
        }

        // Correction du tri par date en s'assurant que les dates sont correctement converties
        if (filters.sortByDate === 'dateAsc') {
            newFilteredEvents.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });
            console.log("Trié par date ascendant :", newFilteredEvents);
        } else if (filters.sortByDate === 'dateDesc') {
            newFilteredEvents.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
            console.log("Trié par date descendant :", newFilteredEvents);
        }

        if (filters.sortByPrice === 'priceAsc') {
            newFilteredEvents.sort((a, b) => a.price - b.price);
            console.log("Trié par prix ascendant :", newFilteredEvents);
        } else if (filters.sortByPrice === 'priceDesc') {
            newFilteredEvents.sort((a, b) => b.price - a.price);
            console.log("Trié par prix descendant :", newFilteredEvents);
        }

        // Mettre à jour les événements filtrés
        setFilteredEvents(newFilteredEvents);
    }, [filters, events]); // Déclenché uniquement lorsque les filtres ou les événements changent

    // Fonction pour mettre à jour les filtres
    const handleFilterChange = (newFilters) => {
        console.log("Modification des filtres:", newFilters);
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    // Appliquer la recherche dans les événements filtrés
    const searchFilteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Événements après recherche :", searchFilteredEvents);

    return (
        <div>
            <Filter 
                filters={filters}
                onFilterChange={handleFilterChange}
                events={events}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {searchFilteredEvents.length > 0 ? (
                    searchFilteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                            onClick={() => { setEventId(event.id); setPage('details'); }}
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">📅 {new Date(event.date).toLocaleDateString()} - 📍 {event.place}</p>
                                <p className="text-md font-bold text-indigo-600 mt-2">💰 {event.price} €</p>
                                <p className={`text-sm mt-1 ${event.places_left <= 0 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                                    🎟️ {event.places_left} {event.places_left <= 0 ? 'COMPLET' : 'Places restantes'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucun événement trouvé pour cette recherche.</p>
                )}
            </div>
        </div>
    );
}