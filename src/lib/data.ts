// Contenu central du site — modifiez ici tous les textes, prix et informations.

export const company = {
  name: "MyClean Rennes",
  shortName: "MyClean",
  tagline: "Le nettoyage premium à Rennes",
  slogan: "Des espaces impeccables, un service d'exception.",
  phone: "07 72 39 63 72",
  phoneHref: "+33772396372",
  whatsapp: "33772396372",
  email: "myclean.350@gmail.com",
  area: "Rennes et sa métropole (35)",
  hours: "Lun – Sam : 8h00 – 20h00",
  siret: "SIRET 000 000 000 00000",
};

export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Formules", href: "#formules" },
  { label: "Avant / Après", href: "#avant-apres" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: "+500", label: "Interventions réalisées" },
  { value: "4,9/5", label: "Note moyenne clients" },
  { value: "100%", label: "Produits éco-responsables" },
  { value: "24h", label: "Devis sous 24 heures" },
];

export const features = [
  {
    title: "Équipe professionnelle",
    description:
      "Des agents formés, assurés et discrets pour un résultat irréprochable à chaque passage.",
    icon: "Sparkles",
  },
  {
    title: "Produits éco-responsables",
    description:
      "Nous utilisons des produits respectueux de votre santé et de l'environnement.",
    icon: "Leaf",
  },
  {
    title: "Devis gratuit & rapide",
    description:
      "Recevez une estimation personnalisée sous 24h, sans engagement.",
    icon: "FileCheck",
  },
  {
    title: "Satisfaction garantie",
    description:
      "Si le résultat ne vous convient pas, nous revenons gratuitement.",
    icon: "ShieldCheck",
  },
];

export const aboutPoints = [
  "Intervention à domicile, en entreprise et sur chantiers",
  "Matériel professionnel fourni et produits inclus",
  "Personnel assuré et formé aux normes d'hygiène",
  "Flexibilité des horaires, y compris le samedi",
];

// Formules / Tarifs ---------------------------------------------------------
export type Formula = {
  id: "essentiel" | "confort" | "premium";
  name: string;
  price: number; // tarif horaire indicatif en €
  unit: string;
  description: string;
  highlight?: boolean;
  features: string[];
};

export const formulas: Formula[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: 25,
    unit: "/ heure",
    description: "Pour l'entretien régulier de votre logement ou bureau.",
    features: [
      "Dépoussiérage des surfaces",
      "Aspiration & lavage des sols",
      "Nettoyage cuisine & sanitaires",
      "Vidage des poubelles",
    ],
  },
  {
    id: "confort",
    name: "Confort",
    price: 30,
    unit: "/ heure",
    description: "Un nettoyage approfondi pour un intérieur éclatant.",
    highlight: true,
    features: [
      "Tout de la formule Essentiel",
      "Nettoyage des vitres intérieures",
      "Détartrage salle de bain & WC",
      "Désinfection des points de contact",
      "Entretien des électroménagers",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 35,
    unit: "/ heure",
    description: "La prestation complète : remise à neuf et grand ménage.",
    features: [
      "Tout de la formule Confort",
      "Grand ménage de printemps",
      "Nettoyage fin de chantier",
      "Vitres intérieures & extérieures",
      "Traitement des sols spécifiques",
      "Intervention express prioritaire",
    ],
  },
];

// Avant / Après --------------------------------------------------------------
export const beforeAfter = [
  {
    title: "Cuisine après rénovation",
    before:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=70",
    after:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
  },
];

// Avis clients ---------------------------------------------------------------
export const testimonials = [
  {
    name: "Camille D.",
    role: "Particulier · Rennes Centre",
    rating: 5,
    text: "Une équipe ponctuelle et minutieuse. Mon appartement n'a jamais été aussi propre. Je recommande les yeux fermés !",
  },
  {
    name: "Thomas L.",
    role: "Gérant de bureau · Cesson-Sévigné",
    rating: 5,
    text: "Service impeccable pour l'entretien de nos locaux. Flexibles, professionnels et toujours souriants. Un vrai partenaire.",
  },
  {
    name: "Sophie M.",
    role: "Locataire · Saint-Grégoire",
    rating: 5,
    text: "J'ai fait appel à MyClean pour un nettoyage de fin de bail. État des lieux validé sans aucune réserve. Merci !",
  },
  {
    name: "Karim B.",
    role: "Propriétaire · Bruz",
    rating: 5,
    text: "Devis clair et rapide, intervention soignée. Le rapport qualité-prix est excellent. Je referai appel à eux.",
  },
];

// FAQ ------------------------------------------------------------------------
export const faq = [
  {
    question: "Quelles zones desservez-vous ?",
    answer:
      "Nous intervenons à Rennes et dans toute la métropole rennaise (Cesson-Sévigné, Saint-Grégoire, Bruz, Pacé, Chantepie…). Contactez-nous pour vérifier votre commune.",
  },
  {
    question: "Fournissez-vous le matériel et les produits ?",
    answer:
      "Oui, tout est inclus dans nos prestations : matériel professionnel et produits d'entretien éco-responsables. Vous n'avez rien à prévoir.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Remplissez notre formulaire de devis en ligne en 5 étapes ou contactez-nous par téléphone / WhatsApp. Vous recevez une estimation personnalisée sous 24h.",
  },
  {
    question: "Proposez-vous des prestations régulières ?",
    answer:
      "Absolument. Nous proposons des contrats hebdomadaires, bimensuels ou mensuels avec des tarifs dégressifs, ainsi que des interventions ponctuelles.",
  },
  {
    question: "Vos agents sont-ils assurés ?",
    answer:
      "Tous nos intervenants sont déclarés, formés et couverts par une assurance responsabilité civile professionnelle.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les virements, les espèces, ainsi que le paiement par CESU. Une facture vous est systématiquement remise.",
  },
];
