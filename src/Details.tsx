import { useEffect, useState } from "react";
import FormResa from "./components/FormResa";

export default function Details({ setPage, eventId }) {
    const [event, setEvent] = useState(null);
    const [eventPlaces, setEventPlaces] = useState(null);

    useEffect(() => {
        if (!eventId) return;
        
        fetch(`http://localhost:3000/events/${eventId}`)
            .then((response) => response.json())
            .then((json) => {
                setEvent(json)
                setEventPlaces(json.places_left)
            })
            .catch((error) => console.error("Erreur lors du chargement du post :", error));
    }, [eventId]);

    if (!event) return <p>Chargement...</p>;

    return (
        <div className="p-4">
            <div>
                <button className="mb-4 bg-neutral-500 text-white p-2 rounded cursor-pointer">
                    Retour
                </button>
                <h1 className="text-2xl font-bold">{event.title}</h1>
                <img src={event.image} alt={event.title} className="mt-4 w-full h-64 object-cover" />
                <p>{event.description}</p>
                <p><strong>Lieu :</strong> {event.place}</p>
                <p><strong>Date :</strong> {event.date}</p>
                <p><strong>Organisateur :</strong> {event.organizer}</p>
                <p><strong>Prix :</strong> {event.price} €</p>
                <p><strong>Places restantes :</strong> {eventPlaces}</p>
            </div>
            <div>
                <FormResa event={event} setEventPlaces={setEventPlaces}/>
            </div>
        </div>
    );
}