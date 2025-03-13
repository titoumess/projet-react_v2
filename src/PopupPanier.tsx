
import { useState, useEffect } from "react";


export default function PopupPanier({ isOpen, setIsOpen }) {

    const [ cartItems, setCartItems ] = useState([]);

    /*const cartData = localStorage.getItem("cart"); // Récupère la donnée
    const cartItems = cartData ? JSON.parse(cartData) : []; // Convertit en objet ou tableau*/


    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
              setCartItems(JSON.parse(savedCart)); // Met à jour l'état avec les données stockées
              console.log("les données mémorisés sont: " , savedCart); // Affiche les objets du panier
            }
        }, []); // S'exécute une seule fois au chargement du composant



    return (
      <>
        {isOpen && (
          <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setIsOpen(false)}>X</button>
              <h2>Votre panier</h2>
  
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <span>{item.name_activity}</span> - <span>{item.price}X{item.places} €</span> = <strong>{item.price*item.places} €</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Votre panier est vide.</p>
              )}

              <button className="checkout-button">Valider la commande</button>
            </div>
          </div>
        )}
      </>
    );
  }