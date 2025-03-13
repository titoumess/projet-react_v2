import Search from "./Search"; 
import { ShoppingCart } from "lucide-react"; 
import PopupPanier from "./PopupPanier"; 
import { useState } from "react"; 

export default function Header({ setPage, setSearchQuery }) {

    // État local pour gérer l'ouverture/fermeture du modal du panier
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            {/* Conteneur principal du header */}
            <div className="container mx-auto flex items-center">
                {/* Logo du site */}
                <div>
                    <img 
                        src="/public/logo.jpeg"  
                        alt="Logo du site"  
                        className="h-10 cursor-pointer"  
                        onClick={() => setPage('events')}  
                    />
                </div>

                {/* Menu de navigation - Événements */}
                <div className="ml-4">
                    <a 
                        className="cursor-pointer text-lg"  
                        onClick={() => setPage('events')} 
                        aria-label="Voir les événements"  
                    >
                    Événements
                    </a>
                </div>

                {/* Barre de recherche centrée */}
                <div className="flex-grow flex justify-center mx-auto">
                    <Search onSearch={setSearchQuery} className="w-full max-w-2xl" />  {/* Barre de recherche avec la fonction de callback onSearch */}
                </div>

                {/* Bouton Panier avec icône */}
                <div 
                    className="cursor-pointer text-2xl hover:text-indigo-400 ml-auto"  
                    onClick={() => setIsModalOpen(true)}  
                    aria-label="Voir le panier"  
                >
                <ShoppingCart size={24} className="text-white hover:text-indigo-400 transition-colors duration-200" />  {/* Icône de panier */}
                {/* Affichage du modal de panier */}
                <PopupPanier isOpen={isModalOpen} setIsOpen={setIsModalOpen} />  {/* Modal du panier qui reçoit l'état isOpen */}
                </div>
            </div>
        </header>
    );
}
