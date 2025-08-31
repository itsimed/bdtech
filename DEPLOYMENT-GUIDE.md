# 🚀 Guide de Déploiement BDTECH

## Architecture
- **Backend:** Render.com (Node.js + MongoDB Atlas)
- **Frontend:** Vercel.app (React + Vite)

---

## 📦 **ÉTAPE 1: Déployer le Backend sur Render**

### 1.1 Préparer le Repository
```bash
# S'assurer que tous les fichiers sont commités
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### 1.2 Configurer Render
1. **Aller sur [render.com](https://render.com)**
2. **Se connecter avec GitHub**
3. **New + → Web Service**
4. **Sélectionner le repository `bdtech-1`**

### 1.3 Configuration Render
```
Name: bdtech-backend
Environment: Node
Region: Frankfurt (Europe)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### 1.4 Variables d'Environnement Render
⚠️ **Important:** Ajouter ces variables dans Render Dashboard

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://bdtech:bouchibouchi@cluster0.w4brltg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=bdtech_catalog
JWT_SECRET=bdtech_super_secret_jwt_key_2024_secure_and_private_production_render
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://bdtech-azure.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 1.5 Déployer
- Cliquer **"Create Web Service"**
- Attendre le déploiement (5-10 minutes)
- Noter l'URL: `https://bdtech-backend-xxx.onrender.com`

---

## 🌐 **ÉTAPE 2: Configurer le Frontend pour Vercel**

### 2.1 Mettre à jour l'URL de l'API

Une fois que tu as l'URL Render, il faut configurer Vercel :

**Sur Vercel Dashboard:**
1. **Projet `bdtech-azure`**
2. **Settings → Environment Variables**
3. **Ajouter:**
   ```
   Key: VITE_API_BASE_URL
   Value: https://ton-url-render.onrender.com/api
   ```

### 2.2 Redéployer Vercel
- **Deployments → Redeploy**
- Ou push un commit sur GitHub

---

## ✅ **ÉTAPE 3: Tests Post-Déploiement**

### 3.1 Tester le Backend
```bash
# Health check
curl https://ton-backend.onrender.com/api/health

# Login Samsung
curl -X POST https://ton-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"samsung@bdtech.com","password":"SamsungPass123!"}'

# Products avec token
curl https://ton-backend.onrender.com/api/products \
  -H "Authorization: Bearer TON_TOKEN"
```

### 3.2 Tester le Frontend
1. **Aller sur:** https://bdtech-azure.vercel.app/login
2. **Se connecter:** samsung@bdtech.com / SamsungPass123!
3. **Vérifier:** Seul le laptop Dell s'affiche avec prix 2720 AED

---

## 🔧 **Configuration Complete**

### Render Backend
```
✅ URL: https://bdtech-backend-xxx.onrender.com
✅ Health: /api/health
✅ CORS: https://bdtech-azure.vercel.app
✅ MongoDB Atlas connecté
✅ Samsung user + product disponibles
```

### Vercel Frontend  
```
✅ URL: https://bdtech-azure.vercel.app
✅ API: https://bdtech-backend-xxx.onrender.com/api
✅ Login Samsung fonctionnel
✅ Catalogue avec prix spécifiques
```

---

## 🚨 **Troubleshooting**

### Backend ne démarre pas
- Vérifier les logs Render
- Confirmer que `MONGODB_URI` est correct
- S'assurer que toutes les variables d'env sont définies

### CORS Errors
- Ajouter l'URL Vercel exacte dans `CORS_ORIGINS`
- Redéployer le backend après modification

### Frontend ne charge pas les produits
- Vérifier que `VITE_API_BASE_URL` pointe vers Render
- Tester l'API directement avec curl
- Regarder la console browser pour erreurs

### MongoDB Connection Failed
- Vérifier que l'IP de Render est autorisée dans MongoDB Atlas
- Aller sur MongoDB Atlas → Network Access → Add IP → 0.0.0.0/0 (Allow all)

---

## 📊 **Monitoring**

### Backend (Render)
- **Logs:** Render Dashboard → Service → Logs
- **Métriques:** CPU, Memory, Response times
- **Health:** https://ton-backend.onrender.com/api/health

### Frontend (Vercel)
- **Analytics:** Vercel Dashboard → Analytics
- **Functions:** Voir les erreurs SSR
- **Performance:** Core Web Vitals

---

## 💰 **Coûts**

### Render Free Plan
- ✅ 750 heures/mois
- ⏰ Sleep après 15min inactivité  
- 🐌 ~30s cold start

### Vercel Hobby Plan
- ✅ Gratuit pour projets personnels
- ✅ Deploy automatique
- ✅ Analytics de base

**Total: 0€/mois** 🎉

---

## 🎯 **Prochaines Étapes**

1. **Déployer Backend → Render**
2. **Configurer Frontend → Vercel**  
3. **Tester connexion Samsung**
4. **Ajouter autres clients/produits**
5. **Monitoring + optimisations**

**Ton système de catalogue client-spécifique sera live ! 🚀**
