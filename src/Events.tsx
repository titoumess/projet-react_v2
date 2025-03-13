import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { Calendar, MapPin, DollarSign, Ticket } from "lucide-react";

export default function Events({ setPage, setEventId, searchQuery }) {
    // Défintion des états
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filters, setFilters] = useState({
        sort: '',
        showOnlyAvailable: false,
        selectedPlace: '',
        selectedCategory: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    // Fonction pour convertir la date du format "DD/MM/YYYY" en objet Date
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Chargement des événements et des catégories depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Appels pour récupérer les événements et les catégories
                const [eventsResponse, categoriesResponse] = await Promise.all([
                    fetch('http://localhost:3000/events'),
                    fetch('http://localhost:3000/category')
                ]);

                // Vérification de la validité des réponses
                if (!eventsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('Erreur lors du chargement des données');
                }

                // Parsing des données JSON des réponses
                const eventsData = await eventsResponse.json();
                const categoriesData = await categoriesResponse.json();

                // Mise à jour des états avec les données récupérées
                setEvents(eventsData);
                setFilteredEvents(eventsData); 
                setCategories(categoriesData); 
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        // Appel de la fonction de récupération des données
        fetchData();
    }, []); 

    // Filtrage des événements en fonction des critères de filtre
    useEffect(() => {
        if (events.length === 0) return;
    
        let newFilteredEvents = [...events];
    
        // Application des filtres de place, de catégorie et de disponibilité
        if (filters.selectedPlace) {
            newFilteredEvents = newFilteredEvents.filter(event => event.place === filters.selectedPlace);
        }
        
        // Filtre par catégorie
        if (filters.selectedCategory) {
            newFilteredEvents = newFilteredEvents.filter(event => 
                event.category_id.toString() === filters.selectedCategory
            );
        }
        // Affiche uniquement les événements disponibles
        if (filters.showOnlyAvailable) {
            newFilteredEvents = newFilteredEvents.filter(event => event.places_left > 0);
        }
    
        // Trie par date ou par prix   
        newFilteredEvents.sort((a, b) => {
            const dateA = parseDate(a.date).getTime();
            const dateB = parseDate(b.date).getTime();
    
            if (filters.sort === 'dateAsc') {
                if (dateA !== dateB) return dateA - dateB;
            } else if (filters.sort === 'dateDesc') {
                if (dateA !== dateB) return dateB - dateA;
            } else if (filters.sort === 'priceAsc') {
                return a.price - b.price;
            } else if (filters.sort === 'priceDesc') {
                return b.price - a.price;
            }
    
            return 0; 
        });
    
        setFilteredEvents(newFilteredEvents);
        setCurrentPage(1); // Réinitialiser la page à 1 après un changement de filtre
    }, [filters, events]); // Se déclenche lorsque les filtres ou les événements changent

    // Fonction pour mettre à jour les filtres
    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    // Appliquer la recherche dans les événements filtrés
    const searchFilteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginer les événements filtrés et recherchés
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = searchFilteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(searchFilteredEvents.length / eventsPerPage);

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction pour aller à la page suivante
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Fonction pour aller à la page précédente
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Formater la date pour l'affichage
    const formatDateForDisplay = (dateStr) => {
        return dateStr;
    };

    // Trouver le nom de la catégorie à partir de l'ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id.toString() === categoryId.toString());
        return category ? category.name : '';
    };

    return (
        <div>
            {/* Composant Filter pour gérer les filtres de recherche */}
            <Filter 
                filters={filters}  // Passage des filtres actuels à Filter
                onFilterChange={handleFilterChange}  // Fonction de mise à jour des filtres
                events={events}  // Liste des événements pour filtrage
                categories={categories}  // Liste des catégories pour filtrage
            />
    
            {/* Affichage des événements sous forme de grille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {currentEvents.length > 0 ? (
                    // Si des événements sont disponibles, on les affiche dans une grille
                    currentEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                            onClick={() => { setEventId(event.id); setPage('details'); }} // Lors du clic, on affiche les détails de l'événement
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                {/* Titre de l'événement */}
                                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                                {/* Informations sur la date et le lieu */}
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{formatDateForDisplay(event.date)}</span>
                                    <span className="mx-1">-</span>
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{event.place}</span>
                                </div>
                                {/* Affichage du prix et de la catégorie */}
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center text-md font-bold text-blue-600">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        <span>{event.price} €</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                        {getCategoryName(event.category_id)} {/* Nom de la catégorie */}
                                    </span>
                                </div>
                                {/* Affichage de la disponibilité des places */}
                                <div className={`flex items-center text-sm mt-2 ${event.places_left <= 0 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                                    <Ticket className="h-4 w-4 mr-1" />
                                    <span>{event.places_left <= 0 ? 'COMPLET' : `${event.places_left} Places restantes`}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Si aucun événement n'est trouvé
                    <p className="text-center text-gray-500 col-span-full">Aucun événement trouvé pour cette recherche.</p>
                )}
            </div>
    
            {/* Section de pagination */}
            {searchFilteredEvents.length > 0 && (
                <div className="flex justify-center items-center space-x-3 my-8">
                    {/* Bouton précédent pour changer de page */}
                    <button 
                        onClick={goToPrevPage} 
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Précédent
                    </button>
                    
                    {/* Affichage des boutons de pages */}
                    <div className="flex space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}  // Changement de page au clic
                                className={`w-10 h-10 rounded-full transition-colors duration-200 ${currentPage === index + 1 
                                    ? 'bg-black text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
    
                    {/* Bouton suivant pour changer de page */}
                    <button 
                        onClick={goToNextPage} 
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}    
