import { Check, Star, ArrowRight } from "lucide-react";
import { formulas } from "@/lib/data";
import { formatEuro } from "@/lib/pricing";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="formules" className="section">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Formules &amp; Tarifs</span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Une formule adaptée à chaque besoin
          </h2>
          <p className="mt-4 text-[#aeb6c7]">
            Des tarifs transparents et sans surprise. Choisissez la prestation
            qui vous convient — un devis personnalisé reste gratuit et sans
            engagement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {formulas.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 shadow-card transition-transform duration-300 hover:-translate-y-1 ${
                  f.highlight
                    ? "border-gold/60 bg-surface-light shadow-gold"
                    : "border-surface-border bg-surface/70"
                }`}
              >
                {f.highlight && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold-gradient px-4 py-1 text-xs font-bold text-ink-950">
                    <Star className="h-3 w-3 fill-ink-950" /> Le plus choisi
                  </span>
                )}

                <h3 className="text-xl font-bold">{f.name}</h3>
                <p className="mt-2 text-sm text-[#aeb6c7]">{f.description}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold text-white">
                    {formatEuro(f.price)}
                  </span>
                  <span className="mb-1 text-sm text-[#aeb6c7]">{f.unit}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-[#cfd6e4]">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          f.highlight ? "bg-gold/20 text-gold" : "bg-accent/15 text-accent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#devis"
                  className={`mt-7 w-full ${f.highlight ? "btn-primary" : "btn-ghost"}`}
                >
                  Choisir {f.name} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-xs text-[#7e879b]">
            * Tarifs horaires indicatifs TTC. Le prix final dépend de la surface,
            de la fréquence et de l&apos;état des lieux. Tarifs dégressifs pour les
            prestations régulières.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
