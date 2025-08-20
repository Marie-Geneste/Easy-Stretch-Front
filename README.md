# Easy Stretch - Frontend

Frontend de l’application **Easy Stretch**, permettant de découvrir des étirements musculaires, de gérer ses favoris, d’acheter des produits complémentaires et de suivre son profil utilisateur.

---

## Technologies
- React 18
- React Router DOM
- TailwindCSS
- Axios
- Context API (auth, favoris, panier)
- Docker / Docker Compose

---

## Fonctionnalités principales
- Page d’accueil avec **corps humain cliquable** pour accéder aux étirements par zone.
- Liste des étirements avec **barre de recherche**.
- Page de détail d’un étirement : image + description.
- Gestion des utilisateurs :
  - Inscription / Connexion
  - Profil avec édition des informations
  - Gestion des favoris
  - Historique des commandes
- E-commerce :
  - Catalogue produits (strap, huiles, baume du tigre…)
  - Panier (ajout, suppression, modification quantité)
  - Validation de commande et redirection Paypal
- Administration :
  - CRUD Étirements
  - CRUD Produits
- Formulaire de contact

---

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/Marie-Geneste/Easy-Stretch-Front.git
```

### 2. Lancement

Docker : 
```bash
docker compose up --build
```

Sans Docker :
```bash
npm install
npm start
```

Accessible sur : http://localhost:3001


---

## Structure du projet

```c#
O-STRETCH--FRONT/
 ├── public/               # Fichiers statiques
 ├── src/
 │   ├── assets/           # Images pour appli react, statique
 │   ├── components/       # Composants réutilisables
 │   ├── pages/            # Pages principales
 │   ├── App.js            # Point d'entrée principal
 │   └── index.js
 └── package.json
 ```

 ---

## Scripts disponibles

npm start → lance l’app en mode dev

npm run build → build pour la prod

npm test → exécute les tests


 ---

## Connexion au Back end

Pour que les appels API fonctionnent, s'assurer que le backend soit lancé sur http://localhost:3000.