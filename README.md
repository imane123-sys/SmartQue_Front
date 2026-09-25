# 🎟️ SmartQueue - Frontend

<p align="center">
  <img src="public/favicon.svg" alt="SmartQueue Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>Plateforme intelligente de gestion de files d'attente et de billetterie virtuelle</strong><br>
  <em>Ne perdez plus votre temps dans les files d'attente.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-v7-CA4245?logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/WebSocket-STOMP-010101?logo=socketdotio&logoColor=white" alt="STOMP WebSocket" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## 📌 Présentation

**SmartQueue** est une solution web moderne conçue pour révolutionner l'expérience d'attente dans les établissements recevant du public (cliniques, banques, administrations, agences de services, commerces). 

L'application permet aux usagers d'obtenir un ticket numérique à distance, de suivre leur progression en temps réel sur smartphone avec un QR Code de validation, et de recevoir des alertes instantanées lorsque leur tour approche. Elle fournit également aux gestionnaires d'établissements et aux administrateurs des outils d'orchestration de guichets et d'analyse de flux en direct.

---

## ✨ Fonctionnalités Clés

### 👤 Espace Client (Usager)
* **Recherche géolocalisée de services** : Localisation des établissements les plus proches proposant le service recherché grâce à l'API de géolocalisation (`navigator.geolocation`).
* **Réservation de ticket en ligne** : Prise de ticket dématérialisé en quelques clics sans attente physique.
* **e-Ticket avec QR Code instantané** : Génération d'un ticket digital complet avec statut, position dans la file, temps d'attente estimé et QR Code de validation au guichet.
* **Suivi de position en temps réel** : Actualisation dynamique de la file d'attente et estimation intelligente du temps restant.
* **Notifications interactives en direct** : Réception d'alertes instantanées par WebSocket (confirmation de prise de ticket, notification d'approche, invitation à se présenter au guichet).

### 🏢 Espace Établissement (Guichetiers & Gestionnaires)
* **Tableau de bord opérationnel** : Visualisation globale des files actives, tickets servis, tickets en cours et en attente.
* **Appel au guichet** : Appel du ticket suivant en un clic avec notification instantanée envoyée au client.
* **Prise en charge Walk-in & Guichet** : Modal rapide pour insérer des clients se présentant sur place.
* **Gestion des services** : Ajout, modification, activation et paramétrage des services offerts par l'établissement.
* **Statistiques & Métriques** : Suivi des performances d'accueil, temps moyen de traitement et affluence journalière.

