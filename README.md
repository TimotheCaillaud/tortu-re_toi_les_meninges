# Tortu're toi les méninges - Site Web

Site web pour la réservation d'escape games à domicile.

## 🚀 Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [votre-repo]
cd escape-game-site

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
escape-game-site/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   ├── contact/           # Page contact
│   └── faq/               # Page FAQ
├── components/            # Composants React
│   ├── layout/           # Header, Footer, Navigation
│   ├── ui/               # Composants réutilisables
│   ├── home/             # Composants homepage
│   ├── contact/          # Composants contact
│   └── faq/              # Composants FAQ
├── lib/                   # Utilitaires et helpers
├── public/               # Assets statiques
└── styles/               # Styles globaux
```

## 🎨 Charte graphique

- **Marron principal**: `#733706`
- **Marron foncé**: `#3f1f03`
- **Beige**: `#f7dba7`
- **Crème**: `#fffcf6`
- **Bleu-vert**: `#041f1e`

## 🧪 Tests

```bash
# Lancer les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch
```

## 🚢 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Build manuel

```bash
npm run build
npm run start
```

## 📝 Fonctionnalités à venir

- [ ] Système de réservation avec calendrier
- [ ] Intégration Stripe pour les paiements
- [ ] Espace client
- [ ] Blog/Actualités
- [ ] Système de reviews

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
