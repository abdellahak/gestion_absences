# 📚 Système de Gestion des Absences

Un système de gestion des absences moderne et complet pour les établissements de formation, développé avec Laravel et React.

## 🎯 Description

Ce système permet une gestion efficace des absences des stagiaires dans un établissement de formation. Il offre différents niveaux d'accès selon les rôles (stagiaires, formateurs, surveillants généraux) et facilite le suivi des absences, leur justification et leur validation.

## ✨ Fonctionnalités Principales

### 👨‍🎓 Pour les Stagiaires

- Consultation de leurs absences
- Soumission de justifications d'absence
- Upload de documents justificatifs (PDF, images)
- Suivi du statut des justifications

### 👨‍🏫 Pour les Formateurs

- Enregistrement des absences en temps réel
- Consultation des absences par groupe
- Gestion des stagiaires de leurs groupes
- Export et statistiques des absences

### 👨‍💼 Pour les Surveillants Généraux

- Validation/refus des justifications
- Vue d'ensemble de toutes les absences
- Gestion des avertissements
- Administration des utilisateurs et groupes

### 🔧 Fonctionnalités Techniques

- Interface responsive et moderne
- Import/export Excel des données
- Système de notifications
- Recherche et filtrage avancés
- Authentification sécurisée avec Sanctum

## 🛠️ Technologies Utilisées

### Backend

- **Laravel 12** - Framework PHP moderne
- **MySQL** - Base de données relationnelle
- **Laravel Sanctum** - Authentification API
- **Laravel Excel** - Import/export de données

### Frontend

- **React 19** - Bibliothèque UI moderne
- **Vite** - Build tool performant
- **TailwindCSS** - Framework CSS utilitaire
- **Redux Toolkit** - Gestion d'état
- **React Router** - Navigation
- **Axios** - Client HTTP
- **React Icons** - Icônes

## 📋 Prérequis

- **PHP** ≥ 8.2
- **Node.js** ≥ 18
- **MySQL** ≥ 8.0
- **Composer**
- **npm** ou **yarn**

## 🚀 Installation

### 1. Cloner le Projet

```bash
git clone <repository-url>
cd "Gestion absences"
```

### 2. Configuration Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configurez votre base de données dans le fichier `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestion_absences
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

```bash
php artisan migrate --seed
php artisan storage:link
```

### 3. Configuration Frontend

```bash
cd ../frontEnd
npm install
```

Créez un fichier `.env.local` dans le dossier frontend :

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Lancement

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontEnd
npm run dev
```

## 📁 Structure du Projet

```
Gestion absences/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/Controllers # Contrôleurs API
│   │   ├── Models/          # Modèles Eloquent
│   │   ├── Imports/         # Import Excel
│   │   └── Exports/         # Export Excel
│   ├── database/
│   │   ├── migrations/      # Migrations DB
│   │   └── seeders/         # Seeders
│   └── routes/api.php       # Routes API
│
└── frontEnd/               # Application React
    ├── src/
    │   ├── components/     # Composants React
    │   ├── assets/api/     # Services API
    │   ├── store/          # Redux store
    │   └── routes/         # Configuration routes
    └── public/            # Assets statiques
```

## 🔐 Rôles et Permissions

| Rôle            | Permissions                                                     |
| --------------- | --------------------------------------------------------------- |
| **Stagiaire**   | Consulter ses absences, soumettre des justifications            |
| **Formateur**   | Enregistrer absences, gérer ses groupes, consulter statistiques |
| **Surveillant** | Toutes permissions, validation justifications, administration   |

## 📊 API Endpoints

### Authentification

- `POST /api/login` - Connexion
- `POST /api/register` - Inscription
- `POST /api/logout` - Déconnexion

### Absences

- `GET /api/stagiaire/absences` - Liste absences stagiaire
- `POST /api/formateur/absences` - Créer absence
- `GET /api/admin/absences` - Liste toutes absences

### Justifications

- `POST /api/stagiaire/justifications` - Soumettre justification
- `PUT /api/admin/justifications/{id}/status` - Valider/refuser

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est développé dans le cadre d'un projet de fin d'études.

## 👥 Équipe

Développé avec ❤️ pour optimiser la gestion des absences dans les établissements de formation.

---

_Pour plus d'informations ou support, veuillez consulter la documentation complète du projet._
