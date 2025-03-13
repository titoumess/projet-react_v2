import { useState } from "react";
import Search from "./Search";
import PopupPanier from "../PopupPanier";


export default function Header({ cartitems, setPage, setSearchQuery }) {

    /*const [cartItems, setCartItems] = useState([
        { name: "Concert Jazz", price: 25 },
        { name: "Théâtre Impro", price: 18 },
      ]);*/

    
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            <div className="container mx-auto flex items-center">
                {/* Logo */}
                <div>
                    <img 
                        src="/public/logo_test.png" 
                        alt="Logo du site" 
                        className="h-10 cursor-pointer"
                        onClick={() => setPage('events')}
                    />
                </div>

                {/* Menu de navigation */}
                <div className="ml-4">
                    <a 
                        className="cursor-pointer text-lg"
                        onClick={() => setPage('events')}
                        aria-label="Voir les événements"
                    >
                        Événements
                    </a>
                </div>

                {/* Barre de recherche centrée sur toute la largeur */}
                <div className="flex-grow flex justify-center mx-auto">
                    <Search onSearch={setSearchQuery} className="w-full max-w-2xl" />
                </div>

                {/* Bouton Panier (logo) */}
                <div 
                    className="cursor-pointer text-2xl hover:text-indigo-400 ml-auto"
                    onClick={() => setIsModalOpen(true)} 
                    aria-label="Voir le panier"
                >
                    🛒
                {/* Modal du panier */}
                <PopupPanier isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
                </div>
            </div>
        </header>
    );
}
