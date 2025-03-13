import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function FormResa({ event, setEventPlaces }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [places, setPlaces] = useState(1);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const updateEventPlaces = async (eventId: number, event: any) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des places");
      }

      const updatedEvent = await response.json(); 
      return updatedEvent.places_left; 
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault();
    
    // Vérification des erreurs
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }
    // if (!validateEmail(email)) {
    //   newErrors.email = "L'email n'est pas valide";
    // }
    if (places < 1) {
      newErrors.places = "Vous devez réserver au moins 1 place";
    }
    if (places > event.places_left) {
      newErrors.places = `Il ne reste que ${event.places_left} places disponibles`;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let newEvent = {
      ...event, 
      places_left: event.places_left - places
    }
  
    const newPlacesLeft = await updateEventPlaces(event.id, newEvent);
    if (newPlacesLeft !== null) {
      console.log(newPlacesLeft)
      setEventPlaces(newPlacesLeft)
    }

  
    // Mise à jour du state local pour refléter le changement
    setSuccess(true);
  
    // Réinitialiser le formulaire
    setName("");
    setEmail("");
    setPlaces(1);
  
    // Affichage temporaire du message de succès
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  // 🛒 Utilisation du hook `useLocalStorage`
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  // 🛒 Ajouter un article au panier
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Réserver des places</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Réservation effectuée avec succès !
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            // type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="places" className="block text-sm font-medium text-gray-700">Nombre de places</label>
          <input
            type="number"
            id="places"
            min="1"
            max={event.places_left}
            value={places}
            onChange={(e) => setPlaces(parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.places && <p className="text-red-500 text-sm mt-1">{errors.places}</p>}
        </div>

        <div className="mt-4">
          <button type="submit" onClick={() => addToCart({ "name": name, "email": email, "eventId": event.id, "name_activity": event.title, "places": places, "price": event.price })}>
            Ajouter au panier
          </button>
        </div>
      </form>
    </div>
  );
}