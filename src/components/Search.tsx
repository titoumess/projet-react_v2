import { useState } from "react";  
import { Search as SearchIcon } from "lucide-react"; 

// Définition du type des props pour le composant Search
interface SearchProps {
  onSearch: (query: string) => void;  
}

// Composant fonctionnel Search
const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");  
  
  // Fonction qui est appelée pour envoyer la requête de recherche
  const handleSearch = () => {
    onSearch(query);  
  };

  // Fonction qui gère l'événement de la touche "Enter" dans le champ de recherche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {  // Si la touche pressée est "Enter"
      handleSearch();  // Lance la recherche
    }
  };

  return (
    
    <div className="relative w-full max-w-md">  {/* Conteneur du champ de recherche */}
      {/* Champ de texte pour saisir la requête de recherche */}
      <input
        type="text"
        value={query}  // La valeur de l'input est liée à l'état query
        onChange={(e) => setQuery(e.target.value)}  
        onKeyDown={handleKeyDown}  // Gestion de la touche "Enter"
        placeholder="Rechercher un événement..."  // Texte affiché lorsque le champ est vide
        className="w-full p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"  
      />
      
      {/* Bouton de recherche */}
      <button
        onClick={handleSearch}  // Lorsqu'on clique sur le bouton, on lance la recherche
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-lg hover:bg-gray-700"  
      >
        <SearchIcon size={20} />  
      </button>
    </div>
  );
};

export default Search;
