import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour synchroniser un état avec localStorage
 * @param {string} key - La clé utilisée dans localStorage
 * @param {any} initialValue - Valeur initiale si aucune donnée n'est trouvée
 * @returns [state, setState] - État et fonction de mise à jour
 */
export function useLocalStorage(key, initialValue) {
    
  // 1️⃣ Charger la valeur depuis localStorage au montage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erreur lors du chargement de localStorage:", error);
      return initialValue;
    }
  });

  // 2️⃣ Sauvegarder dans localStorage à chaque mise à jour de `storedValue`
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans localStorage:", error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
}