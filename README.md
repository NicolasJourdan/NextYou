# NextYou 🚀

Une application Progressive Web App (PWA) moderne construite avec Next.js 15.

## ✨ Fonctionnalités

- **Progressive Web App (PWA)** - Installation sur l'écran d'accueil
- **Fonctionnement hors ligne** - Service Worker avec cache intelligent
- **Interface moderne** - Design responsive et accessible
- **Performance optimisée** - Chargement rapide avec cache
- **Docker ready** - Déploiement simplifié avec Docker

## 🛠️ Technologies

- **Next.js 15** - Framework React moderne
- **Docker** - Conteneurisation
- **PWA** - Service Worker et manifeste
- **ESLint + Prettier** - Qualité de code

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- Docker

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/NicolasJourdan/NextYou.git
cd NextYou

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:3001`

### Avec Docker

```bash
# Construire et démarrer avec Docker Compose
make up

# Ou directement
docker compose up -d --build
```

## 📱 Installation PWA

1. Ouvrez l'application dans Chrome/Edge
2. Cliquez sur l'icône d'installation dans la barre d'adresse
3. Ou utilisez le menu "Ajouter à l'écran d'accueil"

## 🏗️ Structure du projet

```
NextYou/
├── app/                 # App Router Next.js 13+
│   ├── layout.js       # Layout principal avec métadonnées PWA
│   ├── page.js         # Page d'accueil
│   └── globals.css     # Styles globaux
├── public/             # Assets statiques
│   ├── manifest.json   # Manifeste PWA
│   ├── sw.js          # Service Worker
│   └── icons/         # Icônes PWA
├── Dockerfile          # Configuration Docker
├── compose.yml         # Docker Compose
├── next.config.mjs     # Configuration Next.js
└── package.json        # Dépendances
```

## 🔧 Scripts disponibles

```bash
npm run dev          # Développement avec Turbopack
npm run build        # Build de production
npm run start        # Démarrer en production
npm run lint         # Vérification ESLint
npm run format       # Formatage Prettier
```

## 🐳 Commandes Docker

```bash
make dev             # Démarrer en développement
make up              # Construire et démarrer
make down            # Arrêter les conteneurs
make restart         # Redémarrer
make logs            # Voir les logs
make tty             # Accès au shell du conteneur
```

## 📦 Configuration PWA

### Manifeste (`public/manifest.json`)
- Nom et description de l'app
- Icônes pour différents écrans
- Couleurs de thème
- Mode d'affichage

### Service Worker (`public/sw.js`)
- Cache intelligent des ressources
- Fonctionnement hors ligne
- Mises à jour automatiques

## 🔒 Variables d'environnement

Créez un fichier `.env.local` :

```env
# Configuration de base
NEXT_PUBLIC_APP_NAME=NextYou
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Variables spécifiques à votre app
# NEXT_PUBLIC_API_URL=...
```

## 📈 Déploiement

### Vercel (recommandé)
1. Connectez votre repo GitHub à Vercel
2. Configuration automatique détectée
3. Déploiement automatique à chaque push

### Autres plateformes
- **Netlify** : Compatible avec Next.js
- **Railway** : Déploiement simple


## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ par Nicolas Jourdan**
