# 🚀 Configuration Vercel pour BDTECH

## ✅ Backend Render opérationnel
- **URL:** https://bdtech.onrender.com
- **API:** https://bdtech.onrender.com/api
- **Status:** ✅ Testé et fonctionnel

## 🔧 Configuration Vercel

### 1. Variables d'environnement Vercel
Dans le dashboard Vercel de ton projet `bdtech-azure` :

**Settings → Environment Variables → Add New**

```
Name: VITE_API_BASE_URL
Value: https://bdtech.onrender.com/api
Environment: Production, Preview, Development
```

### 2. Redéployer Vercel
Après avoir ajouté la variable d'environnement :
- **Deployments tab**
- **Redeploy** le dernier deployment
- Ou push un nouveau commit

### 3. Test de production
Une fois redéployé, teste sur https://bdtech-azure.vercel.app :

1. **Login Samsung :**
   - Email: `samsung@bdtech.com`
   - Password: `SamsungPass123!`

2. **Vérifier le catalogue :**
   - Seul le **Dell Latitude 5520** doit s'afficher
   - Prix : **2720 AED** (avec 15% de remise)
   - Badge "Featured" et "-15%"

## 🎯 Architecture finale

```
Frontend (Vercel)          Backend (Render)         Database
https://bdtech-azure   →   https://bdtech.onrender.com   →   MongoDB Atlas
.vercel.app                                                  
                           
Samsung login  →  API /auth/login  →  JWT Token  →  /products  →  Dell Laptop 2720 AED
```

## 🧪 Tests automatiques

Pour tester l'intégration complète :

```bash
# Test direct API
curl https://bdtech.onrender.com/api/health

# Test login
curl -X POST https://bdtech.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"samsung@bdtech.com","password":"SamsungPass123!"}'
```

## ✅ Checklist finale

- [x] Backend déployé sur Render
- [x] API testée et fonctionnelle  
- [x] Samsung user et produit créés
- [x] Pricing spécifique client fonctionnel
- [x] Frontend configuré pour Render
- [ ] Variable Vercel configurée
- [ ] Redéploiement Vercel
- [ ] Test login Samsung en production
- [ ] Validation catalogue avec prix spécifiques

## 🚀 Prêt pour la production !

Ton système de catalogue avec prix clients spécifiques est maintenant déployé et opérationnel ! 🌍
