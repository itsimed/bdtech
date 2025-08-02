# BDTECH Backend API - Authentication System

Backend API pour l'authentification des clients du catalogue BDTECH Solutions.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Démarrer le serveur de production
npm start
```

## 📋 Prérequis

- Node.js 18+
- MongoDB Atlas (connexion configurée dans config.env)

## 🔧 Configuration

Copiez le fichier `config.env` et configurez vos variables d'environnement :

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://bdtech:bochibochi@cluster0.w4brltg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=bdtech_catalog

# JWT Configuration
JWT_SECRET=bdtech_super_secret_jwt_key_2024_secure_and_private
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## 📚 API Endpoints

### 🔐 Authentication

#### POST `/api/auth/register`
Inscription d'un nouvel utilisateur

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+971501234567",
  "company": "Tech Corp",
  "position": "IT Manager",
  "address": {
    "street": "123 Main St",
    "city": "Dubai",
    "state": "Dubai",
    "country": "UAE",
    "zipCode": "12345"
  }
}
```

#### POST `/api/auth/login`
Connexion utilisateur

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### GET `/api/auth/me`
Récupérer les informations de l'utilisateur connecté

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/api/auth/logout`
Déconnexion (géré côté client)

#### POST `/api/auth/forgot-password`
Demande de réinitialisation de mot de passe

**Body:**
```json
{
  "email": "john@example.com"
}
```

#### POST `/api/auth/reset-password/:token`
Réinitialisation du mot de passe

**Body:**
```json
{
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

#### POST `/api/auth/verify-email/:token`
Vérification de l'email

#### POST `/api/auth/resend-verification`
Renvoyer l'email de vérification

#### POST `/api/auth/change-password`
Changer le mot de passe

**Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!"
}
```

### 👤 User Management

#### GET `/api/users/profile`
Récupérer le profil utilisateur

#### PUT `/api/users/profile`
Mettre à jour le profil utilisateur

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+971501234567",
  "company": "Tech Corp",
  "position": "IT Manager",
  "address": {
    "street": "123 Main St",
    "city": "Dubai",
    "state": "Dubai",
    "country": "UAE",
    "zipCode": "12345"
  },
  "preferences": {
    "newsletter": true,
    "notifications": true,
    "language": "en"
  }
}
```

#### DELETE `/api/users/profile`
Supprimer le compte utilisateur

### 🔧 Admin Routes

#### GET `/api/users`
Récupérer tous les utilisateurs (Admin)

**Query Parameters:**
- `page`: Numéro de page (défaut: 1)
- `limit`: Nombre d'éléments par page (défaut: 10)

#### GET `/api/users/:id`
Récupérer un utilisateur par ID (Admin)

#### PUT `/api/users/:id`
Mettre à jour un utilisateur par ID (Admin)

#### DELETE `/api/users/:id`
Supprimer un utilisateur par ID (Admin)

#### PATCH `/api/users/:id/toggle-status`
Activer/Désactiver un utilisateur (Admin)

## 🔒 Sécurité

### Validation des mots de passe
- Minimum 8 caractères
- Au moins une majuscule
- Au moins une minuscule
- Au moins un chiffre
- Au moins un caractère spécial

### Protection contre les attaques
- Rate limiting (100 requêtes par 15 minutes)
- Validation des données d'entrée
- Hachage des mots de passe (bcrypt)
- Tokens JWT sécurisés
- Protection CORS

### Verrouillage de compte
- 5 tentatives de connexion échouées = verrouillage 2 heures
- Réinitialisation automatique après expiration

## 📊 Modèle de données

### User Schema
```javascript
{
  // Informations de base
  firstName: String (requis, 2-50 caractères)
  lastName: String (requis, 2-50 caractères)
  email: String (requis, unique, format email)
  password: String (requis, min 8 caractères, haché)
  
  // Informations de contact
  phone: String (optionnel, format international)
  company: String (optionnel, max 100 caractères)
  position: String (optionnel, max 100 caractères)
  
  // Adresse
  address: {
    street: String (optionnel, max 200 caractères)
    city: String (optionnel, max 100 caractères)
    state: String (optionnel, max 100 caractères)
    country: String (optionnel, max 100 caractères)
    zipCode: String (optionnel, max 20 caractères)
  }
  
  // Statut du compte
  isActive: Boolean (défaut: true)
  isEmailVerified: Boolean (défaut: false)
  role: String (enum: 'client', 'admin', défaut: 'client')
  
  // Préférences
  preferences: {
    newsletter: Boolean (défaut: true)
    notifications: Boolean (défaut: true)
    language: String (enum: 'en', 'fr', 'ar', défaut: 'en')
  }
  
  // Sécurité
  loginAttempts: Number (défaut: 0)
  lockUntil: Date
  lastLogin: Date
  
  // Tokens
  emailVerificationToken: String
  emailVerificationExpires: Date
  passwordResetToken: String
  passwordResetExpires: Date
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}
```

## 🧪 Tests

```bash
# Lancer les tests
npm test
```

## 📝 Logs

Les logs sont affichés en mode développement avec Morgan :
- Requêtes HTTP
- Erreurs de base de données
- Connexions/déconnexions

## 🚀 Déploiement

### Variables d'environnement de production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<your-secure-jwt-secret>
CORS_ORIGIN=<your-frontend-url>
```

### PM2 (recommandé)
```bash
npm install -g pm2
pm2 start src/index.js --name "bdtech-backend"
pm2 save
pm2 startup
```

## 📞 Support

Pour toute question ou problème :
- Email: contact@bdtech-solutions.com
- Téléphone: +971 55 845 0710

---

**Développé avec ❤️ pour BDTECH Solutions** 