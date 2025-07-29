# BDTECH Solutions - Landing Page

Une landing page professionnelle moderne pour BDTECH Solutions, cabinet de conseil IT basé à Dubai.

## 🎨 Design & Identité Visuelle

- **Couleurs du logo BDTECH Solutions :**
  - Bleu clair : `#28BBF1`
  - Bleu moyen : `#0065B3`
  - Bleu foncé : `#1B2F4B`
  - Fond : `#FFFFFF` (blanc pur)

- **Polices :** Inter et Poppins (Google Fonts)
- **Style :** Corporate, moderne, sophistiqué et aéré
- **Composants :** Coins légèrement arrondis, icônes vectorielles propres

## 🚀 Fonctionnalités

### Navigation
- ✅ Navbar sticky avec effet de transparence
- ✅ Menu burger responsive pour mobile
- ✅ Navigation smooth scroll
- ✅ Logo animé avec hover effects

### Sections
1. **Hero Section** - Titre principal avec CTA et illustration
2. **À propos** - Présentation de l'entreprise avec statistiques
3. **Services** - 3 cartes de services avec icônes et features
4. **Processus** - Timeline en 4 étapes avec animations
5. **Témoignages** - Carousel automatique avec navigation
6. **Partenaires** - Grille de logos de partenaires
7. **CTA Final** - Section de contact avec méthodes multiples
8. **Footer** - Informations de contact et liens sociaux

### Animations
- ✅ Framer Motion pour animations fluides
- ✅ Animations au scroll (fadeIn, slideUp, slideIn)
- ✅ Hover effects sur tous les composants
- ✅ Animations de chargement progressives

### Responsive
- ✅ Design mobile-first
- ✅ Breakpoints : sm, md, lg, xl
- ✅ Navigation adaptative
- ✅ Grilles flexibles

## 🛠️ Technologies Utilisées

- **Framework :** React 19 + TypeScript
- **Build Tool :** Vite
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **Icons :** Lucide React
- **Routing :** React Router DOM
- **Fonts :** Google Fonts (Inter, Poppins)

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── HeroSection.tsx
│   ├── ServiceCard.tsx
│   ├── ProcessSteps.tsx
│   ├── TestimonialCarousel.tsx
│   ├── PartnerGrid.tsx
│   └── CTASection.tsx
├── layout/             # Layout principal
│   └── Layout.tsx
├── pages/              # Pages de l'application
│   └── Home.tsx
├── data/               # Données mock
│   └── home.ts
├── assets/             # Images et ressources
├── styles/             # Styles globaux
└── types/              # Types TypeScript
```

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎯 Fonctionnalités Avancées

### Accessibilité
- ✅ Navigation au clavier
- ✅ Focus styles
- ✅ ARIA labels
- ✅ Contraste des couleurs optimisé

### Performance
- ✅ Lazy loading des composants
- ✅ Optimisation des images
- ✅ Code splitting
- ✅ Animations optimisées

### SEO
- ✅ Meta tags
- ✅ Structure sémantique
- ✅ URLs optimisées
- ✅ Schema markup (à implémenter)

## 📱 Responsive Design

| Breakpoint | Largeur | Description |
|------------|---------|-------------|
| Mobile | < 640px | Design mobile-first |
| Tablet | 640px - 1024px | Adaptation tablette |
| Desktop | > 1024px | Design desktop complet |

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js` :
```javascript
colors: {
  'bdtech': {
    'light': '#28BBF1',
    'medium': '#0065B3', 
    'dark': '#1B2F4B',
    'white': '#FFFFFF'
  }
}
```

### Contenu
Toutes les données sont centralisées dans `src/data/home.ts` :
- Services
- Témoignages
- Partenaires
- Informations de contact

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Build pour production
npm run preview      # Prévisualise le build
npm run lint         # Lance ESLint
```

## 📞 Contact

- **Email :** contact@bdtech-solutions.com
- **Téléphone :** +971 55 845 0710
- **Adresse :** Dubai, UAE

## 📄 Licence

Ce projet est développé pour BDTECH Solutions. Tous droits réservés.

---

**Développé avec ❤️ pour BDTECH Solutions**