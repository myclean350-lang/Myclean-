"use client";

import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  CalendarClock,
  User,
  ClipboardList,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formulas } from "@/lib/data";
import {
  estimatePrice,
  formatEuro,
  frequencies,
  propertyTypes,
  type FormulaId,
  type Frequency,
  type PropertyType,
} from "@/lib/pricing";

const STEPS = [
  { title: "Votre bien", icon: Home },
  { title: "Formule", icon: ClipboardList },
  { title: "Fréquence", icon: CalendarClock },
  { title: "Coordonnées", icon: User },
  { title: "Récapitulatif", icon: Check },
];

type FormState = {
  property: PropertyType;
  surface: string;
  formula: FormulaId;
  frequency: Frequency;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const initial: FormState = {
  property: "appartement",
  surface: "60",
  formula: "confort",
  frequency: "ponctuel",
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const estimate = useMemo(
    () =>
      estimatePrice({
        surface: Number(data.surface) || 0,
        formula: data.formula,
        property: data.property,
        frequency: data.frequency,
      }),
    [data.surface, data.formula, data.property, data.frequency]
  );

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return Number(data.surface) > 0;
      case 3:
        return (
          data.name.trim().length > 1 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
          data.phone.trim().length >= 8
        );
      default:
        return true;
    }
  }, [step, data]);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const formulaName = formulas.find((f) => f.id === data.formula)?.name ?? "";
  const propertyLabel =
    propertyTypes.find((p) => p.id === data.property)?.label ?? "";
  const frequencyLabel =
    frequencies.find((f) => f.id === data.frequency)?.label ?? "";

  async function handleSubmit() {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const params = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      property: propertyLabel,
      surface: data.surface,
      formula: formulaName,
      frequency: frequencyLabel,
      estimate: formatEuro(estimate.total),
      hours: estimate.hours,
      message: data.message || "—",
    };

    setStatus("sending");
    setErrorMsg("");

    // Si EmailJS n'est pas encore configuré, on simule l'envoi pour la démo.
    if (!serviceId || !templateId || !publicKey) {
      // eslint-disable-next-line no-console
      console.info("[Devis MyClean] EmailJS non configuré — données :", params);
      setTimeout(() => setStatus("success"), 800);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, params, { publicKey });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Une erreur est survenue lors de l'envoi. Réessayez ou contactez-nous par téléphone."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Demande envoyée !</h3>
        <p className="mt-3 text-[#aeb6c7]">
          Merci {data.name.split(" ")[0]}. Nous avons bien reçu votre demande de
          devis et vous recontacterons sous 24h. Estimation indicative :{" "}
          <span className="font-bold text-white">{formatEuro(estimate.total)}</span>{" "}
          par intervention.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(initial);
            setStep(0);
            setStatus("idle");
          }}
          className="btn-ghost mt-6"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progression */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const active = i === step;
          return (
            <div key={s.title} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    done
                      ? "border-accent bg-accent text-ink-950"
                      : active
                      ? "border-gold bg-gold-gradient text-ink-950"
                      : "border-surface-border bg-surface text-[#7e879b]"
                  }`}
                >
                  {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    active ? "text-white" : "text-[#7e879b]"
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded ${
                    done ? "bg-accent" : "bg-surface-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="card">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <h3 className="text-xl font-bold">Quel est votre type de bien ?</h3>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {propertyTypes.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set("property", p.id)}
                      className={`rounded-xl border px-4 py-4 text-sm font-semibold transition-colors ${
                        data.property === p.id
                          ? "border-accent bg-accent/10 text-white"
                          : "border-surface-border bg-surface text-[#aeb6c7] hover:border-accent/40"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <label className="mt-6 block text-sm font-medium text-white">
                  Surface approximative (m²)
                </label>
                <input
                  type="number"
                  min={1}
                  value={data.surface}
                  onChange={(e) => set("surface", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-surface-border bg-ink-950/60 px-4 py-3 text-white outline-none focus:border-accent"
                  placeholder="Ex : 60"
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold">Choisissez votre formule</h3>
                <div className="mt-5 space-y-3">
                  {formulas.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => set("formula", f.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
                        data.formula === f.id
                          ? "border-accent bg-accent/10"
                          : "border-surface-border bg-surface hover:border-accent/40"
                      }`}
                    >
                      <span>
                        <span className="block font-bold text-white">{f.name}</span>
                        <span className="block text-xs text-[#aeb6c7]">{f.description}</span>
                      </span>
                      <span className="flex-none font-display text-lg font-bold text-white">
                        {formatEuro(f.price)}
                        <span className="text-xs font-normal text-[#aeb6c7]">{f.unit}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-bold">À quelle fréquence ?</h3>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {frequencies.map((fr) => (
                    <button
                      key={fr.id}
                      type="button"
                      onClick={() => set("frequency", fr.id)}
                      className={`rounded-xl border px-4 py-4 text-center transition-colors ${
                        data.frequency === fr.id
                          ? "border-accent bg-accent/10 text-white"
                          : "border-surface-border bg-surface text-[#aeb6c7] hover:border-accent/40"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{fr.label}</span>
                      <span className="mt-1 block text-xs text-accent">{fr.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-bold">Vos coordonnées</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Nom complet *" value={data.name} onChange={(v) => set("name", v)} placeholder="Jean Dupont" />
                  <Field label="Téléphone *" value={data.phone} onChange={(v) => set("phone", v)} placeholder="06 12 34 56 78" type="tel" />
                  <Field label="Email *" value={data.email} onChange={(v) => set("email", v)} placeholder="jean@email.com" type="email" />
                  <Field label="Adresse / Commune" value={data.address} onChange={(v) => set("address", v)} placeholder="Rennes" />
                </div>
                <label className="mt-4 block text-sm font-medium text-white">
                  Précisions (optionnel)
                </label>
                <textarea
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-surface-border bg-ink-950/60 px-4 py-3 text-white outline-none focus:border-accent"
                  placeholder="Détails utiles : accès, animaux, demandes spécifiques…"
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-xl font-bold">Récapitulatif de votre demande</h3>
                <div className="mt-5 space-y-2 rounded-xl border border-surface-border bg-ink-950/40 p-5 text-sm">
                  <Row label="Type de bien" value={`${propertyLabel} · ${data.surface} m²`} />
                  <Row label="Formule" value={formulaName} />
                  <Row label="Fréquence" value={frequencyLabel} />
                  <Row label="Durée estimée" value={`${estimate.hours} h`} />
                  <Row label="Contact" value={`${data.name} · ${data.phone}`} />
                </div>

                <div className="mt-5 rounded-xl border border-gold/40 bg-gold-gradient/5 p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#aeb6c7]">
                    Estimation indicative
                  </p>
                  <p className="mt-1 font-display text-4xl font-extrabold gradient-text">
                    {formatEuro(estimate.total)}
                  </p>
                  <p className="mt-1 text-xs text-[#7e879b]">
                    par intervention
                    {estimate.discount > 0 && ` · ${formatEuro(estimate.discount)} d'économie`}
                  </p>
                </div>

                {status === "error" && (
                  <p className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 flex-none" /> {errorMsg}
                  </p>
                )}

                <p className="mt-4 text-xs text-[#7e879b]">
                  Cette estimation est fournie à titre indicatif. Le tarif définitif
                  sera confirmé après échange. En envoyant ce formulaire, vous
                  acceptez d&apos;être recontacté par {""}MyClean Rennes.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!stepValid}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuer <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="btn-primary disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
                </>
              ) : (
                <>
                  Envoyer ma demande <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-surface-border bg-ink-950/60 px-4 py-3 text-white outline-none focus:border-accent"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-surface-border/60 py-1.5 last:border-0">
      <span className="text-[#aeb6c7]">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}
