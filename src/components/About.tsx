import Image from "next/image";
import { Sparkles, Leaf, FileCheck, ShieldCheck, Check } from "lucide-react";
import { aboutPoints, company, features } from "@/lib/data";
import Reveal from "./Reveal";

const icons = { Sparkles, Leaf, FileCheck, ShieldCheck } as const;

export default function About() {
  return (
    <section id="a-propos" className="section">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-surface-border shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=70"
                  alt="Équipe MyClean Rennes en intervention"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-surface-border bg-gold-gradient px-5 py-4 text-ink-950 shadow-gold sm:block">
                <p className="font-display text-2xl font-extrabold">5 ans</p>
                <p className="text-xs font-semibold">d&apos;expérience</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">À propos</span>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Votre partenaire propreté de confiance à Rennes
              </h2>
              <p className="mt-5 text-[#aeb6c7]">
                {company.name} est une entreprise locale spécialisée dans le
                nettoyage des particuliers et des professionnels. Notre mission :
                vous offrir un cadre de vie et de travail sain, avec un service
                fiable, ponctuel et soigné.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {aboutPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[#cfd6e4]">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = icons[f.icon as keyof typeof icons] ?? Sparkles;
            return (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="card h-full transition-colors hover:border-accent/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm text-[#aeb6c7]">{f.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
