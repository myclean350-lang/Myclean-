"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { company, heroStats } from "@/lib/data";

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="h-3.5 w-3.5 fill-accent" /> Nettoyage premium · {company.area}
          </motion.span>

          <motion.h1
            className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Des espaces <span className="gradient-text">impeccables</span>,
            <br /> un service d&apos;exception.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg text-[#aeb6c7]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {company.name} accompagne particuliers et professionnels à Rennes
            avec des prestations de nettoyage sur-mesure. Produits
            éco-responsables, équipe formée, satisfaction garantie.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <a href="#devis" className="btn-primary">
              Obtenir un devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`tel:${company.phoneHref}`} className="btn-ghost">
              <Phone className="h-4 w-4 text-accent" /> {company.phone}
            </a>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#aeb6c7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            {["Devis sous 24h", "Sans engagement", "Personnel assuré"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-surface-border shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=70"
              alt="Agent de nettoyage professionnel MyClean Rennes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-surface-border bg-ink-950/90 px-5 py-4 shadow-card backdrop-blur-md sm:-left-8">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">4,9 / 5</p>
              <p className="text-xs text-[#aeb6c7]">+500 clients satisfaits</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-px mt-16">
        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-surface-border bg-surface/50 p-6 backdrop-blur-sm sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="gradient-text text-2xl font-extrabold sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-xs text-[#aeb6c7] sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
