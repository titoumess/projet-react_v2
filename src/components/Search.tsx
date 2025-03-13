import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Fonction qui sera appelée pour envoyer la requête de recherche
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); // Appelle la fonction pour envoyer la requête
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un événement..."
        className="w-full p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-lg hover:bg-indigo-600"
      >
        🔍
      </button>
    </div>
  );
};

export default Search;
