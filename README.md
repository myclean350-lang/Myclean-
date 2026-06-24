# MyClean Rennes — Site web

Site vitrine pour **MyClean Rennes**, service de nettoyage premium à Rennes.
Recréé en **Next.js 14** (App Router) + **Tailwind CSS** + **Framer Motion**.

## ✨ Fonctionnalités

- Design sombre / premium responsive (mobile-first)
- Sections : Hero, À propos, Formules & Tarifs, Avant/Après, Avis, FAQ, Contact, Footer
- **Slider avant/après** interactif (souris + tactile + clavier)
- **Formulaire de devis multi-étapes (5 étapes)** avec :
  - **Calcul automatique du prix estimé** selon la formule, la surface, le type de bien et la fréquence
  - **Envoi par email via EmailJS**
- **Bouton WhatsApp flottant** (07 72 39 63 72)
- **Animations d'apparition au scroll** (Framer Motion)
- **FAQ en accordéon animé**
- Images optimisées (Next/Image, WebP/AVIF, lazy loading)

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## 📧 Configuration EmailJS

Pour recevoir les demandes de devis par email :

1. Créez un compte gratuit sur [emailjs.com](https://www.emailjs.com/).
2. Créez un **Service** (Gmail, Outlook…) et un **Template**.
3. Dans le template, utilisez ces variables : `{{name}}`, `{{email}}`,
   `{{phone}}`, `{{address}}`, `{{property}}`, `{{surface}}`, `{{formula}}`,
   `{{frequency}}`, `{{estimate}}`, `{{hours}}`, `{{message}}`.
4. Copiez `.env.local.example` vers `.env.local` et renseignez vos clés :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

> Sans configuration, le formulaire fonctionne en **mode démo** (succès simulé,
> données affichées dans la console). Une fois les clés ajoutées, les emails
> partent réellement.

## 🖼️ Images

Les images sont actuellement des **placeholders** (Unsplash). Remplacez les URLs
dans `src/lib/data.ts` (et `src/components/Hero.tsx` / `About.tsx`) par vos
propres images. Pour de meilleures performances, placez vos fichiers dans
`public/` et utilisez des chemins locaux `/mon-image.webp`.

## ✏️ Personnalisation

- **Textes, prix, formules, FAQ, avis** → `src/lib/data.ts`
- **Logique de calcul du prix** → `src/lib/pricing.ts`
- **Couleurs / thème** → `tailwind.config.ts`

## 🛠️ Stack

| Outil | Usage |
| --- | --- |
| Next.js 14 | Framework React (App Router) |
| Tailwind CSS | Styles |
| Framer Motion | Animations |
| EmailJS | Envoi des devis par email |
| lucide-react | Icônes |
