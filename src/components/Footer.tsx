import { Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { company, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-ink-950">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#accueil" className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-ink-950">
                <Sparkles className="h-5 w-5" />
              </span>
              My<span className="gradient-text">Clean</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-[#aeb6c7]">
              {company.name} — votre partenaire propreté à Rennes. Nettoyage
              premium pour particuliers et professionnels, avec des produits
              éco-responsables.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-[#aeb6c7] transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#aeb6c7]">
              <li>
                <a href={`tel:${company.phoneHref}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-accent" /> {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-accent" /> {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {company.area}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-6 text-xs text-[#7e879b] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. Tous droits réservés.
          </p>
          <p>Conçu avec soin · {company.area}</p>
        </div>
      </div>
    </footer>
  );
}
