import { useMemo } from "react";

export default function Filter({ events, onFilterChange, filters, categories }) {
    // Utilisation de useMemo pour éviter les recalculs inutiles des lieux uniques
    const uniquePlaces = useMemo(() => {
        return Array.from(new Set(events?.map(event => event.place))).sort();
    }, [events]);

    const handleSortChange = (e) => {
        onFilterChange({ sort: e.target.value });
    };

    const handleShowOnlyAvailableChange = (e) => {
        onFilterChange({ showOnlyAvailable: e.target.checked });
    };

    const handleSelectedPlaceChange = (e) => {
        onFilterChange({ selectedPlace: e.target.value });
    };

    const handleCategoryChange = (e) => {
        onFilterChange({ selectedCategory: e.target.value });
    };

    // Fonction pour réinitialiser tous les filtres
    const handleResetFilters = () => {
        onFilterChange({
            sort: '',
            showOnlyAvailable: false,
            selectedPlace: '',
            selectedCategory: ''
        });
    };

    // Vérifier si des filtres sont actifs
    const areFiltersActive = filters.sort !== '' || 
                            filters.showOnlyAvailable || 
                            filters.selectedPlace !== '' || 
                            filters.selectedCategory !== '';

    return (
        <div className="bg-white shadow-md rounded-lg px-6 py-4 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filtrer les événements</h3>
                
                {/* Bouton de réinitialisation des filtres */}
                {areFiltersActive && (
                    <button
                        onClick={handleResetFilters}
                        className="flex items-center text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Réinitialiser les filtres
                    </button>
                )}
            </div>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Trier par prix et date */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trier</label>
                    <select
                        value={filters.sort}
                        onChange={handleSortChange}
                        className="p-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                        <option value="">Aucun tri</option>
                        <option value="priceAsc">Prix croissant</option>
                        <option value="priceDesc">Prix décroissant</option>
                        <option value="dateAsc">Date croissante</option>
                        <option value="dateDesc">Date décroissante</option>
                    </select>
                </div>
               
                {/* Sélectionner un lieu */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                    <select
                        value={filters.selectedPlace}
                        onChange={handleSelectedPlaceChange}
                        className="p-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                        <option value="">Tous les lieux</option>
                        {uniquePlaces.map((place, index) => (
                            <option key={index} value={place}>{place}</option>
                        ))}
                    </select>
                </div>

                {/* Filtre par catégorie */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <select
                        value={filters.selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
               
                {/* Ne pas afficher les événements complets */}
                <div className="flex items-center h-10">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.showOnlyAvailable}
                            onChange={handleShowOnlyAvailableChange}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-grey-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Masquer les événements complets</span>
                    </label>
                </div>
            </div>
        </div>
    );
}