### 🛡️ Espace Administration (Super Admin)
* **Vue panoramique globale** : Surveillance des indicateurs clés (nombre d'établissements, services actifs, utilisateurs enregistrés et tickets traités).
* **Gestion des établissements** : Création, modération et suivi des structures partenaires.
* **Gestion des utilisateurs & rôles** : Supervision des comptes clients, établissements et agents.
* **Audit et historique des tickets** : Consultation centralisée des flux de tickets à l'échelle de la plateforme.

### 🔒 Sécurité & Contrôle d'Accès
* **Authentification JWT** : Connexion sécurisée avec décodeur de jetons et stockage local.
* **Protection des routes (`RoleGuard`)** : Cloisonnement strict des accès par rôles (`CLIENT`, `ETABLISSEMENT`, `ADMIN`).
* **Intercepteurs Axios** : Injection automatique des tokens `Bearer` et gestion centralisée des erreurs HTTP (401, 403, 404, 500, erreurs réseau).

---

## 🛠️ Stack Technique

| Domaine | Technologies & Bibliothèques |
| :--- | :--- |
| **Framework & Build** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/) |
| **Routage** | [React Router DOM v7](https://reactrouter.com/) |
| **Temps Réel & Réseau** | [Axios](https://axios-http.com/), [@stomp/stompjs](https://stomp-js.github.io/) (WebSockets STOMP) |
| **UI & Composants** | [Lucide React](https://lucide.dev/), [MUI Material](https://mui.com/), [Emotion](https://emotion.sh/) |
| **Formulaires & Validation** | [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup) |
| **Utilitaires** | [qrcode.react](https://github.com/zpao/qrcode.react), [jwt-decode](https://github.com/auth0/jwt-decode) |
| **Qualité de code** | [ESLint 10](https://eslint.org/) |
| **Conteneurisation** | [Docker](https://www.docker.com/) (Build multi-stage avec [Nginx](https://nginx.org/)) |
| **CI/CD** | GitHub Actions |

---

## 📂 Structure du Projet

```text
smartqueue_front/
├── github/
│   └── workflows/
│       └── ci.yml               # Pipeline d'intégration continue GitHub Actions
├── public/                      # Ressources statiques publiques (favicons, icônes)
├── src/
│   ├── Api/                     # Couche de communication API REST & WebSockets
│   │   ├── AuthService.js       # Authentification (login / register)
│   │   ├── Client.js            # Endpoints gestion des clients
│   │   ├── Connexion.js         # Instance Axios configurée + Intercepteurs
│   │   ├── Etablissement.js     # Endpoints gestion des établissements
│   │   ├── Notification.js      # Endpoints et gestion des notifications
│   │   ├── Service.js           # Endpoints gestion des services
│   │   └── Ticket.js            # Endpoints réservation et cycle de vie des tickets
│   ├── assets/                  # Images, illustrations et assets multimédias
│   ├── Components/              # Composants React modulaires
│   │   ├── admin/               # Dashboards et modules d'administration
│   │   ├── clients/             # Tableaux de bord et vues pour les clients
│   │   ├── etablissement/       # Espace gestionnaire d'établissement et guichets
│   │   ├── landing_v2/          # Landing page moderne et sections de présentation
│   │   ├── notifications/       # Composant cloche de notifications en temps réel
│   │   ├── NotFound/            # Page d'erreur 404
│   │   ├── route_guard/         # Gardes de routes privées et basées sur les rôles
│   │   ├── SearchSection/       # Recherche géolocalisée d'établissements
│   │   ├── services/            # Composants de consultation des services
│   │   ├── tickets/             # Gestion et affichage du ticket virtuel (QR Code)
│   │   ├── AuthContext.jsx      # Contexte d'authentification global
│   │   ├── Login.jsx            # Formulaire de connexion
│   │   ├── RegisterClient.jsx   # Inscription pour les usagers
│   │   └── RegisterEtablissement.jsx # Demande d'adhésion pour les établissements
│   ├── css/                     # Feuilles de styles partagées & Design System
│   ├── App.jsx                  # Déclaration des routes et arborescence principale
│   ├── index.css                # Styles globaux et typographies
│   └── main.jsx                 # Point d'entrée de l'application React
├── Dockerfile                   # Fichier Docker multi-étape (Node build -> Nginx)
├── index.html                   # Document HTML racine
├── package.json                 # Dépendances et scripts npm
├── vite.config.js               # Configuration du bundler Vite
└── README.md                    # Documentation du projet
```

---

## 🚀 Démarrage Rapide

### Prérequis
* [Node.js](https://nodejs.org/) (version **20.x** ou supérieure recommandée)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* Backend SmartQueue opérationnel (par défaut sur `http://localhost:8080`)

### 1. Cloner le projet
```bash
git clone https://github.com/imane123-sys/SmartQue_Front.git
cd SmartQue_Front
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible par défaut sur `http://localhost:5173`.

---

## ⚙️ Configuration Réseau

Par défaut, le client Axios et le broker WebSocket pointent vers le serveur local :

| Service | Protocole | Adresse par défaut | Fichier source |
| :--- | :--- | :--- | :--- |
| **API REST** | HTTP / HTTPS | `http://localhost:8080` | [src/Api/Connexion.js](file:///C:/Users/RM/Desktop/smartqueue_front/src/Api/Connexion.js) |
| **WebSocket (STOMP)** | WS / WSS | `ws://localhost:8080/ws` | [src/Components/notifications/NotificationBell.jsx](file:///C:/Users/RM/Desktop/smartqueue_front/src/Components/notifications/NotificationBell.jsx) |

> [!TIP]
> Pour un déploiement en production, assurez-vous d'adapter ces URLs ou d'utiliser un proxy inverse Nginx pour relayer les requêtes `/api` et `/ws` vers votre backend.

---

## 📜 Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

* `npm run dev` : Démarre le serveur local de développement Vite avec Hot Module Replacement (HMR).
* `npm run build` : Compile et optimise l'application pour la production dans le dossier `dist/`.
* `npm run preview` : Prévisualise localement le build de production généré.
* `npm run lint` : Exécute ESLint pour vérifier la conformité du code et détecter les anomalies.

---

## 🐳 Déploiement avec Docker

Un [Dockerfile](file:///C:/Users/RM/Desktop/smartqueue_front/Dockerfile) optimisé en multi-stage build est inclus pour générer une image légère servie par Nginx.

### Construire l'image Docker
```bash
docker build -t smartqueue-frontend .
```

### Lancer le conteneur
```bash
docker run -d -p 3000:80 --name smartqueue-frontend smartqueue-frontend
```
L'application est ensuite accessible sur `http://localhost:3000`.

---

## 🔄 Intégration Continue (CI)

Le projet intègre un flux GitHub Actions automatisé ([github/workflows/ci.yml](file:///C:/Users/RM/Desktop/smartqueue_front/github/workflows/ci.yml)) qui s'exécute à chaque push pour :
1. Préparer l'environnement sous Node.js 20.
2. Installer les dépendances avec `npm install`.
3. Vérifier que la compilation de production réussit avec `npm run build`.

---

## 👥 Auteur & Contribution

* **Projet développé par** : [imane123-sys](https://github.com/imane123-sys)
* Les contributions, suggestions et signalements d'anomalies sont les bienvenus via les *Issues* et *Pull Requests* du dépôt.

---

## 📄 Licence

Ce projet est sous licence MIT. Pour plus d'informations, veuillez consulter le fichier de licence du dépôt.
