import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${company.name} — Nettoyage professionnel à Rennes`,
  description:
    "MyClean Rennes : services de nettoyage premium pour particuliers et professionnels à Rennes et sa métropole. Devis gratuit sous 24h, produits éco-responsables.",
  keywords: [
    "nettoyage Rennes",
    "ménage Rennes",
    "entreprise de nettoyage",
    "nettoyage bureaux Rennes",
    "femme de ménage Rennes",
    "MyClean",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    title: `${company.name} — Nettoyage professionnel à Rennes`,
    description:
      "Services de nettoyage premium pour particuliers et professionnels à Rennes. Devis gratuit sous 24h.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
