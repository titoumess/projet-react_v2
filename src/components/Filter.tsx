import { useMemo } from "react";

export default function Filter({ events, onFilterChange, filters }) {
    // Utilisation de useMemo pour éviter les recalculs inutiles des lieux uniques
    const uniquePlaces = useMemo(() => {
        return Array.from(new Set(events?.map(event => event.place))).sort();
    }, [events]);

    const handleSortByDateChange = (e) => {
        onFilterChange({ sortByDate: e.target.value });
    };

    const handleSortByPriceChange = (e) => {
        onFilterChange({ sortByPrice: e.target.value });
    };

    const handleShowOnlyAvailableChange = (e) => {
        onFilterChange({ showOnlyAvailable: e.target.checked });
    };

    const handleSelectedPlaceChange = (e) => {
        onFilterChange({ selectedPlace: e.target.value });
    };

    return (
        <div className="bg-white shadow-md rounded-lg px-6 py-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrer les événements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Trier par date */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trier par date</label>
                    <select
                        value={filters.sortByDate}
                        onChange={handleSortByDateChange}
                        className="p-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                        <option value="dateAsc">Date croissante</option>
                        <option value="dateDesc">Date décroissante</option>
                    </select>
                </div>
                
                {/* Trier par prix */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trier par prix</label>
                    <select
                        value={filters.sortByPrice}
                        onChange={handleSortByPriceChange}
                        className="p-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                        <option value="priceAsc">Prix croissant</option>
                        <option value="priceDesc">Prix décroissant</option>
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
                
                {/* Ne pas afficher les événements complets */}
                <div className="flex items-center self-end h-10">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.showOnlyAvailable}
                            onChange={handleShowOnlyAvailableChange}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Masquer les événements complets</span>
                    </label>
                </div>
            </div>
        </div>
    );
}