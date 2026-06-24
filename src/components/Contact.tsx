import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { company } from "@/lib/data";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

export default function Contact() {
  const items = [
    { icon: Phone, label: "Téléphone", value: company.phone, href: `tel:${company.phoneHref}` },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "Zone d'intervention", value: company.area },
    { icon: Clock, label: "Horaires", value: company.hours },
  ];

  return (
    <section id="contact" className="section">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Devis &amp; Contact</span>
          <h2 id="devis" className="mt-5 scroll-mt-28 text-3xl font-extrabold sm:text-4xl">
            Obtenez votre devis gratuit en 5 étapes
          </h2>
          <p className="mt-4 text-[#aeb6c7]">
            Renseignez quelques informations et recevez une estimation
            immédiate. Nous vous recontactons sous 24h pour finaliser.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <QuoteForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="card h-full">
              <h3 className="text-lg font-bold">Nous contacter directement</h3>
              <p className="mt-2 text-sm text-[#aeb6c7]">
                Une question ou une urgence ? Joignez-nous, on vous répond vite.
              </p>

              <ul className="mt-6 space-y-4">
                {items.map((it) => {
                  const Icon = it.icon;
                  const content = (
                    <span className="flex items-start gap-3">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-[#7e879b]">{it.label}</span>
                        <span className="block text-sm font-medium text-white">{it.value}</span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={it.label}>
                      {it.href ? (
                        <a href={it.href} className="block transition-opacity hover:opacity-80">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-6 w-full"
              >
                <MessageCircle className="h-4 w-4" /> Discuter sur WhatsApp
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
