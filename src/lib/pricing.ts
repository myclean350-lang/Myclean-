import { formulas } from "./data";

export type PropertyType = "appartement" | "maison" | "bureau" | "autre";
export type Frequency = "ponctuel" | "mensuel" | "bimensuel" | "hebdomadaire";
export type FormulaId = "essentiel" | "confort" | "premium";

export const propertyTypes: { id: PropertyType; label: string }[] = [
  { id: "appartement", label: "Appartement" },
  { id: "maison", label: "Maison" },
  { id: "bureau", label: "Bureau / Local" },
  { id: "autre", label: "Autre" },
];

export const frequencies: {
  id: Frequency;
  label: string;
  discount: number; // réduction appliquée au prix
  note: string;
}[] = [
  { id: "ponctuel", label: "Ponctuel", discount: 0, note: "Une intervention" },
  { id: "mensuel", label: "Mensuel", discount: 0.05, note: "-5%" },
  { id: "bimensuel", label: "Bimensuel", discount: 0.1, note: "-10%" },
  { id: "hebdomadaire", label: "Hebdomadaire", discount: 0.15, note: "-15%" },
];

// Estimation du nombre d'heures nécessaires selon la surface et la formule.
// Base : ~1h pour 25 m². Les formules plus complètes demandent plus de temps.
const formulaTimeFactor: Record<FormulaId, number> = {
  essentiel: 1,
  confort: 1.25,
  premium: 1.6,
};

const propertyFactor: Record<PropertyType, number> = {
  appartement: 1,
  maison: 1.1,
  bureau: 0.95,
  autre: 1,
};

export type EstimateInput = {
  surface: number;
  formula: FormulaId;
  property: PropertyType;
  frequency: Frequency;
};

export type EstimateResult = {
  hours: number;
  hourlyRate: number;
  gross: number; // avant réduction
  discount: number; // montant de la réduction
  total: number; // prix estimé final par intervention
};

export function estimatePrice(input: EstimateInput): EstimateResult {
  const formula = formulas.find((f) => f.id === input.formula) ?? formulas[0];
  const hourlyRate = formula.price;

  const surface = Number.isFinite(input.surface) ? input.surface : 0;

  // Heures estimées : surface / 25 m² par heure, pondérée par la formule et le type de bien.
  let hours =
    (surface / 25) *
    formulaTimeFactor[input.formula] *
    propertyFactor[input.property];

  // Minimum facturé : 2 heures.
  hours = Math.max(2, Math.round(hours * 2) / 2);

  const gross = hours * hourlyRate;

  const freq = frequencies.find((f) => f.id === input.frequency);
  const discountRate = freq ? freq.discount : 0;
  const discount = Math.round(gross * discountRate);
  const total = Math.round(gross - discount);

  return { hours, hourlyRate, gross: Math.round(gross), discount, total };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
