"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { company, nav } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-surface-border bg-ink-950/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <a href="#accueil" className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-ink-950">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            My<span className="gradient-text">Clean</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-[#aeb6c7] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${company.phoneHref}`}
            className="flex items-center gap-2 text-sm font-medium text-white"
          >
            <Phone className="h-4 w-4 text-accent" />
            {company.phone}
          </a>
          <a href="#devis" className="btn-primary">
            Devis gratuit
          </a>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-surface-border bg-ink-950/95 backdrop-blur-md lg:hidden">
          <ul className="container-px flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[#cfd6e4] hover:bg-surface-light hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 px-3">
              <a href={`tel:${company.phoneHref}`} className="btn-ghost w-full">
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
              <a href="#devis" onClick={() => setOpen(false)} className="btn-primary w-full">
                Devis gratuit
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
