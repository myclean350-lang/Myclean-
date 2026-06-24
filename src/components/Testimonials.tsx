import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="avis" className="section">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Avis clients</span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Ils nous ont fait confiance
          </h2>
          <p className="mt-4 text-[#aeb6c7]">
            Plus de 500 interventions et une note moyenne de 4,9/5. La
            satisfaction de nos clients est notre meilleure publicité.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card flex h-full flex-col">
                <Quote className="h-7 w-7 text-accent/40" />
                <blockquote className="mt-3 flex-1 text-sm text-[#cfd6e4]">
                  &laquo; {t.text} &raquo;
                </blockquote>
                <div className="mt-4 flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <figcaption className="mt-3 border-t border-surface-border pt-3">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[#aeb6c7]">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
