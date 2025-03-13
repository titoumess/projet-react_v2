# Plateforme de Réservation d'Événements

## Description du projet
Cette plateforme permet aux utilisateurs de découvrir et de réserver des événements (concerts, conférences, ateliers, etc.). Elle offre une expérience fluide et intuitive grâce à une interface moderne et responsive.

## Fonctionnalités implémentées
### Page d’accueil :
- Affichage des événements sous forme de cartes avec image, titre, date, lieu et prix.
- Filtres dynamiques permettant de trier les événements par date, catégorie et prix.
- Recherche par mot-clé.

### Page détaillée d’un événement :
- Affichage des informations complètes de l’événement (image, description, lieu, date, organisateur).
- Réservation de billets via un formulaire dynamique avec validation des champs.
- Vérification du nombre de places disponibles avant validation.

### Gestion du panier :
- Affichage des réservations avec le récapitulatif des événements sélectionnés.
- Possibilité de modifier le nombre de places ou de supprimer une réservation.
- Calcul dynamique du total des réservations.

### Persistance des données :
- Sauvegarde des réservations dans le Local Storage.
- Récupération des données lors de la prochaine visite.

### UI/UX :
- Interface claire et ergonomique.
- Design responsive compatible avec mobiles et tablettes.

## Choix techniques
### Technologies utilisées :
- **React + TypeScript** : Développement de l'interface utilisateur avec typage sécurisé.
- **Vite** : Outil de build rapide pour optimiser le développement React.
- **Lucide React** : Bibliothèque d'icônes modernes et épurées.
- **Tailwind CSS** : Framework CSS pour un design rapide et responsive.
- **JSON-Server** : API mock pour simuler un backend et gérer les données d'événements.
- **Local Storage** : Stockage des réservations pour la persistance des données.

### Organisation du projet :
- **Dossier `components/`** : Contient tous les composants réutilisables.
- **Pages structurées** : Séparation des pages (`Home.tsx`, `EventDetails.tsx`, `Cart.tsx`).
- **Gestion des états via hooks** (`useState`, `useEffect`, etc.).
- **Simulation d'une API REST avec `JSON-Server`**.

## Installation et utilisation
1. Décompresser le .zip :
   ```bash
   cd <nom_du_projet>
2. Installer les dépendances :
   ```bash
   npm install
3. Démarrer le serveur JSON (si utilisé) :
   ```bash
    npx json-server api/db.json --static ./public

4. Lancer l’application en mode développement :
   ```bash
   npm run dev

## Base de données (JSON-Server)

Nous utilisons **JSON-Server** pour simuler un backend et gérer les données des événements.  
Le fichier `db.json` est situé dans le dossier `api/`.

### Structure de la base de données
Le fichier `db.json` contient deux collections principales :

1. **`events`** : Stocke la liste des événements disponibles.
2. **`category`** : Définit les différentes catégories d'événements.

### Exemple de données (`db.json`)
```json
{
  "events": [
    {
      "id": "1",
      "title": "Concert en plein air",
      "description": "Magnifique concert en plein air sur la place du château de Chambord",
      "date": "25/02/2025",
      "place": "Château de Chambord",
      "price": 12,
      "image": "chambord_concert.jpeg",
      "organizer": "Ville de Chambord",
      "category_id": 1,
      "places_left": 16
    },
    {
      "id": "2",
      "title": "Silent Disco en pleine nature",
      "description": "Dansez sous les étoiles avec votre casque audio, ambiance garantie !",
      "date": "15/03/2025",
      "place": "Forêt de Fontainebleau",
      "price": 15,
      "image": "silent_disco.jpeg",
      "organizer": "NightVibes",
      "category_id": 1,
      "places_left": 74
    }
  ],
  "category": [
    {
      "id": "1",
      "name": "Musique"
    },
    {
      "id": "2",
      "name": "Sport"
    },
    {
      "id": "3",
      "name": "Jeux"
    }
  ]
}
```



## Auteurs
Projet réalisé par **TOULLEC Alexis, MESSAGER Titouan et PONCHAUT Léane** dans le cadre d’un travail collaboratif.



