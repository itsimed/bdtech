# 🚀 Déploiement BDTECH Backend sur Render

## 📋 Prérequis

- Compte [Render](https://render.com) (gratuit)
- Repository GitHub avec le code backend
- Variables d'environnement configurées

## 🔧 Configuration Render

### Option 1: Déploiement via GitHub (Recommandé)

1. **Connecter GitHub à Render**
   - Va sur [Render Dashboard](https://dashboard.render.com/)
   - Connecte ton compte GitHub
   - Autorise Render à accéder à tes repos

2. **Créer un nouveau Web Service**
   - Clique sur "New +" → "Web Service"
   - Sélectionne ton repository `bdtech-1`
   - Configure les paramètres :

```
Name: bdtech-backend
Environment: Node
Region: Frankfurt (EU Central)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
```

3. **Variables d'environnement**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://bdtech:bouchibouchi@cluster0.w4brltg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   DB_NAME=bdtech_catalog
   JWT_SECRET=bdtech_super_secret_jwt_key_2024_secure_and_private_production
   JWT_EXPIRES_IN=7d
   CORS_ORIGINS=https://bdtech-azure.vercel.app,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Plan de pricing**
   - Sélectionne "Free" pour commencer
   - Upgrade vers "Starter" ($7/mois) si besoin de plus de performances

### Option 2: Déploiement avec render.yaml

Si tu as le fichier `render.yaml` dans ton repo, Render le détectera automatiquement.

## 🔒 Sécurité en Production

### Variables d'environnement sécurisées

⚠️ **Important** : Change ces valeurs en production !

```bash
# Génère un JWT secret sécurisé
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Utilise cette valeur pour JWT_SECRET
```

### MongoDB Production

Si tu veux une DB dédiée :
1. **MongoDB Atlas** : Crée un cluster production séparé
2. **Render PostgreSQL** : Alternative à MongoDB (nécessite migration)

## 🌐 Configuration DNS

Une fois déployé, Render te donnera une URL comme :
```
https://bdtech-backend.onrender.com
```

## 🧪 Tests Post-Déploiement

### 1. Health Check
```bash
curl https://bdtech-backend.onrender.com/api/health
```

### 2. Test Login Samsung
```bash
curl -X POST https://bdtech-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"samsung@bdtech.com","password":"SamsungPass123!"}'
```

### 3. Test Products API
```bash
# Utilise le token du login précédent
curl https://bdtech-backend.onrender.com/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Configuration Frontend

Après déploiement, configure le frontend :

### Vercel Environment Variables
```
VITE_API_BASE_URL=https://bdtech-backend.onrender.com/api
```

### Local Development
```bash
# .env.local
VITE_API_BASE_URL=https://bdtech-backend.onrender.com/api
```

## 📊 Monitoring

### Logs Render
- Dashboard Render → Service → "Logs"
- Voir les erreurs en temps réel

### Métriques
- CPU, Memory usage
- Request/response times
- Error rates

## 🚨 Troubleshooting

### Problème de CORS
```bash
# Ajoute ton domaine frontend dans CORS_ORIGINS
CORS_ORIGINS=https://ton-frontend.vercel.app,https://bdtech-azure.vercel.app
```

### Base de données non accessible
1. Vérifie `MONGODB_URI` dans les variables d'environnement
2. Assure-toi que l'IP de Render est autorisée dans MongoDB Atlas
3. Teste la connexion avec MongoDB Compass

### Service ne démarre pas
1. Vérifie les logs Render
2. Confirme que `package.json` a le bon `start` script
3. Vérifie que toutes les dépendances sont installées

## 💰 Coûts

### Plan Free
- ✅ 750 heures/mois (suffisant pour 1 service)
- ✅ Sleep après 15min d'inactivité
- ✅ 100GB bandwidth/mois
- ❌ Service peut être lent au réveil

### Plan Starter ($7/mois)
- ✅ Pas de sleep
- ✅ Performances stables
- ✅ 400GB bandwidth/mois
- ✅ Support prioritaire

## 🔄 CI/CD Automatique

Render redéploie automatiquement à chaque push sur `main` !

## 📞 Support

- [Render Documentation](https://render.com/docs)
- [Render Discord](https://discord.gg/render)
- Contact BDTECH pour assistance

---

**Une fois déployé, ton API sera accessible depuis n'importe où ! 🌍**
